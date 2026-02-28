
import React, { useState } from 'react';
import { Eye, EyeOff, TrendingUp } from 'lucide-react';
import { VALOR_POR_PACOTE } from '../constants';

interface DashboardCardsProps {
  today: number;
  week: number;
  year: number;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ today, week, year }) => {
  const [visible, setVisible] = useState(true);

  const formatCurrency = (count: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(count * VALOR_POR_PACOTE);
  };

  return (
    <div className="glass-panel rounded-[2.5rem] p-5 md:p-8 relative overflow-hidden shadow-2xl neon-border group transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 transition-transform group-hover:scale-105"><TrendingUp size={18} className="text-blue-400" /></div>
          <div>
            <h2 className="text-base md:text-xl font-game font-black text-white uppercase tracking-tight">Carteira</h2>
            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Sincronização Ativa</p>
          </div>
        </div>
        <button 
          onClick={() => setVisible(!visible)} 
          className="p-2.5 bg-white/5 rounded-xl text-slate-500 hover:text-white active:scale-90 transition-all border border-white/5 hover:bg-white/10"
        >
          {visible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        {/* Principal - Hoje */}
        <div className="space-y-1">
          <p className="text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] ml-0.5">Ciclo Atual / Hoje</p>
          <div className="flex items-baseline gap-2 overflow-hidden">
            <h3 className="text-4xl md:text-5xl font-game font-black text-white tracking-tighter truncate drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              {visible ? formatCurrency(today) : "••••••"}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{today} Entregas realizadas</span>
          </div>
        </div>

        {/* Grid para menores períodos */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div className="space-y-0.5">
            <p className="text-emerald-400 text-[8px] font-black uppercase tracking-widest">Semanal</p>
            <h3 className="text-xl md:text-2xl font-game font-black text-white tracking-tight">
              {visible ? formatCurrency(week) : "••••"}
            </h3>
            <span className="text-[8px] font-bold text-slate-600 uppercase">{week} Unid.</span>
          </div>

          <div className="space-y-0.5 pl-4 border-l border-white/5">
            <p className="text-purple-400 text-[8px] font-black uppercase tracking-widest">Acumulado</p>
            <h3 className="text-xl md:text-2xl font-game font-black text-white tracking-tight">
              {visible ? formatCurrency(year) : "••••"}
            </h3>
            <span className="text-[8px] font-bold text-slate-600 uppercase">{year} Unid.</span>
          </div>
        </div>
      </div>

      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 opacity-50"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-emerald-600/5 blur-[80px] pointer-events-none"></div>
    </div>
  );
};

export default DashboardCards;
