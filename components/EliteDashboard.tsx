import React from 'react';

interface EliteDashboardProps {
    userName: string;
    counts: {
        todaySaida: number;
        todayEntrada: number;
        todayDevolucao: number;
        week: number;
        month: number;
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
    const monthlyEarnings = counts.month * valorPorPacote;
    const annualProjection = counts.year * valorPorPacote;
    const totalCumulative = counts.wallet.cumulative;

    const formatCurrency = (val: number) =>
        val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="relative min-h-screen w-full max-w-[430px] bg-pitch-black flex flex-col overflow-x-hidden mx-auto animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
                .particle {
                    position: absolute;
                    border-radius: 9999px;
                    background-color: #EBC051;
                    opacity: 0.1;
                    filter: blur(1px);
                }
                .glass-card {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
                    border: 1px solid rgba(235, 192, 81, 0.12);
                }
                .text-kern-cinematic {
                    letter-spacing: 0.5em;
                }
                .animated-path {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 0;
                    animation: dash-anim 3s ease-out forwards;
                }
                @keyframes dash-anim {
                    from { stroke-dashoffset: 1000; }
                    to { stroke-dashoffset: 0; }
                }
                .gold-gradient-fill {
                    fill: url(#goldGradient);
                }
                `
            }} />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="particle w-1 h-1 top-[15%] left-[10%]"></div>
                <div className="particle w-1.5 h-1.5 top-[30%] left-[85%]"></div>
                <div className="particle w-0.5 h-0.5 top-[50%] left-[5%]"></div>
                <div className="particle w-1 h-1 top-[85%] left-[20%]"></div>
            </div>

            <header className="relative pt-12 px-8 flex justify-between items-center z-10">
                <div className="flex items-center gap-4">
                    <div className="size-11 rounded-full border border-primary-gold/20 p-[2px]">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-full filter contrast-125 grayscale brightness-90" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlP_6m46cIx9G_FjX3ku2YaZwMvrfuyj4hQcf8xv7fAjTuzgSadvH49RYNSfu0UCU-L5UZp5I2y0Sn4kft4mYucmwGhEPsIi0hGtD62kD_ZLmldrXSqt9j8I8DaHcJFN81eauwKQcGbwshg1YO9KUWsElYrK-IHKuGVFVOVxDYaSI7_83oI1N7UfOVpnysry8y5V0QFDicN1tywt_1WP2IxuPM0ev4dx7JYogKpeaAYsLMSJjGbrfGwMfv_r50U4uzFZ7Zxe3KjKLJ")' }}></div>
                    </div>
                    <div className="text-left">
                        <h2 className="text-[11px] font-semibold text-white tracking-[0.15em] uppercase">{userName || "A. Driver"}</h2>
                        <p className="text-[8px] text-primary-gold/50 font-medium uppercase tracking-[0.25em]">Membro Elite</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col">
                <section className="relative pt-12 pb-10 px-8 text-center z-10 bg-pitch-black">
                    <p className="text-[10px] uppercase text-kern-cinematic font-light text-primary-gold/60 mb-4 ml-2">Ganhos Totais</p>
                    <div className="relative inline-block">
                        <h1 className="text-6xl font-extralight tracking-tighter text-white">
                            <span className="text-primary-gold font-light opacity-80 text-2xl align-top mt-3 inline-block mr-1">R$</span>
                            {formatCurrency(totalCumulative).split(',')[0]}<span className="text-white/40">,{formatCurrency(totalCumulative).split(',')[1] || '00'}</span>
                        </h1>
                        <div className="mt-6 h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-primary-gold/30 to-transparent"></div>
                    </div>
                </section>

                <section className="relative px-0 mb-8 z-10">
                    <div className="h-44 w-full relative">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 430 160">
                            <defs>
                                <linearGradient id="goldGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                    <stop offset="0%" stopColor="#EBC051" stopOpacity="0.15"></stop>
                                    <stop offset="100%" stopColor="#EBC051" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path className="gold-gradient-fill" d="M0,140 Q40,135 80,100 T160,110 T240,60 T320,80 T430,20 V160 H0 Z"></path>
                            <path className="animated-path" d="M0,140 Q40,135 80,100 T160,110 T240,60 T320,80 T430,20" fill="none" stroke="#EBC051" strokeLinecap="round" strokeWidth="1.5"></path>
                            <line stroke="white" strokeOpacity="0.03" strokeWidth="0.5" x1="86" x2="86" y1="0" y2="160"></line>
                            <line stroke="white" strokeOpacity="0.03" strokeWidth="0.5" x1="172" x2="172" y1="0" y2="160"></line>
                            <line stroke="white" strokeOpacity="0.03" strokeWidth="0.5" x1="258" x2="258" y1="0" y2="160"></line>
                            <line stroke="white" strokeOpacity="0.03" strokeWidth="0.5" x1="344" x2="344" y1="0" y2="160"></line>
                        </svg>
                    </div>
                    <div className="flex justify-between px-10 mt-3">
                        <span className="text-[9px] font-medium text-white/20 tracking-widest uppercase">SEG</span>
                        <span className="text-[9px] font-medium text-white/20 tracking-widest uppercase">TER</span>
                        <span className="text-[9px] font-medium text-white/20 tracking-widest uppercase">QUA</span>
                        <span className="text-[9px] font-medium text-white/20 tracking-widest uppercase">QUI</span>
                        <span className="text-[9px] font-medium text-white/20 tracking-widest uppercase">SEX</span>
                    </div>
                </section>

                <section className="px-8 space-y-4 pb-32 z-10 w-full">
                    <div className="glass-card rounded-2xl p-6 flex justify-between items-center text-left">
                        <div>
                            <h3 className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium mb-1.5">Total da semana</h3>
                            <p className="text-xl font-light tracking-tight text-white">R$ {formatCurrency(weeklyEarnings)}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[11px] text-primary-gold block font-medium tracking-wider mb-1">+12.4%</span>
                            <div className="h-[1px] w-6 bg-primary-gold/30 ml-auto"></div>
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6 flex justify-between items-center text-left">
                        <div>
                            <h3 className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium mb-1.5">Total do mês</h3>
                            <p className="text-xl font-light tracking-tight text-white">R$ {formatCurrency(monthlyEarnings)}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[11px] text-primary-gold block font-medium tracking-wider mb-1">+15.2%</span>
                            <div className="h-[1px] w-6 bg-primary-gold/30 ml-auto"></div>
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6 flex justify-between items-center text-left">
                        <div>
                            <h3 className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium mb-1.5">Total anual</h3>
                            <p className="text-xl font-light tracking-tight text-white">R$ {formatCurrency(annualProjection)}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[11px] text-primary-gold block font-medium tracking-wider mb-1">+8.4%</span>
                            <div className="h-[1px] w-6 bg-primary-gold/30 ml-auto"></div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EliteDashboard;
