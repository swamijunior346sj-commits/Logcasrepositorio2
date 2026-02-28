
import React, { useState } from 'react';
import { Wallet, CheckCircle, Clock, X, Package, Calendar, History, ArrowUpRight, ChevronRight, TrendingUp } from 'lucide-react';
import { VALOR_POR_PACOTE } from '../constants';
import { LogEntry } from '../types';

interface WalletCardProps {
  pendingAmount: number;
  paidAmount: number;
  totalCumulativePaid: number;
  onSettle: () => void;
  logs: LogEntry[];
}

const WalletCard: React.FC<WalletCardProps> = ({ pendingAmount, paidAmount, totalCumulativePaid, onSettle, logs }) => {
  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    count: number;
    icon: React.ReactNode;
    color: string;
    logs: LogEntry[];
    type: 'pending' | 'paid' | 'total';
  } | null>(null);

  const format = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const openDetail = (type: 'pending' | 'paid' | 'total') => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let filteredLogs: LogEntry[] = [];
    let title = '';
    let description = '';
    let icon = null;
    let color = '';

    switch (type) {
      case 'pending':
        filteredLogs = logs.filter(l => l.type === 'SAIDA' && !l.isPaid).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        title = 'Saldo Pendente';
        description = 'Valores de entregas realizadas que ainda não foram liquidados para sua conta.';
        icon = <Clock size={32} />;
        color = 'text-orange-400';
        break;
      case 'paid':
        filteredLogs = logs.filter(l => l.type === 'SAIDA' && l.isPaid && new Date(l.timestamp) >= startOfMonth).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        title = 'Pagos no Ciclo';
        description = 'Lista de entregas já confirmadas e pagas durante o mês atual.';
        icon = <CheckCircle size={32} />;
        color = 'text-emerald-400';
        break;
      case 'total':
        filteredLogs = logs.filter(l => l.type === 'SAIDA' && l.isPaid).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        title = 'Histórico Total';
        description = 'Toda a sua produtividade acumulada desde o primeiro registro no sistema.';
        icon = <History size={32} />;
        color = 'text-blue-400';
        break;
    }

    setDetailModal({
      isOpen: true,
      title,
      description,
      count: filteredLogs.length,
      icon,
      color,
      logs: filteredLogs,
      type
    });
  };

  const getReferenceWeek = (logs: LogEntry[]) => {
    if (logs.length === 0) return "Nenhum período";
    const dates = logs.map(l => new Date(l.timestamp));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    return `${minDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} até ${maxDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}`;
  };

  return (
    <>
      <div className="glass-panel rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden group h-full flex flex-col neon-border transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 animate-pulse-glow">
              <Wallet className="text-emerald-400" size={20} />
            </div>
            <div>
              <h3 className="text-white font-game font-black uppercase text-sm tracking-widest leading-none">Carteira</h3>
              <p className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Gestão Financeira</p>
            </div>
          </div>
          
          {pendingAmount > 0 && (
            <button 
              onClick={onSettle}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 border border-emerald-500/20 group/btn hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <span className="hidden sm:inline">Liberar</span> Recebimento <CheckCircle size={12} className="group-hover/btn:scale-110 transition-transform"/>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 relative z-10 flex-1">
          {/* HERO CARD: PENDENTE */}
          <button 
            onClick={() => openDetail('pending')}
            className="w-full text-left bg-white/[0.02] border border-white/5 rounded-3xl p-5 relative overflow-hidden group/card hover:border-orange-500/30 transition-all active:scale-[0.98] hover:bg-white/[0.04]"
          >
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2 text-orange-400">
                <Clock size={14} strokeWidth={2.5} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Saldo Pendente</span>
              </div>
              <ChevronRight size={16} className="text-slate-600 group-hover/card:text-orange-400 group-hover/card:translate-x-1 transition-all" />
            </div>
            
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl md:text-4xl font-game font-black text-white tracking-tight drop-shadow-lg">{format(pendingAmount)}</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
               <div className="h-full bg-orange-500/50 w-2/3 animate-pulse"></div>
            </div>
          </button>

          {/* GRID: PAGOS & HISTÓRICO */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            {/* Card Pagos */}
            <button 
              onClick={() => openDetail('paid')}
              className="w-full text-left bg-white/[0.02] border border-white/5 rounded-3xl p-4 hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all active:scale-[0.98] group/sub flex flex-col justify-between"
            >
               <div className="flex justify-between items-start w-full mb-2">
                 <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/10 group-hover/sub:scale-110 transition-transform">
                   <TrendingUp size={14} />
                 </div>
                 <ChevronRight size={14} className="text-slate-700 group-hover/sub:text-emerald-400 transition-colors" />
               </div>
               <div>
                 <p className="text-xl font-game font-black text-white tracking-tight">{format(paidAmount)}</p>
                 <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Pagos (Mês)</p>
               </div>
            </button>

            {/* Card Histórico */}
            <button 
              onClick={() => openDetail('total')}
              className="w-full text-left bg-white/[0.02] border border-white/5 rounded-3xl p-4 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all active:scale-[0.98] group/sub flex flex-col justify-between"
            >
               <div className="flex justify-between items-start w-full mb-2">
                 <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/10 group-hover/sub:scale-110 transition-transform">
                   <History size={14} />
                 </div>
                 <ChevronRight size={14} className="text-slate-700 group-hover/sub:text-blue-400 transition-colors" />
               </div>
               <div>
                 <p className="text-xl font-game font-black text-white tracking-tight">{format(totalCumulativePaid)}</p>
                 <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Total Geral</p>
               </div>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes Adicionais */}
      {detailModal && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-sm glass-deep rounded-[3rem] p-8 md:p-10 border border-white/10 animate-pop-burst relative overflow-hidden flex flex-col max-h-[85vh]">
            <button 
              onClick={() => setDetailModal(null)}
              className="absolute top-6 right-6 p-2 bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors z-20"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-6 flex-shrink-0">
              <div className={`w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 ${detailModal.color} animate-float-bounce shadow-2xl`}>
                {detailModal.icon}
              </div>

              <div>
                <h4 className="text-2xl font-game font-black text-white uppercase tracking-tight">{detailModal.title}</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2 leading-relaxed px-4">
                  {detailModal.description}
                </p>
              </div>

              {detailModal.type === 'pending' && detailModal.logs.length > 0 && (
                 <div className="w-full bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 mb-2">
                    <p className="text-[8px] font-black text-orange-400 uppercase tracking-widest mb-1">Período de Referência</p>
                    <p className="text-xs font-bold text-white tracking-wide">{getReferenceWeek(detailModal.logs)}</p>
                 </div>
              )}

              <div className="w-full bg-slate-900/50 border border-white/5 rounded-3xl p-6 flex items-center justify-around shadow-inner">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-white mb-1">
                    <Package size={14} className="text-emerald-400" />
                    <span className="text-2xl font-game font-black">{detailModal.count}</span>
                  </div>
                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Pacotes</p>
                </div>
                <div className="w-px h-10 bg-white/5"></div>
                <div className="text-center">
                   <div className="flex items-center justify-center gap-2 text-white mb-1">
                    <Calendar size={14} className="text-blue-400" />
                    <span className="text-sm font-game font-black">{detailModal.type === 'pending' ? 'A Receber' : 'Recebido'}</span>
                  </div>
                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Status</p>
                </div>
              </div>
            </div>

            {/* Lista Scrollável para Histórico/Já Pagos */}
            {(detailModal.type === 'paid' || detailModal.type === 'total') && detailModal.logs.length > 0 && (
                <div className="mt-6 w-full flex-1 overflow-y-auto pr-1 -mr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent border-t border-white/5 pt-4">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-3 text-left pl-2">Detalhamento dos itens</p>
                    <div className="space-y-2">
                        {detailModal.logs.map(log => (
                            <div key={log.id} className="flex justify-between items-center p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400"><ArrowUpRight size={12}/></div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-white uppercase">{new Date(log.timestamp).toLocaleDateString('pt-BR')}</p>
                                        <p className="text-[8px] text-slate-500 font-bold">{new Date(log.timestamp).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</p>
                                    </div>
                                </div>
                                <span className="font-game font-black text-emerald-400 text-xs">+ {format(log.value)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-6 pt-2 w-full flex-shrink-0">
                <button 
                  onClick={() => setDetailModal(null)}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] transition-all active:scale-95"
                >
                  Fechar Detalhes
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletCard;
