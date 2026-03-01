
import React, { useState, useMemo } from 'react';
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
    const [period, setPeriod] = useState<'DIA' | 'SEMANA' | 'MÊS' | 'ANO'>('DIA');

    const formatBRL = (val: number) => {
        const parts = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).formatToParts(val);
        const currency = parts.find(p => p.type === 'currency')?.value || 'R$';
        const value = parts.filter(p => p.type !== 'currency' && p.type !== 'literal').map(p => p.value).join('');
        return { currency, value };
    };

    // Group logs by day for the simplified table
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
                    dateStr: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', ''),
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
        <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] min-h-[100dvh] bg-[#000000] text-zinc-100 font-sans selection:bg-[#EBC051]/30 pb-20">
            <style dangerouslySetInnerHTML={{
                __html: `
        .glass-effect {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(235, 192, 81, 0.1);
        }
        .gold-radial-glow {
            background: radial-gradient(circle at center, rgba(235, 192, 81, 0.12) 0%, rgba(0, 0, 0, 0) 70%);
        }
        .pinstripe-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, rgba(235, 192, 81, 0.3) 50%, transparent 100%);
            width: 100%;
        }
      `}} />

            <div className="flex flex-col pt-16 pb-8 px-6">
                <header className="relative mb-8 flex flex-col items-center justify-center py-6">
                    <div className="absolute inset-0 gold-radial-glow -z-10 scale-150"></div>
                    <div className="text-center space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.5em] font-medium text-zinc-500 mb-4">Saldo a Receber</p>
                        <div className="flex items-center justify-center gap-4">
                            <h2 className="text-6xl font-extrabold font-display text-[#EBC051] tracking-tighter" style={{ fontFamily: '"Montserrat", sans-serif' }}>
                                <span className="text-3xl font-light mr-1">{walletFormatted.currency}</span>{walletFormatted.value}
                            </h2>
                            <button onClick={onSettle} className="px-5 py-1.5 rounded-full border border-[#EBC051]/40 text-[#EBC051] font-bold text-[9px] tracking-[0.25em] hover:bg-[#EBC051] hover:text-black transition-all duration-300 active:scale-95 bg-black/40 backdrop-blur-md uppercase">
                                Sacar
                            </button>
                        </div>
                        <div className="pt-6 flex flex-col items-center">
                            <div className="pinstripe-divider opacity-40"></div>
                            <p className="text-[9px] font-medium tracking-[0.3em] uppercase mt-4 text-zinc-500 flex items-center gap-2">
                                <span className="w-1 h-1 bg-[#EBC051] rounded-full"></span>
                                {userName}
                            </p>
                        </div>
                    </div>
                </header>

                <main className="space-y-10">
                    <div className="bg-zinc-900/30 p-1 rounded-2xl flex items-center border border-white/5 backdrop-blur-md">
                        {['DIA', 'SEMANA', 'MÊS', 'ANO'].map((p) => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p as any)}
                                className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold tracking-widest transition-all ${period === p
                                    ? 'bg-[#EBC051]/10 text-[#EBC051] border border-[#EBC051]/20'
                                    : 'text-zinc-500'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <button onClick={onEmitInvoice} className="flex flex-col items-center justify-center p-6 rounded-3xl glass-effect group active:scale-95 transition-transform">
                            <span className="material-symbols-outlined text-[#EBC051] mb-3 text-2xl">description</span>
                            <span className="text-[9px] font-bold text-center uppercase tracking-widest leading-tight text-zinc-400">Emitir<br />NF-e</span>
                        </button>
                        <button onClick={onWeeklyReport} className="flex flex-col items-center justify-center p-6 rounded-3xl glass-effect group active:scale-95 transition-transform">
                            <span className="material-symbols-outlined text-[#EBC051] mb-3 text-2xl">account_balance_wallet</span>
                            <span className="text-[9px] font-bold text-center uppercase tracking-widest leading-tight text-zinc-400">Relatório<br />Semanal</span>
                        </button>
                        <button onClick={onExpressReport} className="flex flex-col items-center justify-center p-6 rounded-3xl glass-effect group active:scale-95 transition-transform">
                            <span className="material-symbols-outlined text-[#EBC051] mb-3 text-2xl">bolt</span>
                            <span className="text-[9px] font-bold text-center uppercase tracking-widest leading-tight text-zinc-400">Relatório<br />Expresso</span>
                        </button>
                    </div>

                    <section className="flex-1 pt-4">
                        <div className="flex items-center justify-between mb-8 px-1">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-500">Transações Recentes</h3>
                            <button onClick={onExtrato} className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900/40 border border-white/5 active:scale-95 transition-all">
                                <span className="material-symbols-outlined text-[#EBC051]/70 text-lg">calendar_month</span>
                            </button>
                        </div>

                        <div className="w-full space-y-6">
                            <div className="grid grid-cols-4 px-2 pb-2">
                                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Data</span>
                                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-center">Entrega</span>
                                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-center">Acar.</span>
                                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-right">Valor</span>
                            </div>
                            <div className="pinstripe-divider opacity-20"></div>

                            <div className="space-y-4 mt-4">
                                {routeData.length > 0 ? (
                                    routeData.map((route, idx) => (
                                        <div key={idx} className="grid grid-cols-4 px-2 items-center py-2 hover:bg-white/[0.02] rounded-lg transition-colors cursor-default">
                                            <span className="text-sm font-medium tracking-tight text-zinc-300">{route.dateStr.replace('de ', '')}</span>
                                            <span className="text-xs font-light text-center text-zinc-500">{route.loaded}/{route.delivered}</span>
                                            <span className="text-xs font-light text-center text-zinc-500">{route.acareacao}</span>
                                            <span className="text-sm font-bold text-right tracking-tight text-[#EBC051]">{route.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                        </div>
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
        </div>
    );
};

export default EliteReports;
