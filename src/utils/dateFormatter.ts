// Utilitários para formatação de data
// Centralizei aqui para manter consistência no formato

export const formatDateTime = (date: Date): string => {
  // Formato brasileiro: DD/MM/AAAA HH:MM:SS
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// Cria um novo registro de clique com timestamp atual
export const createClickRecord = (): { id: string; timestamp: Date; formattedDate: string } => {
  const now = new Date();
  return {
    id: Date.now().toString(), // ID único baseado no timestamp
    timestamp: now,
    formattedDate: formatDateTime(now),
  };
};
