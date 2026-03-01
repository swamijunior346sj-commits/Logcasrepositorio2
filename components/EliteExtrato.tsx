
import React, { useMemo } from 'react';
import { LogEntry } from '../types';

interface EliteExtratoProps {
    logs: LogEntry[];
    userName: string;
    valorPorPacote: number;
    onBack: () => void;
    onExport: () => void;
}

const EliteExtrato: React.FC<EliteExtratoProps> = ({ logs, userName, valorPorPacote, onBack, onExport }) => {
    const formatBRL = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const stats = useMemo(() => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const monthLogs = logs.filter(l => {
            const d = new Date(l.timestamp);
            return d >= startOfMonth && d <= endOfMonth;
        });

        const carregados = monthLogs.filter(l => l.type === 'ENTRADA').length;
        const entregues = monthLogs.filter(l => l.type === 'SAIDA').length;
        const devolucoes = monthLogs.filter(l => l.type === 'DEVOLUCAO').length;

        const ganhosRota = entregues * valorPorPacote;
        // Bonus: 10% of route earnings if delivery rate > 95%
        const deliveryRate = carregados > 0 ? entregues / carregados : 0;
        const bonusPerformance = deliveryRate > 0.95 ? ganhosRota * 0.10 : 0;
        const saldoLiquido = ganhosRota + bonusPerformance;

        const monthNames = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
        const periodLabel = `01 ${monthNames[now.getMonth()]} — ${endOfMonth.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;

        // Generate operator code from name
        const operatorCode = `LC-${String(userName.charCodeAt(0) * 100 + userName.length).padStart(4, '0')}`;

        return {
            carregados,
            entregues,
            devolucoes,
            ganhosRota,
            bonusPerformance,
            saldoLiquido,
            periodLabel,
            operatorCode,
            deliveryRate,
        };
    }, [logs, valorPorPacote, userName]);

    return (
        <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] mx-auto bg-black shadow-2xl ring-1 ring-white/5 pb-10 animate-in fade-in duration-500">
            <style dangerouslySetInnerHTML={{
                __html: `
                .pdf-page-extrato {
                    background: linear-gradient(180deg, #121212 0%, #000000 100%);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
                    border: 0.5px solid rgba(212, 175, 55, 0.2);
                    position: relative;
                }
                .gold-divider-extrato {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
                    opacity: 0.4;
                }
                .metallic-gold-extrato {
                    background: linear-gradient(135deg, #F5F5F5 0%, #D4AF37 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                @keyframes shimmer-extrato {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .liquid-gold-btn-extrato {
                    background: linear-gradient(
                        90deg, 
                        #AA771C 0%, 
                        #D4AF37 25%, 
                        #F5F5F5 50%, 
                        #D4AF37 75%, 
                        #AA771C 100%
                    );
                    background-size: 200% auto;
                    animation: shimmer-extrato 4s linear infinite;
                }
            `}} />

            {/* Header */}
            <div className="flex items-center justify-between p-6 mt-2">
                <button
                    onClick={onBack}
                    className="flex size-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#D4AF37] active:scale-90 transition-all"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">LOGCASH PREMIUM</span>
                </div>
                <div className="size-11"></div>
            </div>

            {/* PDF Document */}
            <div className="px-5">
                <div className="pdf-page-extrato rounded-xl min-h-[520px] w-full p-6 flex flex-col">
                    {/* Document Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="size-11 mb-3 border border-[#D4AF37]/40 flex items-center justify-center rotate-45">
                            <span className="material-symbols-outlined text-[#D4AF37] -rotate-45 text-xl">account_balance_wallet</span>
                        </div>
                        <h1 className="text-base font-black tracking-[0.3em] metallic-gold-extrato uppercase mb-1">EXTRATO LOGCASH</h1>
                        <div className="flex flex-col items-center gap-0.5">
                            <p className="text-[8px] font-bold text-white/50 tracking-widest uppercase text-center">PERÍODO: {stats.periodLabel}</p>
                            <p className="text-[8px] font-bold text-[#D4AF37] tracking-widest uppercase">OPERADOR ELITE: #{stats.operatorCode}</p>
                        </div>
                    </div>

                    {/* Section 1: Route Summary */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[9px] font-black text-[#D4AF37] tracking-[0.2em] uppercase whitespace-nowrap">01. RESUMO DA ROTA</span>
                            <div className="flex-1 gold-divider-extrato"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-y-4">
                            <div>
                                <p className="text-[7px] text-white/40 font-bold uppercase tracking-widest mb-0.5">VOLUMES CARREGADOS</p>
                                <p className="text-sm font-bold text-white">{stats.carregados} UN</p>
                            </div>
                            <div>
                                <p className="text-[7px] text-white/40 font-bold uppercase tracking-widest mb-0.5">ENTREGAS COM SUCESSO</p>
                                <p className="text-sm font-bold text-white">{stats.entregues} UN</p>
                            </div>
                            <div>
                                <p className="text-[7px] text-white/40 font-bold uppercase tracking-widest mb-0.5">ACAREAÇÕES</p>
                                <p className="text-sm font-bold text-[#D4AF37]">{String(stats.devolucoes).padStart(2, '0')} UN</p>
                            </div>
                            <div>
                                <p className="text-[7px] text-white/40 font-bold uppercase tracking-widest mb-0.5">TAXA DE SUCESSO</p>
                                <p className={`text-sm font-bold ${stats.deliveryRate >= 0.95 ? 'text-emerald-400' : 'text-white'}`}>
                                    {(stats.deliveryRate * 100).toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Financial */}
                    <div className="mb-4">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[9px] font-black text-[#D4AF37] tracking-[0.2em] uppercase whitespace-nowrap">02. FINANCEIRO</span>
                            <div className="flex-1 gold-divider-extrato"></div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                                <div>
                                    <p className="text-[8px] font-bold text-white tracking-widest">GANHOS DE ROTA</p>
                                    <p className="text-[7px] text-white/30 uppercase tracking-tighter">FECHAMENTO MENSAL</p>
                                </div>
                                <span className="text-xs font-bold text-white">+{formatBRL(stats.ganhosRota)}</span>
                            </div>

                            {stats.bonusPerformance > 0 && (
                                <div className="flex justify-between items-center py-1 border-b border-white/5">
                                    <div>
                                        <p className="text-[8px] font-bold text-white tracking-widest">BÔNUS PERFORMANCE</p>
                                        <p className="text-[7px] text-white/30 uppercase tracking-tighter">SCORE PLATINUM</p>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-400">+{formatBRL(stats.bonusPerformance)}</span>
                                </div>
                            )}
                        </div>

                        {/* Net Balance */}
                        <div className="mt-6 flex justify-between items-center p-3.5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg">
                            <span className="text-[9px] font-black text-white tracking-widest uppercase">SALDO LÍQUIDO</span>
                            <span className="text-lg font-black metallic-gold-extrato">{formatBRL(stats.saldoLiquido)}</span>
                        </div>
                    </div>

                    {/* Document Footer */}
                    <div className="mt-auto text-center opacity-20 pt-4">
                        <p className="text-[7px] font-bold tracking-[0.4em] text-white uppercase">LogCash Secure Document</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="w-full px-6 pt-8 flex flex-col items-center gap-6">
                {/* Export Button */}
                <button
                    onClick={onExport}
                    className="liquid-gold-btn-extrato w-full text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-[#D4AF37]/30 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined">file_export</span>
                    EXPORTAR
                </button>

                {/* Share Section */}
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex items-center gap-4 mb-6">
                        <div className="flex-1 h-[1px] bg-white/10"></div>
                        <p className="text-[8px] font-black text-white/40 tracking-[0.3em] uppercase">COMPARTILHAR DOCUMENTO</p>
                        <div className="flex-1 h-[1px] bg-white/10"></div>
                    </div>

                    <div className="flex items-center justify-center gap-8">
                        <div className="flex flex-col items-center gap-2.5">
                            <button className="size-14 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all active:scale-90">
                                <span className="material-symbols-outlined text-2xl">chat_bubble</span>
                            </button>
                            <span className="text-[7px] font-bold text-white/60 tracking-widest uppercase">WhatsApp</span>
                        </div>
                        <div className="flex flex-col items-center gap-2.5">
                            <button className="size-14 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all active:scale-90">
                                <span className="material-symbols-outlined text-2xl">mail</span>
                            </button>
                            <span className="text-[7px] font-bold text-white/60 tracking-widest uppercase">E-mail</span>
                        </div>
                        <div className="flex flex-col items-center gap-2.5">
                            <button className="size-14 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all active:scale-90">
                                <span className="material-symbols-outlined text-2xl">ios_share</span>
                            </button>
                            <span className="text-[7px] font-bold text-white/60 tracking-widest uppercase">Outros</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EliteExtrato;
