
import React from 'react';
import { LogEntry } from '../types';

interface ElitePDFViewProps {
    logs: LogEntry[];
    userName: string;
    onBack: () => void;
}

const ElitePDFView: React.FC<ElitePDFViewProps> = ({ logs, userName, onBack }) => {
    const now = new Date();
    const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    const currentMonth = monthNames[now.getMonth()];
    const currentYear = now.getFullYear();

    // Calculate stats from logs
    const deliveredLogs = logs.filter(l => l.type === 'SAIDA');
    const discrepancies = logs.filter(l => l.type === 'DEVOLUCAO').length;
    const totalUnits = logs.filter(l => l.type === 'ENTRADA').length;

    const VALOR_ENTREGA = 9.5; // Example
    const totalGanhos = deliveredLogs.length * VALOR_ENTREGA;
    const bonusPerformance = totalGanhos > 100 ? totalGanhos * 0.1 : 0;
    const taxas = totalGanhos * 0.05;
    const saldoLiquido = totalGanhos + bonusPerformance - taxas;

    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="flex flex-col items-center bg-black animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
        .pdf-page {
            background: linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 0.5px solid rgba(212, 175, 55, 0.2);
            position: relative;
        }
        .pdf-page::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuCgxh_mo3Pul7MJgfeu1vVZgmQncruP090khLU-ANysmbUDMuh1P5IH5zpQnc2-0vhvm8abBC5MGFb1GV_JL5K-HBmpJSjHWpHwp5ZA4CrXTpJc1e39OFob8Co3i28vF_pn0EGZ1l3qHKj9UZc3UEFj9q981M7-tnvM_ZNqv5t-gkz0kNkcvCOonjFYdUr8fUmTe4ueLd2wm-fzwm5VT5jbc0PFq_HEwTM-jNNLzujDKKRkW2LTMnEiAYr0flpG3Unm7CH5YmkzG6Ng);
            opacity: 0.03;
            pointer-events: none;
        }
        .gold-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #D4AF37, transparent);
            opacity: 0.4;
        }
        .metallic-gold {
            background: linear-gradient(135deg, #F9E29C 0%, #D4AF37 50%, #AA771C 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .qr-placeholder {
            background: repeating-conic-gradient(#D4AF37 0% 25%, transparent 0% 50%) 50%/10px 10px;
            opacity: 0.2;
        }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .pdf-page { box-shadow: none !important; border: 1px solid #ccc !important; background: white !important; color: black !important; }
          .pdf-page::before { display: none !important; }
          .metallic-gold { -webkit-text-fill-color: initial !important; background: none !important; color: #996515 !important; }
          .text-white { color: black !important; }
          .text-white\/40, .text-white\/50, .text-white\/30, .text-white\/20, .text-primary-gold { color: #555 !important; }
        }
      `}} />

            <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] bg-black shadow-2xl ring-1 ring-white/5 pb-10">
                <header className="flex items-center justify-between p-6 mt-4 no-print">
                    <button
                        onClick={onBack}
                        className="flex size-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#D4AF37] active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-2xl text-[#D4AF37]">arrow_back_ios_new</span>
                    </button>
                    <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">DOCUMENTO PDF</span>
                    <button className="flex size-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#D4AF37] active:scale-90 transition-all">
                        <span className="material-symbols-outlined text-2xl text-[#D4AF37]">more_vert</span>
                    </button>
                </header>

                <div className="px-6">
                    <div className="pdf-page rounded-sm min-h-[700px] w-full p-8 flex flex-col">
                        <div className="flex flex-col items-center mb-10">
                            <div className="size-12 mb-4 border border-[#D4AF37]/40 flex items-center justify-center rotate-45">
                                <span className="material-symbols-outlined text-[#D4AF37] -rotate-45 text-2xl">shield_person</span>
                            </div>
                            <h1 className="text-lg font-black tracking-[0.3em] metallic-gold uppercase mb-1">EXTRATO DETALHADO</h1>
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-[9px] font-bold text-white/50 tracking-widest uppercase">PERÍODO: 01 {currentMonth} — {now.getDate()} {currentMonth} {currentYear}</p>
                                <p className="text-[9px] font-bold text-[#D4AF37] tracking-widest uppercase">ID ELITE: #AD-{userName.substring(0, 2).toUpperCase()}-{(Math.random() * 9000).toFixed(0)}</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[10px] font-black text-[#D4AF37] tracking-[0.2em] uppercase">01. RESUMO DA ROTA</span>
                                <div className="flex-1 gold-divider"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-y-4">
                                <div>
                                    <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Distância Total (Est)</p>
                                    <p className="text-sm font-bold text-white">{(deliveredLogs.length * 2.8).toFixed(1)} KM</p>
                                </div>
                                <div>
                                    <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Volumes Carregados</p>
                                    <p className="text-sm font-bold text-white">{totalUnits} UN</p>
                                </div>
                                <div>
                                    <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Entregas Sucesso</p>
                                    <p className="text-sm font-bold text-white">{deliveredLogs.length} UN</p>
                                </div>
                                <div>
                                    <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Discrepâncias</p>
                                    <p className="text-sm font-bold text-[#D4AF37]">{discrepancies.toString().padStart(2, '0')} UN</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[10px] font-black text-[#D4AF37] tracking-[0.2em] uppercase">02. FINANCEIRO</span>
                                <div className="flex-1 gold-divider"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <div>
                                        <p className="text-[9px] font-bold text-white uppercase">Ganhos de Rota</p>
                                        <p className="text-[7px] text-white/30 uppercase tracking-tighter">TOTAL ACUMULADO NO PERÍODO</p>
                                    </div>
                                    <span className="text-xs font-bold text-white">+R$ {totalGanhos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <div>
                                        <p className="text-[9px] font-bold text-white uppercase">Bônus Performance</p>
                                        <p className="text-[7px] text-white/30 uppercase tracking-tighter">NÍVEL ELITE ALCANÇADO</p>
                                    </div>
                                    <span className="text-xs font-bold text-white">+R$ {bonusPerformance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <div>
                                        <p className="text-[9px] font-bold text-white uppercase">Taxas Operacionais</p>
                                        <p className="text-[7px] text-white/30 uppercase tracking-tighter">MANUTENÇÃO DE TERMINAL</p>
                                    </div>
                                    <span className="text-xs font-bold text-[#D4AF37]">-R$ {taxas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between items-center p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg">
                                <span className="text-[10px] font-black text-white tracking-widest uppercase">SALDO LÍQUIDO</span>
                                <span className="text-lg font-black metallic-gold">R$ {saldoLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-8 border-t border-white/10">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#D4AF37] text-sm">verified_user</span>
                                        <span className="text-[8px] font-black text-white/40 tracking-[0.2em] uppercase">CERTIFICAÇÃO DIGITAL</span>
                                    </div>
                                    <p className="text-[7px] font-mono text-white/20 break-all max-w-[180px]">
                                        SHA256: 8f92b3c4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s
                                    </p>
                                    <p className="text-[8px] font-bold text-[#D4AF37]/60 uppercase">AUTENTICADO VIA ELITE CLOUD SYSTEM</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="size-16 qr-placeholder rounded-md border border-[#D4AF37]/30"></div>
                                    <span className="text-[7px] text-white/30 uppercase">VERIFICAR</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-10 py-10 flex flex-col items-center gap-8 no-print">
                    <button
                        onClick={handleDownload}
                        className="w-full bg-gradient-to-r from-[#AA771C] via-[#F9E29C] to-[#AA771C] text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-[#D4AF37]/40 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                    >
                        <span className="material-symbols-outlined">download</span>
                        BAIXAR DOCUMENTO
                    </button>

                    <div className="w-full flex flex-col items-center">
                        <div className="w-1/3 gold-divider mb-8"></div>
                        <p className="text-[9px] font-black text-white/40 tracking-[0.3em] uppercase mb-6">COMPARTILHAR DOCUMENTO</p>
                        <div className="flex items-center justify-center gap-8">
                            <div className="flex flex-col items-center gap-3">
                                <button className="size-14 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors active:scale-90">
                                    <span className="material-symbols-outlined text-2xl text-[#D4AF37]">chat</span>
                                </button>
                                <span className="text-[8px] font-bold text-white/60 tracking-widest uppercase">WhatsApp</span>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <button className="size-14 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors active:scale-90">
                                    <span className="material-symbols-outlined text-2xl text-[#D4AF37]">mail</span>
                                </button>
                                <span className="text-[8px] font-bold text-white/60 tracking-widest uppercase">E-mail</span>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <button className="size-14 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors active:scale-90">
                                    <span className="material-symbols-outlined text-2xl text-[#D4AF37]">ios_share</span>
                                </button>
                                <span className="text-[8px] font-bold text-white/60 tracking-widest uppercase">Outros</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElitePDFView;
