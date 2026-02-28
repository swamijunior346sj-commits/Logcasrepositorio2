
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Filter, X, ChevronDown } from 'lucide-react';

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onClear: () => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClear
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '--/--';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}`;
  };

  return (
    <div className="relative z-30 w-full" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full glass-panel rounded-3xl px-6 py-5 text-slate-300 hover:bg-white/5 transition-all active:scale-[0.99] neon-border ${isOpen ? 'ring-1 ring-emerald-500/50 bg-white/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : ''}`}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <Filter size={20} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Período</p>
            <p className="text-lg font-black text-white uppercase tracking-tight drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
              {formatDate(startDate)} - {formatDate(endDate)}
            </p>
          </div>
        </div>
        <ChevronDown size={20} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 origin-top z-40">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Seleção de Data</span>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors"><X size={16} /></button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider ml-1">Início</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Calendar size={16} />
                  </div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-emerald-500/50 transition-all [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider ml-1">Fim</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Calendar size={16} />
                  </div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-emerald-500/50 transition-all [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => { onClear(); setIsOpen(false); }}
              className="w-full py-4 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl transition-colors border border-white/5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <X size={16} /> Limpar Filtro
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
