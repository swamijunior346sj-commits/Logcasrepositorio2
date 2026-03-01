
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
    onBack
}) => {
    const [period, setPeriod] = useState<'DIA' | 'SEMANA' | 'MÊS' | 'ANO'>('DIA');

    const formatBRL = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

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
                    dateStr: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
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

    return (
        <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] bg-black shadow-[0_0_100px_rgba(0,0,0,1)] ring-1 ring-white/5 pb-10">
            <style dangerouslySetInnerHTML={{
                __html: `
        .glass-card-elite {
            background: linear-gradient(165deg, rgba(30, 30, 30, 0.7) 0%, rgba(5, 5, 5, 0.9) 100%);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 0.5px solid rgba(212, 175, 55, 0.25);
            box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.5);
        }
        .black-metal-card {
            background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
            border: 1px solid rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
        }
        .black-metal-card::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(45deg, transparent 45%, rgba(212, 175, 55, 0.1) 50%, transparent 55%);
            background-size: 200% 200%;
            pointer-events: none;
        }
        .metallic-text {
            background: linear-gradient(135deg, #fff 0%, #D4AF37 50%, #AA771C 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .gold-metallic-gradient {
            background: linear-gradient(135deg, #AA771C 0%, #F9E29C 50%, #D4AF37 100%);
        }
        .neon-gold-glow {
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.4), inset 0 0 5px rgba(255, 255, 255, 0.5);
            border: 1px solid #F9E29C;
        }
      `}} />

            {/* Header */}
            <div className="pt-8"></div>

            {/* Wallet Card */}
            <div className="px-6 py-4">
                <div className="black-metal-card rounded-[24px] p-8 shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-6 opacity-20">
                        <span className="material-symbols-outlined text-6xl text-[#D4AF37]">contactless</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] tracking-[0.3em] font-bold text-white/40 uppercase mb-1">SALDO A RECEBER</p>
                        <h2 className="text-4xl font-black text-white tracking-tight mb-8 metallic-text">{formatBRL(wallet.pending)}</h2>
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-1">
                                <p className="text-[8px] tracking-[0.2em] font-bold text-white/30 uppercase">OPERADOR</p>
                                <p className="text-sm font-medium tracking-widest text-white/90 uppercase">{userName}</p>
                            </div>
                            <button
                                onClick={onSettle}
                                className="bg-gradient-to-tr from-[#AA771C] via-[#D4AF37] to-[#F9E29C] text-black px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(212,175,55,0.4)] active:scale-95 transition-all"
                            >
                                SACAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Period Tabs */}
            <div className="px-6 py-4">
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                    {['DIA', 'SEMANA', 'MÊS', 'ANO'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p as any)}
                            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${period === p ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-white/40 hover:text-white/60'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
            {/* Quick Actions */}
            <div className="px-6 py-2 flex flex-col gap-4 no-print">
                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={onEmitInvoice}
                        className="flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-2xl py-4 hover:bg-white/10 transition-all active:scale-95 text-center px-2 group"
                    >
                        <span className="material-symbols-outlined text-[#D4AF37] text-xl">description</span>
                        <span className="text-[9px] font-black tracking-widest text-white uppercase text-center leading-tight">EMITIR NOTA FISCAL (NF-E)</span>
                    </button>
                    <button
                        onClick={onExtrato}
                        className="flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-2xl py-4 hover:bg-white/10 transition-all active:scale-95 text-center px-2 group"
                    >
                        <span className="material-symbols-outlined text-[#D4AF37] text-xl">account_balance_wallet</span>
                        <span className="text-[9px] font-black tracking-widest text-white uppercase text-center leading-tight">GERAR RELATÓRIO SEMANAL</span>
                    </button>
                    <button
                        onClick={onExpressReport}
                        className="flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-2xl py-4 hover:bg-white/10 transition-all active:scale-95 text-center px-2 group"
                    >
                        <span className="material-symbols-outlined text-[#D4AF37] text-xl">bolt</span>
                        <span className="text-[9px] font-black tracking-widest text-white uppercase text-center leading-tight">RELATÓRIO EXPRESSO</span>
                    </button>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="px-6 pt-8 pb-4">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">TRANSAÇÕES</h3>
                    <button
                        onClick={() => alert("Filtro de datas ativo (Em breve)")}
                        className="flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-all text-[#D4AF37] hover:bg-white/10"
                    >
                        <span className="material-symbols-outlined text-xl">calendar_month</span>
                    </button>
                </div>

                <div className="w-full overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left border-b border-[#D4AF37]/40">
                                <th className="pb-4 text-[9px] font-black tracking-widest text-[#D4AF37] uppercase pr-2 text-left">DATA</th>
                                <th className="pb-4 text-[9px] font-black tracking-widest text-[#D4AF37] uppercase px-2 text-center">CARG./ENTR.</th>
                                <th className="pb-4 text-[9px] font-black tracking-widest text-[#D4AF37] uppercase px-2 text-center">ACAR.</th>
                                <th className="pb-4 text-[9px] font-black tracking-widest text-[#D4AF37] uppercase pl-2 text-right">VALOR</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D4AF37]/15">
                            {routeData.length > 0 ? (
                                routeData.map((route, idx) => (
                                    <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="py-5 pr-2">
                                            <p className="text-[12px] font-bold text-white tracking-wide text-left">{route.dateStr}</p>
                                        </td>
                                        <td className="py-5 px-2 text-center">
                                            <span className="text-[11px] font-bold text-white/80">{route.loaded}/{route.delivered}</span>
                                        </td>
                                        <td className="py-5 px-2 text-center">
                                            <span className="text-[11px] font-bold text-white/80">{route.acareacao}</span>
                                        </td>
                                        <td className="py-5 pl-2 text-right">
                                            <span className="text-[11px] font-black text-white tracking-tight">{formatBRL(route.value)}</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center opacity-40">
                                        <span className="material-symbols-outlined text-4xl mb-2">history</span>
                                        <p className="text-xs font-bold uppercase tracking-widest">Nenhuma transação encontrada</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default EliteReports;
