import React, { useState } from 'react';
import { DailySummary } from '../types';

interface EliteWeeklyReportProps {
    userName: string;
    vehicleName: string;
    counts: {
        delivered: number;
        todayEntrada: number;
        todaySaida: number;
        todayDevolucao: number;
    };
    rows: DailySummary[];
    onBack: () => void;
    onDownload?: () => void;
    onViewPDF: () => void;
}

const EliteWeeklyReport: React.FC<EliteWeeklyReportProps> = ({
    userName,
    vehicleName,
    counts,
    rows,
    onBack,
    onDownload,
    onViewPDF
}) => {
    const [isExporting, setIsExporting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    let loaded = 0, delivered = 0, returns = 0, gains = 0;

    if (rows && rows.length > 0) {
        loaded = rows.reduce((a, b) => a + (b.loaded || 0), 0);
        delivered = rows.reduce((a, b) => a + (b.delivered || 0), 0);
        returns = rows.reduce((a, b) => a + (b.returns || 0), 0);
        gains = rows.reduce((a, b) => a + (b.gains || 0), 0);
    } else {
        loaded = counts?.todayEntrada || 0;
        delivered = counts?.todaySaida || 0;
        returns = counts?.todayDevolucao || 0;
        gains = (counts?.delivered || 0) * 2.50;
    }

    const performance = loaded > 0 ? Math.round((delivered / loaded) * 100) : 0;
    const bonus = 180.0;
    const totalLiquid = gains + bonus;

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const dateStr = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '');
    const idBadge = `#LC-${Math.floor(Math.random() * 9000) + 1000}`;

    const handleDownload = () => {
        if (onDownload) onDownload();
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            setShowSuccess(true);
        }, 2000);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col max-w-[430px] mx-auto bg-pitch-black overflow-y-auto pb-32 animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
                .metallic-gold-text {
                    background: linear-gradient(135deg, #F9E29C 0%, #EBC051 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .pdf-frame {
                    border: 1px solid #EBC051;
                    box-shadow: 0 0 25px rgba(235, 192, 81, 0.15);
                }
                .gold-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent 0%, #EBC051 50%, transparent 100%);
                    opacity: 0.5;
                }
                .section-header {
                    letter-spacing: 0.2em;
                    color: #EBC051;
                    font-weight: 700;
                    font-size: 10px;
                }
                .metallic-gold-loader {
                    border: 3px solid rgba(235, 192, 81, 0.1);
                    border-top: 3px solid #EBC051;
                    border-right: 3px solid #EBC051;
                    box-shadow: 0 0 15px rgba(235, 192, 81, 0.3);
                }
                .glass-overlay {
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
                .particle {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: #EBC051;
                    border-radius: 50%;
                    pointer-events: none;
                }
                @keyframes pulse-gentle {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
                @keyframes float-particle {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    25% { opacity: 1; }
                    100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
                }
                .animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
                .animate-float-particle { animation: float-particle 10s linear infinite; }
                @keyframes spin-slow { to { transform: rotate(360deg); } }
                .animate-spin-slow { animation: spin-slow 1.5s linear infinite; }
                
                .glass-modal {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(235, 192, 81, 0.4);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .metallic-gradient {
                    background: linear-gradient(135deg, #EBC051 0%, #FFFFFF 45%, #EBC051 55%, #B38E2F 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                @keyframes glow-pulse {
                    0%, 100% { filter: drop-shadow(0 0 10px rgba(235, 192, 81, 0.4)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 30px rgba(235, 192, 81, 0.8)); transform: scale(1.05); }
                }
                @keyframes liquid-metallic {
                    0%, 100% { transform: translateY(0) scale(1); filter: brightness(1) contrast(1.1); }
                    50% { transform: translateY(-5px) scale(1.02); filter: brightness(1.3) contrast(1.2); }
                }
                @keyframes inner-glow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
                .animate-liquid-metallic { animation: liquid-metallic 4s ease-in-out infinite; }
                .animate-inner-glow { animation: inner-glow 2s ease-in-out infinite; }
                `
            }} />

            <div className={`p-6 py-12 flex flex-col items-center justify-center transition-all duration-500 ${(isExporting || showSuccess) ? 'blur-[4px] select-none pointer-events-none' : ''}`}>
                <div className="relative flex w-full flex-col max-w-[400px]">
                    <div className="pdf-frame bg-transparent w-full rounded-sm p-8 flex flex-col h-auto">
                        <div className="flex flex-col items-center mb-10 text-center">
                            <div className="text-[16px] font-black tracking-[0.5em] metallic-gold-text uppercase mb-2">LogCash</div>
                            <div className="w-10 h-[1.5px] bg-primary-gold mb-8"></div>
                            <h1 className="text-sm font-bold tracking-[0.3em] text-ice-white uppercase mb-2">Relatório Semanal</h1>
                            <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Emissão: {dateStr} • Ref: {idBadge}</p>
                        </div>

                        <div className="mb-10">
                            <h2 className="section-header uppercase mb-5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary-gold rounded-full shadow-[0_0_5px_#EBC051]"></span>
                                Dados do Motorista
                            </h2>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-primary-gold uppercase tracking-widest font-bold mb-1">Condutor</span>
                                    <span className="text-[13px] font-semibold text-ice-white">{userName}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-primary-gold uppercase tracking-widest font-bold mb-1">Identificação</span>
                                        <span className="text-[13px] font-semibold text-ice-white">{idBadge.split('-')[1] ? `#${idBadge.split('-')[1]}` : '#9921'}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[9px] text-primary-gold uppercase tracking-widest font-bold mb-1">Veículo</span>
                                        <span className="text-[13px] font-semibold text-ice-white">{vehicleName || 'Não Informado'}</span>
                                    </div>
                                </div>
                                <div className="gold-divider mt-2"></div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="section-header uppercase mb-5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary-gold rounded-full shadow-[0_0_5px_#EBC051]"></span>
                                Resumo da Rota
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] text-white/70 font-medium">Volumes Carregados</span>
                                    <span className="text-[12px] font-bold text-ice-white">{String(loaded).padStart(2, '0')} Unid.</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] text-white/70 font-medium">Entregas Sucesso</span>
                                    <span className="text-[12px] font-bold text-ice-white">{String(delivered).padStart(2, '0')} Unid.</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] text-white/70 font-medium">Acareações</span>
                                    <span className="text-[12px] font-bold text-ice-white">{String(returns).padStart(2, '0')} Unid.</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] text-white/70 font-medium">Performance da Rota</span>
                                    <span className="text-[12px] font-bold text-primary-gold">{performance}%</span>
                                </div>
                                <div className="gold-divider mt-2"></div>
                            </div>
                        </div>

                        <div className="mb-2">
                            <h2 className="section-header uppercase mb-5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary-gold rounded-full shadow-[0_0_5px_#EBC051]"></span>
                                Detalhamento Financeiro
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] text-white/70 font-medium">Ganhos de Rota</span>
                                    <span className="text-[12px] font-bold text-ice-white">{formatCurrency(gains)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] text-white/70 font-medium">Bônus Performance</span>
                                    <span className="text-[12px] font-bold text-ice-white">{formatCurrency(bonus)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-3 mt-2">
                                    <span className="text-[11px] font-bold text-primary-gold uppercase tracking-[0.15em]">Valor Líquido</span>
                                    <span className="text-xl font-bold metallic-gold-text">{formatCurrency(totalLiquid)}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-10 px-4 w-full">
                        <button
                            onClick={handleDownload}
                            disabled={isExporting}
                            className="w-full py-4 border border-primary-gold rounded-xl bg-transparent flex items-center justify-center gap-2 group active:opacity-70 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <span className="text-primary-gold font-bold text-[12px] tracking-[0.25em] uppercase">Exportar</span>
                            <span className="material-symbols-outlined text-primary-gold text-[18px]">ios_share</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* OVERLAYS FULLSCREEN */}
            {isExporting && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center glass-overlay rounded-sm overflow-hidden animate-in fade-in duration-300">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="particle animate-float-particle top-1/2 left-1/4" style={{ animationDelay: '0s' } as unknown as React.CSSProperties}></div>
                        <div className="particle animate-float-particle top-1/3 left-1/2" style={{ animationDelay: '2s' } as unknown as React.CSSProperties}></div>
                        <div className="particle animate-float-particle top-2/3 left-2/3" style={{ animationDelay: '4s' } as unknown as React.CSSProperties}></div>
                        <div className="particle animate-float-particle top-1/2 left-3/4" style={{ animationDelay: '1s' } as unknown as React.CSSProperties}></div>
                        <div className="particle animate-float-particle top-3/4 left-1/3" style={{ animationDelay: '3s' } as unknown as React.CSSProperties}></div>
                    </div>
                    <div className="relative flex items-center justify-center animate-pulse-gentle">
                        <div className="size-20 rounded-full metallic-gold-loader animate-spin-slow"></div>
                        <div className="absolute size-14 rounded-full border border-primary-gold/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary-gold text-3xl">description</span>
                        </div>
                    </div>
                    <p className="mt-8 text-[11px] font-black tracking-[0.4em] text-ice-white uppercase animate-pulse">
                        PROCESSANDO DOCUMENTO...
                    </p>
                </div>
            )}

            {showSuccess && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-in zoom-in duration-300">
                    <div className="glass-modal w-full max-w-[340px] rounded-[40px] p-10 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="particle animate-float-particle top-10 left-10" style={{ animationDelay: '0s' } as unknown as React.CSSProperties}></div>
                            <div className="particle animate-float-particle top-40 right-12" style={{ animationDelay: '2s', width: '4px', height: '4px' } as unknown as React.CSSProperties}></div>
                            <div className="particle animate-float-particle bottom-20 left-20" style={{ animationDelay: '1.5s' } as unknown as React.CSSProperties}></div>
                        </div>

                        <div className="relative mb-10">
                            <div className="size-24 rounded-full flex items-center justify-center relative animate-glow-pulse">
                                <div className="absolute inset-0 rounded-full bg-primary-gold/20 blur-xl animate-inner-glow"></div>
                                <div className="relative animate-liquid-metallic flex items-center justify-center">
                                    <span className="material-symbols-outlined text-7xl font-bold metallic-gradient drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}>
                                        check_circle
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mb-10">
                            <h2 className="text-xl font-black tracking-[0.25em] text-ice-white uppercase mb-3 drop-shadow-sm">DOCUMENTO PRONTO</h2>
                            <p className="text-sm font-semibold text-primary-gold tracking-wide">Seu relatório foi gerado com sucesso</p>
                        </div>

                        <button
                            onClick={() => {
                                setShowSuccess(false);
                                onBack();
                            }}
                            className="w-full py-4 rounded-[20px] border border-primary-gold text-primary-gold font-extrabold text-[11px] uppercase tracking-[0.4em] transition-all active:scale-95 hover:bg-primary-gold/5"
                        >
                            VOLTAR AO INÍCIO
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EliteWeeklyReport;
