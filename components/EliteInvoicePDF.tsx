import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface EliteInvoicePDFProps {
    onBack: () => void;
    onComplete?: () => void;
}

const EliteInvoicePDF: React.FC<EliteInvoicePDFProps> = ({ onBack, onComplete }) => {
    const [exportState, setExportState] = useState<'view' | 'loading' | 'success'>('view');

    const handleDownload = () => {
        setExportState('loading');

        setTimeout(() => {
            setExportState('success');
            generatePDF();
        }, 3000);
    };

    const generatePDF = async () => {
        const printElement = document.getElementById('pdf-print-area');
        if (!printElement) return;

        printElement.style.display = 'flex';

        try {
            const canvas = await html2canvas(printElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#000000',
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Nota_Fiscal_Minimalista_V1.pdf');
        } catch (error) {
            console.error('Erro ao gerar PDF', error);
        } finally {
            printElement.style.display = 'none';
        }
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-pitch-black font-sans overflow-x-hidden animate-in fade-in duration-500" style={{ fontFamily: "'Inter', sans-serif" }}>
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap');
                
                .gold-border-minimal {
                    border: 1px solid #EBC051;
                }
                .gold-border-micro {
                    border: 0.5px solid rgba(235, 192, 81, 0.3);
                }
                .gold-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(235, 192, 81, 0.4), transparent);
                }
                .metallic-gold-text {
                    background: linear-gradient(135deg, #F9E29C 0%, #EBC051 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .executive-outline-btn {
                    border: 1px solid #EBC051;
                    background: transparent;
                    color: #F8FAFC;
                    transition: all 0.2s ease;
                }
                .executive-outline-btn:active {
                    transform: scale(0.98);
                    background: rgba(235, 192, 81, 0.08);
                }

                /* Animation styles for loading/success */
                .pdf-document {
                    background-color: #000000;
                    aspect-ratio: 1 / 1.414;
                    box-shadow: 0 0 0 1px rgba(235, 192, 81, 0.1);
                    position: relative;
                    color: #F5F5F5;
                }
                .gold-border-section {
                    border: 1px solid rgba(235, 192, 81, 0.3);
                    border-radius: 4px;
                }
                .minimal-gold-border {
                    background: transparent;
                    border: 1px solid #EBC051;
                    box-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
                }
                .minimal-gold-button {
                    background: transparent;
                    border: 1px solid #EBC051;
                }
                .particle {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    background: #EBC051;
                    border-radius: 50%;
                    pointer-events: none;
                }
                .metallic-gradient {
                    background: linear-gradient(135deg, #EBC051 0%, #FFFFFF 45%, #EBC051 55%, #B38E2F 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
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
                @keyframes glow-pulse {
                    0%, 100% { filter: drop-shadow(0 0 15px rgba(235, 192, 81, 0.3)); transform: scale(1); }
                    50% { filter: drop-shadow(0 0 35px rgba(235, 192, 81, 0.6)); transform: scale(1.03); }
                }
                @keyframes liquid-metallic {
                    0%, 100% { transform: translateY(0) scale(1); filter: brightness(1) contrast(1.1); }
                    50% { transform: translateY(-3px) scale(1.02); filter: brightness(1.4) contrast(1.25); }
                }
                @keyframes inner-glow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.7; }
                }

                .animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
                .animate-float-particle { animation: float-particle 10s linear infinite; }
                .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
                .animate-liquid-metallic { animation: liquid-metallic 4s ease-in-out infinite; }
                .animate-inner-glow { animation: inner-glow 2s ease-in-out infinite; }
                .metallic-gold-loader {
                    border: 3px solid rgba(235, 192, 81, 0.1);
                    border-top: 3px solid #EBC051;
                    border-right: 3px solid #EBC051;
                    box-shadow: 0 0 15px rgba(235, 192, 81, 0.3);
                }
                .glass-overlay-export {
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
                .animate-spin-slow { animation: spin 3s linear infinite; }
                `
            }} />

            {exportState === 'view' && (
                <div className="relative flex min-h-screen w-full flex-col max-w-[430px] bg-pitch-black p-6 animate-in fade-in duration-300">
                    <div className="flex flex-col items-center justify-center pt-12 pb-10 text-center">
                        <h1 className="text-[28px] font-medium tracking-[0.25em] metallic-gold-text uppercase">
                            LogCash
                        </h1>
                    </div>

                    <div className="gold-border-minimal rounded-sm flex flex-col w-full mb-8 overflow-hidden bg-transparent">
                        <div className="p-5 flex justify-between items-center border-b border-white/10">
                            <div>
                                <h2 className="text-[14px] font-bold tracking-[0.1em] text-white">LOGCASH</h2>
                                <p className="text-[8px] font-medium text-[#EBC051] tracking-[0.1em] uppercase">Premium Logistics</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-light text-white/70 tracking-widest uppercase">NF-e DE SERVIÇOS</p>
                                <p className="text-[9px] font-light text-white/40 uppercase">Série 003 • Nº 982.734</p>
                            </div>
                        </div>

                        <div className="p-5 space-y-5">
                            <div className="space-y-1">
                                <span className="text-[8px] font-semibold text-[#EBC051]/60 uppercase tracking-widest">Prestador de Serviços</span>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-light text-white tracking-wider">LOGCASH SOLUÇÕES FINANCEIRAS LTDA</span>
                                    <span className="text-[10px] font-light text-white/50">CNPJ: 42.123.456/0001-99</span>
                                </div>
                            </div>

                            <div className="gold-divider"></div>

                            <div className="space-y-1">
                                <span className="text-[8px] font-semibold text-[#EBC051]/60 uppercase tracking-widest">Tomador de Serviços</span>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-light text-white tracking-wider">TRANSPORTES ELITE BRASIL S.A.</span>
                                    <span className="text-[10px] font-light text-white/50">CNPJ: 10.987.654/0001-22</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 border-t border-white/5">
                            <span className="text-[8px] font-semibold text-[#EBC051]/60 uppercase tracking-widest block mb-2">Descrição do Serviço</span>
                            <p className="text-[11px] font-light text-white/80 leading-relaxed italic">
                                Prestação de serviços de logística integrada, gestão de fretes e processamento de dados transacionais referentes ao período de Maio/2024.
                            </p>
                        </div>

                        <div className="p-5 border-t border-white/5">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-medium text-white/40 uppercase tracking-widest">Valor Bruto</span>
                                    <span className="text-[13px] font-light text-white">R$ 9.854,24</span>
                                </div>
                                <div className="flex flex-col border-l border-white/10 pl-4">
                                    <span className="text-[8px] font-medium text-white/40 uppercase tracking-widest">ISS (5%)</span>
                                    <span className="text-[13px] font-light text-white">R$ 443,44</span>
                                </div>
                            </div>

                            <div className="gold-divider mb-6"></div>

                            <div className="flex flex-col items-center justify-center py-2">
                                <span className="text-[9px] font-medium text-[#EBC051]/80 uppercase tracking-[0.4em] mb-2">Valor Líquido</span>
                                <span className="text-[36px] font-extralight metallic-gold-text tracking-tighter">R$ 9.410,80</span>
                            </div>
                        </div>

                        <div className="p-3 text-center border-t border-white/10">
                            <span className="text-[7px] font-light text-white/30 uppercase tracking-[0.3em]">Autenticação Digital: 8f2d-9a1b-4e5c-7d3f-0a2e-4b6c</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-auto pb-10">
                        <button onClick={handleDownload} className="w-full executive-outline-btn py-4 rounded-sm font-light text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                            BAIXAR PDF
                        </button>
                        <button onClick={onBack} className="w-full py-4 text-[9px] font-light text-white/30 uppercase tracking-[0.3em] hover:text-white/60 transition-colors">
                            Voltar ao Início
                        </button>
                    </div>
                </div>
            )}

            {exportState === 'loading' && (
                <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] bg-pitch-black shadow-2xl pb-10 animate-in fade-in duration-300">
                    <div className="h-12 w-full"></div>
                    <div className="px-4 relative group mt-4">
                        <div className="pdf-document w-full rounded-sm p-6 flex flex-col border border-white/5 blur-[4px]">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="size-8 bg-[#EBC051]/10 border border-[#EBC051]/30 flex items-center justify-center rotate-45">
                                        <span className="material-symbols-outlined text-[#EBC051] -rotate-45 text-xl">account_balance_wallet</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-black tracking-tighter leading-none text-white">LOGCASH</span>
                                        <span className="text-[6px] font-bold text-[#EBC051] tracking-[0.2em] leading-none">PREMIUM SERVICES</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h1 className="text-[10px] font-black tracking-widest text-[#F5F5F5] uppercase opacity-80">EXTRATO OFICIAL</h1>
                                </div>
                            </div>
                            <div className="gold-border-section p-3 mb-4 bg-white/5">
                                <div className="h-2 w-24 bg-[#EBC051]/20 mb-2 rounded"></div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <div className="h-1.5 w-12 bg-white/10 rounded"></div>
                                        <div className="h-2 w-20 bg-white/20 rounded"></div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-1.5 w-12 bg-white/10 rounded"></div>
                                        <div className="h-2 w-20 bg-white/20 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="gold-border-section p-3 mb-4 bg-white/5">
                                <div className="h-2 w-24 bg-[#EBC051]/20 mb-3 rounded"></div>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <div className="h-2 w-28 bg-white/10 rounded"></div>
                                        <div className="h-2 w-10 bg-white/20 rounded"></div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="h-2 w-28 bg-white/10 rounded"></div>
                                        <div className="h-2 w-10 bg-white/20 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto pt-4 border-t border-white/10 flex items-end justify-between">
                                <div className="h-2 w-32 bg-white/5 rounded"></div>
                                <div className="size-6 border border-[#EBC051]/50 rounded-full flex items-center justify-center bg-[#EBC051]/5">
                                    <span className="material-symbols-outlined text-[#EBC051] text-[10px]">verified_user</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center glass-overlay-export mx-4 rounded-sm overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="particle animate-float-particle top-1/2 left-1/4" style={{ animationDelay: '0s', width: '3px', height: '3px' } as any}></div>
                                <div className="particle animate-float-particle top-1/3 left-1/2" style={{ animationDelay: '2s', width: '3px', height: '3px' } as any}></div>
                                <div className="particle animate-float-particle top-2/3 left-2/3" style={{ animationDelay: '4s', width: '3px', height: '3px' } as any}></div>
                                <div className="particle animate-float-particle top-1/2 left-3/4" style={{ animationDelay: '1s', width: '3px', height: '3px' } as any}></div>
                                <div className="particle animate-float-particle top-3/4 left-1/3" style={{ animationDelay: '3s', width: '3px', height: '3px' } as any}></div>
                            </div>
                            <div className="relative flex items-center justify-center animate-pulse-gentle">
                                <div className="size-20 rounded-full metallic-gold-loader animate-spin-slow"></div>
                                <div className="absolute size-14 rounded-full border border-[#EBC051]/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#EBC051] text-3xl">description</span>
                                </div>
                            </div>
                            <p className="mt-8 text-[11px] font-black tracking-[0.4em] text-white uppercase font-sans animate-pulse">
                                PROCESSANDO DOCUMENTO...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {exportState === 'success' && (
                <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] bg-pitch-black shadow-2xl pb-10 animate-in fade-in duration-500">
                    <div className="flex items-center justify-center p-6 mt-4 relative h-10"></div>

                    <div className="px-4 relative blur-xl select-none pointer-events-none opacity-40">
                        <div className="pdf-document w-full rounded-sm p-6 flex flex-col border border-white/5">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="size-8 bg-[#EBC051]/10 border border-[#EBC051]/30 flex items-center justify-center rotate-45">
                                        <span className="material-symbols-outlined text-[#EBC051] -rotate-45 text-xl">account_balance_wallet</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-black tracking-tighter leading-none text-white uppercase">LOGCASH</span>
                                        <span className="text-[6px] font-bold text-[#EBC051] tracking-[0.2em] leading-none uppercase">PREMIUM SERVICES</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h1 className="text-[10px] font-black tracking-widest text-[#F5F5F5] uppercase opacity-80">EXTRATO OFICIAL</h1>
                                </div>
                            </div>
                            <div className="gold-border-section p-3 mb-4 bg-white/5">
                                <h2 className="text-[8px] font-black text-[#EBC051] tracking-widest uppercase mb-2">01. DADOS</h2>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="h-4 bg-white/10 rounded w-full"></div>
                                    <div className="h-4 bg-white/10 rounded w-full"></div>
                                </div>
                            </div>
                            <div className="gold-border-section p-3 mb-4 bg-white/5">
                                <div className="h-20 bg-white/10 rounded w-full"></div>
                            </div>
                            <div className="mt-auto pt-4 border-t border-white/10 flex items-end justify-between">
                                <div className="h-2 bg-white/5 rounded w-24"></div>
                                <div className="size-6 border border-[#EBC051]/50 rounded-full bg-[#EBC051]/5"></div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 z-50 flex items-center justify-center px-6">
                        <div className="minimal-gold-border w-full max-w-[340px] rounded-[32px] p-12 flex flex-col items-center relative overflow-hidden bg-black/60 backdrop-blur-sm">
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="particle animate-float-particle top-10 left-10" style={{ animationDelay: '0s' } as any}></div>
                                <div className="particle animate-float-particle top-32 right-8" style={{ animationDelay: '2s', width: '3px', height: '3px' } as any}></div>
                                <div className="particle animate-float-particle bottom-24 left-16" style={{ animationDelay: '1.5s' } as any}></div>
                            </div>
                            <div className="relative mb-12">
                                <div className="size-28 rounded-full flex items-center justify-center relative animate-glow-pulse">
                                    <div className="absolute inset-0 rounded-full bg-[#EBC051]/15 blur-2xl animate-inner-glow"></div>
                                    <div className="relative animate-liquid-metallic flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[100px] font-bold metallic-gradient drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" } as any}>
                                            check_circle
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-12">
                                <h2 className="text-[22px] font-black tracking-[0.3em] text-[#F5F5F5] uppercase mb-4 drop-shadow-lg">DOCUMENTO PRONTO</h2>
                                <p className="text-[13px] font-medium text-[#EBC051]/90 tracking-[0.1em] uppercase">Arquivo gerado com sucesso</p>
                            </div>
                            <button onClick={onComplete || onBack} className="minimal-gold-button w-full py-5 rounded-[22px] text-[#EBC051] font-extrabold text-[12px] uppercase tracking-[0.5em] transition-all active:scale-[0.98] hover:bg-[#EBC051]/[0.03]">
                                CONCLUÍDO
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden PDF content to be printed */}
            <div id="pdf-print-area" className="fixed top-0 left-0 w-[430px] bg-pitch-black p-6" style={{ display: 'none', zIndex: -9999 }}>
                <div className="gold-border-micro rounded-sm flex flex-col w-full mb-8 overflow-hidden mt-12">
                    <div className="p-5 flex justify-between items-center border-b border-white/5">
                        <div>
                            <h2 className="text-[14px] font-bold tracking-[0.1em] text-white">EMISSOR</h2>
                            <p className="text-[8px] font-medium text-[#EBC051]/70 tracking-[0.1em] uppercase">Logistics Division</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-light text-white/60 tracking-widest uppercase">NF-e DE SERVIÇOS</p>
                            <p className="text-[9px] font-light text-white/30 uppercase">Série 003 • Nº 982.734</p>
                        </div>
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="space-y-1">
                            <span className="text-[8px] font-medium text-[#EBC051]/40 uppercase tracking-widest">Prestador de Serviços</span>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-light text-white/90 uppercase tracking-wider">LOGCASH SOLUÇÕES FINANCEIRAS LTDA</span>
                                <span className="text-[10px] font-light text-white/40">CNPJ: 42.123.456/0001-99</span>
                            </div>
                        </div>
                        <div className="gold-divider"></div>
                        <div className="space-y-1">
                            <span className="text-[8px] font-medium text-[#EBC051]/40 uppercase tracking-widest">Tomador de Serviços</span>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-light text-white/90 uppercase tracking-wider">TRANSPORTES ELITE BRASIL S.A.</span>
                                <span className="text-[10px] font-light text-white/40">CNPJ: 10.987.654/0001-22</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 border-y border-white/5">
                        <span className="text-[8px] font-medium text-[#EBC051]/40 uppercase tracking-widest block mb-2">Descrição do Serviço</span>
                        <p className="text-[11px] font-light text-white/70 leading-relaxed italic">
                            Prestação de serviços de logística integrada, gestão de fretes e processamento de dados transacionais referentes ao período de Maio/2024.
                        </p>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-medium text-white/30 uppercase tracking-widest">Valor Bruto</span>
                                <span className="text-[13px] font-light text-white/90">R$ 9.854,24</span>
                            </div>
                            <div className="flex flex-col border-l border-white/5 pl-4">
                                <span className="text-[8px] font-medium text-white/30 uppercase tracking-widest">ISS (5%)</span>
                                <span className="text-[13px] font-light text-white/90">R$ 443,44</span>
                            </div>
                        </div>
                        <div className="gold-divider mb-6"></div>
                        <div className="flex flex-col items-center justify-center py-2">
                            <span className="text-[9px] font-medium text-[#EBC051]/60 uppercase tracking-[0.4em] mb-2">Valor Líquido</span>
                            <span className="text-[36px] font-extralight text-[#EBC051] tracking-tighter">R$ 9.410,80</span>
                        </div>
                    </div>
                    <div className="p-3 text-center border-t border-white/5">
                        <span className="text-[7px] font-light text-white/20 uppercase tracking-[0.3em]">Autenticação Digital: 8f2d-9a1b-4e5c-7d3f-0a2e-4b6c</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EliteInvoicePDF;
