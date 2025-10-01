// Configurações do aplicativo
// Centralizei as configurações para facilitar manutenção e consistência

export const APP_CONFIG = {
  NAME: 'VobysApp',
  VERSION: '1.0.0',
  DESCRIPTION: 'Contador de Cliques com Histórico Persistente',
} as const;

// Configurações de UI - cores, espaçamentos e bordas
// Usei uma paleta de cores moderna e acessível
export const UI_CONFIG = {
  COLORS: {
    PRIMARY: '#007AFF',      // Azul iOS
    SUCCESS: '#34C759',      // Verde de sucesso
    DANGER: '#FF3B30',       // Vermelho de perigo
    BACKGROUND: '#f5f5f5',   // Cinza claro para fundo
    CARD_BACKGROUND: '#ffffff', // Branco para cards
    TEXT_PRIMARY: '#333333',   // Preto suave para texto principal
    TEXT_SECONDARY: '#666666', // Cinza para texto secundário
  },
  SPACING: {
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 24,
    XLARGE: 32,
  },
  BORDER_RADIUS: {
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 20,
  },
} as const;
