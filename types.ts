
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
  todayValue: number;
  weekValue: number;
  yearValue: number;
}

export interface QuickEntryRow {
  id: string;
  date: string;
  carregados: number;
  entregues: number;
  insucessos: number;
}

export interface TemporaryExpressRow {
  id: string;
  date: string;
  loaded: number;
  delivered: number;
  returns: number;
  totalValue: number;
}

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  daily_goal: number;
  email?: string;
  phone?: string;
  package_value?: number;
}

export interface Vehicle {
  id: string;
  user_id: string;
  model: string;
  plate: string;
  color: string;
  renavam: string;
  year: string;
  capacity: string;
  category: string;
  is_active: boolean;
}