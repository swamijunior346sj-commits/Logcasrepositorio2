
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/75 backdrop-blur-[12px] animate-in fade-in duration-300">
            <style dangerouslySetInnerHTML={{
                __html: `
        .popup-card {
            background: linear-gradient(180deg, #121212 0%, #080808 100%);
            border: 1px solid rgba(212, 175, 55, 0.4);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9);
        }
      `}} />

            <div className="popup-card w-full max-w-[340px] rounded-[32px] overflow-hidden p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                <div className="size-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6">
                    {getIcon()}
                </div>

                <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
                <p className="text-white/60 text-sm font-medium leading-relaxed mb-8 px-2">
                    {description}
                </p>

                <div className="flex flex-col w-full gap-3">
                    <button
                        onClick={onConfirm}
                        className="w-full bg-gradient-to-r from-[#AA771C] via-[#F9E29C] to-[#AA771C] text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 active:scale-[0.98] transition-all"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full border border-[#D4AF37]/30 text-[#D4AF37] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 active:scale-[0.98] transition-all"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LuxuryConfirmModal;
