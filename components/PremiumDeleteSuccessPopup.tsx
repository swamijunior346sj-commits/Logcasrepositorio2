import React, { useEffect } from 'react';

interface PremiumDeleteSuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const PremiumDeleteSuccessPopup: React.FC<PremiumDeleteSuccessPopupProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Auto close after 3 seconds for the animation to play
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
        .glass-overlay-delete {
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
        .metallic-particle-delete {
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(135deg, #EBC051 0%, #FFFFFF 50%, #B8860B 100%);
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 4px rgba(235, 192, 81, 0.8);
        }
        @keyframes disintegrate-anim {
            0% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0px); }
            40% { transform: scale(1.1) rotate(2deg); opacity: 0.8; filter: blur(1px); }
            100% { transform: scale(1.5) rotate(5deg); opacity: 0; filter: blur(10px); }
        }
        @keyframes particle-explosion-anim {
            0% { transform: translate(0, 0) scale(1); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(0); opacity: 0; }
        }
        @keyframes soft-glow-anim {
            0%, 100% { text-shadow: 0 0 10px rgba(245, 245, 245, 0.2); }
            50% { text-shadow: 0 0 25px rgba(245, 245, 245, 0.5); }
        }
        .animate-disintegrate-delete { animation: disintegrate-anim 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-particle-explosion-delete { animation: particle-explosion-anim 3s ease-out forwards; }
        .animate-soft-glow-delete { animation: soft-glow-anim 3s ease-in-out infinite; }
      `}} />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center glass-overlay-delete overflow-hidden animate-in fade-in duration-300">
                <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                    <div className="relative size-full max-w-[430px]">
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '-120px', '--tw-translate-y': '-150px', animationDelay: '0.1s' } as React.CSSProperties}></div>
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '140px', '--tw-translate-y': '-80px', animationDelay: '0.2s' } as React.CSSProperties}></div>
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '-60px', '--tw-translate-y': '180px', animationDelay: '0.15s' } as React.CSSProperties}></div>
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '90px', '--tw-translate-y': '130px', animationDelay: '0.25s' } as React.CSSProperties}></div>
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '-160px', '--tw-translate-y': '40px', animationDelay: '0.1s' } as React.CSSProperties}></div>
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '180px', '--tw-translate-y': '20px', animationDelay: '0.3s' } as React.CSSProperties}></div>
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '10px', '--tw-translate-y': '-200px', animationDelay: '0.2s' } as React.CSSProperties}></div>
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '-30px', '--tw-translate-y': '220px', animationDelay: '0.35s' } as React.CSSProperties}></div>
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '110px', '--tw-translate-y': '-160px', animationDelay: '0.15s' } as React.CSSProperties}></div>
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '-180px', '--tw-translate-y': '-100px', animationDelay: '0.4s' } as React.CSSProperties}></div>
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '200px', '--tw-translate-y': '150px', animationDelay: '0.1s' } as React.CSSProperties}></div>
                        <div className="metallic-particle-delete animate-particle-explosion-delete" style={{ top: '50%', left: '50%', '--tw-translate-x': '-90px', '--tw-translate-y': '-50px', animationDelay: '0.45s' } as React.CSSProperties}></div>
                    </div>
                </div>

                <div className="relative flex flex-col items-center">
                    <div className="relative mb-12">
                        <div className="absolute inset-0 bg-[#EBC051]/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                        <div className="animate-disintegrate-delete flex items-center justify-center">
                            <div className="size-24 rounded-full border-2 border-[#EBC051]/40 flex items-center justify-center bg-black/80 shadow-[0_0_30px_rgba(235,192,81,0.3)]">
                                <span className="material-symbols-outlined text-[#EBC051] text-5xl font-light">delete_forever</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: '0.5s' }}>
                        <h2 className="text-[#F5F5F5] text-[13px] font-black tracking-[0.6em] uppercase animate-soft-glow-delete">
                            ITEM EXCLUÍDO
                        </h2>
                        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#EBC051]/50 to-transparent mt-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumDeleteSuccessPopup;
