import React, { useMemo, useState } from 'react';
import { LogEntry } from '../types';
import { VALOR_POR_PACOTE } from '../constants';

interface EliteExpressReportProps {
    logs: LogEntry[];
    userName: string;
    onBack: () => void;
    onExportPDF: () => void;
}

const EliteExpressReport: React.FC<EliteExpressReportProps> = ({ logs, onBack, onExportPDF }) => {
    const [isExporting, setIsExporting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Group logs by date
    const dailyData = useMemo(() => {
        const groups: Record<string, {
            date: string,
            id: string,
            loaded: number,
            delivered: number,
            returns: number,
            totalValue: number
        }> = {};

        logs.forEach(log => {
            const dateObj = new Date(log.timestamp);
            const dateStr = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            const key = dateObj.toISOString().split('T')[0];

            if (!groups[key]) {
                groups[key] = {
                    date: dateStr,
                    id: `#${String(dateObj.getDate()).padStart(2, '0')}${String(dateObj.getMonth() + 1).padStart(2, '0')}`,
                    loaded: 0,
                    delivered: 0,
                    returns: 0,
                    totalValue: 0
                };
            }

            groups[key].loaded += (log.entrada || 0);
            groups[key].delivered += (log.saida || 0);
            groups[key].returns += (log.devolucao || 0);
        });

        // Calculate values and sort by date descending
        return Object.values(groups)
            .map(day => ({
                ...day,
                totalValue: day.delivered * VALOR_POR_PACOTE
            }))
            .sort((a, b) => b.id.localeCompare(a.id));
    }, [logs]);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(val).replace('R$', '').trim();

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            setShowSuccess(true);
        }, 3000);
    };

    const handleOpenPDF = () => {
        setShowSuccess(false);
        onExportPDF();
    };

    const isOverlayActive = isExporting || showSuccess;

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] mx-auto bg-pitch-black shadow-2xl carbon-texture">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
                
                .carbon-texture {
                    background-color: #000000;
                    background-image: radial-gradient(#1a1a1a 0.5px, transparent 0.5px);
                    background-size: 4px 4px;
                    background-attachment: fixed;
                }
                .spreadsheet-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr 0.8fr 0.8fr 1.4fr 1fr;
                    align-items: center;
                }
                .row-divider {
                    border-bottom: 0.5px solid rgba(235, 192, 81, 0.15);
                }
                .glass-header {
                    background: rgba(0, 0, 0, 0.95);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(235, 192, 81, 0.2);
                }
                .action-outline-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 28px;
                    height: 28px;
                    border-radius: 4px;
                    border: 1px solid rgba(235, 192, 81, 0.4);
                    color: #EBC051;
                    transition: all 0.2s ease;
                }
                .action-outline-btn:active {
                    background: #EBC051;
                    color: #000000;
                }
                
                /* Export Overlays CSS */
                .glass-overlay {
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
                .metallic-gold-loader {
                    border: 3px solid rgba(235, 192, 81, 0.1);
                    border-top: 3px solid #EBC051;
                    border-right: 3px solid #EBC051;
                    box-shadow: 0 0 15px rgba(235, 192, 81, 0.3);
                }
                .particle {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: #EBC051;
                    border-radius: 50%;
                    pointer-events: none;
                }
                .glass-modal {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(235, 192, 81, 0.4);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .minimal-gold-button {
                    background: transparent;
                    border: 1px solid #EBC051;
                }
                .metallic-gradient {
                    background: linear-gradient(135deg, #EBC051 0%, #FFFFFF 45%, #EBC051 55%, #B38E2F 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                /* Animations */
                @keyframes pulse-gentle {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
                @keyframes float-particle {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    25% { opacity: 1; }
                    100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
                }
                @keyframes spin-slow {
                    to { transform: rotate(360deg); }
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
                
                .animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
                .animate-float-particle { animation: float-particle 10s linear infinite; }
                .animate-spin-slow { animation: spin-slow 3s linear infinite; }
                .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
                .animate-liquid-metallic { animation: liquid-metallic 4s ease-in-out infinite; }
                .animate-inner-glow { animation: inner-glow 2s ease-in-out infinite; }

                .font-geometric { font-family: 'Inter', sans-serif; }
                .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
                `
            }} />

            {/* Main Content Area - Blurred during export */}
            <div className={`flex flex-col flex-1 transition-all duration-300 ${isOverlayActive ? 'blur-md select-none pointer-events-none' : ''}`}>
                {/* Header */}
                <div className="sticky top-0 z-40 glass-header flex items-center justify-between px-6 py-7">
                    <button
                        onClick={onBack}
                        className="flex size-8 items-center justify-start text-primary-gold/50 hover:text-primary-gold transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">arrow_back_ios</span>
                    </button>
                    <h1 className="text-[14px] font-bold tracking-[0.35em] text-primary-gold uppercase text-center font-jakarta">RELATÓRIO EXPRESSO</h1>
                    <div className="size-8"></div> {/* Spacer */}
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col pt-2">
                    {/* Table Header */}
                    <div className="spreadsheet-grid px-4 py-4 bg-primary-gold/5 border-b border-primary-gold/20 font-jakarta">
                        <div className="text-[8px] font-black tracking-widest text-primary-gold uppercase">DATA</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold uppercase text-center">CARREG.</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold uppercase text-center">ENTREG.</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold uppercase text-center">DEVOL.</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold uppercase text-right">VALOR TOTAL</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold uppercase text-right opacity-0">AÇÕES</div>
                    </div>

                    {/* Table Rows */}
                    <div className="flex flex-col font-geometric pb-20">
                        {dailyData.length > 0 ? (
                            dailyData.map((day, idx) => (
                                <div key={idx} className="spreadsheet-grid px-4 py-5 row-divider hover:bg-white/5 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-bold text-ice-white">{day.date}</span>
                                        <span className="text-[8px] text-white/40 font-medium">{day.id}</span>
                                    </div>
                                    <div className="text-[11px] font-medium text-white/90 text-center">{day.loaded}</div>
                                    <div className="text-[11px] font-medium text-white/90 text-center">{day.delivered}</div>
                                    <div className={`text-[11px] font-medium text-center ${day.returns > 0 ? 'text-primary-gold' : 'text-white/30'}`}>
                                        {day.returns > 0 ? String(day.returns).padStart(2, '0') : '00'}
                                    </div>
                                    <div className="text-[11px] font-bold text-ice-white text-right">
                                        R$ {formatCurrency(day.totalValue)}
                                    </div>
                                    <div className="flex justify-end gap-1.5 pl-2">
                                        <button className="action-outline-btn">
                                            <span className="material-symbols-outlined text-[14px]">edit</span>
                                        </button>
                                        <button className="action-outline-btn">
                                            <span className="material-symbols-outlined text-[14px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-12 text-center">
                                <p className="text-secondary-gray text-xs font-medium opacity-50 uppercase tracking-widest">Nenhum registro encontrado</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto px-6 pb-12 pt-8 bg-gradient-to-t from-pitch-black to-[rgba(0,0,0,0.8)] flex flex-col gap-4 font-jakarta sticky bottom-0 z-30 border-t border-primary-gold/10">
                    <button className="w-full flex items-center justify-center gap-3 rounded-lg py-4 border border-primary-gold/40 bg-pitch-black text-primary-gold hover:border-primary-gold active:bg-primary-gold/10 transition-all">
                        <span className="material-symbols-outlined text-xl">add_box</span>
                        <span className="text-[11px] font-bold tracking-[0.4em] uppercase">ADICIONAR LINHA</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="w-full flex items-center justify-center gap-3 rounded-lg py-4 border border-primary-gold bg-transparent text-primary-gold active:bg-primary-gold/10 transition-all font-jakarta shadow-[0_0_15px_rgba(235,192,81,0.15)]"
                    >
                        <span className="material-symbols-outlined text-xl">ios_share</span>
                        <span className="text-[11px] font-bold tracking-[0.4em] uppercase">EXPORTAR</span>
                    </button>

                    <div className="mt-4 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3 opacity-30">
                            <span className="h-[0.5px] w-8 bg-primary-gold"></span>
                            <p className="text-[8px] text-primary-gold uppercase tracking-[0.5em] font-bold">LOGCASH PREMIUM</p>
                            <span className="h-[0.5px] w-8 bg-primary-gold"></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* OVERLAYS */}

            {/* Processing Overlay */}
            {isExporting && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center glass-overlay overflow-hidden">
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
                    <p className="mt-8 text-[11px] font-black tracking-[0.4em] text-ice-white uppercase font-jakarta animate-pulse">
                        PROCESSANDO DOCUMENTO...
                    </p>
                </div>
            )}

            {/* Success Overlay */}
            {showSuccess && (
                <div className="absolute inset-0 z-50 flex items-center justify-center px-6 glass-overlay">
                    <div className="glass-modal w-full max-w-[340px] rounded-[40px] p-10 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="particle animate-float-particle top-10 left-10" style={{ animationDelay: '0s' } as any}></div>
                            <div className="particle animate-float-particle top-40 right-12" style={{ animationDelay: '2s', width: '4px', height: '4px' } as any}></div>
                            <div className="particle animate-float-particle bottom-20 left-20" style={{ animationDelay: '1.5s' } as any}></div>
                        </div>
                        <div className="relative mb-10" style={{ perspective: '1000px' }}>
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
                            <h2 className="text-xl font-black tracking-[0.25em] text-ice-white uppercase mb-3 drop-shadow-sm font-jakarta">DOCUMENTO PRONTO</h2>
                            <p className="text-sm font-semibold text-primary-gold tracking-wide font-jakarta">Seu extrato foi gerado com sucesso</p>
                        </div>
                        <button
                            onClick={handleOpenPDF}
                            className="minimal-gold-button w-full py-4 rounded-[20px] text-primary-gold font-extrabold text-[11px] uppercase tracking-[0.4em] transition-all active:scale-95 hover:bg-primary-gold/5 font-jakarta"
                        >
                            ABRIR ARQUIVO
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EliteExpressReport;
