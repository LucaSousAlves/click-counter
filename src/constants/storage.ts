// Constantes para armazenamento local
// Centralizei as chaves para evitar typos e facilitar manutenção

export const STORAGE_KEYS = {
  COUNTER: 'clickCounter',
  HISTORY: 'clickHistory',
} as const;

// Configurações para exportação de arquivo
export const FILE_CONFIG = {
  FILENAME: 'historico_cliques.txt',
  MIME_TYPE: 'text/plain',
} as const;
