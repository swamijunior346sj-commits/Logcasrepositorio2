import React from 'react';
import { LogEntry } from '../types';

interface EliteDashboardProps {
    userName: string;
    counts: {
        todaySaida: number;
        week: number;
        year: number;
        wallet: {
            pending: number;
            paid: number;
            cumulative: number;
        }
    };
    valorPorPacote: number;
    onNavigate: (tab: 'dash' | 'stats' | 'route') => void;
}

const EliteDashboard: React.FC<EliteDashboardProps> = ({ userName, counts, valorPorPacote, onNavigate }) => {
    const todayEarnings = counts.todaySaida * valorPorPacote;
    const weeklyEarnings = counts.week * valorPorPacote;
    const monthlyEarnings = counts.wallet.paid;
    const annualProjection = counts.year * valorPorPacote;
    const totalCumulative = counts.wallet.cumulative;

    // Numerical parts for total earnings display
    const intPart = Math.floor(totalCumulative);
    const decPart = (totalCumulative % 1).toFixed(2).substring(2);

    return (
        <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] bg-pitch-black shadow-2xl ring-1 ring-white/5 pb-10 animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
        .glass-card-elite {
            background: linear-gradient(165deg, rgba(25, 25, 25, 0.8) 0%, rgba(5, 5, 5, 0.95) 100%);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(212, 175, 55, 0.15);
            box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.7);
        }
        .gold-pinstripe {
            border-left: 2px solid #D4AF37;
            position: relative;
        }
        .gold-pinstripe::after {
            content: '';
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            background: linear-gradient(90deg, rgba(212, 175, 55, 0.05) 0%, transparent 100%);
            pointer-events: none;
        }
        .metallic-3d-gold {
            background: linear-gradient(145deg, #fcebb6 0%, #D4AF37 45%, #AA771C 55%, #fcebb6 100%);
            box-shadow: 
                inset -2px -2px 4px rgba(0,0,0,0.4),
                inset 2px 2px 4px rgba(255,255,255,0.4),
                0 8px 16px -4px rgba(0,0,0,0.6);
        }
        .metallic-icon-text {
            background: linear-gradient(135deg, #fff 0%, #D4AF37 50%, #8a6d1c 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .graph-line {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
            animation: dash 3s ease-in-out forwards;
        }
        @keyframes dash {
            from { stroke-dashoffset: 1000; }
            to { stroke-dashoffset: 0; }
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />

            <div className="pt-8"></div>

            {/* Total Balance / Graph */}
            <div className="px-6 mb-8 text-center" onClick={() => onNavigate('stats')}>
                <p className="text-[11px] uppercase tracking-[0.5em] font-extrabold text-white/40 mb-1">GANHOS TOTAIS</p>
                <h1 className="text-6xl font-black text-white tracking-tighter mb-4">
                    R$ {intPart.toLocaleString('pt-BR')}<span className="text-2xl text-[#D4AF37]">,{decPart}</span>
                </h1>

                <div className="relative h-24 w-full mt-6 flex items-end justify-between px-2">
                    <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 400 100">
                        <path className="graph-line" d="M0,80 Q50,75 100,50 T200,60 T300,20 T400,40" fill="none" stroke="url(#goldGradient)" strokeWidth="3"></path>
                        <defs>
                            <linearGradient id="goldGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                <stop offset="0%" style={{ stopColor: '#AA771C', stopOpacity: 1 }}></stop>
                                <stop offset="50%" style={{ stopColor: '#F9E29C', stopOpacity: 1 }}></stop>
                                <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }}></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                    {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className="h-full w-[1px] bg-white/5"></div>
                    ))}
                </div>
                <div className="flex justify-between px-1 mt-2">
                    {['SEG', 'TER', 'QUA', 'QUI', 'SEX'].map(day => (
                        <span key={day} className="text-[8px] font-bold text-white/30 uppercase tracking-widest">{day}</span>
                    ))}
                </div>
            </div>

            {/* Route Stats Section */}
            <div className="grid grid-cols-1 gap-4 p-6 pt-0">
                {/* Current Route Card */}
                <div
                    className="glass-card-elite rounded-3xl p-6 gold-pinstripe cursor-pointer active:scale-[0.98] transition-all"
                    onClick={() => onNavigate('route')}
                >
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mb-1">ROTA ATUAL</p>
                            <h3 className="text-4xl font-black text-white tracking-tighter">R$ {todayEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                        </div>
                        <div className="bg-[#D4AF37]/10 px-3 py-1 rounded-lg border border-[#D4AF37]/20">
                            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-tighter">EM CURSO</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <div className="flex justify-between text-[9px] font-bold text-white/40 uppercase mb-1.5 tracking-widest text-left">
                                <span>PROGRESSO</span>
                                <span>{Math.max(0, 18 - counts.todaySaida)} PARADAS RESTANTES</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#AA771C] to-[#F9E29C] rounded-full" style={{ width: `${Math.min(100, (counts.todaySaida / 18) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center size-10 rounded-xl bg-white/5 border border-white/10">
                            <span className="material-symbols-outlined text-white/60 text-lg">map</span>
                        </div>
                    </div>
                </div>

                {/* Secondary Summary Cards */}
                <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="glass-card-elite rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#D4AF37] text-sm">calendar_today</span>
                            <p className="text-[9px] uppercase tracking-[0.2em] font-black text-white/30">SEMANAL</p>
                        </div>
                        <h4 className="text-lg font-extrabold text-white tracking-tight">R$ {weeklyEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
                        <div className="mt-3 text-[9px] font-black text-[#D4AF37] uppercase tracking-tighter">+12% GANHO</div>
                    </div>
                    <div className="glass-card-elite rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#D4AF37] text-sm">military_tech</span>
                            <p className="text-[9px] uppercase tracking-[0.2em] font-black text-white/30">MENSAL</p>
                        </div>
                        <h4 className="text-lg font-extrabold text-white tracking-tight">R$ {monthlyEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
                        <div className="mt-3 text-[9px] font-black text-[#D4AF37] uppercase tracking-tighter">NÍVEL ELITE</div>
                    </div>
                </div>

                {/* Yearly Projection */}
                <div className="glass-card-elite rounded-2xl p-5 relative overflow-hidden text-left">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] font-black text-white/30 mb-1">PROJEÇÃO ANUAL</p>
                            <h4 className="text-2xl font-black text-white tracking-tighter">R$ {annualProjection.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
                        </div>
                        <div className="size-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 shadow-inner">
                            <span className="material-symbols-outlined text-[#D4AF37] text-2xl">insights</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Achievements Section */}
            <div className="px-6 pb-6 text-left">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">CONQUISTAS EXCLUSIVAS</h3>
                    <span
                        onClick={() => onNavigate('stats')}
                        className="text-[9px] font-bold text-[#D4AF37]/60 uppercase tracking-widest cursor-pointer hover:text-[#D4AF37] transition-colors"
                    >
                        VER TUDO
                    </span>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                    {[
                        { icon: 'grade', label: 'LENDA' },
                        { icon: 'bolt', label: 'RÁPIDO' },
                        { icon: 'diamond', label: 'DIAMANTE' },
                        { icon: 'verified_user', label: 'SEGURO' }
                    ].map((ach, i) => (
                        <div key={i} className="flex-shrink-0 flex flex-col items-center gap-3">
                            <div className="size-16 rounded-2xl metallic-3d-gold flex items-center justify-center relative group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <span className="material-symbols-outlined text-3xl text-black/80 font-black" style={{ fontVariationSettings: "'FILL' 1" }}>{ach.icon}</span>
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest metallic-icon-text text-center">{ach.label}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default EliteDashboard;
