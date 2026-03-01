
import React, { useState, useEffect, useMemo } from 'react';
import { Truck, Zap, FileText, Download, LayoutDashboard, Send, Table as TableIcon, ListPlus, LogOut, Layers, Settings, Trash2, AlertCircle, User, Sliders, ChevronRight, X, CheckCircle2, Check, Wallet, AlertTriangle, ArrowDownLeft, ArrowUpRight, RotateCcw, Sparkles, Package, LogIn, Database, Map, MapPin } from 'lucide-react';
import DashboardCards from './components/DashboardCards';
import DailyStatsTable from './components/DailyStatsTable';
import DailyRouteHistory from './components/DailyRouteHistory';
import BulkActionModal from './components/BulkActionModal';
import WalletCard from './components/WalletCard';
import Login from './components/Login';
import DateRangeFilter from './components/DateRangeFilter';
import { LogCashLogo } from './components/Logo';
import { LogEntry, LogActionType, QuickEntryRow } from './types';
import { supabaseService } from './services/supabaseService';
import { generatePDF, generateQuickPDF } from './services/pdfService';
import { VALOR_POR_PACOTE } from './constants';
import QuickEntryModal from './components/QuickEntryModal';
import EliteDashboard from './components/EliteDashboard';
import RouteActivity from './components/RouteActivity';
import EliteReports from './components/EliteReports';
import LuxuryConfirmModal from './components/LuxuryConfirmModal';
import ElitePDFView from './components/ElitePDFView';
import EliteProfile from './components/EliteProfile';
import EliteTaxInvoice from './components/EliteTaxInvoice';
import EliteTaxData from './components/EliteTaxData';
import ElitePersonalData from './components/ElitePersonalData';
import EliteSettings from './components/EliteSettings';
import EliteInvoiceSuccess from './components/EliteInvoiceSuccess';
import EliteMap from './components/EliteMap';
import EliteExtrato from './components/EliteExtrato';
import EliteExpressReport from './components/EliteExpressReport';
import PremiumSuccessPopup from './components/PremiumSuccessPopup';




