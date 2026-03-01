
import React, { useMemo } from 'react';
import { LogEntry } from '../types';
import { VALOR_POR_PACOTE } from '../constants';

interface EliteExpressReportProps {
    logs: LogEntry[];
    userName: string;
    onBack: () => void;
    onExportPDF: () => void;
}

const EliteExpressReport: React.FC<EliteExpressReportProps> = ({ logs, userName, onBack, onExportPDF }) => {
    const today = new Date();
    const dateLabel = today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

    const stats = useMemo(() => {
        const todayStr = today.toISOString().split('T')[0];
        const todayLogs = logs.filter(l => new Date(l.timestamp).toISOString().split('T')[0] === todayStr);

        const loaded = todayLogs.reduce((s, l) => s + l.entrada, 0);
        const delivered = todayLogs.reduce((s, l) => s + l.saida, 0);
        const divergencias = todayLogs.reduce((s, l) => s + l.devolucao, 0);
        const taxa = loaded > 0 ? ((delivered / loaded) * 100) : 0;
        const valorRota = delivered * VALOR_POR_PACOTE;
        const valorLiquido = valorRota * 0.93; // 7% dedução estimada

        return { loaded, delivered, divergencias, taxa, valorRota, valorLiquido };
    }, [logs]);

    const formatBRL = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const formatNumber = (val: number) =>
        new Intl.NumberFormat('pt-BR').format(val);

    const reportNumber = `#${String(today.getDate()).padStart(2, '0')}${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

    return (
        <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] mx-auto bg-black min-h-screen">
            <style dangerouslySetInnerHTML={{
                __html: `
                .glass-invoice-er {
                    background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(235,192,81,0.15);
                }
                .spreadsheet-row-er {
                    border-bottom: 0.5px solid rgba(235,192,81,0.1);
                }
                .spreadsheet-row-er:last-child {
                    border-bottom: none;
                }
                .gold-border-btn-er {
                    border: 1.5px solid #EBC051;
                    transition: all 0.3s ease;
                }
                .gold-border-btn-er:active {
                    background-color: rgba(235,192,81,0.1);
                    transform: scale(0.98);
                }
            `}} />

            {/* Header */}
            <div className="flex items-center justify-between p-8 mt-4">
                <button
                    onClick={onBack}
                    className="flex size-10 items-center justify-start text-white/50 hover:text-[#EBC051] transition-colors"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
                </button>
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-[11px] font-black tracking-[0.4em] text-[#EBC051] uppercase">RELATÓRIO EXPRESSO</h1>
                    <span className="text-[9px] text-white/30 tracking-[0.2em] mt-1 uppercase">SISTEMA DE LOGÍSTICA V3</span>
                </div>
                <div className="size-10 flex items-center justify-end">
                    <span className="material-symbols-outlined text-[#EBC051]/30">receipt_long</span>
                </div>
            </div>

            {/* Invoice Card */}
            <div className="px-6 flex-1 flex flex-col">
                <div className="glass-invoice-er rounded-[32px] overflow-hidden flex flex-col mb-8">
                    {/* Invoice Header */}
                    <div className="bg-[#EBC051]/5 px-6 py-4 flex justify-between items-center border-b border-[#EBC051]/20">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#EBC051] uppercase">DETALHES DA OPERAÇÃO</span>
                        <span className="text-[10px] text-white/40 tracking-wider">{reportNumber}</span>
                    </div>

                    {/* Spreadsheet Rows */}
                    <div className="px-6 space-y-0">
                        <div className="spreadsheet-row-er py-4 flex justify-between items-center">
                            <label className="text-[10px] font-semibold tracking-wider text-[#EBC051]/70 uppercase">Data de Emissão</label>
                            <span className="text-[13px] font-medium text-[#F5F5F5]">{dateLabel}</span>
                        </div>
                        <div className="spreadsheet-row-er py-4 flex justify-between items-center">
                            <label className="text-[10px] font-semibold tracking-wider text-[#EBC051]/70 uppercase">Carga Total</label>
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] font-bold text-[#F5F5F5]">{formatNumber(stats.loaded)}</span>
                                <span className="text-[9px] text-white/30 uppercase">un</span>
                            </div>
                        </div>
                        <div className="spreadsheet-row-er py-4 flex justify-between items-center">
                            <label className="text-[10px] font-semibold tracking-wider text-[#EBC051]/70 uppercase">Entregas Realizadas</label>
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] font-bold text-[#F5F5F5]">{formatNumber(stats.delivered)}</span>
                                <span className="text-[9px] text-white/30 uppercase">un</span>
                            </div>
                        </div>
                        <div className="spreadsheet-row-er py-4 flex justify-between items-center">
                            <label className="text-[10px] font-semibold tracking-wider text-[#EBC051]/70 uppercase">Divergências</label>
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] font-bold text-[#F5F5F5]">{formatNumber(stats.divergencias)}</span>
                                <span className="text-[9px] text-white/30 uppercase">un</span>
                            </div>
                        </div>
                        <div className="spreadsheet-row-er py-4 flex justify-between items-center">
                            <label className="text-[10px] font-semibold tracking-wider text-[#EBC051]/70 uppercase">Taxa de Eficiência</label>
                            <span className="text-[13px] font-bold text-[#F5F5F5]">{stats.taxa.toFixed(1)}%</span>
                        </div>
                        <div className="spreadsheet-row-er py-4 flex justify-between items-center">
                            <label className="text-[10px] font-semibold tracking-wider text-[#EBC051]/70 uppercase">Valor da Rota do Dia</label>
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] font-bold text-white/40">R$</span>
                                <span className="text-[13px] font-bold text-[#F5F5F5]">{formatBRL(stats.valorRota).replace('R$', '').trim()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Separator dots */}
                    <div className="h-3 bg-[#EBC051]/5 flex items-center justify-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-[#EBC051]/20"></div>
                        <div className="w-1 h-1 rounded-full bg-[#EBC051]/20"></div>
                        <div className="w-1 h-1 rounded-full bg-[#EBC051]/20"></div>
                    </div>
                </div>

                {/* Net Value */}
                <div className="px-2 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-black tracking-[0.3em] text-[#EBC051] uppercase mb-1">VALOR LÍQUIDO</p>
                            <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-medium italic">Processamento Imediato</p>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-[13px] text-[#EBC051]/60 font-semibold uppercase">R$</span>
                                <span className="text-[36px] font-normal tracking-tight text-[#F5F5F5] leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    {formatBRL(stats.valorLiquido).replace('R$', '').trim()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-[#EBC051]/30 to-transparent"></div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto px-8 pb-12 pt-2">
                <button
                    onClick={onExportPDF}
                    className="w-full mb-4 gold-border-btn-er flex items-center justify-center gap-3 rounded-xl py-5 transition-all"
                >
                    <span className="material-symbols-outlined text-[#EBC051] text-xl">file_download</span>
                    <span className="text-[12px] font-bold tracking-[0.5em] text-[#EBC051] uppercase">EMITIR</span>
                </button>

                {/* Document Footer */}
                <div className="mt-8 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                        <span className="h-[1px] w-4 bg-white/10"></span>
                        <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-medium">Documento Digital Autenticado</p>
                        <span className="h-[1px] w-4 bg-white/10"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EliteExpressReport;
