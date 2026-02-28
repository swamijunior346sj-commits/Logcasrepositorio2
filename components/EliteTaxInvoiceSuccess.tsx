
import React from 'react';

interface EliteTaxInvoiceSuccessProps {
    totalValue: number;
    onBack: () => void;
    onViewNF: () => void;
}

const EliteTaxInvoiceSuccess: React.FC<EliteTaxInvoiceSuccessProps> = ({ totalValue, onBack, onViewNF }) => {
    const formatBRL = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    const protocol = Math.floor(100000 + Math.random() * 900000);

    return (
        <div className="flex flex-col items-center min-h-screen bg-black animate-in fade-in duration-700 pb-10 overflow-hidden relative">
            <style dangerouslySetInnerHTML={{
                __html: `
        .gold-glow-success {
            box-shadow: 0 0 80px -20px rgba(212, 175, 55, 0.25);
        }
        .metallic-gold-text {
            background: linear-gradient(135deg, #F9E29C 0%, #D4AF37 50%, #AA771C 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .btn-3d-gold {
            background: linear-gradient(180deg, #F9E29C 0%, #D4AF37 40%, #AA771C 100%);
            box-shadow: 0 4px 0 #8B6914, 0 10px 20px rgba(0, 0, 0, 0.4);
            text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
        }
        .btn-3d-gold:active {
            transform: translateY(2px);
            box-shadow: 0 2px 0 #8B6914, 0 5px 10px rgba(0, 0, 0, 0.4);
        }
        .gold-outline-btn {
            border: 1px solid rgba(212, 175, 55, 0.5);
            background: rgba(212, 175, 55, 0.05);
            backdrop-filter: blur(10px);
        }
        .checkmark-3d {
            filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.6));
            font-size: 120px !important;
        }
        .pulse-glow {
            animation: pulse-glow-anim 3s infinite ease-in-out;
        }
        @keyframes pulse-glow-anim {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
        }
        .floating-particles {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image: radial-gradient(circle, rgba(212, 175, 55, 0.15) 1px, transparent 1px);
            background-size: 40px 40px;
        }
      `}} />

            <div className="floating-particles opacity-30"></div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[100px] pulse-glow"></div>

            <div className="relative flex min-h-screen w-full flex-col overflow-hidden max-w-[430px] bg-black shadow-2xl pb-10">
                <div className="pt-4"></div>

                <div className="flex-1 flex flex-col items-center justify-center px-8 z-10 text-center">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-[#D4AF37]/20 blur-3xl rounded-full scale-150 opacity-50"></div>
                        <span className="material-symbols-outlined checkmark-3d metallic-gold-text fill-1">check_circle</span>
                    </div>

                    <h1 className="text-2xl font-black tracking-[0.25em] metallic-gold-text uppercase leading-tight mb-8">
                        NOTA FISCAL EMITIDA<br />COM SUCESSO
                    </h1>

                    <div className="w-full bg-[#121212]/80 backdrop-blur-md border border-[#D4AF37]/20 rounded-3xl p-6 mb-10 gold-glow-success">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest text-left">Protocolo</span>
                                <span className="text-sm font-bold text-[#D4AF37] font-mono">#{protocol}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest text-left">Valor Total</span>
                                <span className="text-xl font-black text-white">{formatBRL(totalValue)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 space-y-4 z-10">
                    <button
                        onClick={onBack}
                        className="w-full btn-3d-gold text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                        VOLTAR AO INÍCIO
                    </button>

                    <button
                        onClick={onViewNF}
                        className="w-full gold-outline-btn text-[#D4AF37] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined text-lg">visibility</span>
                        VISUALIZAR NF-E
                    </button>

                    <div className="flex justify-center items-center gap-2 pt-4 opacity-30">
                        <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                        <span className="material-symbols-outlined text-[12px] text-[#D4AF37]">verified_user</span>
                        <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#D4AF37]/5 to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
};

export default EliteTaxInvoiceSuccess;
