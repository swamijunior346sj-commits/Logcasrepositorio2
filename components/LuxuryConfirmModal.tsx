
import React from 'react';
import {
    FileText,
    Wallet,
    LogOut,
    RefreshCcw,
    Trash2,
    Image as ImageIcon
} from 'lucide-react';

interface LuxuryConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    type?: 'EXPORT_PDF' | 'SETTLE_WALLET' | 'LOGOUT' | 'RESET_SYSTEM' | string;
}

const LuxuryConfirmModal: React.FC<LuxuryConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    type
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'EXPORT_PDF': return <FileText size={32} className="text-[#D4AF37]" />;
            case 'SETTLE_WALLET': return <Wallet size={32} className="text-[#D4AF37]" />;
            case 'LOGOUT': return <LogOut size={32} className="text-[#D4AF37]" />;
            case 'RESET_SYSTEM': return <Trash2 size={32} className="text-[#D4AF37]" />;
            default: return <FileText size={32} className="text-[#D4AF37]" />;
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex min-h-screen w-full flex-col items-center justify-center p-6 bg-pitch-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <style dangerouslySetInnerHTML={{
                __html: `
        .glass-modal-confirm {
            background: rgba(15, 15, 15, 0.7);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 1px solid rgba(235, 192, 81, 0.3);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .particle-confirm {
            position: absolute;
            width: 2px;
            height: 2px;
            background: #EBC051;
            border-radius: 50%;
            pointer-events: none;
        }
        @keyframes float-particle-confirm {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            25% { opacity: 0.6; }
            100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        @keyframes liquid-metallic-confirm {
            0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 5px #EBC051); }
            50% { transform: scale(1.05) rotate(2deg); filter: drop-shadow(0 0 15px #EBC051); }
        }
        .animate-float-particle-confirm { animation: float-particle-confirm 10s linear infinite; }
        .animate-liquid-metallic-confirm { animation: liquid-metallic-confirm 4s ease-in-out infinite; }
      `}} />

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary-gold/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-[430px] flex justify-center">
                <div className="glass-modal-confirm w-full rounded-[40px] p-10 flex flex-col items-center text-center animate-in slide-in-from-bottom-5 duration-500">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-primary-gold/10 rounded-full blur-xl animate-pulse"></div>
                        <div className="relative size-24 rounded-full border border-primary-gold/20 flex items-center justify-center bg-pitch-black/40">
                            <span className="animate-liquid-metallic-confirm flex items-center justify-center">
                                {getIcon()}
                            </span>
                        </div>
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="particle-confirm animate-float-particle-confirm top-0 left-1/2" style={{ animationDelay: '0s' }}></div>
                            <div className="particle-confirm animate-float-particle-confirm top-1/4 right-0" style={{ animationDelay: '1.5s' }}></div>
                            <div className="particle-confirm animate-float-particle-confirm bottom-0 left-1/4" style={{ animationDelay: '3s' }}></div>
                        </div>
                    </div>

                    <h2 className="text-ice-white font-bold text-xl tracking-[0.2em] mb-3 uppercase">
                        {title}
                    </h2>
                    <p className="text-primary-gold text-[13px] font-medium tracking-wide mb-10 opacity-80">
                        {description}
                    </p>

                    <div className="w-full space-y-6">
                        <button
                            onClick={onConfirm}
                            className={`w-full bg-transparent border py-4 rounded-full font-bold text-xs uppercase tracking-[0.3em] active:scale-[0.97] transition-all ${type === 'RESET_SYSTEM' || type === 'LOGOUT'
                                    ? 'border-red-500 text-red-500 hover:bg-red-500/5'
                                    : 'border-primary-gold text-primary-gold hover:bg-primary-gold/5'
                                }`}
                        >
                            CONFIRMAR
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full text-primary-gold/60 py-2 font-medium text-xs uppercase tracking-[0.2em] active:opacity-40 transition-opacity"
                        >
                            CANCELAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LuxuryConfirmModal;
