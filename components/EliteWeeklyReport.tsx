import React from 'react';
import { LogEntry, TemporaryExpressRow, DailySummary } from '../types';

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
    const [isExporting, setIsExporting] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const VALOR_POR_PACOTE = 5.0; // Padrão
    const routeEarnings = (counts.delivered || 0) * VALOR_POR_PACOTE;
    const bonusPerformance = 180.0; // Mock de acordo com o HTML fornecido
    const totalValue = routeEarnings + bonusPerformance;

    const handleDownload = () => {
        if (onDownload) onDownload();
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            setShowSuccess(true);
        }, 2000);
    };

    const formatBRL = (val: number) =>
        val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className="relative flex min-h-screen w-full flex-col max-w-[430px] mx-auto bg-pitch-black overflow-y-auto pb-32 animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
                .metallic-gold-text {
                    background: linear-gradient(135deg, #F9E29C 0%, #EBC051 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .minimalist-gold-btn {
                    border: 1px solid #EBC051;
                    background: transparent;
                    color: #FFFFFF;
                }
                .pdf-page {
                    box-shadow: 0 0 40px rgba(235, 192, 81, 0.08);
                    border: 0.5px solid rgba(235, 192, 81, 0.2);
                }
                .gold-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent 0%, #EBC051 50%, transparent 100%);
                    opacity: 0.4;
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
                .animate-spin-slow { animation: spin 3s linear infinite; }
                
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

                /* Novos Estilos Cinemáticos */
                .cinematic-glow {
                    box-shadow: 0 0 60px -15px rgba(235, 192, 81, 0.12);
                }
                .spreadsheet-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1.2fr 1.5fr;
                    align-items: center;
                }
                .row-divider {
                    border-bottom: 0.5px solid rgba(235, 192, 81, 0.08);
                }
                .gold-gradient-text {
                    background: linear-gradient(135deg, #EBC051 0%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                `
            }} />


            <div className="pt-12 mb-4 flex items-center justify-center">
            </div>

            <div className="px-5 mb-8 relative">
                <div className={`pdf-page bg-charcoal w-full rounded-2xl cinematic-glow flex flex-col h-auto transition-all duration-500 overflow-hidden border border-primary-gold/20 ${(isExporting || showSuccess) ? 'blur-[4px] select-none pointer-events-none' : ''}`}>
                    {/* Cabeçalho */}
                    <div className="px-6 py-10 flex flex-col items-center gap-2 border-b border-primary-gold/10">
                        <h1 className="text-[16px] font-bold tracking-[0.5em] gold-gradient-text uppercase text-center">RELATÓRIO OPERACIONAL</h1>
                    </div>

                    {/* Header da Tabela */}
                    <div className="spreadsheet-grid px-6 py-4 bg-white/[0.02] border-b border-primary-gold/10">
                        <div className="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase">DATA</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-center">CARREG.</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-center">ENTREG.</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-center">DEVOL.</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-right">VALOR TOTAL</div>
                    </div>

                    {/* Linhas da Tabela */}
                    <div className="flex flex-col">
                        {rows.length > 0 ? rows.slice(0, 5).map((row, idx) => (
                            <div key={idx} className="spreadsheet-grid px-6 py-5 row-divider">
                                <div className="text-[11px] font-bold text-ice-white">{row.date.split('/')[0]}/{row.date.split('/')[1]}</div>
                                <div className="text-[11px] font-medium text-white/90 text-center">{row.loaded}</div>
                                <div className="text-[11px] font-medium text-white/90 text-center">{row.delivered}</div>
                                <div className="text-[11px] font-medium text-primary-gold text-center">{row.returns}</div>
                                <div className="text-[11px] font-bold text-ice-white text-right font-sans">R$ {row.gains.toFixed(2)}</div>
                            </div>
                        )) : (
                            <div className="px-6 py-10 text-center text-[10px] text-white/20 uppercase tracking-widest">
                                Nenhum registro neste período
                            </div>
                        )}
                    </div>

                    {/* Resumo Financeiro */}
                    <div className="px-6 py-10 bg-gradient-to-b from-transparent to-primary-gold/[0.03]">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center border-t border-primary-gold/20 pt-6">
                                <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">RESUMO FINANCEIRO</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-primary-gold/50 uppercase tracking-[0.2em] mb-1">VALOR LÍQUIDO TOTAL</span>
                                    <span className="text-3xl font-bold text-ice-white font-sans tracking-tight">{formatBRL(totalValue)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rodapé Interno */}
                    <div className="px-6 py-6 flex justify-center border-t border-primary-gold/10 bg-black/40">
                        <p className="text-[7px] text-white/20 tracking-[0.4em] uppercase">Autenticidade Verificada LogCash Digital</p>
                    </div>
                </div>

                {isExporting && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center glass-overlay rounded-sm overflow-hidden animate-in fade-in duration-300">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="particle animate-float-particle top-1/2 left-1/4" style={{ animationDelay: '0s' } as any}></div>
                            <div className="particle animate-float-particle top-1/3 left-1/2" style={{ animationDelay: '2s' } as any}></div>
                            <div className="particle animate-float-particle top-2/3 left-2/3" style={{ animationDelay: '4s' } as any}></div>
                            <div className="particle animate-float-particle top-1/2 left-3/4" style={{ animationDelay: '1s' } as any}></div>
                            <div className="particle animate-float-particle top-3/4 left-1/3" style={{ animationDelay: '3s' } as any}></div>
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
                    <div className="absolute inset-0 z-[60] flex items-center justify-center px-4 animate-in zoom-in duration-300">
                        <div className="glass-modal w-full max-w-[340px] rounded-[40px] p-10 flex flex-col items-center relative overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="particle animate-float-particle top-10 left-10" style={{ animationDelay: '0s' } as any}></div>
                                <div className="particle animate-float-particle top-40 right-12" style={{ animationDelay: '2s', width: '4px', height: '4px' } as any}></div>
                                <div className="particle animate-float-particle bottom-20 left-20" style={{ animationDelay: '1.5s' } as any}></div>
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
                                <p className="text-sm font-semibold text-primary-gold tracking-wide">Seu extrato foi gerado com sucesso</p>
                            </div>

                            <button
                                onClick={onBack}
                                className="w-full py-4 rounded-[20px] border border-primary-gold text-primary-gold font-extrabold text-[11px] uppercase tracking-[0.4em] transition-all active:scale-95 hover:bg-primary-gold/5"
                            >
                                VOLTAR AO INÍCIO
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={`px-8 flex flex-col gap-4 ${(isExporting || showSuccess) ? 'blur-md select-none pointer-events-none' : ''}`}>
                <button
                    onClick={handleDownload}
                    disabled={isExporting}
                    className="w-full minimalist-gold-btn py-4 rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-primary-gold/5 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                >
                    <span className="material-symbols-outlined text-lg">download</span>
                    Exportar
                </button>
            </div>

            <div className="flex justify-center items-center gap-3 pt-10 pb-4 opacity-30">
                <div className="h-[1px] w-8 bg-primary-gold"></div>
                <span className="text-[8px] font-bold tracking-[0.3em] text-primary-gold uppercase">Elite Document Service</span>
                <div className="h-[1px] w-8 bg-primary-gold"></div>
            </div>
        </div>
    );
};

export default EliteWeeklyReport;
