import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { useClick } from '../contexts/ClickContext';

export function ActionButtons() {
  const { state, clearHistory, exportHistory } = useClick();

  // Confirmação antes de limpar - melhor UX
  const handleClearHistory = () => {
    Alert.alert(
      'Limpar Histórico',
      'Você tem certeza que deseja apagar todo o histórico?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: clearHistory,
        },
      ],
      { cancelable: true }
    );
  };

  const handleExportHistory = async () => {
    try {
      await exportHistory();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível exportar o histórico.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.exportButton]}
        onPress={handleExportHistory}
        disabled={state.history.length === 0}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Exportar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.clearButton]}
        onPress={handleClearHistory}
        disabled={state.history.length === 0}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Limpar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportButton: {
    backgroundColor: '#34C759',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
