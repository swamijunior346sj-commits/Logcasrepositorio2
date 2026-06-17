
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  writeBatch, 
  doc, 
  getDocs,
  Timestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from "../firebaseConfig";
import { LogEntry } from "../types";

const COLLECTION_NAME = "logs";

export const firebaseService = {
  // Escuta alterações em tempo real
  subscribeToLogs: (callback: (logs: LogEntry[]) => void) => {
    const q = query(collection(db, COLLECTION_NAME), orderBy("timestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LogEntry[];
      callback(logs);
    });
  },

  // Salva um único log
  saveLog: async (entry: Omit<LogEntry, 'id'>) => {
    try {
      await addDoc(collection(db, COLLECTION_NAME), {
        ...entry,
        timestamp: entry.timestamp // ISO String
      });
    } catch (e) {
      console.error("Erro ao salvar log: ", e);
      throw e;
    }
  },

  // Salva múltiplos logs usando Batch (Otimizado)
  saveBulkLogs: async (entries: Omit<LogEntry, 'id'>[]) => {
    const batch = writeBatch(db);
    entries.forEach(entry => {
      const docRef = doc(collection(db, COLLECTION_NAME));
      batch.set(docRef, entry);
    });
    try {
      await batch.commit();
    } catch (e) {
      console.error("Erro ao salvar lote: ", e);
      throw e;
    }
  }
};
