import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClickRecord, ClickState, ClickAction } from '../types';
import { createClickRecord } from '../utils/dateFormatter';
import { STORAGE_KEYS } from '../constants/storage';


// Estado inicial do contador
// Decidi usar isLoading para evitar flash de conteúdo vazio
const initialState: ClickState = {
  counter: 0,
  history: [],
  isLoading: true,
};


// Reducer para gerenciar as ações do contador
// Usei um padrão simples de reducer para manter o estado previsível
function clickReducer(state: ClickState, action: ClickAction): ClickState {
  switch (action.type) {
    case 'INCREMENT_CLICK':
      const newClick: ClickRecord = createClickRecord();

      // Adiciona o novo clique no início da lista (mais recente primeiro)
      return {
        ...state,
        counter: state.counter + 1,
        history: [newClick, ...state.history],
      };

    case 'CLEAR_HISTORY':
      return {
        ...state,
        counter: 0,
        history: [],
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'LOAD_DATA':
      return {
        ...state,
        counter: action.payload.counter,
        history: action.payload.history,
        isLoading: false,
      };

    default:
      return state;
  }
}

// Context
interface ClickContextType {
  state: ClickState;
  incrementClick: () => void;
  clearHistory: () => void;
  exportHistory: () => Promise<void>;
}

const ClickContext = createContext<ClickContextType | undefined>(undefined);

// Provider
interface ClickProviderProps {
  children: ReactNode;
}

export function ClickProvider({ children }: ClickProviderProps) {
  const [state, dispatch] = useReducer(clickReducer, initialState);

  // Carrega os dados salvos do AsyncStorage
  // Prefiro usar Promise.all para carregar tudo de uma vez
  const loadData = async () => {
    try {
      const [counterStr, historyStr] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.COUNTER),
        AsyncStorage.getItem(STORAGE_KEYS.HISTORY),
      ]);

      const counter = counterStr ? parseInt(counterStr, 10) : 0;
      const history: ClickRecord[] = historyStr ? JSON.parse(historyStr) : [];

      // Precisa converter as strings de data de volta para objetos Date
      // O JSON.stringify/parse não preserva os tipos Date
      const parsedHistory = history.map(record => ({
        ...record,
        timestamp: new Date(record.timestamp),
      }));

      dispatch({ type: 'LOAD_DATA', payload: { counter, history: parsedHistory } });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Se der erro, pelo menos tira o loading
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveData = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.COUNTER, state.counter.toString()),
        AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history)),
      ]);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }, [state.counter, state.history]);

  // Carregar dados do AsyncStorage na inicialização
  useEffect(() => {
    loadData();
  }, []);

  // Salvar dados no AsyncStorage sempre que o estado mudar
  useEffect(() => {
    if (!state.isLoading) {
      saveData();
    }
  }, [state.counter, state.history, state.isLoading, saveData]);

  const incrementClick = () => {
    dispatch({ type: 'INCREMENT_CLICK' });
  };

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
  };

  // Função para exportar o histórico como arquivo .txt
  const exportHistory = async () => {
    const fileContent = state.history
      .map(record => `${record.formattedDate}`)
      .join('\n');
  
    try {
      const Share = await import('react-native-share');
      const RNFS = await import('react-native-fs');

      // Cria o arquivo .txt no diretório externo
      const fileName = `historico_cliques_${new Date().toISOString().split('T')[0]}.txt`;
      const externalFilePath = `${RNFS.ExternalDirectoryPath}/${fileName}`;
      
      await RNFS.writeFile(externalFilePath, fileContent, 'utf8');
      
      // Verifica se o arquivo foi criado
      const fileExists = await RNFS.exists(externalFilePath);
      console.log('Arquivo criado em:', externalFilePath);
      console.log('Arquivo existe?', fileExists);

      // Tenta compartilhar o arquivo, se falhar compartilha como texto
      try {
        await Share.default.open({
          title: 'Histórico de Cliques',
          url: `file://${externalFilePath}`,
          type: 'text/plain',
        });
      } catch (fileError) {
        // Fallback: compartilhamento de texto
        await Share.default.open({
          title: 'Histórico de Cliques',
          message: fileContent,
          type: 'text/plain',
        });
      }
    } catch (error) {
      
      if (error instanceof Error && error.message.includes('User did not share')) {
        console.log('Usuário cancelou o compartilhamento');
        return;
      }
      
      console.error('Erro ao exportar histórico:', error);
      Alert.alert('Erro', 'Não foi possível exportar o histórico.');
    }
  };

  return (
    <ClickContext.Provider
      value={{
        state,
        incrementClick,
        clearHistory,
        exportHistory,
      }}
    >
      {children}
    </ClickContext.Provider>
  );
}

// Hook personalizado
export function useClick() {
  const context = useContext(ClickContext);
  if (context === undefined) {
    throw new Error('useClick deve ser usado dentro de um ClickProvider');
  }
  return context;
}
