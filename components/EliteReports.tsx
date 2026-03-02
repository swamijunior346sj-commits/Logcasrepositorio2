import React, { useState, useMemo, useEffect } from 'react';
import { LogEntry } from '../types';

interface EliteReportsProps {
    logs: LogEntry[];
    userName: string;
    wallet: {
        pending: number;
        paid: number;
        cumulative: number;
    };
    onSettle: () => void;
    onExportPDF: () => void;
    onEmitInvoice: () => void;
    onExtrato: () => void;
    onExpressReport: () => void;
    onWeeklyReport: () => void;
    onDeleteLog?: (dateStr: string) => void;
    onEditLog?: (dateStr: string) => void;
    onBack?: () => void;
}

const EliteReports: React.FC<EliteReportsProps> = ({
    logs,
    userName,
    wallet,
    onSettle,
    onExportPDF,
    onEmitInvoice,
    onExtrato,
    onExpressReport,
    onWeeklyReport,
    onDeleteLog,
    onEditLog,
    onBack
}) => {
    const [period, setPeriod] = useState<'DIA' | 'SEM' | 'MÊS' | 'ANO'>('DIA');
    const [animateGauge, setAnimateGauge] = useState(false);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [deletingRow, setDeletingRow] = useState<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setAnimateGauge(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const formatBRL = (val: number) => {
        const parts = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).formatToParts(val);
        const currency = parts.find(p => p.type === 'currency')?.value || 'R$';
        const value = parts.filter(p => p.type !== 'currency' && p.type !== 'literal').map(p => p.value).join('');
        return { currency, value };
    };

    const GAUGE_GOAL = 10000;
    const progressPercent = Math.min(100, (wallet.pending / GAUGE_GOAL) * 100);

    const routeData = useMemo(() => {
        const groups: {
            [key: string]: {
                dateStr: string;
                loaded: number;
                delivered: number;
                acareacao: number;
                value: number;
            }
        } = {};

        logs.forEach(log => {
            const date = new Date(log.timestamp);
            const key = date.toISOString().split('T')[0];

            if (!groups[key]) {
                groups[key] = {
                    dateStr: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '').toUpperCase(),
                    loaded: 0,
                    delivered: 0,
                    acareacao: 0,
                    value: 0
                };
            }

            if (log.type === 'ENTRADA') groups[key].loaded += 1;
            if (log.type === 'SAIDA') groups[key].delivered += 1;
            if (log.type === 'DEVOLUCAO') groups[key].acareacao += 1;
            groups[key].value += log.value;
        });

        return Object.values(groups).sort((a, b) => b.dateStr.localeCompare(a.dateStr));
    }, [logs]);

    const walletFormatted = formatBRL(wallet.pending);

    return (
        <div className="max-w-md mx-auto min-h-screen relative flex flex-col pt-10 pb-6 px-4 bg-[#000000] text-zinc-100 font-sans selection:bg-[#EBC051]/30">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap');
                
                :root {
                    --primary-gold: #EBC051;
                }
                .font-display { font-family: 'Montserrat', sans-serif; }
                .sharp-card {
                    background: #050505;
                    border: 1px solid rgba(235, 192, 81, 0.1);
                }
                .micro-divider {
                    height: 0.5px;
                    background: rgba(235, 192, 81, 0.15);
                    width: 100%;
                }
                .gauge-container {
                    position: relative;
                    width: 260px;
                    height: 260px;
                }
                .gauge-progress {
                    fill: none;
                    stroke: var(--primary-gold);
                    stroke-width: 3;
                    stroke-linecap: round;
                    stroke-dasharray: 628;
                    transition: stroke-dashoffset 2.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .grid-activity {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr 1fr 1fr 1.5fr;
                    align-items: center;
                }
                .cockpit-float {
                    background: rgba(10, 10, 10, 0.98);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(235, 192, 81, 0.4);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.9);
                    transform: translateY(-50%);
                    animation: cockpit-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                @keyframes cockpit-in {
                    from { opacity: 0; transform: translateY(-40%) scale(0.8); }
                    to { opacity: 1; transform: translateY(-50%) scale(1); }
                }
                .row-slide-out {
                    animation: slide-out 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards;
                }
                @keyframes slide-out {
                    0% { transform: translateX(0); opacity: 1; filter: blur(0); }
                    100% { transform: translateX(100%); opacity: 0; filter: blur(10px); height: 0; margin: 0; }
                }
                `
            }} />

            <header className="relative mb-8 flex flex-col items-center justify-center py-4">
                <div className="gauge-container flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 210 210">
                        <circle className="fill-none stroke-white/[0.05] stroke-[3]" cx="105" cy="105" r="100"></circle>
                        <circle
                            className="gauge-progress"
                            cx="105" cy="105" r="100"
                            style={{
                                strokeDashoffset: animateGauge ? 628 - (628 * progressPercent / 100) : 628
                            }}
                        ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-[9px] uppercase tracking-[0.6em] font-medium text-zinc-500 mb-1">Saldo Total</p>
                        <h2 className="text-5xl font-extrabold font-display text-white tracking-tighter">
                            <span className="text-xl font-light text-[#EBC051] mr-0.5">{walletFormatted.currency}</span>{walletFormatted.value}
                        </h2>
                        <div className="mt-6">
                            <button
                                onClick={onSettle}
                                className="px-8 py-2 rounded-full border border-[#EBC051]/40 text-[#EBC051] font-bold text-[9px] tracking-[0.3em] hover:bg-[#EBC051] hover:text-black transition-all duration-300 bg-transparent active:scale-95"
                            >
                                RESGATAR
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="space-y-8 flex-1">
                <div className="bg-zinc-900/20 p-1 rounded-full flex items-center border border-white/5 mx-auto max-w-[260px]">
                    {['DIA', 'SEM', 'MÊS', 'ANO'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p as any)}
                            className={`flex-1 py-1.5 rounded-full font-bold text-[8px] tracking-widest transition-all uppercase ${period === p
                                ? 'bg-[#EBC051]/10 text-[#EBC051] border border-[#EBC051]/20'
                                : 'text-zinc-600'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <button onClick={onEmitInvoice} className="flex flex-col items-center justify-center py-4 rounded-xl sharp-card group active:scale-95 transition-transform px-1">
                        <span className="material-symbols-outlined text-[#EBC051]/80 mb-2 text-xl">description</span>
                        <span className="text-[7px] font-bold text-center uppercase tracking-[0.15em] leading-tight text-zinc-500">NFS-e</span>
                    </button>
                    <button onClick={onWeeklyReport} className="flex flex-col items-center justify-center py-4 rounded-xl sharp-card group active:scale-95 transition-transform px-1">
                        <span className="material-symbols-outlined text-[#EBC051]/80 mb-2 text-xl">calendar_view_week</span>
                        <span className="text-[7px] font-bold text-center uppercase tracking-[0.15em] leading-tight text-zinc-500">Relatório Semanal</span>
                    </button>
                    <button onClick={onExpressReport} className="flex flex-col items-center justify-center py-4 rounded-xl sharp-card group active:scale-95 transition-transform px-1">
                        <span className="material-symbols-outlined text-[#EBC051]/80 mb-2 text-xl">bolt</span>
                        <span className="text-[7px] font-bold text-center uppercase tracking-[0.15em] leading-tight text-zinc-500">Relatório Flash</span>
                    </button>
                </div>

                <section className="pt-2">
                    <div className="flex items-center justify-between mb-5 px-1">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">Atividade Recente</h3>
                        <button onClick={onExtrato} className="active:scale-95 transition-transform">
                            <span className="material-symbols-outlined text-[#EBC051]/60 text-base">filter_list</span>
                        </button>
                    </div>

                    <div className="w-full">
                        <div className="grid-activity px-1 mb-2">
                            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Data</span>
                            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest text-center">Carr.</span>
                            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest text-center">Entr.</span>
                            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest text-center">Ins.</span>
                            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest text-right">Valor</span>
                        </div>
                        <div className="space-y-0 text-[11px]">
                            <div className="micro-divider"></div>
                            {routeData.length > 0 ? (
                                routeData.slice(0, 6).map((route, idx) => (
                                    <React.Fragment key={idx}>
                                        <div
                                            className={`relative grid-activity px-1 py-4 items-center cursor-pointer active:bg-white/[0.02] transition-all ${deletingRow === idx ? 'row-slide-out' : ''}`}
                                            onClick={() => setSelectedRow(selectedRow === idx ? null : idx)}
                                        >
                                            <span className="text-[9px] font-semibold text-zinc-100 tracking-tighter uppercase">{route.dateStr}</span>
                                            <span className="text-center text-zinc-400">{route.loaded}</span>
                                            <span className="text-center text-zinc-400">{route.delivered}</span>
                                            <span className="text-center text-zinc-400">{route.acareacao}</span>
                                            <span className="font-bold text-right tracking-tight text-[#EBC051]">{route.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>

                                            {/* Cockpit Menu Integration */}
                                            {selectedRow === idx && !deletingRow && (
                                                <div className="absolute right-0 top-1/2 cockpit-float flex items-center gap-6 py-4 px-8 rounded-full z-50">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (onEditLog) onEditLog(route.dateStr);
                                                            setSelectedRow(null);
                                                        }}
                                                        className="flex flex-col items-center gap-1.5 group/btn"
                                                    >
                                                        <div className="size-10 rounded-full flex items-center justify-center bg-blue-500/10 border border-blue-500/20 active:scale-90 transition-all">
                                                            <span className="material-symbols-outlined text-blue-500 text-lg">edit</span>
                                                        </div>
                                                        <span className="text-[8px] font-black text-blue-500/80 uppercase tracking-widest">Editar</span>
                                                    </button>
                                                    <div className="w-[1px] h-8 bg-white/5"></div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setDeletingRow(idx);
                                                            setTimeout(() => {
                                                                if (onDeleteLog) onDeleteLog(route.dateStr);
                                                                setDeletingRow(null);
                                                                setSelectedRow(null);
                                                            }, 600);
                                                        }}
                                                        className="flex flex-col items-center gap-1.5 group/btn"
                                                    >
                                                        <div className="size-10 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20 active:scale-90 transition-all">
                                                            <span className="material-symbols-outlined text-red-500 text-lg">delete</span>
                                                        </div>
                                                        <span className="text-[8px] font-black text-red-500/80 uppercase tracking-widest">Excluir</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="micro-divider"></div>
                                    </React.Fragment>
                                ))
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center">
                                    <span className="material-symbols-outlined text-4xl mb-3 text-zinc-800">history</span>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">Histórico Vazio</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <footer className="mt-8 pb-2">
                <div className="mx-auto w-24 h-1 bg-white/5 rounded-full"></div>
            </footer>
        </div>
    );
};

export default EliteReports;
