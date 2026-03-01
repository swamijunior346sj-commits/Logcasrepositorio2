
import React, { useEffect } from 'react';
import { DailySummary } from '../types';

interface EliteWeeklyPDFProps {
    rows: DailySummary[];
    onBack: () => void;
}

const EliteWeeklyPDF: React.FC<EliteWeeklyPDFProps> = ({ rows, onBack }) => {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = "Relatório Semanal Minimalista Absoluto";
        return () => { document.title = prevTitle; };
    }, []);

    const VALOR_POR_PACOTE = 2.50; // Alinhado com o sistema
    const totalEarnings = rows.reduce((acc, curr) => acc + (curr.gains || 0), 0);
    const bonusPerformance = 180.0;
    const totalValue = totalEarnings + bonusPerformance;

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(val);

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-pitch-black font-geometric animate-in fade-in duration-700">
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
                
                @media print {
                    .no-print { display: none !important; }
                    body { background: #000 !important; margin: 0 !important; padding: 0 !important; }
                    .pdf-container { transform: scale(1) !important; margin: 0 !important; width: 100% !important; border: none !important; box-shadow: none !important; }
                }
                @page { margin: 0; size: auto; }
                `
            }} />

            <div className="relative flex w-full flex-col max-w-[430px] pdf-container">
                <div className="flex flex-col bg-charcoal border border-primary-gold/20 rounded-2xl cinematic-glow overflow-hidden">
                    {/* Cabeçalho */}
                    <div className="px-6 py-10 flex flex-col items-center gap-2 border-b border-primary-gold/10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary-gold text-2xl">diamond</span>
                            <span className="text-[10px] font-black tracking-[0.6em] text-primary-gold uppercase">LOGCASH PREMIUM</span>
                        </div>
                        <h1 className="text-[16px] font-bold tracking-[0.5em] gold-gradient-text uppercase text-center font-sans">RELATÓRIO SEMANAL</h1>
                        <p className="text-[9px] text-white/30 tracking-widest uppercase">Documento Oficial de Movimentação</p>
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
                        {rows.length > 0 ? rows.slice(0, 7).map((row, idx) => (
                            <div key={idx} className="spreadsheet-grid px-6 py-5 row-divider">
                                <div className="text-[11px] font-bold text-ice-white uppercase">{row.date}</div>
                                <div className="text-[11px] font-medium text-white/90 text-center">{row.loaded}</div>
                                <div className="text-[11px] font-medium text-white/90 text-center">{row.delivered}</div>
                                <div className={`text-[11px] font-medium text-center ${row.returns > 0 ? 'text-primary-gold' : 'text-white/20'}`}>
                                    {String(row.returns || 0).padStart(2, '0')}
                                </div>
                                <div className="text-[11px] font-bold text-ice-white text-right font-geometric">
                                    {formatCurrency(row.gains)}
                                </div>
                            </div>
                        )) : (
                            <div className="px-6 py-10 text-center text-[10px] text-white/20 uppercase tracking-widest">
                                Nenhum registro nesta semana
                            </div>
                        )}
                    </div>

                    {/* Resumo Financeiro */}
                    <div className="px-6 py-10 bg-gradient-to-b from-transparent to-primary-gold/[0.03]">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center border-t border-primary-gold/20 pt-6">
                                <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">RESUMO FINANCEIRO (+BÔNUS)</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-primary-gold/50 uppercase tracking-[0.2em] mb-1">VALOR LÍQUIDO TOTAL</span>
                                    <span className="text-3xl font-bold text-ice-white font-geometric tracking-tight">
                                        {formatCurrency(totalValue)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rodapé Interno */}
                    <div className="px-6 py-6 flex justify-center border-t border-primary-gold/10 bg-black/40">
                        <p className="text-[7px] text-white/20 tracking-[0.4em] uppercase font-sans">Autenticidade Verificada LogCash Digital</p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 no-print px-4">
                    <button
                        onClick={() => window.print()}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-gold/20 to-primary-gold/5 border border-primary-gold/30 text-primary-gold font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined text-lg">ios_share</span>
                        Compartilhar PDF
                    </button>
                    <button
                        onClick={onBack}
                        className="w-full py-4 rounded-2xl border border-white/5 text-white/40 font-bold text-xs uppercase tracking-[0.2em] hover:text-white transition-all"
                    >
                        Voltar ao Terminal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EliteWeeklyPDF;
