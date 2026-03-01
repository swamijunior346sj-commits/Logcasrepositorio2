
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
        <div
            className="fixed inset-0 z-[300] flex items-center justify-center px-8 animate-in fade-in duration-300"
            style={{
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
            }}
        >
            <div
                className="w-full max-w-[340px] rounded-[40px] overflow-hidden animate-in zoom-in-95 duration-300"
                style={{
                    background: 'rgba(18,18,18,0.6)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid #EBC051',
                    boxShadow: '0 0 40px rgba(0,0,0,0.5)'
                }}
            >
                <div className="p-10 text-center">
                    {/* Glowing check icon */}
                    <div className="relative size-24 mx-auto mb-8 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#EBC051]/20 blur-3xl rounded-full"></div>
                        <div className="relative flex items-center justify-center">
                            <span
                                className="material-symbols-outlined text-[#EBC051] text-[84px] leading-none"
                                style={{
                                    fontVariationSettings: "'FILL' 1, 'wght' 400",
                                    textShadow: '0 0 20px rgba(235,192,81,0.4)'
                                }}
                            >
                                check_circle
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-black tracking-[0.15em] text-white uppercase mb-2">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-white/60 text-sm font-medium mb-12 leading-relaxed">
                        {message}
                    </p>

                    {/* Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-4 rounded-[20px] flex items-center justify-center text-[#EBC051] font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 active:bg-[#EBC051]/10 active:scale-[0.97]"
                        style={{
                            background: 'transparent',
                            border: '1px solid #EBC051'
                        }}
                    >
                        ENTENDIDO
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PremiumSuccessPopup;
