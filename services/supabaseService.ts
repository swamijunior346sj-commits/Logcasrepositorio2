
import { supabase } from "../supabaseConfig";
import { LogEntry } from "../types";

const TABLE_NAME = "logs";

// Utilitário para limpar campos undefined antes de enviar ao Supabase
const cleanPayload = (payload: any) => {
  return JSON.parse(JSON.stringify(payload));
};

// Utilitário para tratar erros de rede
const handleSupabaseError = (error: any) => {
  if (error?.message?.includes('Failed to fetch') || error?.message?.includes('NetworkError')) {
    throw new Error('Sem conexão com a internet. Verifique sua rede.');
  }
  throw error;
};

export const supabaseService = {
  // --- AUTH METHODS ---
  signUp: async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password: pass });
    if (error) handleSupabaseError(error);
    return data;
  },

  signIn: async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) handleSupabaseError(error);
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) handleSupabaseError(error);
  },

  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (err) {
      console.error("Erro ao obter sessão:", err);
      return null;
    }
  },

  // --- LOG METHODS (COM ISOLAMENTO HÍBRIDO) ---
  subscribeToLogs: (callback: (logs: LogEntry[], error?: any) => void) => {
    let channel: any = null;

    const fetchAndSubscribe = async () => {
      try {
        // Tenta pegar o usuário do cache local (getSession) em vez de validar na rede (getUser)
        const { data: { session }, error: authError } = await supabase.auth.getSession();

        if (authError) {
          console.warn("Erro de sessão ao subscrever:", authError.message);
          callback([], authError);
          return;
        }

        const user = session?.user;

        // Se não houver usuário, retorna vazio imediatamente
        if (!user) {
          callback([], null);
          return;
        }

        // Função interna para buscar dados
        const fetchData = async () => {
          try {
            const { data, error } = await supabase
              .from(TABLE_NAME)
              .select("*")
              .order("timestamp", { ascending: false });

            if (error) {
              console.error("Erro ao buscar logs:", error.message);
              // Se for erro de fetch na busca, passamos o erro mas não quebramos a app
              callback([], error);
            } else {
              // FILTRO RESTRITO: Aceita apenas dados do usuário logado
              const isolatedData = (data as LogEntry[]).filter(log =>
                log.user_id === user.id
              );
              callback(isolatedData);
            }
          } catch (err: any) {
            console.error("Erro crítico no fetch:", err);
            // Se for erro de rede, apenas avisa, não limpa os logs se não quiser
            callback([], err);
          }
        };

        // 1. Busca inicial
        await fetchData();

        // 2. Configura Realtime
        channel = supabase
          .channel(`public_logs_feed`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: TABLE_NAME
            },
            () => {
              fetchData();
            }
          )
          .subscribe((status) => {
            if (status === 'CHANNEL_ERROR') {
              console.warn("Erro no canal Realtime (provável desconexão).");
            }
          });
      } catch (err) {
        console.error("Erro fatal no subscribeToLogs:", err);
        callback([], err);
      }
    };

    fetchAndSubscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  },

  // Inserção com FALLBACK (Tenta Seguro -> Tenta Legado)
  saveLog: async (entry: Omit<LogEntry, 'id'>) => {
    // Usa getSession para evitar falha de rede na verificação de auth
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) throw new Error("Usuário desconectado.");

    const payload = {
      type: entry.type,
      timestamp: entry.timestamp,
      value: entry.value,
      user_id: user.id, // Tentativa 1: Com ID
      isPaid: entry.type === 'SAIDA' ? false : undefined
    };

    // 1. Tenta salvar com user_id
    const { error } = await supabase.from(TABLE_NAME).insert([cleanPayload(payload)]);

    if (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Sem conexão com a internet.');
      }
      handleSupabaseError(error);
    }
  },

  saveBulkLogs: async (entries: Omit<LogEntry, 'id'>[]) => {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) throw new Error("Usuário desconectado.");

    const payloads = entries.map(e => ({
      type: e.type,
      timestamp: e.timestamp,
      value: e.value,
      user_id: user.id,
      isPaid: e.type === 'SAIDA' ? false : undefined
    }));

    // 1. Tenta salvar com user_id
    const { error } = await supabase.from(TABLE_NAME).insert(cleanPayload(payloads));

    if (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Sem conexão com a internet.');
      }
      handleSupabaseError(error);
    }
  },

  markAllAsPaid: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) return;

    // Tenta marcar apenas os do usuário
    const { error } = await supabase
      .from(TABLE_NAME)
      .update({ isPaid: true })
      .eq('user_id', user.id)
      .eq('isPaid', false)
      .eq('type', 'SAIDA');

    if (error && !error.message.includes("column")) handleSupabaseError(error);
  },

  deleteAllLogs: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) return;

    // Tenta deletar pelo ID
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('user_id', user.id);

    if (error) handleSupabaseError(error);
  },

  deleteLogsByIds: async (ids: string[]) => {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) return;

    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .in('id', ids);

    if (error) handleSupabaseError(error);
  }
};
