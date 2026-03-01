
import React from 'react';

interface EliteInvoiceSuccessProps {
    valuePaid: number;
    protocol: string;
    onBackToHome: () => void;
    onViewInvoice: () => void;
    onClose: () => void;
}

const EliteInvoiceSuccess: React.FC<EliteInvoiceSuccessProps> = ({
    valuePaid,
    protocol,
    onBackToHome,
    onViewInvoice,
    onClose
}) => {
    const formatBRL = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="flex justify-center items-start min-h-screen bg-black overflow-hidden animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
                .metallic-gold-text-success {
                    background: linear-gradient(135deg, #F9E29C 0%, #EBC051 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .minimalist-gold-btn-success {
                    border: 1px solid #EBC051;
                    background: transparent;
                    color: #FFFFFF;
                }
                .checkmark-container-success {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 180px;
                    height: 180px;
                }
                .checkmark-3d-success {
                    font-size: 140px !important;
                    filter: drop-shadow(0 0 20px rgba(235, 192, 81, 0.4));
                    position: relative;
                    z-index: 2;
                    animation: float-success 4s ease-in-out infinite;
                }
                .glow-ring-success {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    border: 2px solid rgba(235, 192, 81, 0.3);
                    animation: pulse-ring-success 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
                }
                .liquid-core-success {
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    background: radial-gradient(circle, rgba(235, 192, 81, 0.2) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: liquid-morph-success 6s ease-in-out infinite;
                }
                @keyframes pulse-ring-success {
                    0% { transform: scale(0.7); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 0.2; }
                    100% { transform: scale(0.7); opacity: 0.8; }
                }
                @keyframes float-success {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes liquid-morph-success {
                    0%, 100% { border-radius: 50% 50% 50% 50%; transform: scale(1); }
                    33% { border-radius: 40% 60% 50% 50%; transform: scale(1.1); }
                    66% { border-radius: 55% 45% 60% 40%; transform: scale(0.95); }
                }
                .glow-overlay-success {
                    background: radial-gradient(circle at center, rgba(235, 192, 81, 0.15) 0%, transparent 70%);
                }
                .floating-particles-success {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background-image: radial-gradient(circle, rgba(235, 192, 81, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px;
                }
            `}} />

            <div className="relative flex min-h-screen w-full flex-col overflow-hidden max-w-[430px] bg-black shadow-2xl pb-12 animate-in slide-in-from-bottom duration-700">
                <div className="floating-particles-success opacity-40"></div>

                {/* Glow Backdrop */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 glow-overlay-success blur-3xl rounded-full"></div>

                {/* Header */}
                <div className="flex items-center justify-between p-8 z-20">
                    <div className="text-[10px] font-black tracking-[0.4em] text-[#EBC051] uppercase">LogCash</div>
                    <button
                        onClick={onClose}
                        className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-center px-10 z-10 text-center">
                    <div className="relative mb-10 checkmark-container-success">
                        <div className="glow-ring-success"></div>
                        <div className="liquid-core-success"></div>
                        <span className="material-symbols-outlined checkmark-3d-success metallic-gold-text-success fill-1">check_circle</span>
                    </div>

                    <h1 className="text-xl font-bold tracking-[0.2em] metallic-gold-text-success uppercase leading-relaxed mb-10">
                        Nota Fiscal Emitida<br />com Sucesso
                    </h1>

                    <div className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 mb-8 shadow-2xl text-left">
                        <div className="space-y-5">
                            <div className="flex flex-col items-start gap-1">
                                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Protocolo de Autorização</span>
                                <span className="text-sm font-medium text-white/90">#{protocol}</span>
                            </div>

                            <div className="h-[1px] w-full bg-white/5"></div>

                            <div className="flex justify-between items-end">
                                <div className="flex flex-col items-start gap-1">
                                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Valor Total da NF-e</span>
                                    <span className="text-2xl font-light text-white">{formatBRL(valuePaid)}</span>
                                </div>
                                <span className="material-symbols-outlined text-[#EBC051] opacity-50 mb-1">verified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-8 space-y-4 z-10">
                    <button
                        onClick={onBackToHome}
                        className="w-full minimalist-gold-btn-success py-5 rounded-xl font-bold text-[11px] uppercase tracking-[0.25em] transition-all hover:bg-white/5 active:scale-[0.98]"
                    >
                        Voltar ao Início
                    </button>
                    <button
                        onClick={onViewInvoice}
                        className="w-full minimalist-gold-btn-success py-5 rounded-xl font-bold text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-all hover:bg-white/5 active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined text-lg">visibility</span>
                        Visualizar NF-e
                    </button>
                </div>

                {/* Footer Branding */}
                <div className="flex justify-center items-center gap-3 pt-8 pb-4 opacity-20">
                    <div className="h-[1px] w-8 bg-[#EBC051]"></div>
                    <span className="text-[8px] font-bold tracking-[0.3em] text-[#EBC051] uppercase">Elite Service</span>
                    <div className="h-[1px] w-8 bg-[#EBC051]"></div>
                </div>
            </div>
        </div>
    );
};

export default EliteInvoiceSuccess;
