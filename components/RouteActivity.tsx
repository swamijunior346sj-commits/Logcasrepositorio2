
import React, { useState, useCallback } from 'react';
import { VALOR_POR_PACOTE } from '../constants';
import PremiumSuccessPopup from './PremiumSuccessPopup';

interface RouteActivityProps {
    onBack?: () => void;
    counts: {
        todayEntrada: number;
        todaySaida: number;
        todayDevolucao: number;
    };
    onSave: (data: { entrada: number, saida: number, devolucao: number }) => void;
}

const RouteActivity: React.FC<RouteActivityProps> = ({ onBack, counts, onSave }) => {
    const [showBulkLoad, setShowBulkLoad] = useState(false);
    const [showBulkDeliver, setShowBulkDeliver] = useState(false);
    const [bulkQty, setBulkQty] = useState(0);
    const [animatingCard, setAnimatingCard] = useState<'entrada' | 'saida' | 'devolucao' | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('Operação realizada com sucesso');

    const handleOneClick = useCallback((type: 'entrada' | 'saida' | 'devolucao') => {
        // Trigger animation
        setAnimatingCard(type);
        setTimeout(() => setAnimatingCard(null), 800);

        // Save
        onSave({
            entrada: type === 'entrada' ? 1 : 0,
            saida: type === 'saida' ? 1 : 0,
            devolucao: type === 'devolucao' ? 1 : 0
        });
    }, [onSave]);

    const totalValue = counts.todaySaida * VALOR_POR_PACOTE;

    const formatBRL = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const handleBulkConfirm = (type: 'entrada' | 'saida') => {
        if (bulkQty > 0) {
            onSave({
                entrada: type === 'entrada' ? bulkQty : 0,
                saida: type === 'saida' ? bulkQty : 0,
                devolucao: 0
            });
            setSuccessMessage(type === 'entrada' ? `${bulkQty} pacotes carregados com sucesso` : `${bulkQty} entregas confirmadas com sucesso`);
            setShowSuccess(true);
        }
        setBulkQty(0);
        setShowBulkLoad(false);
        setShowBulkDeliver(false);
    };

    return (
        <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] mx-auto bg-black shadow-2xl ring-1 ring-white/5 animate-in fade-in duration-500">
            <style dangerouslySetInnerHTML={{
                __html: `
                .gold-gradient-text-route {
                    background: linear-gradient(135deg, #FDF0D5 0%, #EBC051 50%, #A67C00 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .glass-charcoal-route {
                    background: rgba(18, 18, 16, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid #EBC051;
                }
                .shimmer-liquid-route {
                    position: relative;
                    overflow: hidden;
                }
                .shimmer-liquid-route::after {
                    content: '';
                    position: absolute;
                    top: -150%;
                    left: -150%;
                    width: 300%;
                    height: 300%;
                    background: linear-gradient(
                        45deg,
                        transparent 40%,
                        rgba(235, 192, 81, 0.15) 50%,
                        transparent 60%
                    );
                    animation: liquid-shimmer-route 6s infinite linear;
                    pointer-events: none;
                }
                @keyframes liquid-shimmer-route {
                    0% { transform: translate(-30%, -30%) rotate(0deg); }
                    100% { transform: translate(30%, 30%) rotate(10deg); }
                }
                .glow-pulse-route {
                    animation: glow-pulse-route-anim 4s infinite ease-in-out;
                }
                @keyframes glow-pulse-route-anim {
                    0%, 100% { box-shadow: 0 0 10px rgba(235, 192, 81, 0.05); }
                    50% { box-shadow: 0 0 20px rgba(235, 192, 81, 0.12); }
                }
                .luxury-card-glow-route {
                    box-shadow: 0 0 25px rgba(235, 192, 81, 0.12);
                    border: 1px solid #EBC051;
                }
                .particle-route {
                    position: absolute;
                    background: #EBC051;
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: 0;
                    filter: blur(1px);
                    animation: float-particle-route 20s infinite linear;
                }
                @keyframes float-particle-route {
                    0% { transform: translateY(100vh) scale(0); opacity: 0; }
                    20% { opacity: 0.4; }
                    80% { opacity: 0.2; }
                    100% { transform: translateY(-10vh) scale(1.5); opacity: 0; }
                }
                .gold-gradient-route {
                    background: linear-gradient(135deg, #996515 0%, #D4AF37 50%, #F9E498 100%);
                }
                .gold-3d-effect-route {
                    box-shadow: 0 4px 0px 0px #856404, 0 8px 15px rgba(212, 175, 55, 0.3);
                }
                .gold-3d-effect-route:active {
                    transform: translateY(2px);
                    box-shadow: 0 2px 0px 0px #856404, 0 4px 10px rgba(212, 175, 55, 0.2);
                }
                .gold-text-gradient-route {
                    background: linear-gradient(135deg, #F9E498 0%, #D4AF37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .gold-border-subtle-route {
                    border: 1px solid rgba(212, 175, 55, 0.3);
                }
                /* One-click card animations */
                @keyframes float-up-fade {
                    0% { transform: translateY(0) scale(1); opacity: 1; }
                    60% { transform: translateY(-28px) scale(1.3); opacity: 0.9; }
                    100% { transform: translateY(-48px) scale(0.8); opacity: 0; }
                }
                @keyframes ripple-ring {
                    0% { transform: scale(0.3); opacity: 0.6; }
                    100% { transform: scale(2.2); opacity: 0; }
                }
                @keyframes card-flash {
                    0% { opacity: 0; }
                    30% { opacity: 0.25; }
                    100% { opacity: 0; }
                }
                @keyframes check-pop {
                    0% { transform: scale(0) rotate(-45deg); opacity: 0; }
                    50% { transform: scale(1.3) rotate(0deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 0; }
                }
                .oneclick-float-up {
                    animation: float-up-fade 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                .oneclick-ripple {
                    animation: ripple-ring 0.6s ease-out forwards;
                }
                .oneclick-flash {
                    animation: card-flash 0.5s ease-out forwards;
                }
                .oneclick-check {
                    animation: check-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
            `}} />

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="particle-route w-1 h-1 left-[10%]" style={{ animationDelay: '0s' }}></div>
                <div className="particle-route w-[2px] h-[2px] left-[30%]" style={{ animationDelay: '4s' }}></div>
                <div className="particle-route w-1 h-1 left-[50%]" style={{ animationDelay: '8s' }}></div>
                <div className="particle-route w-[3px] h-[3px] left-[70%]" style={{ animationDelay: '2s' }}></div>
                <div className="particle-route w-1 h-1 left-[85%]" style={{ animationDelay: '12s' }}></div>
            </div>

            <div className="p-6 flex flex-col relative z-10">
                {/* Total Value Card */}
                <div className="mt-8 bg-[#121210] luxury-card-glow-route shimmer-liquid-route rounded-3xl p-8 flex flex-col items-center justify-center relative mb-8">
                    <p className="text-zinc-400 font-bold text-[10px] tracking-[0.3em] mb-3 uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>Valor Total Hoje</p>
                    <div className="text-[#EBC051] text-5xl font-bold tracking-tighter gold-gradient-text-route" style={{ filter: 'drop-shadow(0 0 12px rgba(235,192,81,0.3))' }}>{formatBRL(totalValue)}</div>
                    <div className="mt-4 flex gap-1">
                        <div className="w-8 h-[1px] bg-[#EBC051]/30"></div>
                        <div className="w-2 h-[1px] bg-[#EBC051]"></div>
                        <div className="w-8 h-[1px] bg-[#EBC051]/30"></div>
                    </div>
                </div>

                {/* Stats Grid - One-click buttons */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {/* Carregados */}
                    <button
                        onClick={() => handleOneClick('entrada')}
                        className={`flex flex-col items-center justify-center py-5 px-3 rounded-2xl bg-[#121210] border transition-all cursor-pointer relative overflow-hidden ${animatingCard === 'entrada' ? 'border-[#EBC051] scale-95 shadow-[0_0_20px_rgba(235,192,81,0.3)]' : 'border-[#2A2A26]/50 glow-pulse-route'
                            }`}
                    >
                        {animatingCard === 'entrada' && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-12 h-12 rounded-full border-2 border-[#EBC051]/50 oneclick-ripple"></div>
                            </div>
                        )}
                        {animatingCard === 'entrada' && (
                            <div className="absolute inset-0 bg-[#EBC051] rounded-2xl oneclick-flash pointer-events-none"></div>
                        )}
                        {animatingCard === 'entrada' && (
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-black text-[#EBC051] oneclick-float-up pointer-events-none z-20">+1</span>
                        )}
                        {animatingCard === 'entrada' && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 material-symbols-outlined text-[#EBC051] text-sm oneclick-check pointer-events-none z-20">check</span>
                        )}
                        <p className="text-[8px] font-bold tracking-[0.15em] text-zinc-500 mb-2 uppercase relative z-10" style={{ fontFamily: "'Syncopate', sans-serif" }}>Carregados</p>
                        <div className={`text-2xl font-extrabold tracking-tighter relative z-10 transition-colors duration-300 ${animatingCard === 'entrada' ? 'text-[#EBC051]' : 'text-white'}`}>{String(counts.todayEntrada).padStart(2, '0')}</div>
                        <div className="mt-2 w-6 h-[2px] bg-[#EBC051]/60 rounded-full relative z-10"></div>
                    </button>

                    {/* Entregues */}
                    <button
                        onClick={() => handleOneClick('saida')}
                        className={`flex flex-col items-center justify-center py-5 px-3 rounded-2xl bg-[#121210] border transition-all cursor-pointer relative overflow-hidden ${animatingCard === 'saida' ? 'border-emerald-500 scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-[#2A2A26]/50 glow-pulse-route'
                            }`}
                        style={{ animationDelay: '0.5s' }}
                    >
                        {animatingCard === 'saida' && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-12 h-12 rounded-full border-2 border-emerald-500/50 oneclick-ripple"></div>
                            </div>
                        )}
                        {animatingCard === 'saida' && (
                            <div className="absolute inset-0 bg-emerald-500 rounded-2xl oneclick-flash pointer-events-none"></div>
                        )}
                        {animatingCard === 'saida' && (
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-black text-emerald-400 oneclick-float-up pointer-events-none z-20">+1</span>
                        )}
                        {animatingCard === 'saida' && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 material-symbols-outlined text-emerald-400 text-sm oneclick-check pointer-events-none z-20">check</span>
                        )}
                        <p className="text-[8px] font-bold tracking-[0.15em] text-zinc-500 mb-2 uppercase relative z-10" style={{ fontFamily: "'Syncopate', sans-serif" }}>Entregues</p>
                        <div className={`text-2xl font-extrabold tracking-tighter relative z-10 transition-colors duration-300 ${animatingCard === 'saida' ? 'text-emerald-400' : 'text-white'}`}>{String(counts.todaySaida).padStart(2, '0')}</div>
                        <div className="mt-2 w-6 h-[2px] bg-emerald-500/60 rounded-full relative z-10"></div>
                    </button>

                    {/* Insucessos */}
                    <button
                        onClick={() => handleOneClick('devolucao')}
                        className={`flex flex-col items-center justify-center py-5 px-3 rounded-2xl bg-[#121210] border transition-all cursor-pointer relative overflow-hidden ${animatingCard === 'devolucao' ? 'border-red-500 scale-95 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-[#2A2A26]/50 glow-pulse-route'
                            }`}
                        style={{ animationDelay: '1s' }}
                    >
                        {animatingCard === 'devolucao' && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-12 h-12 rounded-full border-2 border-red-500/50 oneclick-ripple"></div>
                            </div>
                        )}
                        {animatingCard === 'devolucao' && (
                            <div className="absolute inset-0 bg-red-500 rounded-2xl oneclick-flash pointer-events-none"></div>
                        )}
                        {animatingCard === 'devolucao' && (
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-black text-red-400 oneclick-float-up pointer-events-none z-20">+1</span>
                        )}
                        {animatingCard === 'devolucao' && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 material-symbols-outlined text-red-400 text-sm oneclick-check pointer-events-none z-20">check</span>
                        )}
                        <p className="text-[8px] font-bold tracking-[0.15em] text-zinc-500 mb-2 uppercase relative z-10" style={{ fontFamily: "'Syncopate', sans-serif" }}>Insucessos</p>
                        <div className={`text-2xl font-extrabold tracking-tighter relative z-10 transition-colors duration-300 ${animatingCard === 'devolucao' ? 'text-red-400' : 'text-white'}`}>{String(counts.todayDevolucao).padStart(2, '0')}</div>
                        <div className="mt-2 w-6 h-[2px] bg-red-500/60 rounded-full relative z-10"></div>
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-5 flex-grow justify-start">
                    <button
                        onClick={() => { setBulkQty(0); setShowBulkLoad(true); }}
                        className="glass-charcoal-route shimmer-liquid-route w-full py-5 rounded-2xl flex items-center justify-center gap-4 active:scale-[0.98] transition-all group relative overflow-hidden"
                    >
                        <span className="material-symbols-outlined text-[#EBC051] font-light text-2xl relative z-10">layers</span>
                        <span className="text-[#EBC051] font-bold text-[11px] tracking-[0.25em] relative z-10 uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>CARREGAR EM MASSA</span>
                    </button>
                    <button
                        onClick={() => { setBulkQty(0); setShowBulkDeliver(true); }}
                        className="glass-charcoal-route shimmer-liquid-route w-full py-5 rounded-2xl flex items-center justify-center gap-4 active:scale-[0.98] transition-all group relative overflow-hidden"
                    >
                        <span className="material-symbols-outlined text-[#EBC051] font-light text-2xl relative z-10">task_alt</span>
                        <span className="text-[#EBC051] font-bold text-[11px] tracking-[0.25em] relative z-10 uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>ENTREGAS EM MASSA</span>
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6 pb-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-5 w-full">
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#EBC051]/20"></div>
                            <p className="text-[9px] text-[#EBC051]/50 font-bold tracking-[0.5em] uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>LogCash Elite</p>
                            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#EBC051]/20"></div>
                        </div>
                        <div className="flex gap-2.5">
                            <div className="w-1 h-1 rounded-full bg-[#EBC051]/10"></div>
                            <div className="w-1 h-1 rounded-full bg-[#EBC051]/30"></div>
                            <div className="w-4 h-1 rounded-full bg-[#EBC051]"></div>
                            <div className="w-1 h-1 rounded-full bg-[#EBC051]/30"></div>
                            <div className="w-1 h-1 rounded-full bg-[#EBC051]/10"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carregamento em Massa Modal - Premium Glass */}
            {showBulkLoad && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
                    <div className="w-full max-w-[380px] rounded-[32px] overflow-hidden" style={{ background: 'rgba(18,18,18,0.7)', backdropFilter: 'blur(25px)', WebkitBackdropFilter: 'blur(25px)', border: '1px solid rgba(235,192,81,0.4)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
                        <div className="p-8 text-center">
                            <div className="size-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#EBC051]/5" style={{ border: '1px solid rgba(235,192,81,0.3)' }}>
                                <span className="material-symbols-outlined text-[#EBC051] text-3xl">move_to_inbox</span>
                            </div>
                            <h2 className="text-xl font-black tracking-[0.1em] text-white uppercase mb-3 text-center">CARREGAMENTO EM MASSA</h2>
                            <p className="text-white/90 text-sm font-medium mb-10 leading-relaxed px-4 text-center">
                                Confirme a quantidade de pacotes carregados na base:
                            </p>

                            <div className="relative flex items-center justify-center gap-8 mb-12">
                                <button
                                    onClick={() => setBulkQty(prev => Math.max(0, prev - 1))}
                                    className="size-12 rounded-full border border-[#EBC051] flex items-center justify-center text-[#EBC051] active:bg-[#EBC051]/20 transition-all"
                                >
                                    <span className="material-symbols-outlined font-bold">remove</span>
                                </button>
                                <div className="relative">
                                    <input
                                        autoFocus
                                        type="number"
                                        value={bulkQty}
                                        onChange={(e) => setBulkQty(parseInt(e.target.value) || 0)}
                                        className="w-24 bg-transparent border-none text-center text-5xl font-black text-white focus:ring-0 p-0"
                                    />
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-[#EBC051] uppercase tracking-[0.2em] opacity-60">PACOTES</div>
                                </div>
                                <button
                                    onClick={() => setBulkQty(prev => prev + 1)}
                                    className="size-12 rounded-full border border-[#EBC051] flex items-center justify-center text-[#EBC051] active:bg-[#EBC051]/20 transition-all"
                                >
                                    <span className="material-symbols-outlined font-bold">add</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => handleBulkConfirm('entrada')}
                                    className="w-full py-4 rounded-[22px] flex items-center justify-center text-[#EBC051] font-bold uppercase tracking-[0.25em] text-xs transition-all duration-300 active:scale-[0.98] active:bg-[#EBC051]/5"
                                    style={{ border: '1px solid #EBC051', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.2)' }}
                                >
                                    CONFIRMAR LOTE
                                </button>
                                <button
                                    onClick={() => setShowBulkLoad(false)}
                                    className="w-full py-2 text-zinc-500 font-bold uppercase tracking-[0.15em] text-[11px] hover:text-white transition-colors"
                                >
                                    CANCELAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Entregues em Massa Modal - Premium Glass */}
            {showBulkDeliver && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                    <div className="w-full max-w-[380px] bg-[#121212] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="p-8 text-center">
                            <div className="size-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#D4AF37]/5" style={{ border: '1px solid rgba(212,175,55,0.3)' }}>
                                <span className="material-symbols-outlined text-[#D4AF37] text-3xl">done_all</span>
                            </div>
                            <h2 className="text-xl font-black tracking-widest text-white uppercase mb-2 text-center">ENTREGUES EM MASSA</h2>
                            <p className="text-zinc-400 text-sm font-medium mb-8 leading-relaxed text-center">Confirme a quantidade de pacotes entregues com sucesso:</p>

                            <div className="relative flex items-center justify-center gap-6 mb-10">
                                <button
                                    onClick={() => setBulkQty(prev => Math.max(0, prev - 1))}
                                    className="size-12 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] active:bg-[#D4AF37]/10"
                                >
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                                <div className="relative">
                                    <input
                                        autoFocus
                                        type="number"
                                        value={bulkQty}
                                        onChange={(e) => setBulkQty(parseInt(e.target.value) || 0)}
                                        className="w-24 bg-transparent border-none text-center text-5xl font-black text-white focus:ring-0 p-0"
                                    />
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-[#D4AF37] uppercase tracking-widest opacity-50">UNIDADES</div>
                                </div>
                                <button
                                    onClick={() => setBulkQty(prev => prev + 1)}
                                    className="size-12 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] active:bg-[#D4AF37]/10"
                                >
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => handleBulkConfirm('saida')}
                                    className="w-full h-14 rounded-[20px] flex items-center justify-center text-[#EBC051] font-bold uppercase tracking-[0.2em] text-sm transition-all duration-300 active:scale-[0.98]"
                                    style={{ background: 'rgba(18,18,18,0.6)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid #EBC051', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)' }}
                                >
                                    FINALIZAR LOTE
                                </button>
                                <button
                                    onClick={() => setShowBulkDeliver(false)}
                                    className="w-full h-12 text-zinc-500 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors"
                                >
                                    CANCELAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Success Popup */}
            <PremiumSuccessPopup
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                message={successMessage}
            />
        </div>
    );
};

export default RouteActivity;
