
import React, { useMemo, useState } from 'react';
import { LogEntry } from '../types';

interface EliteExtratoProps {
    logs: LogEntry[];
    userName: string;
    vehicleName: string;
    valorPorPacote: number;
    onExport: () => void;
}

const EliteExtrato: React.FC<EliteExtratoProps> = ({ logs, userName, vehicleName, valorPorPacote, onExport }) => {
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
        const deliveryRate = carregados > 0 ? entregues / carregados : 0;
        const bonusPerformance = deliveryRate > 0.95 ? ganhosRota * 0.10 : 0;
        const saldoLiquido = ganhosRota + bonusPerformance;

        const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const periodLabel = `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;

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
        };
    }, [logs, valorPorPacote, userName]);

    return (
        <div className="relative flex w-full flex-col max-w-[430px] mx-auto bg-black overflow-y-auto pb-10 animate-in fade-in duration-500 min-h-screen">
            <style dangerouslySetInnerHTML={{
                __html: `
                .metallic-gold-text-extrato {
                    background: linear-gradient(135deg, #F9E29C 0%, #EBC051 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .minimalist-gold-btn-extrato {
                    border: 1px solid #EBC051;
                    background: transparent;
                    color: #FFFFFF;
                    transition: all 0.3s ease;
                }
                .minimalist-gold-btn-extrato:active {
                    background: rgba(235, 192, 81, 0.1);
                    transform: scale(0.98);
                }
                .pdf-page-extrato {
                    box-shadow: 0 0 40px rgba(235, 192, 81, 0.08);
                    border: 0.5px solid rgba(235, 192, 81, 0.2);
                    background-color: #0A0A0A;
                }
                .gold-divider-extrato {
                    height: 1px;
                    background: linear-gradient(90deg, transparent 0%, #EBC051 50%, transparent 100%);
                    opacity: 0.4;
                }
                .section-header-extrato {
                    letter-spacing: 0.2em;
                    color: #EBC051;
                    font-weight: 700;
                    font-size: 10px;
                }
                /* Loading & Success Modal Styles */
                .glass-overlay-extrato {
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
                .metallic-gold-loader-extrato {
                    border: 3px solid rgba(235, 192, 81, 0.1);
                    border-top: 3px solid #EBC051;
                    border-right: 3px solid #EBC051;
                    box-shadow: 0 0 15px rgba(235, 192, 81, 0.3);
                }
                .glass-modal-extrato {
                    background: rgba(18, 18, 18, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(235, 192, 81, 0.3);
                }
                .particle-extrato {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: #EBC051;
                    border-radius: 50%;
                    pointer-events: none;
                }
                @keyframes float-particle-extrato {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    25% { opacity: 1; }
                    100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
                }
                @keyframes pulse-gentle-extrato {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
                @keyframes glow-pulse-extrato {
                    0%, 100% { filter: drop-shadow(0 0 5px rgba(235, 192, 81, 0.4)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 20px rgba(235, 192, 81, 0.7)); transform: scale(1.05); }
                }
                .animate-pulse-gentle-extrato { animation: pulse-gentle-extrato 3s ease-in-out infinite; }
                .animate-float-particle-extrato { animation: float-particle-extrato 10s linear infinite; }
                .animate-glow-pulse-extrato { animation: glow-pulse-extrato 2s ease-in-out infinite; }
                .animate-spin-slow-extrato { animation: spin 3s linear infinite; }
            `}} />

            <div className="mt-8"></div>

            <div className={`px-5 mb-8 relative transition-all duration-500 ${isExporting || showSuccess ? 'blur-md opacity-40' : 'blur-0 opacity-100'}`}>
                <div className="pdf-page-extrato w-full rounded-sm p-8 flex flex-col h-auto min-h-[620px] text-left">
                    {/* Brand Header */}
                    <div className="flex flex-col items-center mb-8 text-center">
                        <div className="text-[14px] font-black tracking-[0.5em] metallic-gold-text-extrato uppercase mb-2">LogCash</div>
                        <div className="w-8 h-[2px] bg-[#EBC051] mb-6"></div>
                        <h1 className="text-sm font-bold tracking-[0.3em] text-white uppercase mb-1">Relatório Operacional Elite</h1>
                        <p className="text-[9px] text-white/40 uppercase tracking-widest">Emissão: {stats.periodLabel} • Ref: #{stats.operatorCode}</p>
                    </div>

                    {/* Section 01: Driver Data */}
                    <div className="mb-8">
                        <h2 className="section-header-extrato uppercase mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#EBC051] rounded-full"></span>
                            Dados do Motorista
                        </h2>
                        <div className="space-y-3">
                            <div className="flex flex-col">
                                <span className="text-[9px] text-[#EBC051] uppercase tracking-widest font-bold mb-1 text-left">Condutor</span>
                                <span className="text-xs font-bold text-[#F5F5F5] uppercase text-left">{userName}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] text-[#EBC051] uppercase tracking-widest font-bold mb-1">Identificação</span>
                                    <span className="text-xs font-bold text-[#F5F5F5]">#{stats.operatorCode}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[9px] text-[#EBC051] uppercase tracking-widest font-bold mb-1 text-right">Veículo</span>
                                    <span className="text-xs font-bold text-[#F5F5F5] uppercase text-right">{vehicleName}</span>
                                </div>
                            </div>
                            <div className="gold-divider-extrato mt-4"></div>
                        </div>
                    </div>

                    {/* Section 02: Route Summary */}
                    <div className="mb-8">
                        <h2 className="section-header-extrato uppercase mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#EBC051] rounded-full"></span>
                            Resumo da Rota
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-left">
                                <span className="text-[11px] text-white/60 font-medium">Volumes Carregados</span>
                                <span className="text-xs font-bold text-white">{stats.carregados} Unid.</span>
                            </div>
                            <div className="flex justify-between items-center text-left">
                                <span className="text-[11px] text-white/60 font-medium">Entregas Sucesso</span>
                                <span className="text-xs font-bold text-white">{stats.entregues} Unid.</span>
                            </div>
                            <div className="flex justify-between items-center text-left">
                                <span className="text-[11px] text-white/60 font-medium">Acareações</span>
                                <span className="text-xs font-bold text-white text-red-400">{String(stats.devolucoes).padStart(2, '0')} Unid.</span>
                            </div>
                            <div className="gold-divider-extrato mt-4"></div>
                        </div>
                    </div>

                    {/* Section 03: Financial Detail */}
                    <div className="mb-10">
                        <h2 className="section-header-extrato uppercase mb-4 flex items-center gap-2 text-left">
                            <span className="w-1.5 h-1.5 bg-[#EBC051] rounded-full"></span>
                            Detalhamento Financeiro
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-left">
                                <span className="text-[11px] text-white/60 font-medium">Ganhos de Rota</span>
                                <span className="text-xs font-bold text-white">{formatBRL(stats.ganhosRota)}</span>
                            </div>
                            <div className="flex justify-between items-center text-left">
                                <span className="text-[11px] text-white/60 font-medium">Bônus Performance</span>
                                <span className="text-xs font-bold text-white">{formatBRL(stats.bonusPerformance)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 text-left text-left">
                                <span className="text-[11px] font-bold text-[#EBC051] uppercase tracking-wider">Valor Líquido</span>
                                <span className="text-lg font-bold metallic-gold-text-extrato">{formatBRL(stats.saldoLiquido)}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Loading Overlay */}
                {isExporting && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center glass-overlay-extrato rounded-sm overflow-hidden animate-in fade-in duration-500">
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="particle-extrato animate-float-particle-extrato"
                                    style={{
                                        top: `${20 + Math.random() * 60}%`,
                                        left: `${20 + Math.random() * 60}%`,
                                        animationDelay: `${i * 0.8}s`
                                    }}
                                />
                            ))}
                        </div>
                        <div className="relative flex items-center justify-center animate-pulse-gentle-extrato">
                            <div className="size-20 rounded-full metallic-gold-loader-extrato animate-spin-slow-extrato"></div>
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

            {/* Actions Buttons */}
            <div className={`px-8 space-y-4 z-10 transition-all duration-500 ${isExporting || showSuccess ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                <button
                    onClick={handleExportClick}
                    className="w-full minimalist-gold-btn-extrato py-4 rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                >
                    <span className="material-symbols-outlined text-lg">download</span>
                    Fazer Download
                </button>
            </div>

            {/* Footer Branding */}
            <div className="flex justify-center items-center gap-3 pt-10 pb-4 opacity-30">
                <div className="h-[1px] w-8 bg-[#EBC051]"></div>
                <span className="text-[8px] font-bold tracking-[0.3em] text-[#EBC051] uppercase">Elite Document Service</span>
                <div className="h-[1px] w-8 bg-[#EBC051]"></div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="glass-modal-extrato w-full max-w-[340px] rounded-[32px] p-8 flex flex-col items-center relative overflow-hidden animate-in zoom-in duration-300">
                        <div className="absolute inset-0 pointer-events-none opacity-40">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="particle-extrato animate-float-particle-extrato"
                                    style={{
                                        top: `${20 + Math.random() * 60}%`,
                                        left: `${20 + Math.random() * 60}%`,
                                        animationDelay: `${i * 1.5}s`
                                    }}
                                />
                            ))}
                        </div>
                        <div className="relative mb-8">
                            <div className="size-20 rounded-full border-2 border-[#EBC051]/40 flex items-center justify-center bg-[#EBC051]/10 animate-glow-pulse-extrato">
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
