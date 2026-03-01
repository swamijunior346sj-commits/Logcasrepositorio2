
import React, { useState, useCallback } from 'react';
import { VALOR_POR_PACOTE } from '../constants';

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
                    border: 1px solid #D4AF37;
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
                        rgba(212, 175, 55, 0.15) 50%,
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
                    0%, 100% { box-shadow: 0 0 10px rgba(212, 175, 55, 0.05); }
                    50% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.12); }
                }
                .luxury-card-glow-route {
                    box-shadow: 0 0 25px rgba(212, 175, 55, 0.1);
                    border: 1px solid #D4AF37;
                }
                .particle-route {
                    position: absolute;
                    background: #D4AF37;
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

            <div className="p-5 flex flex-col relative z-10">
                {/* Header */}
                <header className="flex flex-col items-center pt-4 mb-4">
                    <h1 className="text-2xl font-black gold-gradient-text-route tracking-tight uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>Atividades</h1>
                    <div className="h-[1.5px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-1.5 opacity-60"></div>
                </header>

                {/* Total Value Card */}
                <div className="bg-[#121210] luxury-card-glow-route shimmer-liquid-route rounded-2xl p-6 flex flex-col items-center justify-center relative mb-4">
                    <p className="text-[#F5F5F5] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>VALOR TOTAL HOJE</p>
                    <div className="text-[#D4AF37] text-4xl font-bold tracking-tighter">{formatBRL(totalValue)}</div>
                </div>

                {/* Stats Grid - One-click buttons */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {/* Carregados */}
                    <button
                        onClick={() => handleOneClick('entrada')}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-[#121210] border transition-all cursor-pointer relative overflow-hidden ${animatingCard === 'entrada' ? 'border-[#D4AF37] scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'border-[#2A2A26] glow-pulse-route'
                            }`}
                    >
                        {/* Ripple */}
                        {animatingCard === 'entrada' && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/50 oneclick-ripple"></div>
                            </div>
                        )}
                        {/* Color flash overlay */}
                        {animatingCard === 'entrada' && (
                            <div className="absolute inset-0 bg-[#D4AF37] rounded-2xl oneclick-flash pointer-events-none"></div>
                        )}
                        {/* Floating +1 */}
                        {animatingCard === 'entrada' && (
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-black text-[#D4AF37] oneclick-float-up pointer-events-none z-20">+1</span>
                        )}
                        {/* Check icon */}
                        {animatingCard === 'entrada' && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 material-symbols-outlined text-[#D4AF37] text-sm oneclick-check pointer-events-none z-20">check</span>
                        )}
                        <p className="text-[7px] font-bold tracking-[0.1em] text-zinc-500 mb-1.5 uppercase relative z-10" style={{ fontFamily: "'Syncopate', sans-serif" }}>Carregados</p>
                        <div className={`text-2xl font-extrabold tracking-tighter relative z-10 transition-colors duration-300 ${animatingCard === 'entrada' ? 'text-[#D4AF37]' : 'text-white'}`}>{String(counts.todayEntrada).padStart(2, '0')}</div>
                        <div className="mt-1.5 w-5 h-[2px] bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.5)] relative z-10"></div>
                    </button>

                    {/* Entregues */}
                    <button
                        onClick={() => handleOneClick('saida')}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-[#121210] border transition-all cursor-pointer relative overflow-hidden ${animatingCard === 'saida' ? 'border-emerald-500 scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-[#2A2A26] glow-pulse-route'
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
                        <p className="text-[7px] font-bold tracking-[0.1em] text-zinc-500 mb-1.5 uppercase relative z-10" style={{ fontFamily: "'Syncopate', sans-serif" }}>Entregues</p>
                        <div className={`text-2xl font-extrabold tracking-tighter relative z-10 transition-colors duration-300 ${animatingCard === 'saida' ? 'text-emerald-400' : 'text-white'}`}>{String(counts.todaySaida).padStart(2, '0')}</div>
                        <div className="mt-1.5 w-5 h-[2px] bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] relative z-10"></div>
                    </button>

                    {/* Insucessos */}
                    <button
                        onClick={() => handleOneClick('devolucao')}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-[#121210] border transition-all cursor-pointer relative overflow-hidden ${animatingCard === 'devolucao' ? 'border-red-500 scale-95 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-[#2A2A26] glow-pulse-route'
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
                        <p className="text-[7px] font-bold tracking-[0.1em] text-zinc-500 mb-1.5 uppercase relative z-10" style={{ fontFamily: "'Syncopate', sans-serif" }}>Insucessos</p>
                        <div className={`text-2xl font-extrabold tracking-tighter relative z-10 transition-colors duration-300 ${animatingCard === 'devolucao' ? 'text-red-400' : 'text-white'}`}>{String(counts.todayDevolucao).padStart(2, '0')}</div>
                        <div className="mt-1.5 w-5 h-[2px] bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)] relative z-10"></div>
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 flex-grow justify-start">
                    <button
                        onClick={() => { setBulkQty(0); setShowBulkLoad(true); }}
                        className="glass-charcoal-route shimmer-liquid-route w-full py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all group relative overflow-hidden"
                    >
                        <span className="material-symbols-outlined text-[#D4AF37] font-light text-xl relative z-10">layers</span>
                        <span className="text-[#D4AF37] font-bold text-[10px] tracking-[0.2em] relative z-10 uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>CARREGAR EM MASSA</span>
                    </button>
                    <button
                        onClick={() => { setBulkQty(0); setShowBulkDeliver(true); }}
                        className="glass-charcoal-route shimmer-liquid-route w-full py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all group relative overflow-hidden"
                    >
                        <span className="material-symbols-outlined text-[#D4AF37] font-light text-xl relative z-10">task_alt</span>
                        <span className="text-[#D4AF37] font-bold text-[10px] tracking-[0.2em] relative z-10 uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>ENTREGAS EM MASSA</span>
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-10 pt-6 pb-6">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-4 w-full">
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#D4AF37]/20"></div>
                            <p className="text-[8px] text-[#D4AF37]/40 font-bold tracking-[0.4em] uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>Elite Experience</p>
                            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#D4AF37]/20"></div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#D4AF37]/20"></div>
                            <div className="w-1 h-1 rounded-full bg-[#D4AF37]/40"></div>
                            <div className="w-3 h-1 rounded-full bg-[#D4AF37]"></div>
                            <div className="w-1 h-1 rounded-full bg-[#D4AF37]/40"></div>
                            <div className="w-1 h-1 rounded-full bg-[#D4AF37]/20"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carregamento em Massa Modal */}
            {showBulkLoad && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in fade-in zoom-in duration-300">
                    <div className="w-full max-w-[380px] bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent rounded-full"></div>
                        <div className="pt-10 pb-6 px-8 text-center w-full">
                            <h2 className="text-[14px] font-black tracking-[0.3em] text-[#D4AF37] uppercase mb-10 text-center">Carregamento em Massa</h2>
                            <div className="relative inline-flex mb-10 mx-auto">
                                <div className="absolute inset-0 bg-[#D4AF37]/20 blur-2xl rounded-full scale-150"></div>
                                <div className="relative bg-[#121212] w-24 h-24 rounded-full flex items-center justify-center border border-[#D4AF37]/20 shadow-2xl">
                                    <span className="material-symbols-outlined text-5xl gold-text-gradient-route font-light">barcode_scanner</span>
                                </div>
                                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl-sm"></div>
                                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-sm"></div>
                                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-sm"></div>
                                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br-sm"></div>
                            </div>
                            <div className="space-y-8 w-full">
                                <div className="group text-left">
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-2">Quantidade a Carregar</label>
                                    <div className="relative flex items-center bg-[#121212] gold-border-subtle-route rounded-2xl overflow-hidden focus-within:border-[#D4AF37] transition-all duration-300">
                                        <span className="material-symbols-outlined absolute left-5 text-[#D4AF37]/60">view_module</span>
                                        <input
                                            autoFocus
                                            type="number"
                                            value={bulkQty || ''}
                                            onChange={(e) => setBulkQty(parseInt(e.target.value) || 0)}
                                            className="w-full h-16 bg-transparent border-none pl-14 pr-4 text-2xl font-bold text-white focus:ring-0 outline-none placeholder-zinc-800"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleBulkConfirm('entrada')}
                                    className="w-full h-14 gold-gradient-route gold-3d-effect-route text-black rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.15em] active:scale-95 transition-transform mb-2"
                                >
                                    <span className="material-symbols-outlined font-bold">check_circle</span>
                                    Confirmar Lote
                                </button>
                                <button
                                    onClick={() => setShowBulkLoad(false)}
                                    className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors py-2"
                                >
                                    Cancelar Operação
                                </button>
                            </div>
                        </div>
                        <div className="pb-8"></div>
                    </div>
                </div>
            )}

            {/* Entregues em Massa Modal */}
            {showBulkDeliver && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in fade-in zoom-in duration-300">
                    <div className="w-full max-w-[380px] bg-[#121212] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="p-8 text-center">
                            <div className="size-16 mx-auto mb-6 rounded-full gold-border-subtle-route flex items-center justify-center bg-[#D4AF37]/5">
                                <span className="material-symbols-outlined text-[#D4AF37] text-3xl">done_all</span>
                            </div>
                            <h2 className="text-xl font-black tracking-widest text-white uppercase mb-2 text-center">ENTREGAS EM MASSA</h2>
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
                                    className="w-full h-14 gold-gradient-route gold-3d-effect-route rounded-2xl flex items-center justify-center text-black font-black uppercase tracking-widest text-sm"
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
        </div>
    );
};

export default RouteActivity;
