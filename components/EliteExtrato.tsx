
import React, { useMemo, useState } from 'react';
import { LogEntry } from '../types';

interface EliteExtratoProps {
    logs: LogEntry[];
    userName: string;
    valorPorPacote: number;
    onBack: () => void;
    onExport: () => void;
}

const EliteExtrato: React.FC<EliteExtratoProps> = ({ logs, userName, valorPorPacote, onBack, onExport }) => {
    const [isExporting, setIsExporting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const formatBRL = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const handleExportClick = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            setShowSuccess(true);
            onExport();
        }, 3000);
    };

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

        const monthNames = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
        const periodLabel = `01 DE ${monthNames[now.getMonth()]} A ${endOfMonth.getDate()} DE ${monthNames[now.getMonth()]} DE ${now.getFullYear()}`;

        // Generate operator code from name
        const operatorCode = `LC-${String(userName.charCodeAt(0) * 100 + userName.length).padStart(4, '0')}-2024`;

        return {
            carregados,
            entregues,
            devolucoes,
            ganhosRota,
            bonusPerformance,
            saldoLiquido,
            periodLabel,
            operatorCode,
        };
    }, [logs, valorPorPacote, userName]);

    return (
        <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] mx-auto bg-black shadow-2xl ring-1 ring-white/5 pb-10 animate-in fade-in duration-500">
            <style dangerouslySetInnerHTML={{
                __html: `
                .pdf-document-premium {
                    background-color: #000000;
                    aspect-ratio: 1 / 1.414;
                    box-shadow: 0 0 0 1px rgba(235, 192, 81, 0.2);
                    position: relative;
                    color: #F5F5F5;
                }
                .gold-border-section-premium {
                    border: 1px solid rgba(235, 192, 81, 0.5);
                    border-radius: 4px;
                }
                .metallic-gold-text-premium {
                    background: linear-gradient(135deg, #C49B3C 0%, #EBC051 50%, #C49B3C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                @keyframes shimmer-premium {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .liquid-gold-btn-premium {
                    background: linear-gradient(
                        90deg, 
                        #C49B3C 0%, 
                        #EBC051 25%, 
                        #F5F5F5 50%, 
                        #EBC051 75%, 
                        #C49B3C 100%
                    );
                    background-size: 200% auto;
                    animation: shimmer-premium 4s linear infinite;
                }
                /* Loading & Success Modal Styles */
                .glass-overlay-premium {
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
                .metallic-gold-loader-premium {
                    border: 3px solid rgba(235, 192, 81, 0.1);
                    border-top: 3px solid #EBC051;
                    border-right: 3px solid #EBC051;
                    box-shadow: 0 0 15px rgba(235, 192, 81, 0.3);
                }
                .glass-modal-premium {
                    background: rgba(18, 18, 18, 0.75);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(235, 192, 81, 0.3);
                }
                .particle-premium {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: #EBC051;
                    border-radius: 50%;
                    pointer-events: none;
                }
                @keyframes pulse-gentle-premium {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
                @keyframes float-particle-premium {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    25% { opacity: 1; }
                    100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
                }
                @keyframes glow-pulse-premium {
                    0%, 100% { filter: drop-shadow(0 0 5px rgba(235, 192, 81, 0.4)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 20px rgba(235, 192, 81, 0.7)); transform: scale(1.05); }
                }
                .animate-pulse-gentle-premium { animation: pulse-gentle-premium 3s ease-in-out infinite; }
                .animate-float-particle-premium { animation: float-particle-premium 10s linear infinite; }
                .animate-glow-pulse-premium { animation: glow-pulse-premium 2s ease-in-out infinite; }
                .animate-spin-slow-premium { animation: spin 3s linear infinite; }
            `}} />

            {/* Header */}
            <div className={`flex items-center justify-between p-6 mt-4 transition-all duration-500 ${isExporting || showSuccess ? 'opacity-40' : 'opacity-100'}`}>
                <button
                    onClick={onBack}
                    className="flex size-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#EBC051] active:scale-90 transition-all"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black tracking-[0.4em] text-[#F5F5F5]/40 uppercase">LOGCASH PREMIUM</span>
                </div>
                <div className="size-11"></div>
            </div>

            {/* PDF Document Container */}
            <div className="px-4 relative">
                <div className={`pdf-document-premium w-full rounded-sm p-6 flex flex-col border border-white/5 transition-all duration-500 ${(isExporting || showSuccess) ? 'blur-md opacity-60' : 'blur-0 opacity-100'}`}>
                    {/* Brand Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2">
                            <div className="size-8 bg-[#EBC051]/10 border border-[#EBC051]/30 flex items-center justify-center rotate-45">
                                <span className="material-symbols-outlined text-[#EBC051] -rotate-45 text-xl">account_balance_wallet</span>
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[14px] font-black tracking-tighter leading-none text-[#F5F5F5]">LOGCASH</span>
                                <span className="text-[6px] font-bold text-[#EBC051] tracking-[0.2em] leading-none uppercase">PREMIUM SERVICES</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <h1 className="text-[10px] font-black tracking-widest text-[#F5F5F5] uppercase opacity-80">EXTRATO OFICIAL DE</h1>
                            <h1 className="text-[10px] font-black tracking-widest text-[#F5F5F5] uppercase opacity-80">PRESTAÇÃO DE SERVIÇOS</h1>
                        </div>
                    </div>

                    {/* Section 01: Operator Data */}
                    <div className="gold-border-section-premium p-3 mb-4 bg-white/5 text-left">
                        <h2 className="text-[8px] font-black text-[#EBC051] tracking-widest uppercase mb-2">01. DADOS DO OPERADOR</h2>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-[7px] text-[#F5F5F5]/40 font-bold uppercase tracking-tighter">NOME COMPLETO</p>
                                <p className="text-[9px] font-bold text-[#F5F5F5] uppercase">{userName}</p>
                            </div>
                            <div>
                                <p className="text-[7px] text-[#F5F5F5]/40 font-bold uppercase tracking-tighter">ID DO OPERADOR</p>
                                <p className="text-[9px] font-bold text-[#F5F5F5]">#{stats.operatorCode}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[7px] text-[#F5F5F5]/40 font-bold uppercase tracking-tighter">PERÍODO DE REFERÊNCIA</p>
                                <p className="text-[9px] font-bold text-[#F5F5F5] uppercase">{stats.periodLabel}</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 02: Operational Summary */}
                    <div className="gold-border-section-premium p-3 mb-4 bg-white/5 text-left">
                        <h2 className="text-[8px] font-black text-[#EBC051] tracking-widest uppercase mb-2">02. RESUMO OPERACIONAL</h2>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-1 text-[7px] text-[#F5F5F5]/40 uppercase font-bold">DESCRIÇÃO</th>
                                    <th className="text-right py-1 text-[7px] text-[#F5F5F5]/40 uppercase font-bold">QUANTIDADE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr>
                                    <td className="py-1.5 text-[8px] font-medium text-[#F5F5F5]/80 text-left">Volumes Carregados</td>
                                    <td className="py-1.5 text-right text-[8px] font-bold text-[#F5F5F5]">{stats.carregados} UN</td>
                                </tr>
                                <tr>
                                    <td className="py-1.5 text-[8px] font-medium text-[#F5F5F5]/80 text-left">Entregas com Sucesso</td>
                                    <td className="py-1.5 text-right text-[8px] font-bold text-[#F5F5F5]">{stats.entregues} UN</td>
                                </tr>
                                <tr>
                                    <td className="py-1.5 text-[8px] font-medium text-[#F5F5F5]/80 text-left">Acareações Finalizadas</td>
                                    <td className="py-1.5 text-right text-[8px] font-bold text-red-400">{String(stats.devolucoes).padStart(2, '0')} UN</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Section 03: Financial Detail */}
                    <div className="gold-border-section-premium p-3 mb-4 bg-white/5 text-left">
                        <h2 className="text-[8px] font-black text-[#EBC051] tracking-widest uppercase mb-2">03. DETALHAMENTO FINANCEIRO</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                                <span className="text-[8px] font-medium text-[#F5F5F5]/80">Ganhos de Rota Fixos</span>
                                <span className="text-[8px] font-bold text-[#F5F5F5]">{formatBRL(stats.ganhosRota)}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                                <span className="text-[8px] font-medium text-[#F5F5F5]/80">Bônus Performance (Platinum)</span>
                                <span className="text-[8px] font-bold text-[#F5F5F5]">{formatBRL(stats.bonusPerformance)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-[9px] font-black text-[#F5F5F5] uppercase">VALOR LÍQUIDO TOTAL</span>
                                <span className="text-[11px] font-black text-[#EBC051]">{formatBRL(stats.saldoLiquido)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer - Authenticity */}
                    <div className="mt-auto pt-4 border-t border-white/10 flex items-end justify-between text-left">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="size-10 bg-white/5 border border-white/10 flex items-center justify-center rounded">
                                    <span className="material-symbols-outlined text-[#F5F5F5]/60 text-xl">qr_code_2</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[6px] font-black text-[#F5F5F5]/40 tracking-widest uppercase">AUTENTICIDADE DIGITAL</span>
                                    <span className="text-[5px] font-medium text-[#F5F5F5]/30">Hash: {Math.random().toString(16).substring(2, 6)}-{Math.random().toString(16).substring(2, 6)}-lcash</span>
                                </div>
                            </div>
                            <p className="text-[6px] font-bold text-[#F5F5F5]/30 uppercase tracking-widest">Documento gerado pelo sistema LogCash</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="size-8 border border-[#EBC051]/50 rounded-full flex items-center justify-center mb-1 bg-[#EBC051]/5">
                                <span className="material-symbols-outlined text-[#EBC051] text-xs">verified_user</span>
                            </div>
                            <span className="text-[5px] font-black text-[#EBC051] uppercase">Selo de Autenticidade</span>
                        </div>
                    </div>
                </div>

                {/* Loading Overlay */}
                {isExporting && (
                    <div className="absolute inset-x-4 inset-y-0 z-20 flex flex-col items-center justify-center glass-overlay-premium rounded-sm overflow-hidden animate-in fade-in duration-500">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="particle-premium animate-float-particle-premium top-1/2 left-1/4" style={{ animationDelay: '0s' }}></div>
                            <div className="particle-premium animate-float-particle-premium top-1/3 left-1/2" style={{ animationDelay: '2s' }}></div>
                            <div className="particle-premium animate-float-particle-premium top-2/3 left-2/3" style={{ animationDelay: '4s' }}></div>
                            <div className="particle-premium animate-float-particle-premium top-1/2 left-3/4" style={{ animationDelay: '1s' }}></div>
                            <div className="particle-premium animate-float-particle-premium top-3/4 left-1/3" style={{ animationDelay: '3s' }}></div>
                        </div>
                        <div className="relative flex items-center justify-center animate-pulse-gentle-premium">
                            <div className="size-20 rounded-full metallic-gold-loader-premium animate-spin-slow-premium"></div>
                            <div className="absolute size-14 rounded-full border border-[#EBC051]/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#EBC051] text-3xl">description</span>
                            </div>
                        </div>
                        <p className="mt-8 text-[11px] font-black tracking-[0.4em] text-[#F5F5F5] uppercase animate-pulse">
                            PROCESSANDO DOCUMENTO...
                        </p>
                    </div>
                )}
            </div>

            {/* Export and Share Actions */}
            <div className={`w-full px-8 pt-8 flex flex-col items-center gap-6 transition-all duration-500 ${isExporting || showSuccess ? 'opacity-40 grayscale pointer-events-none blur-sm' : 'opacity-100 grayscale-0'}`}>
                <button
                    onClick={handleExportClick}
                    disabled={isExporting || showSuccess}
                    className="liquid-gold-btn-premium w-full text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-[#EBC051]/30 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined">file_export</span>
                    EXPORTAR
                </button>

                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex items-center gap-4 mb-6">
                        <div className="flex-1 h-[1px] bg-white/10"></div>
                        <p className="text-[9px] font-black text-[#F5F5F5]/40 tracking-[0.3em] uppercase">COMPARTILHAR DOCUMENTO</p>
                        <div className="flex-1 h-[1px] bg-white/10"></div>
                    </div>

                    <div className="flex items-center justify-center gap-8">
                        <div className="flex flex-col items-center gap-3">
                            <button className="size-14 rounded-full border border-[#EBC051]/30 bg-[#EBC051]/5 flex items-center justify-center text-[#EBC051] hover:bg-[#EBC051]/20 transition-all active:scale-90">
                                <span className="material-symbols-outlined text-2xl">chat_bubble</span>
                            </button>
                            <span className="text-[8px] font-bold text-[#F5F5F5]/60 tracking-widest uppercase">WhatsApp</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <button className="size-14 rounded-full border border-[#EBC051]/30 bg-[#EBC051]/5 flex items-center justify-center text-[#EBC051] hover:bg-[#EBC051]/20 transition-all active:scale-90">
                                <span className="material-symbols-outlined text-2xl">mail</span>
                            </button>
                            <span className="text-[8px] font-bold text-[#F5F5F5]/60 tracking-widest uppercase">E-mail</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <button className="size-14 rounded-full border border-[#EBC051]/30 bg-[#EBC051]/5 flex items-center justify-center text-[#EBC051] hover:bg-[#EBC051]/20 transition-all active:scale-90">
                                <span className="material-symbols-outlined text-2xl">ios_share</span>
                            </button>
                            <span className="text-[8px] font-bold text-[#F5F5F5]/60 tracking-widest uppercase">Outros</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="glass-modal-premium w-full max-w-[340px] rounded-[32px] p-8 flex flex-col items-center relative overflow-hidden animate-in zoom-in duration-300">
                        <div className="absolute inset-0 pointer-events-none opacity-40">
                            <div className="particle-premium animate-float-particle-premium top-10 left-10" style={{ animationDelay: '0s' }}></div>
                            <div className="particle-premium animate-float-particle-premium top-40 right-10" style={{ animationDelay: '2s' }}></div>
                            <div className="particle-premium animate-float-particle-premium bottom-10 left-20" style={{ animationDelay: '1s' }}></div>
                        </div>
                        <div className="relative mb-8">
                            <div className="size-20 rounded-full border-2 border-[#EBC051]/40 flex items-center justify-center bg-[#EBC051]/10 animate-glow-pulse-premium">
                                <span className="material-symbols-outlined text-[#EBC051] text-5xl font-bold">check_circle</span>
                            </div>
                        </div>
                        <div className="text-center mb-10">
                            <h2 className="text-xl font-black tracking-[0.2em] text-[#F5F5F5] uppercase mb-2">DOCUMENTO PRONTO</h2>
                            <p className="text-sm font-medium text-[#EBC051] tracking-wide">Seu extrato foi gerado com sucesso</p>
                        </div>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="w-full py-4 rounded-[20px] border border-[#EBC051] text-[#EBC051] font-bold text-xs uppercase tracking-[0.3em] transition-all active:scale-95 bg-transparent hover:bg-[#EBC051]/10"
                        >
                            ABRIR ARQUIVO
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EliteExtrato;
