
import React, { useMemo, useState, useEffect } from 'react';
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

    // Sincronizar o título do documento para o download do PDF
    useEffect(() => {
        const prevTitle = document.title;
        document.title = "Relatório Mensal Minimalista Absoluto";
        return () => { document.title = prevTitle; };
    }, []);

    // Agrupando logs por dia para a tabela cinematográfica (Mês Atual)
    const routeData = useMemo(() => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const monthLogs = logs.filter(l => {
            const d = new Date(l.timestamp);
            return d >= startOfMonth && d <= endOfMonth;
        });

        const groups: {
            [key: string]: {
                date: string;
                loaded: number;
                delivered: number;
                returns: number;
                totalValue: number;
            }
        } = {};

        monthLogs.forEach(log => {
            const dateObj = new Date(log.timestamp);
            const key = dateObj.toISOString().split('T')[0];

            if (!groups[key]) {
                groups[key] = {
                    date: dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase().replace('.', ''),
                    loaded: 0,
                    delivered: 0,
                    returns: 0,
                    totalValue: 0
                };
            }

            if (log.type === 'ENTRADA') groups[key].loaded += 1;
            if (log.type === 'SAIDA') groups[key].delivered += 1;
            if (log.type === 'DEVOLUCAO') groups[key].returns += 1;
            groups[key].totalValue += Number(log.value) || 0;
        });

        // Retorna ordenado por data descendente
        return Object.keys(groups)
            .sort((a, b) => b.localeCompare(a))
            .map(key => groups[key]);
    }, [logs]);

    const totalLiquid = routeData.reduce((acc, curr) => acc + curr.totalValue, 0);

    const handleExportClick = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            setShowSuccess(true);
            onExport();
        }, 3000);
    };

    return (
        <div className="relative flex w-full flex-col max-w-[430px] mx-auto bg-pitch-black overflow-y-auto pb-10 animate-in fade-in duration-700 min-h-screen font-geometric">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
                
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
                .font-inter { font-family: 'Inter', sans-serif; }
                .glass-overlay {
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(8px);
                }
                .metallic-gold-loader {
                    border: 3px solid rgba(235, 192, 81, 0.1);
                    border-top: 3px solid #EBC051;
                    border-right: 3px solid #EBC051;
                    box-shadow: 0 0 15px rgba(235, 192, 81, 0.3);
                }
                
                @media print {
                    .no-print { display: none !important; }
                    body { background: #000 !important; }
                    .pdf-container { transform: scale(1) !important; margin: 0 !important; width: 100% !important; }
                }

                .glass-modal {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(235, 192, 81, 0.4);
                }
                @keyframes glow-pulse {
                    0%, 100% { filter: drop-shadow(0 0 10px rgba(235, 192, 81, 0.4)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 30px rgba(235, 192, 81, 0.8)); transform: scale(1.05); }
                }
                .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
                `
            }} />

            <div className={`px-5 mb-8 relative transition-all duration-500 ${isExporting || showSuccess ? 'blur-md opacity-40' : 'blur-0 opacity-100'}`}>
                <div className="flex flex-col bg-charcoal border border-primary-gold/20 rounded-2xl cinematic-glow overflow-hidden mt-8">
                    {/* Cabeçalho */}
                    <div className="px-6 py-10 flex flex-col items-center gap-2 border-b border-primary-gold/10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary-gold text-2xl">diamond</span>
                            <span className="text-[10px] font-black tracking-[0.6em] text-primary-gold uppercase">LOGCASH PREMIUM</span>
                        </div>
                        <h1 className="text-[16px] font-bold tracking-[0.5em] gold-gradient-text uppercase text-center">RELATÓRIO OPERACIONAL</h1>
                        <p className="text-[9px] text-white/30 tracking-widest uppercase">Resumo Operacional de Fevereiro</p>
                    </div>

                    {/* Header da Tabela */}
                    <div className="spreadsheet-grid px-6 py-4 bg-white/[0.02] border-b border-primary-gold/10">
                        <div className="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase">DATA</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-center">CARREG.</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-center">ENTREG.</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-center">DEVOL.</div>
                        <div className="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-right">VALOR TOTAL</div>
                    </div>

                    {/* Listagem de Linhas */}
                    <div className="flex flex-col">
                        {routeData.length > 0 ? routeData.map((row, idx) => (
                            <div key={idx} className="spreadsheet-grid px-6 py-5 row-divider">
                                <div className="text-[11px] font-bold text-ice-white">{row.date}</div>
                                <div className="text-[11px] font-medium text-white/90 text-center font-inter">{row.loaded}</div>
                                <div className="text-[11px] font-medium text-white/90 text-center font-inter">{row.delivered}</div>
                                <div className="text-[11px] font-medium text-primary-gold text-center font-inter">{row.returns}</div>
                                <div className="text-[11px] font-bold text-ice-white text-right font-inter">
                                    R$ {row.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </div>
                            </div>
                        )) : (
                            <div className="px-6 py-10 text-center text-[10px] text-white/20 uppercase tracking-widest">
                                Nenhum registro este mês
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
                                    <span className="text-[9px] text-primary-gold/50 uppercase tracking-[0.2em] mb-1">VALOR LÍQUIDO MENSAL</span>
                                    <span className="text-3xl font-bold text-ice-white font-inter tracking-tight">
                                        R$ {totalLiquid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rodapé Interno */}
                    <div className="px-6 py-6 flex justify-center border-t border-primary-gold/10 bg-black/40">
                        <p className="text-[7px] text-white/20 tracking-[0.4em] uppercase">Autenticidade Verificada LogCash Digital</p>
                    </div>
                </div>
            </div>

            {/* Ações de Download */}
            <div className={`px-8 space-y-4 z-10 transition-all duration-500 ${isExporting || showSuccess ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                <button
                    onClick={handleExportClick}
                    className="w-full bg-gradient-to-r from-primary-gold/20 to-primary-gold/5 border border-primary-gold/30 text-primary-gold py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined text-lg">download</span>
                    Fazer Download do Mês
                </button>
            </div>

            {/* Footer Branding */}
            <div className="flex justify-center items-center gap-3 pt-10 pb-4 opacity-30">
                <div className="h-[1px] w-8 bg-primary-gold"></div>
                <span className="text-[8px] font-bold tracking-[0.3em] text-primary-gold uppercase">Elite Document Service</span>
                <div className="h-[1px] w-8 bg-primary-gold"></div>
            </div>

            {/* Overlays */}
            {isExporting && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center glass-overlay overflow-hidden">
                    <div className="relative flex items-center justify-center animate-pulse-gentle">
                        <div className="size-20 rounded-full metallic-gold-loader animate-spin-slow"></div>
                        <div className="absolute size-14 rounded-full border border-primary-gold/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary-gold text-3xl">description</span>
                        </div>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm">
                    <div className="glass-modal w-full max-w-[340px] rounded-[32px] p-8 flex flex-col items-center relative overflow-hidden animate-in zoom-in duration-300">
                        <div className="relative mb-8">
                            <div className="size-20 rounded-full border-2 border-primary-gold/40 flex items-center justify-center bg-primary-gold/10 animate-glow-pulse">
                                <span className="material-symbols-outlined text-primary-gold text-5xl font-bold">check_circle</span>
                            </div>
                        </div>
                        <div className="text-center mb-10">
                            <h2 className="text-xl font-black tracking-[0.2em] text-white uppercase mb-2">DOCUMENTO PRONTO</h2>
                            <p className="text-sm font-medium text-primary-gold tracking-wide text-center">Seu extrato foi gerado com sucesso</p>
                        </div>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="w-full py-4 rounded-[20px] border border-primary-gold text-primary-gold font-bold text-xs uppercase tracking-[0.3em] transition-all active:scale-95 bg-transparent"
                        >
                            FECHAR
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EliteExtrato;
