import React, { useState, useEffect } from 'react';

interface EliteDeleteReportPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const EliteDeleteReportPopup: React.FC<EliteDeleteReportPopupProps> = ({ isOpen, onClose, onConfirm }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setIsDeleting(false);
        }
    }, [isOpen]);

    const handleConfirm = () => {
        setIsDeleting(true);
        setTimeout(() => {
            onConfirm();
            onClose();
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[700] flex items-center justify-center min-h-screen">
            <style dangerouslySetInnerHTML={{
                __html: `
                .luxury-outline-card {
                    background: transparent;
                    border: 1px solid #EBC051;
                    box-shadow: 0 0 30px rgba(235, 192, 81, 0.05);
                }
                .particle-v2 {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: #EBC051;
                    border-radius: 50%;
                    pointer-events: none;
                }
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
                .glass-overlay-dark {
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }
                .metallic-particle {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: linear-gradient(135deg, #EBC051 0%, #FFFFFF 50%, #B8860B 100%);
                    border-radius: 50%;
                    pointer-events: none;
                    box-shadow: 0 0 4px rgba(235, 192, 81, 0.8);
                }
                @keyframes liquid-metallic {
                    0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 5px #EBC051); }
                    50% { transform: scale(1.05) rotate(2deg); filter: drop-shadow(0 0 15px #EBC051); }
                }
                @keyframes float-particle-v2 {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    25% { opacity: 0.6; }
                    100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
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
                .animate-liquid-metallic { animation: liquid-metallic 4s ease-in-out infinite; }
                .animate-float-particle-v2 { animation: float-particle-v2 10s linear infinite; }
                .animate-disintegrate { animation: disintegrate-anim 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
                .animate-particle-explosion { animation: particle-explosion-anim 4s ease-out infinite; }
                .animate-soft-glow { animation: soft-glow-anim 3s ease-in-out infinite; }
            `}} />

            {/* Fundo Base Escuro */}
            <div className="fixed inset-0 bg-[#000000] z-0 animate-in fade-in duration-500">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#EBC051]/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center max-w-[430px]">
                {/* 1. STATE: CONFIRMAÇÃO (Se ainda não confirmou exclusão) */}
                {!isDeleting ? (
                    <div className="w-full px-8 animate-in slide-in-from-bottom-8 duration-500">
                        <div className="luxury-outline-card w-full rounded-[40px] p-10 flex flex-col items-center text-center bg-black/50 backdrop-blur-xl">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-[#EBC051]/10 rounded-full blur-2xl animate-pulse"></div>
                                <div className="relative size-24 rounded-full border border-[#EBC051]/30 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#EBC051] text-5xl animate-liquid-metallic" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>
                                        delete_outline
                                    </span>
                                </div>
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="particle-v2 animate-float-particle-v2 top-0 left-1/2" style={{ animationDelay: '0s' }}></div>
                                    <div className="particle-v2 animate-float-particle-v2 top-1/4 right-0" style={{ animationDelay: '1.5s' }}></div>
                                    <div className="particle-v2 animate-float-particle-v2 bottom-0 left-1/4" style={{ animationDelay: '3s' }}></div>
                                </div>
                            </div>
                            <h2 className="text-[#F5F5F5] font-bold text-xl tracking-[0.2em] mb-3">
                                EXCLUIR RELATÓRIO?
                            </h2>
                            <p className="text-[#EBC051] text-[13px] font-medium tracking-wide mb-10 opacity-90">
                                Esta ação não poderá ser desfeita.
                            </p>
                            <div className="w-full space-y-6">
                                <button onClick={handleConfirm} className="w-full bg-transparent border border-[#EBC051] text-[#EBC051] py-4 rounded-full font-bold text-xs uppercase tracking-[0.3em] active:scale-[0.97] transition-all hover:bg-[#EBC051]/10">
                                    EXCLUIR
                                </button>
                                <button onClick={onClose} className="w-full text-[#EBC051]/70 py-2 font-medium text-xs uppercase tracking-[0.2em] active:opacity-40 transition-opacity">
                                    CANCELAR
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* 2. STATE: ANIMAÇÃO DE EXCLUSÃO DEITANDO O PDF PRO FUNDO TUDO EXPLODINDO */
                    <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-[430px] animate-in fade-in duration-300">
                        <div className="px-4 relative mt-12 opacity-40">
                            <div className="pdf-document w-full rounded-sm p-6 flex flex-col border border-white/5 blur-[6px]">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="size-8 bg-[#EBC051]/10 border border-[#EBC051]/30 flex items-center justify-center rotate-45">
                                            <span className="material-symbols-outlined text-[#EBC051] -rotate-45 text-xl">account_balance_wallet</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-black tracking-tighter leading-none text-[#F5F5F5]">LOGCASH</span>
                                            <span className="text-[6px] font-bold text-[#EBC051] tracking-[0.2em] leading-none">PREMIUM SERVICES</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="h-2 w-20 bg-white/20 ml-auto rounded"></div>
                                        <div className="h-2 w-16 bg-white/20 ml-auto mt-1 rounded"></div>
                                    </div>
                                </div>
                                <div className="gold-border-section p-3 mb-4 bg-white/5">
                                    <div className="h-2 w-24 bg-[#EBC051]/20 mb-2 rounded"></div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="h-4 bg-white/10 rounded w-full"></div>
                                        <div className="h-4 bg-white/10 rounded w-full"></div>
                                    </div>
                                </div>
                                <div className="gold-border-section p-3 mb-4 bg-white/5">
                                    <div className="h-2 w-24 bg-[#EBC051]/20 mb-3 rounded"></div>
                                    <div className="space-y-3">
                                        <div className="h-2 w-full bg-white/10 rounded"></div>
                                        <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 border-t border-white/10 flex items-end justify-between">
                                    <div className="h-2 w-32 bg-white/5 rounded"></div>
                                    <div className="size-6 border border-[#EBC051]/50 rounded-full flex items-center justify-center bg-[#EBC051]/5">
                                        <span className="material-symbols-outlined text-[#EBC051] text-[10px]">verified_user</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center glass-overlay-dark overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '-120px', '--tw-translate-y': '-150px', animationDelay: '0.1s' } as React.CSSProperties}></div>
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '140px', '--tw-translate-y': '-80px', animationDelay: '0.5s' } as React.CSSProperties}></div>
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '-60px', '--tw-translate-y': '180px', animationDelay: '0.8s' } as React.CSSProperties}></div>
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '90px', '--tw-translate-y': '130px', animationDelay: '1.2s' } as React.CSSProperties}></div>
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '-160px', '--tw-translate-y': '40px', animationDelay: '0.3s' } as React.CSSProperties}></div>
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '180px', '--tw-translate-y': '20px', animationDelay: '1.5s' } as React.CSSProperties}></div>
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '10px', '--tw-translate-y': '-200px', animationDelay: '0.7s' } as React.CSSProperties}></div>
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '-30px', '--tw-translate-y': '220px', animationDelay: '2.1s' } as React.CSSProperties}></div>
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '110px', '--tw-translate-y': '-160px', animationDelay: '1.9s' } as React.CSSProperties}></div>
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '-180px', '--tw-translate-y': '-100px', animationDelay: '2.5s' } as React.CSSProperties}></div>
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '200px', '--tw-translate-y': '150px', animationDelay: '0.4s' } as React.CSSProperties}></div>
                                <div className="metallic-particle animate-particle-explosion" style={{ top: '50%', left: '50%', '--tw-translate-x': '-90px', '--tw-translate-y': '-50px', animationDelay: '3s' } as React.CSSProperties}></div>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <div className="relative mb-12">
                                    <div className="absolute inset-0 bg-[#EBC051]/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                                    <div className="animate-disintegrate flex items-center justify-center">
                                        <div className="size-24 rounded-full border-2 border-[#EBC051]/40 flex items-center justify-center bg-black/80 shadow-[0_0_30px_rgba(235,192,81,0.3)]">
                                            <span className="material-symbols-outlined text-[#EBC051] text-5xl font-light">delete_forever</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: '0.5s' }}>
                                    <h2 className="text-[#F5F5F5] text-[13px] font-black tracking-[0.6em] uppercase animate-soft-glow">
                                        ITEM EXCLUÍDO
                                    </h2>
                                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#EBC051]/50 to-transparent mt-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="fixed top-0 w-full max-w-[430px] h-12 z-50 pointer-events-none"></div>
        </div>
    );
};

export default EliteDeleteReportPopup;
