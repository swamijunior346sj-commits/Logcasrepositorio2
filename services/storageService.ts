
import { LogEntry } from '../types';
import { STORAGE_KEY } from '../constants';

export const storageService = {
  getLogs: (): LogEntry[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveLog: (entry: LogEntry) => {
    const logs = storageService.getLogs();
    const updatedLogs = [entry, ...logs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
    return updatedLogs;
  },

  saveBulkLogs: (entries: LogEntry[]) => {
    const logs = storageService.getLogs();
    const updatedLogs = [...entries, ...logs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
    return updatedLogs;
  },

  clearLogs: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
