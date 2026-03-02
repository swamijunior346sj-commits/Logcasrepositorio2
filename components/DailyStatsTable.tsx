
import React, { useState } from 'react';
import { LogEntry } from '../types';
import { VALOR_POR_PACOTE } from '../constants';
import { BarChart3, Trash2, X } from 'lucide-react';
import EliteDeleteReportPopup from './EliteDeleteReportPopup';

interface DailyStatsTableProps {
  logs: LogEntry[];
  onDeleteIds?: (ids: string[], dateLabel: string) => void;
}

type ViewMode = 'daily' | 'monthly';

const DailyStatsTable: React.FC<DailyStatsTableProps> = ({ logs, onDeleteIds }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('daily');
  const [selectedItem, setSelectedItem] = useState<{ ids: string[], label: string } | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const dailyGroups = logs.reduce((acc: any, log) => {
    const date = new Date(log.timestamp).toLocaleDateString('pt-BR');
    if (!acc[date]) {
      acc[date] = { label: date, entrada: 0, saida: 0, devolucao: 0, total: 0, rawDate: new Date(log.timestamp), ids: [] };
    }
    acc[date].ids.push(log.id);
    if (log.type === 'ENTRADA') acc[date].entrada++;
    if (log.type === 'SAIDA') {
      acc[date].saida++;
      acc[date].total += VALOR_POR_PACOTE;
    }
    if (log.type === 'DEVOLUCAO') acc[date].devolucao++;
    return acc;
  }, {});

  const monthlyGroups = logs.reduce((acc: any, log) => {
    const d = new Date(log.timestamp);
    const monthLabel = d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
    const monthKey = `${d.getMonth()}-${d.getFullYear()}`;

    if (!acc[monthKey]) {
      acc[monthKey] = {
        label: monthLabel.toUpperCase(),
        entrada: 0,
        saida: 0,
        devolucao: 0,
        total: 0,
        sortKey: d.getFullYear() * 12 + d.getMonth()
      };
    }
    if (log.type === 'ENTRADA') acc[monthKey].entrada++;
    if (log.type === 'SAIDA') {
      acc[monthKey].saida++;
      acc[monthKey].total += VALOR_POR_PACOTE;
    }
    if (log.type === 'DEVOLUCAO') acc[monthKey].devolucao++;
    return acc;
  }, {});

  const displayData = viewMode === 'daily'
    ? Object.values(dailyGroups).sort((a: any, b: any) => b.rawDate.getTime() - a.rawDate.getTime())
    : Object.values(monthlyGroups).sort((a: any, b: any) => b.sortKey - a.sortKey);

  return (
    <>
      <div className="glass-panel rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transition-all relative neon-border">
        <div className="px-4 py-3 md:px-5 md:py-4 border-b border-white/5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
              <BarChart3 size={16} className="text-emerald-400" />
            </div>
            <h3 className="text-white font-game text-xs md:text-sm font-black uppercase tracking-wider">Relatórios</h3>
          </div>

          <div className="bg-black/20 p-0.5 rounded-lg border border-white/5 flex items-center shadow-inner backdrop-blur-sm">
            <button
              onClick={() => setViewMode('daily')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === 'daily' ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Dia
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === 'monthly' ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Mês
            </button>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide max-h-[60vh] md:max-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[320px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-black/80 backdrop-blur-md border-b border-white/5">
                <th className="px-4 py-3 text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Período</th>
                <th className="px-2 py-3 text-[8px] font-black text-slate-500 uppercase tracking-widest text-center">Car.</th>
                <th className="px-2 py-3 text-[8px] font-black text-slate-500 uppercase tracking-widest text-center">Entr.</th>
                <th className="px-2 py-3 text-[8px] font-black text-slate-500 uppercase tracking-widest text-center">Ins.</th>
                <th className="px-4 py-3 text-[8px] font-black text-slate-500 uppercase tracking-widest text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayData.map((item: any, idx: number) => (
                <tr
                  key={idx}
                  onClick={() => {
                    if (viewMode === 'daily' && onDeleteIds) {
                      setSelectedItem({ ids: item.ids, label: item.label });
                      setShowConfirmDelete(true);
                    }
                  }}
                  className={`transition-colors cursor-pointer ${selectedItem?.label === item.label ? 'bg-emerald-500/10' : 'hover:bg-white/[0.02] active:bg-white/[0.04]'}`}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div>
                      <p className={`font-game font-bold tracking-tight whitespace-nowrap ${viewMode === 'daily' ? 'text-slate-300 text-[11px]' : 'text-emerald-400 text-xs'}`}>
                        {item.label}
                      </p>
                    </div>
                  </td>
                  <td className="px-2 py-3.5 text-center">
                    <span className="text-emerald-400 font-bold text-[10px] tabular-nums drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]">{item.entrada}</span>
                  </td>
                  <td className="px-2 py-3.5 text-center">
                    <span className="text-blue-400 font-bold text-[10px] tabular-nums drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]">{item.saida}</span>
                  </td>
                  <td className="px-2 py-3.5 text-center">
                    <span className="text-orange-400 font-bold text-[10px] tabular-nums drop-shadow-[0_0_5px_rgba(249,115,22,0.3)]">{item.devolucao}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-white font-game text-xs font-black tracking-tighter tabular-nums whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(item.total)}
                    </span>
                  </td>
                </tr>
              ))}
              {displayData.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-slate-600 font-game uppercase tracking-[0.3em] text-[8px] opacity-40">
                    Nenhum histórico detectado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-2.5 bg-black/20 flex justify-between items-center text-[7px] text-slate-600 font-black uppercase tracking-[0.3em] border-t border-white/5 backdrop-blur-sm">
          <span className="hidden sm:inline">Engine v3.4 Active</span>
          <div className="flex gap-3 ml-auto">
            <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div> Carreg.</span>
            <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></div> Entreg.</span>
            <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)]"></div> Insucess.</span>
          </div>
        </div>
      </div>

      {/* COCKPIT MENU ELITE DELETE */}
      {selectedItem && (
        <EliteDeleteReportPopup
          isOpen={showConfirmDelete}
          onClose={() => {
            setShowConfirmDelete(false);
            setSelectedItem(null);
          }}
          onConfirm={() => {
            if (onDeleteIds) {
              onDeleteIds(selectedItem.ids, selectedItem.label);
            }
          }}
        />
      )}
    </>
  );
};

export default DailyStatsTable;
