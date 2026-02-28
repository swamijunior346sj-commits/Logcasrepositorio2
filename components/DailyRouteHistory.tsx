
import React, { useMemo } from 'react';
import { LogEntry } from '../types';
import { VALOR_POR_PACOTE } from '../constants';
import { ArrowDownLeft, ArrowUpRight, RotateCcw, MapPin, Clock, CalendarCheck } from 'lucide-react';

interface DailyRouteHistoryProps {
  logs: LogEntry[];
}

const DailyRouteHistory: React.FC<DailyRouteHistoryProps> = ({ logs }) => {
  // Nota: 'logs' já vem filtrado pelo componente pai (App.tsx) com base no dateRange.
  // Não filtramos mais por "hoje" aqui dentro.

  const stats = useMemo(() => {
    return {
      entrada: logs.filter(l => l.type === 'ENTRADA').length,
      saida: logs.filter(l => l.type === 'SAIDA').length,
      devolucao: logs.filter(l => l.type === 'DEVOLUCAO').length,
      totalValue: logs.filter(l => l.type === 'SAIDA').length * VALOR_POR_PACOTE
    };
  }, [logs]);

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const isTodayOnly = useMemo(() => {
    if (logs.length === 0) return true;
    const dates = new Set(logs.map(l => new Date(l.timestamp).toDateString()));
    return dates.size === 1 && dates.has(new Date().toDateString());
  }, [logs]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Financeiro da Rota */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-black via-black to-blue-950/40 border border-white/10 shadow-2xl p-6 md:p-8">
        <div className="absolute top-0 right-0 p-8 opacity-20 text-blue-500 transform translate-x-10 -translate-y-10">
          <MapPin size={120} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
                {isTodayOnly ? 'Rota Ativa' : 'Histórico Selecionado'}
              </span>
            </div>
          </div>

          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Valor Gerado no Período</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-5xl font-game font-black text-white tracking-tighter drop-shadow-lg">
              {formatCurrency(stats.totalValue)}
            </h2>
          </div>
        </div>

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1 text-emerald-400">
              <ArrowDownLeft size={14} />
              <span className="text-[8px] font-black uppercase tracking-wider">Carregados</span>
            </div>
            <p className="text-xl font-game font-black text-white">{stats.entrada}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1 text-blue-400">
              <ArrowUpRight size={14} />
              <span className="text-[8px] font-black uppercase tracking-wider">Entregues</span>
            </div>
            <p className="text-xl font-game font-black text-white">{stats.saida}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1 text-orange-400">
              <RotateCcw size={14} />
              <span className="text-[8px] font-black uppercase tracking-wider">Insucessos</span>
            </div>
            <p className="text-xl font-game font-black text-white">{stats.devolucao}</p>
          </div>
        </div>
      </div>

      {/* Timeline da Rota */}
      <div className="bg-black/40 border border-white/5 rounded-[2rem] p-6 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-game font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Clock size={18} className="text-slate-400" /> Linha do Tempo
          </h3>
          <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full">
            {logs.length} Registros
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-600 opacity-50">
            <CalendarCheck size={48} strokeWidth={1} className="mb-4" />
            <p className="text-[10px] font-game font-bold uppercase tracking-widest">Nenhuma atividade neste período</p>
          </div>
        ) : (
          <div className="relative pl-4 space-y-6 before:content-[''] before:absolute before:left-[21px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-white/5 before:via-white/10 before:to-transparent">
            {logs.map((log) => (
              <div key={log.id} className="relative flex items-center gap-4 group">
                {/* Marcador da Timeline */}
                <div className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-lg
                  ${log.type === 'SAIDA' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-blue-900/20' :
                    log.type === 'ENTRADA' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-emerald-900/20' :
                      'bg-orange-500/10 border-orange-500/20 text-orange-400 shadow-orange-900/20'}`}>
                  {log.type === 'SAIDA' ? <ArrowUpRight size={20} /> :
                    log.type === 'ENTRADA' ? <ArrowDownLeft size={20} /> :
                      <RotateCcw size={20} />}
                </div>

                {/* Conteúdo */}
                <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex items-center justify-between hover:bg-white/[0.04] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={`text-xs font-game font-black uppercase tracking-wider
                        ${log.type === 'SAIDA' ? 'text-blue-100' :
                          log.type === 'ENTRADA' ? 'text-emerald-100' :
                            'text-orange-100'}`}>
                        {log.type === 'SAIDA' ? 'Pacote Entregue' :
                          log.type === 'ENTRADA' ? 'Pacote Carregado' :
                            'Insucesso / Retorno'}
                      </p>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <Clock size={10} />
                      {formatDate(log.timestamp)} • {formatTime(log.timestamp)}
                    </p>
                  </div>

                  {log.type === 'SAIDA' && (
                    <div className="flex flex-col items-end pl-2 border-l border-white/5">
                      <div className="flex items-center text-emerald-400 font-game font-black text-sm">
                        <span className="text-[10px] mr-0.5">+</span> {formatCurrency(log.value)}
                      </div>
                      <span className="text-[7px] font-bold text-slate-600 uppercase tracking-widest">Receita</span>
                    </div>
                  )}
                  {log.type !== 'SAIDA' && (
                    <div className="opacity-30">
                      <div className="w-8 h-1 bg-slate-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyRouteHistory;
