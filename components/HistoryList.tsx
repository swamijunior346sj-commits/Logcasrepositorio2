
import React from 'react';
import { LogEntry } from '../types';
import { ArrowDownLeft, ArrowUpRight, RotateCcw, Clock, Zap } from 'lucide-react';

interface HistoryListProps {
  logs: LogEntry[];
}

const HistoryList: React.FC<HistoryListProps> = ({ logs }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'ENTRADA': 
        return {
          icon: <ArrowDownLeft size={14} />,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20'
        };
      case 'SAIDA': 
        return {
          icon: <ArrowUpRight size={14} />,
          color: 'text-blue-400',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20'
        };
      case 'DEVOLUCAO': 
        return {
          icon: <RotateCcw size={14} />,
          color: 'text-orange-400',
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/20'
        };
      default: 
        return {
          icon: <Clock size={14} />,
          color: 'text-slate-400',
          bg: 'bg-slate-500/10',
          border: 'border-slate-500/20'
        };
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case 'ENTRADA': return 'Carregado';
      case 'SAIDA': return 'Entregue';
      case 'DEVOLUCAO': return 'Insucesso';
      default: return type;
    }
  };

  const formatDate = (isoStr: string) => {
    const date = new Date(isoStr);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const recentLogs = logs.slice(0, 8);

  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-xl">
      {/* Header Slim */}
      <div className="px-5 py-3.5 border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
            <Clock size={16} className="text-slate-400" />
          </div>
          <h3 className="font-game font-bold text-white text-sm uppercase tracking-wider">Monitor de Operações</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest">Live Feed</span>
        </div>
      </div>
      
      {recentLogs.length === 0 ? (
        <div className="py-12 flex flex-col items-center gap-2 opacity-30">
          <Zap size={24} className="text-slate-500" />
          <p className="text-[9px] font-game font-bold text-slate-500 uppercase tracking-[0.4em]">Nenhuma atividade detectada</p>
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {recentLogs.map((log) => {
            const style = getIcon(log.type);
            return (
              <div key={log.id} className="px-5 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 ${style.bg} ${style.border} border rounded-xl flex items-center justify-center ${style.color} group-hover:scale-110 transition-transform duration-300`}>
                    {style.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] font-game font-black text-white uppercase tracking-tight">{getLabel(log.type)}</p>
                      <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">• {formatDate(log.timestamp)}</span>
                    </div>
                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{new Date(log.timestamp).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  {log.type === 'SAIDA' ? (
                    <div className="flex flex-col items-end">
                      <p className="text-xs font-game font-black text-emerald-400 tracking-tighter">+ R$ 2,50</p>
                      <div className="w-8 h-0.5 bg-emerald-500/20 rounded-full mt-1"></div>
                    </div>
                  ) : (
                    <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest italic">Registrado</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Footer minimalista */}
      <div className="px-5 py-2 bg-black/20 flex justify-center border-t border-white/5">
        <button className="text-[8px] font-black text-slate-500 hover:text-emerald-400 transition-colors uppercase tracking-[0.3em]">
          Ver histórico completo
        </button>
      </div>
    </div>
  );
};

export default HistoryList;
