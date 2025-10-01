import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useClick } from '../contexts/ClickContext';
import { UI_CONFIG } from '../config/app';

export function ClickCounter() {
  const { state, incrementClick } = useClick();

  // Mostra loading enquanto carrega os dados salvos
  if (state.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={UI_CONFIG.COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>{state.counter}</Text>
      <Text style={styles.counterLabel}>cliques</Text>
      
      <TouchableOpacity
        style={styles.clickButton}
        onPress={incrementClick}
        activeOpacity={0.8}
      >
        <Text style={styles.clickButtonText}>Clique Aqui!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: UI_CONFIG.SPACING.XLARGE,
    backgroundColor: UI_CONFIG.COLORS.CARD_BACKGROUND,
    borderRadius: UI_CONFIG.BORDER_RADIUS.LARGE,
    margin: UI_CONFIG.SPACING.MEDIUM,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: UI_CONFIG.SPACING.XLARGE,
  },
  loadingText: {
    marginTop: UI_CONFIG.SPACING.SMALL,
    fontSize: 16,
    color: UI_CONFIG.COLORS.TEXT_SECONDARY,
  },
  counterText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: UI_CONFIG.COLORS.PRIMARY,
    textAlign: 'center',
  },
  counterLabel: {
    fontSize: 18,
    color: UI_CONFIG.COLORS.TEXT_SECONDARY,
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  clickButton: {
    backgroundColor: UI_CONFIG.COLORS.PRIMARY,
    paddingHorizontal: UI_CONFIG.SPACING.XLARGE,
    paddingVertical: UI_CONFIG.SPACING.MEDIUM,
    borderRadius: 25,
    shadowColor: UI_CONFIG.COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  clickButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