type SystemActionType = LogActionType | 'EXPORT_PDF' | 'LOGOUT' | 'RESET_SYSTEM' | 'SETTLE_WALLET' | 'QUICK_ENTRY' | 'SAVE_SUCCESS';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Date Filter State - Default to Current Month
  const [dateRange, setDateRange] = useState(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    return { start, end };
  });

  // Feedback Visual
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Estados de Pop-up de Sucesso
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isClosingSuccess, setIsClosingSuccess] = useState(false);
  const [bulkCount, setBulkCount] = useState(0);
  const [lastSettleValue, setLastSettleValue] = useState(0);
  const [successType, setSuccessType] = useState<SystemActionType>('ENTRADA');
  const [premiumSuccessMsg, setPremiumSuccessMsg] = useState('Operação realizada com sucesso');

  // Estado Unificado de Confirmação
  const [confirmingAction, setConfirmingAction] = useState<SystemActionType | null>(null);
  const [bulkActionPending, setBulkActionPending] = useState<{ type: 'ENTRADA' | 'SAIDA'; quantity: number } | null>(null);

  // Controle de Execução (Bloqueio de duplo clique)
  const [isExecuting, setIsExecuting] = useState(false);

  const [userName, setUserName] = useState(() => localStorage.getItem('logcash_user_name') || 'Alex Driver');
  const [vehicleName, setVehicleName] = useState(() => localStorage.getItem('logcash_vehicle_name') || 'Mercedes-Benz Sprinter');
  const [activeTab, setActiveTab] = useState<'dash' | 'stats' | 'route' | 'pdf-view' | 'profile' | 'tax-invoice' | 'invoice-success' | 'tax-data' | 'personal-data' | 'settings' | 'extrato' | 'express-report'>('dash');
  const [showSettings, setShowSettings] = useState(false);
  const [showQuickEntry, setShowQuickEntry] = useState(false);

  const [bulkModal, setBulkModal] = useState<{ isOpen: boolean; type: 'ENTRADA' | 'SAIDA' }>({
    isOpen: false,
    type: 'ENTRADA'
  });

  // 1. Verifica Sessão
  useEffect(() => {
    supabaseService.getSession()
      .then(session => {
        setSession(session);
        if (!session) setLoading(false);
      })
      .catch(err => {
        console.error("Falha ao verificar sessão:", err);
        setLoading(false); // Garante que o loading pare mesmo com erro
      });
  }, []);

  // 2. Sincronização & Persistência (Load on Startup & Save on Update)
  useEffect(() => {
    if (!session?.user) {
      setLogs([]);
      return;
    }

    const userId = session.user.id;
    const userCacheKey = `logcash_cache_${userId}`;

    // Cache Inicial (Load on Startup)
    try {
      const cached = localStorage.getItem(userCacheKey);
      if (cached) setLogs(JSON.parse(cached));
    } catch (e) { console.error(e); }

    setIsSyncing(true);

    const unsubscribe = supabaseService.subscribeToLogs((updatedLogs, supabaseError) => {
      // Se houver erro no supabase, apenas logamos e paramos o loading, mantendo o cache se existir
      if (supabaseError) {
        console.error("Erro de sincronização:", supabaseError);
      } else {
        setLogs(updatedLogs);
        // Save on Update (redundância)
        localStorage.setItem(userCacheKey, JSON.stringify(updatedLogs));
      }
      setLoading(false);
      setIsSyncing(false);
    });

    return () => unsubscribe();
  }, [session]);

  // 3. Persistência "Save on Exit" (Garantia Extra)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (session?.user?.id && logs.length > 0) {
        const userCacheKey = `logcash_cache_${session.user.id}`;
        localStorage.setItem(userCacheKey, JSON.stringify(logs));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [logs, session]);

  useEffect(() => {
    localStorage.setItem('logcash_user_name', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('logcash_vehicle_name', vehicleName);
  }, [vehicleName]);

  // Filtered Logs Calculation
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const logDate = log.timestamp.split('T')[0]; // ISO String YYYY-MM-DD
      return logDate >= dateRange.start && logDate <= dateRange.end;
    });
  }, [logs, dateRange]);

  const handleDateClear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    setDateRange({ start, end });
  };

  const handleQuickEntryExport = async (rows: QuickEntryRow[]) => {
    setIsExecuting(true);

    try {
      // Generate PDF directly from rows
      generateQuickPDF(rows, userName);
      triggerSuccess('EXPORT_PDF');

    } catch (err: any) {
      console.error("Erro Quick Export:", err);
      showError("Falha ao exportar PDF.");
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDeleteIds = async (ids: string[], dateLabel: string) => {
    if (isExecuting) return;
    setIsExecuting(true);

    try {
      await supabaseService.deleteLogsByIds(ids);

      // Update local state by filtering out deleted logs
      setLogs(prev => prev.filter(log => !ids.includes(log.id)));

      showError(`Registros de ${dateLabel} apagados.`);
    } catch (err: any) {
      console.error("Erro ao apagar registros:", err);
      showError("Falha ao apagar registros.");
    } finally {
      setIsExecuting(false);
    }
  };

  // Função auxiliar para mostrar Toast de Erro
  const showError = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const triggerSuccess = (type: SystemActionType, count: number = 1) => {
    setSuccessType(type);
    setBulkCount(count);
    setConfirmingAction(null);
    setBulkActionPending(null);
    setShowSettings(false);

    // Set contextual message
    const msg = type === 'EXPORT_PDF' ? 'Relatório gerado com sucesso' :
      type === 'SETTLE_WALLET' ? 'Saldo liquidado com sucesso' :
        type === 'SAVE_SUCCESS' ? 'Dados salvos com sucesso' :
          type === 'LOGOUT' ? 'Sessão encerrada' :
            type === 'RESET_SYSTEM' ? 'Sistema resetado com sucesso' :
              type === 'ENTRADA' ? `${count} pacote${count > 1 ? 's' : ''} carregado${count > 1 ? 's' : ''}` :
                type === 'SAIDA' ? `${count} entrega${count > 1 ? 's' : ''} confirmada${count > 1 ? 's' : ''}` :
                  'Operação realizada com sucesso';
    setPremiumSuccessMsg(msg);

    setTimeout(() => {
      setShowSuccessPopup(true);
    }, 100);
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleRouteActivitySave = async (data: { entrada: number, saida: number, devolucao: number }) => {
    setIsExecuting(true);
    try {
      const newLogs: Omit<LogEntry, 'id'>[] = [];
      const timestamp = new Date().toISOString();

      if (data.entrada > 0) {
        for (let i = 0; i < data.entrada; i++) {
          newLogs.push({ type: 'ENTRADA', value: 0, timestamp, user_id: session?.user?.id });
        }
      }
      if (data.saida > 0) {
        for (let i = 0; i < data.saida; i++) {
          newLogs.push({ type: 'SAIDA', value: VALOR_POR_PACOTE, timestamp, user_id: session?.user?.id });
        }
      }
      if (data.devolucao > 0) {
        for (let i = 0; i < data.devolucao; i++) {
          newLogs.push({ type: 'DEVOLUCAO', value: 0, timestamp, user_id: session?.user?.id });
        }
      }

      if (newLogs.length > 0) {
        await supabaseService.saveBulkLogs(newLogs);
      }
    } catch (error) {
      console.error('Erro ao salvar atividade da rota:', error);
      showError('Erro ao salvar dados');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleGlobalConfirm = async () => {
    if (isExecuting || !confirmingAction) return;

    if (confirmingAction === 'EXPORT_PDF') {
      setActiveTab('pdf-view');
      setConfirmingAction(null);
      return;
    }

    const actionToExecute = confirmingAction;
    setIsExecuting(true);

    // --- OPTIMISTIC UI: Preparação ---
    const previousLogs = [...logs]; // Backup para rollback
    const tempId = `temp-${Date.now()}`;
    const timestamp = new Date().toISOString();

    try {
      switch (actionToExecute) {
        case 'ENTRADA':
        case 'SAIDA':
        case 'DEVOLUCAO':
          // 1. Atualização Otimista
          const newLog: LogEntry = {
            id: tempId,
            type: actionToExecute as LogActionType,
            timestamp,
            value: actionToExecute === 'SAIDA' ? VALOR_POR_PACOTE : 0,
            isPaid: false,
            user_id: session?.user?.id
          };
          setLogs(prev => [newLog, ...prev]);
          triggerSuccess(actionToExecute); // Feedback visual instantâneo

          // 2. Envio Real
          await supabaseService.saveLog({
            type: actionToExecute as LogActionType,
            timestamp,
            value: actionToExecute === 'SAIDA' ? VALOR_POR_PACOTE : 0
          });
          break;

        case 'SETTLE_WALLET':
          const currentPending = counts.wallet.pending;
          setLastSettleValue(currentPending);

          // Otimista
          setLogs(prev => prev.map(l => (l.type === 'SAIDA' && !l.isPaid) ? { ...l, isPaid: true } : l));
          triggerSuccess('SETTLE_WALLET');

          // Real
          await supabaseService.markAllAsPaid();
          break;

        case 'EXPORT_PDF':
          generatePDF(filteredLogs.length > 0 ? filteredLogs : logs, userName);
          triggerSuccess('EXPORT_PDF');
          break;

        case 'LOGOUT':
          const userId = session?.user?.id;
          await supabaseService.signOut();
          if (userId) localStorage.removeItem(`logcash_cache_${userId}`);
          setSession(null);
          setLogs([]);
          setConfirmingAction(null);
          setShowSettings(false);
          break;

        case 'RESET_SYSTEM':
          setLogs([]); // Otimista: Limpa UI imediatamente
          triggerSuccess('RESET_SYSTEM');

          // 1. Limpa Banco de Dados (enquanto ainda autenticado)
          await supabaseService.deleteAllLogs();

          // 2. Limpa Cache Local e Preferências
          if (session?.user?.id) localStorage.removeItem(`logcash_cache_${session.user.id}`);
          localStorage.removeItem('logcash_user_name');
          localStorage.removeItem('logcash_saved_email');

          // 3. Logout no Backend (Encerra a sessão no servidor)
          await supabaseService.signOut();

          // OBS: Não chamamos setSession(null) aqui.
          // Isso mantém o App renderizado (com o popup de sucesso) até o reload.
          // O reload força a reinicialização e, sem sessão válida, o usuário cairá no Login.

          setUserName('Operador Logístico');

          // 4. Reload para estado limpo (garante tela de login)
          setTimeout(() => {
            window.location.reload();
          }, 2500);
          break;
      }
    } catch (err: any) {
      console.error("Erro na ação:", err);
      // ROLLBACK em caso de erro
      if (['ENTRADA', 'SAIDA', 'DEVOLUCAO', 'SETTLE_WALLET', 'RESET_SYSTEM'].includes(actionToExecute)) {
        setLogs(previousLogs);
        showError(err.message || "Erro de sincronização. Ação revertida.");
      } else {
        showError(err.message || 'Erro na operação.');
      }
    } finally {
      setIsExecuting(false);
    }
  };

  const executeBulkAction = async () => {
    if (!bulkActionPending || isExecuting) return;

    const pending = bulkActionPending;
    setIsExecuting(true);

    const { type, quantity } = pending;
    const previousLogs = [...logs];
    const timestamp = new Date().toISOString();

    try {
      // 1. Otimista
      const newEntriesOptimistic: LogEntry[] = Array.from({ length: quantity }).map((_, i) => ({
        id: `temp-bulk-${Date.now()}-${i}`,
        type: type as LogActionType,
        timestamp,
        value: type === 'SAIDA' ? VALOR_POR_PACOTE : 0,
        isPaid: false,
        user_id: session?.user?.id
      }));

      setLogs(prev => [...newEntriesOptimistic, ...prev]);
      triggerSuccess(type, quantity);

      // 2. Real
      const payload = newEntriesOptimistic.map(e => ({
        type: e.type,
        timestamp: e.timestamp,
        value: e.value
      }));

      await supabaseService.saveBulkLogs(payload);

    } catch (err: any) {
      console.error("Erro no lote:", err);
      setLogs(previousLogs); // Rollback
      showError(err.message || "Falha ao salvar lote. Tente novamente.");
    } finally {
      setIsExecuting(false);
    }
  };

  const counts = useMemo(() => {
    const todayStr = new Date().toDateString();
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const deliveredLogs = logs.filter(l => l.type === 'SAIDA');
    const todayLogs = logs.filter(l => new Date(l.timestamp).toDateString() === todayStr);

    const pending = deliveredLogs.filter(l => !l.isPaid).length * VALOR_POR_PACOTE;
    const paidCurrentCycle = deliveredLogs.filter(l => l.isPaid && new Date(l.timestamp) >= startOfMonth).length * VALOR_POR_PACOTE;
    const totalCumulativePaid = deliveredLogs.filter(l => l.isPaid).length * VALOR_POR_PACOTE;

    return {
      today: todayLogs.filter(l => l.type === 'SAIDA').length,
      todayEntrada: todayLogs.filter(l => l.type === 'ENTRADA').length,
      todaySaida: todayLogs.filter(l => l.type === 'SAIDA').length,
      todayDevolucao: todayLogs.filter(l => l.type === 'DEVOLUCAO').length,
      week: logs.filter(l => l.type === 'SAIDA' && new Date(l.timestamp) >= startOfWeek).length,
      year: logs.filter(l => l.type === 'SAIDA' && new Date(l.timestamp) >= startOfYear).length,
      wallet: {
        pending,
        paid: paidCurrentCycle,
        cumulative: totalCumulativePaid
      }
    };
  }, [logs]);

  if (!session && !loading) return <Login onLoginSuccess={() => supabaseService.getSession().then(setSession)} />;

  if (loading && logs.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <LogCashLogo size={60} />
        <p className="text-slate-500 font-game font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse mt-4">Conectando Terminal...</p>
      </div>
    );
  }

  const formatBRL = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const getPopupStyles = (type: SystemActionType) => {
    switch (type) {
      case 'ENTRADA': return { bg: 'from-emerald-600 to-emerald-950', border: 'border-emerald-400/40', text: 'text-emerald-400', label: 'Carregamento ok' };
      case 'SAIDA': return { bg: 'from-blue-600 to-blue-950', border: 'border-blue-400/40', text: 'text-blue-400', label: 'Entrega Realizada' };
      case 'DEVOLUCAO': return { bg: 'from-orange-600 to-orange-950', border: 'border-orange-400/40', text: 'text-orange-400', label: 'Insucesso Registrado' };
      case 'SETTLE_WALLET': return { bg: 'from-indigo-600 to-indigo-950', border: 'border-indigo-400/40', text: 'text-indigo-400', label: 'Pagamento Liquidado' };
      case 'EXPORT_PDF': return { bg: 'from-slate-700 to-slate-900', border: 'border-white/20', text: 'text-white', label: 'Extrato Gerado' };
      case 'RESET_SYSTEM': return { bg: 'from-red-600 to-red-950', border: 'border-red-400/40', text: 'text-red-400', label: 'Sistema Resetado' };
      default: return { bg: 'from-slate-700 to-slate-900', border: 'border-white/20', text: 'text-white', label: 'Sucesso' };
    }
  };

  const currentTheme = getPopupStyles(successType);

  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-emerald-500/30 flex flex-col overflow-x-hidden relative">
      <header className="bg-black/50 backdrop-blur-3xl border-b border-[#D4AF37]/10 px-4 sticky top-0 z-[100] pt-6 pb-2 transition-all">
        <div className="max-w-lg mx-auto flex flex-col gap-6">
          {/* Main Info Row / Sub-screen Header */}
          {['dash', 'route', 'map', 'stats', 'profile'].includes(activeTab) ? (
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="size-12 rounded-full border border-[#D4AF37]/30 p-0.5 bg-gradient-to-tr from-[#AA771C] to-[#F9E29C] shadow-lg">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-full filter contrast-125 grayscale brightness-90 border border-black/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlP_6m46cIx9G_FjX3ku2YaZwMvrfuyj4hQcf8xv7fAjTuzgSadvH49RYNSfu0UCU-L5UZp5I2y0Sn4kft4mYucmwGhEPsIi0hGtD62kD_ZLmldrXSqt9j8I8DaHcJFN81eauwKQcGbwshg1YO9KUWsElYrK-IHKuGVFVOVxDYaSI7_83oI1N7UfOVpnysry8y5V0QFDicN1tywt_1WP2IxuPM0ev4dx7JYogKpeaAYsLMSJjGbrfGwMfv_r50U4uzFZ7Zxe3KjKLJ")' }}></div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-b from-[#F9E29C] to-[#AA771C] text-black text-[7px] font-black px-1.5 py-0.5 rounded-full border border-black shadow-md">LV15</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="text-md font-extrabold text-white leading-tight">{userName.split(' ')[0]}</h2>
                    <div className="size-1.5 rounded-full bg-[#D4AF37] animate-pulse"></div>
                  </div>
                  <p className="text-[7px] tracking-[0.25em] text-[#D4AF37] font-black uppercase opacity-70">SINAL ELITE ESTÁVEL</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <div className="size-7 rounded-lg bg-[#D4AF37] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                    <span className="material-symbols-outlined text-black text-lg font-black">box</span>
                  </div>
                  <div className="hidden xs:block">
                    <h1 className="text-[10px] font-black tracking-widest text-white leading-tight">LOG<span className="text-[#D4AF37]">CASH</span></h1>
                    <p className="text-[6px] text-white/30 font-black tracking-[0.2em]">VER 1.0</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between px-2">
              <button
                onClick={() => {
                  if (activeTab === 'personal-data' || activeTab === 'tax-data' || activeTab === 'settings') {
                    setActiveTab('profile');
                  } else if (activeTab === 'tax-invoice' || activeTab === 'pdf-view' || activeTab === 'extrato' || activeTab === 'express-report') {
                    setActiveTab('stats');
                  } else if (activeTab === 'invoice-success') {
                    setActiveTab('dash');
                  } else {
                    setActiveTab('dash');
                  }
                }}
                className="flex size-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
              </button>
              <span className={`text-[11px] font-black tracking-[0.4em] text-[#D4AF37] uppercase`}>
                {activeTab === 'personal-data' ? 'DADOS PESSOAIS' :
                  activeTab === 'settings' ? 'CONFIGURAÇÕES' :
                    activeTab === 'tax-data' ? 'DADOS FISCAIS' :
                      activeTab === 'tax-invoice' ? 'EMITIR NOTA' :
                        activeTab === 'invoice-success' ? 'SUCESSO' :
                          activeTab === 'pdf-view' ? 'VISUALIZAÇÃO PDF' :
                            activeTab === 'extrato' ? 'EXTRATO' :
                              activeTab === 'express-report' ? 'RELATÓRIO EXPRESSO' :
                                'SISTEMA ELITE'}
              </span>
              <div className="size-11"></div> {/* Spacer to center title */}
            </div>
          )}

          {/* Luxury Tab Navigation (Only on main tabs) */}
          {(['dash', 'stats', 'route', 'profile', 'tax-invoice', 'personal-data', 'tax-data', 'settings', 'extrato', 'express-report'].includes(activeTab)) && (
            <nav className="flex items-center justify-between bg-white/[0.03] p-1.5 rounded-2xl border border-white/5 mx-2 mb-2 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>

              <button
                onClick={() => setActiveTab('dash')}
                className={`relative z-10 flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'dash'
                  ? 'bg-gradient-to-b from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 shadow-[0_10px_20px_rgba(212,175,55,0.15)] scale-[1.02]'
                  : 'opacity-30 hover:opacity-100 grayscale-[50%]'
                  }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${activeTab === 'dash' ? 'text-[#D4AF37]' : 'text-white'}`} style={activeTab === 'dash' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
                <span className={`text-[8px] font-black uppercase tracking-[0.25em] ${activeTab === 'dash' ? 'text-[#D4AF37]' : 'text-white'}`}>INÍCIO</span>
              </button>

              <button
                onClick={() => setActiveTab('route')}
                className={`relative z-10 flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'route'
                  ? 'bg-gradient-to-b from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 shadow-[0_10px_20px_rgba(212,175,55,0.15)] scale-[1.02]'
                  : 'opacity-30 hover:opacity-100 grayscale-[50%]'
                  }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${activeTab === 'route' ? 'text-[#D4AF37]' : 'text-white'}`} style={activeTab === 'route' ? { fontVariationSettings: "'FILL' 1" } : {}}>explore</span>
                <span className={`text-[8px] font-black uppercase tracking-[0.25em] ${activeTab === 'route' ? 'text-[#D4AF37]' : 'text-white'}`}>ATIVIDADE DA ROTA</span>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`relative z-10 flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'stats'
                  ? 'bg-gradient-to-b from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 shadow-[0_10px_20px_rgba(212,175,55,0.15)] scale-[1.02]'
                  : 'opacity-30 hover:opacity-100 grayscale-[50%]'
                  }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${activeTab === 'stats' ? 'text-[#D4AF37]' : 'text-white'}`} style={activeTab === 'stats' ? { fontVariationSettings: "'FILL' 1" } : {}}>analytics</span>
                <span className={`text-[8px] font-black uppercase tracking-[0.25em] ${activeTab === 'stats' ? 'text-[#D4AF37]' : 'text-white'}`}>RELATÓRIOS</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`relative z-10 flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'profile'
                  ? 'bg-gradient-to-b from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 shadow-[0_10px_20px_rgba(212,175,55,0.15)] scale-[1.02]'
                  : 'opacity-30 hover:opacity-100 grayscale-[50%]'
                  }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${activeTab === 'profile' ? 'text-[#D4AF37]' : 'text-white'}`} style={activeTab === 'profile' ? { fontVariationSettings: "'FILL' 1" } : {}}>shield_person</span>
                <span className={`text-[8px] font-black uppercase tracking-[0.25em] ${activeTab === 'profile' ? 'text-[#D4AF37]' : 'text-white'}`}>PERFIL</span>
              </button>

              {/* ABA MAPA */}
              <button
                onClick={() => setActiveTab('map')}
                className={`relative z-10 flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'map'
                  ? 'bg-gradient-to-b from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 shadow-[0_10px_20px_rgba(212,175,55,0.15)] scale-[1.02]'
                  : 'opacity-30 hover:opacity-100 grayscale-[50%]'
                  }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${activeTab === 'map' ? 'text-[#D4AF37]' : 'text-white'}`} style={activeTab === 'map' ? { fontVariationSettings: "'FILL' 1" } : {}}>near_me</span>
                <span className={`text-[8px] font-black uppercase tracking-[0.25em] ${activeTab === 'map' ? 'text-[#D4AF37]' : 'text-white'}`}>MAPA</span>
              </button>
            </nav>
          )}
        </div>
      </header>

      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[1000] animate-in slide-in-from-top-4 duration-300">
          <div className="bg-red-600 text-white px-6 py-3 rounded-full font-game font-black text-[10px] uppercase tracking-widest shadow-2xl border border-red-400/30 whitespace-nowrap">
            {toastMsg}
          </div>
        </div>
      )}

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8 space-y-8 pb-12 transition-all">
        {activeTab === 'dash' ? (
          <div className="animate-in fade-in duration-500">
            <div className="mb-2">
              <EliteDashboard
                userName={userName}
                counts={counts}
                valorPorPacote={VALOR_POR_PACOTE}
                onNavigate={setActiveTab}
              />
            </div>

          </div>
        ) : activeTab === 'map' ? (
          <div className="animate-in fade-in duration-500">
            <EliteMap onBack={() => setActiveTab('dash')} />
          </div>
        ) : activeTab === 'stats' ? (
          <div className="animate-in fade-in duration-500">
            <EliteReports
              logs={logs}
              userName={userName}
              wallet={counts.wallet}
              onSettle={() => setConfirmingAction('SETTLE_WALLET')}
              onExportPDF={() => setActiveTab('express-report')}
              onEmitInvoice={() => setActiveTab('tax-invoice')}
              onExtrato={() => setActiveTab('extrato')}
              onExpressReport={() => setActiveTab('express-report')}
              onBack={() => setActiveTab('dash')}
            />
          </div>
        ) : activeTab === 'pdf-view' ? (
          <div className="animate-in fade-in duration-500">
            <ElitePDFView
              logs={logs}
              userName={userName}
              onBack={() => setActiveTab('stats')}
            />
          </div>
        ) : activeTab === 'profile' ? (
          <div className="animate-in fade-in duration-500">
            <EliteProfile
              userName={userName}
              onBack={() => setActiveTab('dash')}
              onLogout={() => setConfirmingAction('LOGOUT')}
              onTaxData={() => setActiveTab('tax-data')}
              onPersonalData={() => setActiveTab('personal-data')}
              onSettings={() => setActiveTab('settings')}
            />
          </div>
        ) : activeTab === 'tax-invoice' ? (
          <div className="animate-in fade-in duration-500">
            <EliteTaxInvoice
              pendingBalance={counts.wallet.pending}
              onBack={() => setActiveTab('stats')}
              onEmit={(data) => {
                console.log("Nota Fiscal Emitida:", data);
                setActiveTab('invoice-success');
              }}
            />
          </div>
        ) : activeTab === 'invoice-success' ? (
          <div className="animate-in fade-in duration-500">
            <EliteInvoiceSuccess
              valuePaid={counts.wallet.pending}
              protocol="982734"
              onBackToHome={() => setActiveTab('dash')}
              onViewInvoice={() => console.log("Visualizar NF-e")}
              onClose={() => setActiveTab('dash')}
            />
          </div>
        ) : activeTab === 'tax-data' ? (
          <div className="animate-in fade-in duration-500">
            <EliteTaxData
              onBack={() => setActiveTab('profile')}
              onSave={(data) => {
                console.log("Dados Fiscais Salvos:", data);
                triggerSuccess('SAVE_SUCCESS');
                setActiveTab('profile');
              }}
            />
          </div>
        ) : activeTab === 'personal-data' ? (
          <div className="animate-in fade-in duration-500">
            <ElitePersonalData
              userName={userName}
              vehicleName={vehicleName}
              onBack={() => setActiveTab('profile')}
              onSave={(data) => {
                setUserName(data.userName);
                setVehicleName(data.vehicleName);
                triggerSuccess('SAVE_SUCCESS');
                setActiveTab('profile');
              }}
            />
          </div>
        ) : activeTab === 'settings' ? (
          <div className="animate-in fade-in duration-500">
            <EliteSettings
              onBack={() => setActiveTab('profile')}
              onLogout={() => setConfirmingAction('LOGOUT')}
            />
          </div>
        ) : activeTab === 'extrato' ? (
          <div className="animate-in fade-in duration-500">
            <EliteExtrato
              logs={logs}
              userName={userName}
              vehicleName={vehicleName}
              valorPorPacote={VALOR_POR_PACOTE}
              onBack={() => setActiveTab('stats')}
              onExport={() => {
                generatePDF(logs, userName);
              }}
            />
          </div>
        ) : activeTab === 'express-report' ? (
          <div className="animate-in fade-in duration-500">
            <EliteExpressReport
              logs={logs}
              userName={userName}
              vehicleName={vehicleName}
              onBack={() => setActiveTab('stats')}
              onExportPDF={() => {
                generatePDF(logs, userName);
                triggerSuccess('EXPORT_PDF');
              }}
            />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <RouteActivity
              onBack={() => setActiveTab('dash')}
              counts={counts}
              onSave={handleRouteActivitySave}
            />
          </div>
        )}
      </main>



      {/* MODAL DE CONFIRMAÇÃO UNIFICADO (Single Action) */}
      <LuxuryConfirmModal
        isOpen={!!confirmingAction}
        onClose={() => setConfirmingAction(null)}
        onConfirm={handleGlobalConfirm}
        type={confirmingAction || ''}
        title={
          confirmingAction === 'ENTRADA' ? 'Confirmar Carregamento?' :
            confirmingAction === 'SAIDA' ? 'Confirmar Entrega?' :
              confirmingAction === 'DEVOLUCAO' ? 'Confirmar Insucesso?' :
                confirmingAction === 'EXPORT_PDF' ? 'Gerar Extrato PDF' :
                  confirmingAction === 'LOGOUT' ? 'Encerrar Sessão?' :
                    confirmingAction === 'SETTLE_WALLET' ? 'Receber Saldo?' :
                      confirmingAction === 'RESET_SYSTEM' ? 'Apagar Tudo?' :
                        'Confirmar Ação'
        }
        description={
          confirmingAction === 'SETTLE_WALLET' ? `Você liquidará ${formatBRL(counts.wallet.pending)} e enviará para o cofre.` :
            confirmingAction === 'RESET_SYSTEM' ? 'Irreversível: Esta ação apagará permanentemente todos os seus dados locais e na nuvem.' :
              confirmingAction === 'EXPORT_PDF' ? 'Deseja exportar o relatório detalhado do período selecionado em formato PDF?' :
                confirmingAction === 'ENTRADA' ? 'Deseja registrar o carregamento de novas unidades no sistema?' :
                  confirmingAction === 'SAIDA' ? 'Deseja confirmar a entrega realizada e atualizar seu saldo?' :
                    confirmingAction === 'LOGOUT' ? 'Deseja realmente encerrar sua sessão atual?' :
                      'Validação de Segurança Necessária: Deseja prosseguir com esta operação?'
        }
      />

      {/* MODAL LOTE (Bulk Confirmation) */}
      {bulkActionPending && (
        <div className="fixed inset-0 z-[650] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
          <div className="w-full max-w-md glass-deep rounded-[3.5rem] p-10 border border-white/20 animate-pop-burst text-center relative overflow-hidden">
            <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${bulkActionPending.type === 'SAIDA' ? 'from-blue-600 via-white/40 to-blue-600' : 'from-emerald-600 via-white/40 to-emerald-600'}`}></div>
            <div className={`w-28 h-28 mx-auto bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-8 border border-white/10 animate-float-bounce ${bulkActionPending.type === 'ENTRADA' ? 'text-emerald-400 shadow-[0_0_50px_rgba(52,211,153,0.2)]' : 'text-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.2)]'}`}>
              <Package size={54} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-game font-black text-white uppercase tracking-tighter mb-2 leading-none">Confirmar Lote?</h3>
            <div className="flex flex-col items-center gap-2 mb-10">
              <div className={`px-6 py-2 rounded-2xl border text-2xl font-game font-black tracking-widest ${bulkActionPending.type === 'ENTRADA' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>{bulkActionPending.quantity} UNIDADES</div>
              {bulkActionPending.type === 'SAIDA' && <div className="text-emerald-400 font-game font-black text-xl tracking-widest mt-2">+ {formatBRL(bulkActionPending.quantity * VALOR_POR_PACOTE)}</div>}
            </div>
            <div className="space-y-4">
              <button
                disabled={isExecuting}
                onClick={executeBulkAction}
                className={`w-full py-5 rounded-2xl font-game font-black text-sm uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 text-white flex items-center justify-center gap-3 shine-container overflow-hidden ${bulkActionPending.type === 'ENTRADA' ? 'bg-emerald-600 shadow-emerald-900/40' : 'bg-blue-600 shadow-blue-900/40'}`}
              >
                <div className="shine-overlay"></div>
                {isExecuting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Confirmar Lote'}
              </button>
              <button
                disabled={isExecuting}
                onClick={() => setBulkActionPending(null)}
                className="w-full py-4 bg-white/5 text-slate-500 font-bold uppercase text-[10px] tracking-widest rounded-xl transition-all"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAINEL DE AJUSTES */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/90 backdrop-blur-md p-0 md:p-4">
          <div className="bg-black w-full max-w-lg rounded-t-[3rem] md:rounded-[3rem] border-t md:border border-white/10 overflow-hidden animate-in slide-in-from-bottom-full duration-500">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center"><h3 className="font-game font-black text-white uppercase tracking-[0.2em] text-sm">Configurações</h3><button onClick={() => setShowSettings(false)} className="p-3 bg-white/5 rounded-full text-slate-500 active:scale-90 transition-all"><X size={20} /></button></div>
            <div className="p-8 md:p-12 space-y-8">
              <div className="space-y-4"><label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1">Assinatura Logística</label><div className="relative group"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} /><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500/50 transition-all" /></div></div>
              <div className="pt-4 flex flex-col gap-3">
                <button onClick={() => setConfirmingAction('LOGOUT')} className="w-full p-6 bg-white/5 border border-white/5 text-slate-400 rounded-3xl flex items-center justify-between font-game font-black uppercase tracking-widest text-xs active:scale-95 transition-all hover:text-red-500 hover:bg-red-500/5">Encerrar Sessão <LogOut size={20} /></button>
                <button onClick={() => setConfirmingAction('RESET_SYSTEM')} className="w-full p-6 bg-red-500/5 border border-red-500/10 text-red-500 rounded-3xl flex items-center justify-between font-game font-black uppercase tracking-widest text-xs active:scale-95 transition-all">Limpar todos os dados <Trash2 size={20} /></button>
              </div>
            </div>
            <div className="h-safe bg-black pb-safe"></div>
          </div>
        </div>
      )}

      <BulkActionModal
        isOpen={bulkModal.isOpen}
        type={bulkModal.type}
        title={bulkModal.type === 'SAIDA' ? 'Lote Entregas' : 'Lote Carregamento'}
        onClose={() => setBulkModal({ ...bulkModal, isOpen: false })}
        onConfirm={(q) => {
          setBulkModal({ ...bulkModal, isOpen: false });
          setBulkActionPending({ type: bulkModal.type, quantity: q });
        }}
      />

      <QuickEntryModal
        isOpen={showQuickEntry}
        onClose={() => setShowQuickEntry(false)}
        onExport={handleQuickEntryExport}
      />

      {/* Premium Success Popup */}
      <PremiumSuccessPopup
        isOpen={showSuccessPopup}
        onClose={closeSuccessPopup}
        message={premiumSuccessMsg}
      />
    </div>
  );
};

export default App;
