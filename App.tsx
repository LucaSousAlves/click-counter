/**
 * VobysApp - Contador de Cliques
 * Aplicativo React Native para contabilizar cliques com histórico persistente
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { ClickProvider } from './src/contexts/ClickContext';
import { ClickCounter } from './src/components/ClickCounter';
import { ClickHistory } from './src/components/ClickHistory';
import { ActionButtons } from './src/components/ActionButtons';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={isDarkMode ? '#000' : '#fff'}
      />
      <ClickProvider>
        <AppContent />
      </ClickProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com o contador principal */}
        <View style={styles.header}>
          <ClickCounter />
        </View>
        
        {/* Área do histórico */}
        <View style={styles.content}>
          <ClickHistory />
        </View>
        
        {/* Botões de ação fixos na parte inferior */}
        <ActionButtons />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
