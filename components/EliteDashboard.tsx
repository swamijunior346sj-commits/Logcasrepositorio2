import React, { useMemo } from 'react';
import { LogEntry } from '../types';
import { VALOR_POR_PACOTE } from '../constants';

interface EliteDashboardProps {
    userName: string;
    counts: {
        todaySaida: number;
        todayEntrada: number;
        todayDevolucao: number;
        week: number;
        weekDiff: number;
        month: number;
        monthDiff: number;
        year: number;
        yearDiff: number;
        wallet: {
            pending: number;
            paid: number;
            cumulative: number;
        }
    };
    valorPorPacote: number;
    logs: LogEntry[];
    onNavigate: (tab: 'dash' | 'stats' | 'route' | 'pdf-view' | 'profile' | 'tax-invoice' | 'invoice-success' | 'tax-data' | 'personal-data' | 'settings' | 'extrato' | 'express-report') => void;
}

const DAY_LABELS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

const EliteDashboard: React.FC<EliteDashboardProps> = ({ userName, counts, valorPorPacote, logs, onNavigate }) => {
    const todayEarnings = counts.todaySaida * valorPorPacote;
    const weeklyEarnings = counts.week * valorPorPacote;
    const monthlyEarnings = counts.month * valorPorPacote;
    const annualProjection = counts.year * valorPorPacote;
    const totalCumulative = counts.wallet.cumulative;

    const formatCurrency = (val: number) =>
        val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Gera os últimos 7 dias com seus ganhos reais
    const last7Days = useMemo(() => {
        const days: { label: string; shortDate: string; earnings: number }[] = [];
        const now = new Date();

        for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(now.getDate() - i);
            const dateStr = d.toDateString();

            const dayEarnings = logs
                .filter(l => l.type === 'SAIDA' && new Date(l.timestamp).toDateString() === dateStr)
                .length * valorPorPacote;

            days.push({
                label: DAY_LABELS[d.getDay()],
                shortDate: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`,
                earnings: dayEarnings,
            });
        }
        return days;
    }, [logs, valorPorPacote]);

    // Constrói o SVG path suave baseado nos dados reais
    const chartPath = useMemo(() => {
        const W = 430;
        const H = 160;
        const pad = 20;
        const max = Math.max(...last7Days.map(d => d.earnings), 1);

        const points = last7Days.map((d, i) => {
            const x = pad + (i / (last7Days.length - 1)) * (W - pad * 2);
            const y = H - pad - (d.earnings / max) * (H - pad * 2);
            return { x, y };
        });

        // Smooth bezier curve
        let d = `M${points[0].x},${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            const cp1x = (points[i - 1].x + points[i].x) / 2;
            const cp1y = points[i - 1].y;
            const cp2x = (points[i - 1].x + points[i].x) / 2;
            const cp2y = points[i].y;
            d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${points[i].x},${points[i].y}`;
        }

        const fillPath = `${d} L${points[points.length - 1].x},${H} L${points[0].x},${H} Z`;

        return { line: d, fill: fillPath, points };
    }, [last7Days]);

    const hasData = last7Days.some(d => d.earnings > 0);
    const todayIdx = 6; // último dia = hoje

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
                    animation: dash-anim 2.5s ease-out forwards;
                }
                @keyframes dash-anim {
                    from { stroke-dashoffset: 1000; }
                    to { stroke-dashoffset: 0; }
                }
                .gold-gradient-fill {
                    fill: url(#goldGradient);
                }
                .chart-dot {
                    transition: r 0.2s;
                }
                `
            }} />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="particle w-1 h-1 top-[15%] left-[10%]"></div>
                <div className="particle w-1.5 h-1.5 top-[30%] left-[85%]"></div>
                <div className="particle w-0.5 h-0.5 top-[50%] left-[5%]"></div>
                <div className="particle w-1 h-1 top-[85%] left-[20%]"></div>
            </div>

            <header className="relative pt-16 px-8 z-10 flex flex-col items-center justify-center">
                <div className="text-center space-y-1">
                    <h2 className="text-[12px] font-bold text-white tracking-[0.3em] uppercase">{userName || "A. Driver"}</h2>
                    <p className="text-[8px] text-primary-gold/40 font-medium uppercase tracking-[0.5em]">Operador Elite • Membro Confirmado</p>
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
                    {/* Ganhos de hoje - badge */}
                    {todayEarnings > 0 && (
                        <p className="mt-3 text-[9px] text-primary-gold/50 tracking-widest uppercase">
                            Hoje: R$ {formatCurrency(todayEarnings)}
                        </p>
                    )}
                </section>

                {/* Gráfico dos últimos 7 dias */}
                <section className="relative px-0 mb-2 z-10">
                    <div className="px-8 mb-3 flex items-center justify-between">
                        <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">Últimos 7 dias</span>
                        {!hasData && (
                            <span className="text-[8px] text-white/15 uppercase tracking-wider">sem dados ainda</span>
                        )}
                    </div>
                    <div className="h-44 w-full relative">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 430 160">
                            <defs>
                                <linearGradient id="goldGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                    <stop offset="0%" stopColor="#EBC051" stopOpacity="0.18"></stop>
                                    <stop offset="100%" stopColor="#EBC051" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>

                            {/* Grid lines */}
                            {[0, 1, 2, 3].map(i => (
                                <line
                                    key={i}
                                    stroke="white"
                                    strokeOpacity="0.03"
                                    strokeWidth="0.5"
                                    x1={86 + i * 86}
                                    x2={86 + i * 86}
                                    y1="0"
                                    y2="160"
                                />
                            ))}

                            {hasData ? (
                                <>
                                    {/* preenchimento */}
                                    <path className="gold-gradient-fill" d={chartPath.fill} />
                                    {/* linha animada */}
                                    <path
                                        className="animated-path"
                                        d={chartPath.line}
                                        fill="none"
                                        stroke="#EBC051"
                                        strokeLinecap="round"
                                        strokeWidth="1.5"
                                    />
                                    {/* pontos de dados */}
                                    {chartPath.points.map((p, i) => (
                                        <g key={i}>
                                            <circle
                                                cx={p.x}
                                                cy={p.y}
                                                r={i === todayIdx ? 4 : last7Days[i].earnings > 0 ? 2.5 : 1.5}
                                                fill={i === todayIdx ? '#EBC051' : last7Days[i].earnings > 0 ? '#EBC051' : 'rgba(235,192,81,0.2)'}
                                                className="chart-dot"
                                            />
                                            {i === todayIdx && (
                                                <circle cx={p.x} cy={p.y} r={7} fill="none" stroke="#EBC051" strokeWidth="0.5" strokeOpacity="0.4" />
                                            )}
                                        </g>
                                    ))}
                                </>
                            ) : (
                                // Estado vazio: linha base pontilhada
                                <line
                                    x1="20" y1="130" x2="410" y2="130"
                                    stroke="#EBC051"
                                    strokeOpacity="0.08"
                                    strokeWidth="1"
                                    strokeDasharray="4 8"
                                />
                            )}
                        </svg>
                    </div>
                    {/* Labels dos dias */}
                    <div className="flex justify-between px-5 mt-1">
                        {last7Days.map((d, i) => (
                            <div key={i} className={`flex flex-col items-center gap-0.5 ${i === todayIdx ? '' : 'opacity-40'}`}>
                                <span className={`text-[8px] font-bold uppercase tracking-widest ${i === todayIdx ? 'text-primary-gold' : 'text-white/40'}`}>
                                    {d.label}
                                </span>
                                {last7Days[i].earnings > 0 && (
                                    <span className="text-[6px] text-primary-gold/50">
                                        R${(last7Days[i].earnings).toFixed(0)}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="px-8 space-y-4 pb-32 z-10 w-full mt-4">
                    <div className="glass-card rounded-2xl p-6 flex justify-between items-center text-left">
                        <div>
                            <h3 className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium mb-1.5">Total da semana</h3>
                            <p className="text-xl font-light tracking-tight text-white">R$ {formatCurrency(weeklyEarnings)}</p>
                        </div>
                        <div className="text-right">
                            <span className={`text-[11px] block font-medium tracking-wider mb-1 ${counts.weekDiff >= 0 ? 'text-primary-gold' : 'text-red-400'}`}>
                                {counts.weekDiff >= 0 ? '+' : ''}{counts.weekDiff.toFixed(1)}%
                            </span>
                            <div className={`h-[1px] w-6 ml-auto ${counts.weekDiff >= 0 ? 'bg-primary-gold/30' : 'bg-red-400/30'}`}></div>
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6 flex justify-between items-center text-left">
                        <div>
                            <h3 className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium mb-1.5">Total do mês</h3>
                            <p className="text-xl font-light tracking-tight text-white">R$ {formatCurrency(monthlyEarnings)}</p>
                        </div>
                        <div className="text-right">
                            <span className={`text-[11px] block font-medium tracking-wider mb-1 ${counts.monthDiff >= 0 ? 'text-primary-gold' : 'text-red-400'}`}>
                                {counts.monthDiff >= 0 ? '+' : ''}{counts.monthDiff.toFixed(1)}%
                            </span>
                            <div className={`h-[1px] w-6 ml-auto ${counts.monthDiff >= 0 ? 'bg-primary-gold/30' : 'bg-red-400/30'}`}></div>
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6 flex justify-between items-center text-left">
                        <div>
                            <h3 className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium mb-1.5">Total anual</h3>
                            <p className="text-xl font-light tracking-tight text-white">R$ {formatCurrency(annualProjection)}</p>
                        </div>
                        <div className="text-right">
                            <span className={`text-[11px] block font-medium tracking-wider mb-1 ${counts.yearDiff >= 0 ? 'text-primary-gold' : 'text-red-400'}`}>
                                {counts.yearDiff >= 0 ? '+' : ''}{counts.yearDiff.toFixed(1)}%
                            </span>
                            <div className={`h-[1px] w-6 ml-auto ${counts.yearDiff >= 0 ? 'bg-primary-gold/30' : 'bg-red-400/30'}`}></div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EliteDashboard;
