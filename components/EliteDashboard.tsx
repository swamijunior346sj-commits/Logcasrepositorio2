import React from 'react';

interface EliteDashboardProps {
    userName: string;
    counts: {
        todaySaida: number;
        todayEntrada: number;
        todayDevolucao: number;
        week: number;
        year: number;
        wallet: {
            pending: number;
            paid: number;
            cumulative: number;
        }
    };
    valorPorPacote: number;
    onNavigate: (tab: 'dash' | 'stats' | 'route' | 'pdf-view' | 'profile' | 'tax-invoice' | 'invoice-success' | 'tax-data' | 'personal-data' | 'settings' | 'extrato' | 'express-report') => void;
}

const EliteDashboard: React.FC<EliteDashboardProps> = ({ userName, counts, valorPorPacote, onNavigate }) => {
    const todayEarnings = counts.todaySaida * valorPorPacote;
    const weeklyEarnings = counts.week * valorPorPacote;
    const monthlyEarnings = counts.wallet.paid;
    const annualProjection = counts.year * valorPorPacote;
    const totalCumulative = counts.wallet.cumulative;

    const formatCurrency = (val: number) =>
        val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] bg-pitch-black shadow-2xl ring-1 ring-white/5 pb-32 animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
                .glass-card-premium {
                    background: rgba(18, 18, 18, 0.75);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 0.5px solid #EBC051;
                    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.8);
                }
                .achievement-glass {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 0.5px solid rgba(235, 192, 81, 0.2);
                }
                .icon-outline-gold {
                    border: 1px solid #EBC051;
                    background: transparent;
                }
                .metallic-icon-text {
                    background: linear-gradient(135deg, #FFFFFF 0%, #EBC051 50%, #8a6d1c 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .graph-line {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 0;
                    animation: dash-animation 3s ease-in-out forwards;
                }
                @keyframes dash-animation {
                    from { stroke-dashoffset: 1000; }
                    to { stroke-dashoffset: 0; }
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                `
            }} />

            {/* Header / Profile */}
            <div className="flex items-center justify-between p-6 mt-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="size-14 rounded-full border border-primary-gold/30 p-0.5 bg-gradient-to-tr from-deep-gold to-primary-gold shadow-lg">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-full filter contrast-125 grayscale brightness-90 border border-black/20"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlP_6m46cIx9G_FjX3ku2YaZwMvrfuyj4hQcf8xv7fAjTuzgSadvH49RYNSfu0UCU-L5UZp5I2y0Sn4kft4mYucmwGhEPsIi0hGtD62kD_ZLmldrXSqt9j8I8DaHcJFN81eauwKQcGbwshg1YO9KUWsElYrK-IHKuGVFVOVxDYaSI7_83oI1N7UfOVpnysry8y5V0QFDicN1tywt_1WP2IxuPM0ev4dx7JYogKpeaAYsLMSJjGbrfGwMfv_r50U4uzFZ7Zxe3KjKLJ")' }}>
                            </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-gradient-to-b from-primary-gold to-deep-gold text-black text-[9px] font-black px-2 py-0.5 rounded-full border border-black/50 shadow-md">LVL 15</div>
                    </div>
                    <div className="text-left flex flex-col justify-center">
                        <p className="text-[10px] tracking-[0.2em] text-primary-gold font-bold uppercase opacity-80 mb-0.5">Operador</p>
                        <h2 className="text-xl font-bold text-f5-white leading-none">{userName}</h2>
                    </div>
                </div>
            </div>

            {/* Total Balance / Graph */}
            <div className="px-6 mb-8 text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-2">GANHOS TOTAIS</p>
                <h1 className="text-4xl font-extrabold tracking-tight">
                    <span className="text-primary-gold font-bold mr-1">R$</span>
                    <span className="text-f5-white">{formatCurrency(totalCumulative)}</span>
                </h1>

                <div className="relative h-20 w-full mt-8 flex items-end justify-between px-2">
                    <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 400 100">
                        <path className="graph-line" d="M0,80 Q50,75 100,50 T200,60 T300,20 T400,40" fill="none" stroke="url(#goldGradientDash)" strokeWidth="2.5"></path>
                        <defs>
                            <linearGradient id="goldGradientDash" x1="0%" x2="100%" y1="0%" y2="0%">
                                <stop offset="0%" style={{ stopColor: '#AA771C', stopOpacity: 1 }}></stop>
                                <stop offset="50%" style={{ stopColor: '#EBC051', stopOpacity: 1 }}></stop>
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

            {/* Cards Grid */}
            <div className="grid grid-cols-1 gap-4 p-6 pt-0">
                {/* Current Route Card */}
                <div
                    className="glass-card-premium rounded-2xl p-6 transition-all"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="text-left">
                            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/40 mb-1">ROTA ATUAL</p>
                            <h3 className="text-3xl font-extrabold text-f5-white tracking-tighter">R$ {formatCurrency(todayEarnings)}</h3>
                        </div>
                        <div className="bg-primary-gold/10 px-3 py-1 rounded-lg border border-primary-gold/20">
                            <span className="text-[9px] font-bold text-primary-gold uppercase tracking-tighter">EM CURSO</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <div className="flex justify-between text-[8px] font-bold text-white/40 uppercase mb-1.5 tracking-widest text-left">
                                <span>PROGRESSO</span>
                                <span>12 PARADAS</span>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-deep-gold to-primary-gold rounded-full"
                                    style={{ width: `${Math.min(100, (counts.todaySaida / 12) * 100)}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center size-9 rounded-xl bg-white/5 border border-white/10">
                            <span className="material-symbols-outlined text-white/60 text-base">map</span>
                        </div>
                    </div>
                </div>

                {/* Secondary Cards Gap */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card-premium rounded-2xl p-5 text-left">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-primary-gold text-sm">calendar_today</span>
                            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/30">SEMANAL</p>
                        </div>
                        <h4 className="text-lg font-bold text-f5-white tracking-tight">R$ {formatCurrency(weeklyEarnings)}</h4>
                        <div className="mt-3 text-[9px] font-bold text-primary-gold uppercase tracking-tighter">+12% ESTE MÊS</div>
                    </div>
                    <div className="glass-card-premium rounded-2xl p-5 text-left">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-primary-gold text-sm">military_tech</span>
                            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/30">MENSAL</p>
                        </div>
                        <h4 className="text-lg font-bold text-f5-white tracking-tight">R$ {formatCurrency(monthlyEarnings)}</h4>
                        <div className="mt-3 text-[9px] font-bold text-primary-gold uppercase tracking-tighter">ELITE VIP</div>
                    </div>
                </div>

                {/* Yearly Projection */}
                <div className="glass-card-premium rounded-2xl p-5 relative overflow-hidden text-left">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/30 mb-1">PROJEÇÃO ANUAL</p>
                            <h4 className="text-2xl font-extrabold text-f5-white tracking-tighter">R$ {formatCurrency(annualProjection)}</h4>
                        </div>
                        <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                            <span className="material-symbols-outlined text-primary-gold text-xl">insights</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Achievements Section */}
            <div className="px-6 pb-6 text-left">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">CONQUISTAS LOGCASH</h3>
                    <span
                        className="text-[8px] font-bold text-primary-gold/80 uppercase tracking-widest"
                    >
                        DETALHES
                    </span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                    {[
                        { icon: 'grade', label: 'LENDA' },
                        { icon: 'bolt', label: 'RÁPIDO' },
                        { icon: 'diamond', label: 'DIAMANTE' },
                        { icon: 'verified_user', label: 'SEGURO' }
                    ].map((ach, i) => (
                        <div key={i} className="flex-shrink-0 flex flex-col items-center gap-3 achievement-glass p-5 rounded-2xl w-[100px] snap-center">
                            <div className="size-14 rounded-xl icon-outline-gold flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl text-primary-gold font-light" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>{ach.icon}</span>
                            </div>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-f5-white/90">{ach.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EliteDashboard;
