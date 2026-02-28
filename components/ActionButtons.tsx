
import React from 'react';
import { ArrowDownLeft, ArrowUpRight, RotateCcw } from 'lucide-react';
import { LogActionType } from '../types';

interface ActionButtonsProps {
  onAction: (type: LogActionType) => void;
  todayCounts: {
    ENTRADA: number;
    SAIDA: number;
    DEVOLUCAO: number;
  };
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onAction, todayCounts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Entrada -> Carregados */}
      <button 
        onClick={() => onAction('ENTRADA')}
        className="flex items-center gap-4 p-4 md:p-6 glass-panel rounded-2xl hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all active:scale-95 group relative overflow-hidden border border-white/5 hover:border-emerald-500/30"
      >
        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:scale-110 transition-all border border-emerald-500/20 group-active:bg-emerald-500 group-active:text-white shadow-[0_0_10px_rgba(16,185,129,0.1)]">
          <ArrowDownLeft size={22} strokeWidth={2.5} />
        </div>
        <div className="text-left flex-1">
          <p className="font-game font-black text-white uppercase text-sm tracking-widest leading-none drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">Carregados</p>
          <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1">Check-in / Base</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-game font-black text-white/20 group-hover:text-emerald-400 transition-colors leading-none drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]">
            {todayCounts.ENTRADA}
          </span>
          <p className="text-[6px] text-slate-600 font-bold uppercase tracking-tighter">HOJE</p>
        </div>
      </button>

      {/* Saída -> Entregues */}
      <button 
        onClick={() => onAction('SAIDA')}
        className="flex items-center gap-4 p-4 md:p-6 glass-panel rounded-2xl hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all active:scale-95 group relative overflow-hidden border border-white/5 hover:border-blue-500/30"
      >
        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-all border border-blue-500/20 group-active:bg-blue-500 group-active:text-white shadow-[0_0_10px_rgba(59,130,246,0.1)]">
          <ArrowUpRight size={22} strokeWidth={2.5} />
        </div>
        <div className="text-left flex-1">
          <p className="font-game font-black text-white uppercase text-sm tracking-widest leading-none drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">Entregues</p>
          <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1">Sucesso</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-game font-black text-white/20 group-hover:text-blue-400 transition-colors leading-none drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]">
            {todayCounts.SAIDA}
          </span>
          <p className="text-[6px] text-slate-600 font-bold uppercase tracking-tighter">HOJE</p>
        </div>
      </button>

      {/* Retorno -> Insucessos */}
      <button 
        onClick={() => onAction('DEVOLUCAO')}
        className="flex items-center gap-4 p-4 md:p-6 glass-panel rounded-2xl hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all active:scale-95 group relative overflow-hidden border border-white/5 hover:border-orange-500/30"
      >
        <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:scale-110 transition-all border border-orange-500/20 group-active:bg-orange-500 group-active:text-white shadow-[0_0_10px_rgba(249,115,22,0.1)]">
          <RotateCcw size={22} strokeWidth={2.5} />
        </div>
        <div className="text-left flex-1">
          <p className="font-game font-black text-white uppercase text-sm tracking-widest leading-none drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">Insucessos</p>
          <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1">Devolução</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-game font-black text-white/20 group-hover:text-orange-400 transition-colors leading-none drop-shadow-[0_0_5px_rgba(249,115,22,0.3)]">
            {todayCounts.DEVOLUCAO}
          </span>
          <p className="text-[6px] text-slate-600 font-bold uppercase tracking-tighter">HOJE</p>
        </div>
      </button>
    </div>
  );
};

export default ActionButtons;
