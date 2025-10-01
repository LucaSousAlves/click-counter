// Tipos globais do aplicativo
// Centralizei os tipos para manter consistência e facilitar manutenção

export interface ClickRecord {
  id: string;
  timestamp: Date;
  formattedDate: string;
}

export interface ClickState {
  counter: number;
  history: ClickRecord[];
  isLoading: boolean;
}

// Actions do reducer - usei union types para type safety
export type ClickAction =
  | { type: 'INCREMENT_CLICK' }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_DATA'; payload: { counter: number; history: ClickRecord[] } };
