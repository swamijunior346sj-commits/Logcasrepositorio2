
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
    onBack
}) => {
    const [period, setPeriod] = useState<'DIA' | 'SEM' | 'MÊS' | 'ANO'>('DIA');
    const [animateGauge, setAnimateGauge] = useState(false);

    useEffect(() => {
        // Trigger animation shortly after mount
        const timer = setTimeout(() => setAnimateGauge(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const formatBRL = (val: number) => {
        const parts = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).formatToParts(val);
        const currency = parts.find(p => p.type === 'currency')?.value || 'R$';
        const value = parts.filter(p => p.type !== 'currency' && p.type !== 'literal').map(p => p.value).join('');
        return { currency, value };
    };

    // Calculate maximum value over all periods to set gauge progress correctly, or use a fixed goal
    const GAUGE_GOAL = 10000; // Arbitrary goal for the circle
    const progressPercent = Math.min(100, (wallet.pending / GAUGE_GOAL) * 100);
    const circleCircumference = 2 * Math.PI * 100; // r=100 -> ~628
    const strokeDashoffset = circleCircumference - (circleCircumference * progressPercent / 100);

    // Group logs by day for the simplified table
    const routeData = useMemo(() => {
        const groups: {
            [key: string]: {
                dateStr: string;
                loaded: number;
                delivered: number;
                acareacao: number;
                value: number;
                status: 'Concluído' | 'Pendente';
            }
        } = {};

        logs.forEach(log => {
            const date = new Date(log.timestamp);
            const key = date.toISOString().split('T')[0];

            if (!groups[key]) {
                groups[key] = {
                    dateStr: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', ''),
                    loaded: 0,
                    delivered: 0,
                    acareacao: 0,
                    value: 0,
                    status: 'Concluído'
                };
            }

            if (log.type === 'ENTRADA') groups[key].loaded += 1;
            if (log.type === 'SAIDA') groups[key].delivered += 1;
            if (log.type === 'DEVOLUCAO') groups[key].acareacao += 1;

            groups[key].value += log.value;
            // Mock status logic
            if (groups[key].value < 50) groups[key].status = 'Pendente';
            else groups[key].status = 'Concluído';
        });

        return Object.values(groups).sort((a, b) => b.dateStr.localeCompare(a.dateStr));
    }, [logs]);

    const walletFormatted = formatBRL(wallet.pending);

    return (
        <div className="max-w-md mx-auto min-h-screen relative flex flex-col pt-8 pb-32 px-6 bg-[#000000] text-zinc-100 font-sans selection:bg-[#EBC051]/30 overflow-x-hidden animate-in fade-in duration-500">
            <style dangerouslySetInnerHTML={{
                __html: `
        :root {
            --primary-gold: #EBC051;
        }
        .sharp-card {
            background: #050505;
            border: 1px solid rgba(235, 192, 81, 0.1);
        }
        .micro-divider {
            height: 0.5px;
            background: rgba(235, 192, 81, 0.2);
            width: 100%;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20;
        }
        .gauge-container {
            position: relative;
            width: 240px;
            height: 240px;
        }
        .gauge-svg {
            transform: rotate(-90deg);
        }
        .gauge-bg {
            fill: none;
            stroke: rgba(235, 192, 81, 0.05);
            stroke-width: 4;
        }
        .gauge-progress {
            fill: none;
            stroke: var(--primary-gold);
            stroke-width: 4;
            stroke-linecap: round;
            stroke-dasharray: 628;
            stroke-dashoffset: 628; /* starts at 0 progress */
            transition: stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        `}} />

            <header className="relative mb-6 flex flex-col items-center justify-center py-4">
                <div className="gauge-container flex items-center justify-center">
                    <svg className="gauge-svg w-full h-full drop-shadow-[0_0_15px_rgba(235,192,81,0.2)]" viewBox="0 0 210 210">
                        <circle className="gauge-bg" cx="105" cy="105" r="100"></circle>
                        <circle
                            className="gauge-progress"
                            cx="105" cy="105" r="100"
                            style={{ strokeDashoffset: animateGauge ? strokeDashoffset : 628 }}
                        ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-[9px] uppercase tracking-[0.6em] font-medium text-zinc-500 mb-1">Saldo Total</p>
                        <h2 className="text-4xl font-extrabold font-display text-white tracking-tighter" style={{ fontFamily: '"Montserrat", sans-serif' }}>
                            <span className="text-xl font-light text-[#EBC051] mr-0.5">{walletFormatted.currency}</span>{walletFormatted.value}
                        </h2>
                        <div className="mt-4">
                            <button onClick={onSettle} className="px-6 py-1.5 rounded-full border border-[#EBC051]/40 text-[#EBC051] font-bold text-[8px] tracking-[0.3em] hover:bg-[#EBC051] hover:text-black transition-all duration-300 bg-transparent active:scale-95">
                                RESGATAR
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="space-y-8">
                <div className="bg-zinc-900/30 p-1 rounded-full flex items-center border border-white/5 mx-auto max-w-[280px]">
                    {['DIA', 'SEM', 'MÊS', 'ANO'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p as any)}
                            className={`flex-1 py-1.5 rounded-full font-bold text-[8px] tracking-widest transition-all ${period === p
                                ? 'bg-[#EBC051]/10 text-[#EBC051] border border-[#EBC051]/20'
                                : 'text-zinc-600'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <button onClick={onEmitInvoice} className="flex flex-col items-center justify-center py-4 rounded-2xl sharp-card group active:scale-95 transition-transform bg-[#050505]">
                        <span className="material-symbols-outlined text-[#EBC051]/80 mb-2 text-xl">description</span>
                        <span className="text-[8px] font-bold text-center uppercase tracking-widest leading-tight text-zinc-500">NFS-e</span>
                    </button>
                    <button onClick={onWeeklyReport} className="flex flex-col items-center justify-center py-4 px-1 rounded-2xl sharp-card group active:scale-95 transition-transform bg-[#050505]">
                        <span className="material-symbols-outlined text-[#EBC051]/80 mb-2 text-xl">account_balance_wallet</span>
                        <span className="text-[7px] font-bold text-center uppercase tracking-wider leading-[1.2em] text-zinc-500">RELATÓRIO FECHAMENTO SEMANAL</span>
                    </button>
                    <button onClick={onExpressReport} className="flex flex-col items-center justify-center py-4 rounded-2xl sharp-card group active:scale-95 transition-transform bg-[#050505]">
                        <span className="material-symbols-outlined text-[#EBC051]/80 mb-2 text-xl">bolt</span>
                        <span className="text-[8px] font-bold text-center uppercase tracking-widest leading-tight text-zinc-500">EXPRESSO</span>
                    </button>
                </div>

                <section className="flex-1 pt-2">
                    <div className="flex items-center justify-between mb-6 px-1">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400">Atividade Recente</h3>
                        <button onClick={onExtrato} className="active:scale-95 transition-transform flex items-center">
                            <span className="material-symbols-outlined text-[#EBC051]/60 text-base">filter_list</span>
                        </button>
                    </div>

                    <div className="w-full space-y-4">
                        <div className="grid grid-cols-4 px-2">
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Data</span>
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest text-center">Status</span>
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest text-center">Qtd</span>
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest text-right">Valor</span>
                        </div>
                        <div className="space-y-0">
                            <div className="micro-divider"></div>

                            {routeData.length > 0 ? (
                                routeData.slice(0, 5).map((route, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="grid grid-cols-4 px-2 py-4 items-center hover:bg-white/[0.02] transition-colors cursor-default">
                                            <span className="text-xs font-semibold text-white tracking-tight">{route.dateStr}</span>
                                            <span className="text-[10px] font-medium text-center text-zinc-400 uppercase tracking-tighter">{route.status}</span>
                                            <span className="text-xs font-light text-center text-zinc-400">{route.delivered}</span>
                                            <span className="text-sm font-bold text-right tracking-tight text-[#EBC051]">{route.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                        </div>
                                        <div className="micro-divider"></div>
                                    </React.Fragment>
                                ))
                            ) : (
                                <div className="py-12 text-center flex flex-col items-center">
                                    <span className="material-symbols-outlined text-4xl mb-2 text-zinc-700">history</span>
                                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">Nenhuma transação encontrada</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EliteReports;
