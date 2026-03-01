import React, { useMemo } from 'react';
import { LogEntry } from '../types';
import { VALOR_POR_PACOTE } from '../constants';

interface EliteExpressReportProps {
    logs: LogEntry[];
    userName: string;
    onBack: () => void;
    onExportPDF: () => void;
}

const EliteExpressReport: React.FC<EliteExpressReportProps> = ({ logs, onBack, onExportPDF }) => {

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
            .sort((a, b) => {
                // Parse keys back for comparison if needed, or sort by id/date logic
                // Simple sort by ID/date for now (descending)
                return b.id.localeCompare(a.id);
            });
    }, [logs]);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(val).replace('R$', '').trim();

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
                .font-geometric { font-family: 'Inter', sans-serif; }
                .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
                `
            }} />

            {/* Header */}
            <div className="sticky top-0 z-50 glass-header flex items-center justify-between px-6 py-7">
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
                <div className="flex flex-col font-geometric">
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
            <div className="mt-auto px-6 pb-12 pt-8 bg-gradient-to-t from-pitch-black to-transparent flex flex-col gap-4 font-jakarta">
                <button className="w-full flex items-center justify-center gap-3 rounded-lg py-4 border border-primary-gold bg-transparent text-primary-gold active:bg-primary-gold/10 transition-all">
                    <span className="material-symbols-outlined text-xl">add_box</span>
                    <span className="text-[11px] font-bold tracking-[0.4em] uppercase">ADICIONAR LINHA</span>
                </button>
                <button
                    onClick={onExportPDF}
                    className="w-full flex items-center justify-center gap-3 rounded-lg py-4 border border-primary-gold bg-transparent text-primary-gold active:bg-primary-gold/10 transition-all font-jakarta"
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
    );
};

export default EliteExpressReport;
