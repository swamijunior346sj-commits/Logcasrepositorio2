
export type LogActionType = 'ENTRADA' | 'SAIDA' | 'DEVOLUCAO';

export interface LogEntry {
  id: string;
  type: LogActionType;
  timestamp: string; // ISO string
  value: number;
  isPaid?: boolean; // Controle de carteira
  user_id?: string; // Isolamento por usuário
}

export interface DailySummary {
  date: string;
  loaded: number;
  delivered: number;
  returns: number;
  gains: number;
}

export interface QuickEntryRow {
  id: string;
  date: string;
  carregados: number;
  entregues: number;
  insucessos: number;
}