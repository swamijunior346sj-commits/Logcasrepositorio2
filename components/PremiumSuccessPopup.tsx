
import React from 'react';

interface PremiumSuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

const PremiumSuccessPopup: React.FC<PremiumSuccessPopupProps> = ({
    isOpen,
    onClose,
    title = 'CONFIRMADO',
    message = 'Operação realizada com sucesso'
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-8 animate-in fade-in zoom-in duration-300">
            <style dangerouslySetInnerHTML={{
                __html: `
        .glass-overlay-success {
            background: rgba(0, 0, 0, 0.92);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            position: absolute;
            inset: 0;
            z-index: -1;
        }
        .modal-border-only {
            background: transparent;
            border: 1px solid #EBC051;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(235, 192, 81, 0.05);
        }
        .gold-glow {
            text-shadow: 0 0 30px rgba(235, 192, 81, 0.6);
        }
        .outline-button-gold {
            background: transparent;
            border: 1px solid #EBC051;
        }
        .outline-button-gold:active {
            background: rgba(235, 192, 81, 0.1);
            transform: scale(0.97);
        }
        @keyframes pulse-gold {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
        }
        .animate-pulse-gold {
            animation: pulse-gold 3s ease-in-out infinite;
        }
    `}} />
            <div className="glass-overlay-success"></div>

            <div className="w-full max-w-[340px] modal-border-only rounded-[40px] overflow-hidden">
                <div className="p-10 text-center">
                    <div className="relative size-24 mx-auto mb-8 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#EBC051]/15 blur-3xl rounded-full"></div>
                        <div className="relative flex items-center justify-center animate-pulse-gold">
                            <span
                                className="material-symbols-outlined text-[#EBC051] text-[84px] leading-none gold-glow"
                                style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
                            >
                                check_circle
                            </span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-black tracking-[0.2em] text-white uppercase mb-3" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                        {title}
                    </h2>
                    <p className="text-white/50 text-sm font-medium mb-12 leading-relaxed">
                        {message}
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full py-4 outline-button-gold rounded-[20px] flex items-center justify-center text-[#EBC051] font-bold uppercase tracking-[0.25em] text-[10px] transition-all duration-300"
                    >
                        ENTENDIDO
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PremiumSuccessPopup;
