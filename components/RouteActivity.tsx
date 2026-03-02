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

const RouteActivity: React.FC<RouteActivityProps> = ({ counts, onSave }) => {
    const [showBulkLoad, setShowBulkLoad] = useState(false);
    const [showBulkDeliver, setShowBulkDeliver] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bulkQty, setBulkQty] = useState(0);
    const [animatingCard, setAnimatingCard] = useState<'entrada' | 'saida' | 'devolucao' | null>(null);

    const handleOneClick = useCallback((type: 'entrada' | 'saida' | 'devolucao') => {
        setAnimatingCard(type);
        setTimeout(() => setAnimatingCard(null), 800);

        onSave({
            entrada: type === 'entrada' ? 1 : 0,
            saida: type === 'saida' ? 1 : 0,
            devolucao: type === 'devolucao' ? 1 : 0
        });
    }, [onSave]);

    const totalValue = counts.todaySaida * VALOR_POR_PACOTE;

    const formatCurrency = (val: number) =>
        val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const handleBulkConfirm = (type: 'entrada' | 'saida') => {
        if (bulkQty > 0) {
            onSave({
                entrada: type === 'entrada' ? bulkQty : 0,
                saida: type === 'saida' ? bulkQty : 0,
                devolucao: 0
            });
            setShowConfirmation(true);
        }
        setBulkQty(0);
        setShowBulkLoad(false);
        setShowBulkDeliver(false);
    };

    return (
        <div className="bg-log-black text-[#F5F5F5] min-h-screen font-sans antialiased overflow-x-hidden overflow-y-auto selection:bg-gold/30 animate-in fade-in duration-500">
            <style dangerouslySetInnerHTML={{
                __html: `
                .neon-pulse {
                    animation: neon-pulse-animation 3s infinite ease-in-out;
                }
                @keyframes neon-pulse-animation {
                    0%, 100% { 
                        filter: drop-shadow(0 0 2px rgba(235, 192, 81, 0.3)); 
                        opacity: 0.7;
                    }
                    50% { 
                        filter: drop-shadow(0 0 15px rgba(235, 192, 81, 0.9)); 
                        opacity: 1;
                    }
                }
                .stat-card-active:active {
                    border-color: #EBC051;
                    box-shadow: 0 0 25px rgba(235, 192, 81, 0.4);
                    transform: scale(0.96);
                }
                .ios-safe-bottom {
                    padding-bottom: env(safe-area-inset-bottom);
                }
                .ios-safe-top {
                    padding-top: env(safe-area-inset-top);
                }
                .minimalist-border {
                    border: 1px solid #EBC051;
                }
                /* One-click card animations */
                @keyframes float-up-fade {
                    0% { transform: translateY(0) scale(1); opacity: 1; }
                    60% { transform: translateY(-35px) scale(1.4); opacity: 0.9; }
                    100% { transform: translateY(-60px) scale(0.8); opacity: 0; }
                }
                @keyframes ripple-ring {
                    0% { transform: scale(0.3); opacity: 0.6; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
                @keyframes card-flash {
                    0% { opacity: 0; }
                    30% { opacity: 0.3; }
                    100% { opacity: 0; }
                }
                @keyframes check-pop {
                    0% { transform: scale(0) rotate(-45deg); opacity: 0; }
                    50% { transform: scale(1.4) rotate(0deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 0; }
                }
                .oneclick-float-up { animation: float-up-fade 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                .oneclick-ripple { animation: ripple-ring 0.6s ease-out forwards; }
                .oneclick-flash { animation: card-flash 0.5s ease-out forwards; }
                .oneclick-check { animation: check-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

                .glass-overlay-dark {
                    background: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                }
                .minimalist-border-modal {
                    background: transparent;
                    border: 1px solid #EBC051;
                    box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
                }
                .outline-button-premium {
                    background: transparent;
                    border: 1px solid #EBC051;
                }
                .outline-button-premium:active {
                    background: rgba(235, 192, 81, 0.1);
                    transform: scale(0.98);
                }
                .modal-border-only {
                    background: transparent;
                    border: 1px solid #EBC051;
                    box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(235, 192, 81, 0.05);
                }
                .gold-glow {
                    text-shadow: 0 0 30px rgba(235, 192, 81, 0.6);
                }
                @keyframes pulse-gold {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }
                .animate-pulse-gold {
                    animation: pulse-gold 3s ease-in-out infinite;
                }
                `
            }} />

            <div className="max-w-md mx-auto min-h-screen p-6 flex flex-col relative z-10 ios-safe-top pb-32">
                <div className="flex flex-col items-center justify-center relative mb-14 mt-10">
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-[1px] border-gold/10"></div>
                        <svg className="absolute inset-0 w-full h-full -rotate-90 neon-pulse" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" fill="none" r="48" stroke="#EBC051" strokeDasharray="240" strokeDashoffset="65" strokeLinecap="round" strokeWidth="1.8"></circle>
                        </svg>
                        <div className="text-center z-10">
                            <p className="text-[10px] font-display font-bold tracking-[0.5em] text-gold/60 uppercase mb-4" style={{ fontFamily: "'Syncopate', sans-serif" }}>Total</p>
                            <div className="flex flex-col items-center">
                                <span className="text-[16px] font-display font-medium text-gold/80 mb-1" style={{ fontFamily: "'Syncopate', sans-serif" }}>R$</span>
                                <span className="text-6xl font-sans font-extrabold tracking-tight text-[#F5F5F5]">{formatCurrency(totalValue)}</span>
                            </div>
                            <p className="text-[9px] font-display font-bold tracking-[0.3em] text-zinc-500 mt-5 uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>Hoje</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-10">
                    <button
                        onClick={() => handleOneClick('entrada')}
                        className={`bg-[#1A1A1A]/40 border flex flex-col items-center justify-center py-5 px-2 rounded-3xl transition-all duration-300 stat-card-active relative overflow-hidden ${animatingCard === 'entrada' ? 'border-yellow-500 scale-95' : 'border-white/5'}`}
                    >
                        {animatingCard === 'entrada' && (
                            <>
                                <div className="absolute inset-0 bg-yellow-500/20 oneclick-flash"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="size-12 rounded-full border-2 border-yellow-500/50 oneclick-ripple"></div>
                                </div>
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-black text-yellow-400 oneclick-float-up z-20">+1</span>
                                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 material-symbols-outlined text-yellow-400 text-sm oneclick-check z-20">check</span>
                            </>
                        )}
                        <p className="text-[8px] font-display font-bold tracking-[0.1em] text-zinc-400 mb-1 uppercase text-center" style={{ fontFamily: "'Syncopate', sans-serif" }}>Carregados</p>
                        <div className={`text-2xl font-sans font-bold transition-colors ${animatingCard === 'entrada' ? 'text-yellow-400' : 'text-[#F5F5F5]'}`}>{String(counts.todayEntrada).padStart(2, '0')}</div>
                        <div className="mt-2 w-5 h-[2px] bg-yellow-500/50 rounded-full"></div>
                    </button>
                    <button
                        onClick={() => handleOneClick('saida')}
                        className={`bg-[#1A1A1A]/40 border flex flex-col items-center justify-center py-5 px-2 rounded-3xl transition-all duration-300 stat-card-active relative overflow-hidden ${animatingCard === 'saida' ? 'border-emerald-500 scale-95' : 'border-white/5'}`}
                    >
                        {animatingCard === 'saida' && (
                            <>
                                <div className="absolute inset-0 bg-emerald-500/20 oneclick-flash"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="size-12 rounded-full border-2 border-emerald-500/50 oneclick-ripple"></div>
                                </div>
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-black text-emerald-400 oneclick-float-up z-20">+1</span>
                                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 material-symbols-outlined text-emerald-400 text-sm oneclick-check z-20">check</span>
                            </>
                        )}
                        <p className="text-[8px] font-display font-bold tracking-[0.1em] text-zinc-400 mb-1 uppercase text-center" style={{ fontFamily: "'Syncopate', sans-serif" }}>Entregues</p>
                        <div className={`text-2xl font-sans font-bold transition-colors ${animatingCard === 'saida' ? 'text-emerald-400' : 'text-[#F5F5F5]'}`}>{String(counts.todaySaida).padStart(2, '0')}</div>
                        <div className="mt-2 w-5 h-[2px] bg-emerald-500/50 rounded-full"></div>
                    </button>
                    <button
                        onClick={() => handleOneClick('devolucao')}
                        className={`bg-[#1A1A1A]/40 border flex flex-col items-center justify-center py-5 px-2 rounded-3xl transition-all duration-300 stat-card-active relative overflow-hidden ${animatingCard === 'devolucao' ? 'border-red-500 scale-95' : 'border-white/5'}`}
                    >
                        {animatingCard === 'devolucao' && (
                            <>
                                <div className="absolute inset-0 bg-red-500/20 oneclick-flash"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="size-12 rounded-full border-2 border-red-500/50 oneclick-ripple"></div>
                                </div>
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-black text-red-400 oneclick-float-up z-20">+1</span>
                                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 material-symbols-outlined text-red-400 text-sm oneclick-check z-20">check</span>
                            </>
                        )}
                        <p className="text-[8px] font-display font-bold tracking-[0.1em] text-zinc-400 mb-1 uppercase text-center" style={{ fontFamily: "'Syncopate', sans-serif" }}>Insucessos</p>
                        <div className={`text-2xl font-sans font-bold transition-colors ${animatingCard === 'devolucao' ? 'text-red-400' : 'text-[#F5F5F5]'}`}>{String(counts.todayDevolucao).padStart(2, '0')}</div>
                        <div className="mt-2 w-5 h-[2px] bg-red-500/50 rounded-full"></div>
                    </button>
                </div>

                <div className="flex flex-col gap-4 flex-grow justify-start">
                    <button onClick={() => { setBulkQty(0); setShowBulkLoad(true); }} className="w-full py-6 rounded-3xl minimalist-border bg-transparent flex items-center justify-center gap-4 active:scale-[0.98] transition-all group">
                        <span className="material-symbols-outlined text-[#EBC051] font-light text-2xl">layers</span>
                        <span className="text-[#EBC051] font-display font-bold text-[11px] tracking-[0.25em]" style={{ fontFamily: "'Syncopate', sans-serif" }}>CARREGAR EM MASSA</span>
                    </button>
                    <button onClick={() => { setBulkQty(0); setShowBulkDeliver(true); }} className="w-full py-6 rounded-3xl minimalist-border bg-transparent flex items-center justify-center gap-4 active:scale-[0.98] transition-all group">
                        <span className="material-symbols-outlined text-[#EBC051] font-light text-2xl">task_alt</span>
                        <span className="text-[#EBC051] font-display font-bold text-[11px] tracking-[0.25em]" style={{ fontFamily: "'Syncopate', sans-serif" }}>ENTREGAS EM MASSA</span>
                    </button>
                </div>

                <div className="mt-auto pt-4 pb-8 ios-safe-bottom">
                    <div className="flex flex-col items-center gap-5">
                        <div className="flex items-center gap-4 w-full px-6">
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-gold/10 to-transparent"></div>
                            <div className="flex gap-2.5 px-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/5"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/15"></div>
                                <div className="w-4 h-1.5 rounded-full bg-gold/50"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/15"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/5"></div>
                            </div>
                            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent via-gold/10 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bulk Actions Modals */}
            {
                (showBulkLoad || showBulkDeliver) && (
                    <div className="fixed inset-0 z-[200] glass-overlay-dark flex items-center justify-center px-6 animate-in fade-in zoom-in duration-300">
                        <div className={`w-full max-w-[380px] bg-transparent ${showBulkLoad ? 'minimalist-border-modal rounded-[32px] overflow-hidden' : 'border border-[#EBC051]/40 rounded-[2.5rem]'}`}>
                            <div className={showBulkLoad ? 'p-8 text-center' : 'p-10 text-center'}>
                                <div className={`size-16 mx-auto ${showBulkLoad ? 'mb-6 bg-[#EBC051]/5' : 'mb-8 bg-transparent'} rounded-full border border-[#EBC051]/30 flex items-center justify-center`}>
                                    <span className="material-symbols-outlined text-[#EBC051] text-3xl">
                                        {showBulkLoad ? 'move_to_inbox' : 'done_all'}
                                    </span>
                                </div>
                                <h2 className={`text-xl font-black text-white uppercase mb-3 ${showBulkLoad ? 'tracking-[0.1em]' : 'tracking-[0.25em]'}`} style={{ fontFamily: showBulkLoad ? 'inherit' : '"Plus Jakarta Sans", sans-serif' }}>
                                    {showBulkLoad ? 'CARREGAMENTO EM MASSA' : 'ENTREGUES EM MASSA'}
                                </h2>
                                <p className={`text-sm font-medium mb-10 leading-relaxed px-4 ${showBulkLoad ? 'text-white/80' : 'text-zinc-400'}`}>
                                    {showBulkLoad ? 'Confirme a quantidade de unidades carregadas na base:' : 'Confirme a quantidade de pacotes entregues com sucesso:'}
                                </p>

                                <div className="relative flex items-center justify-center gap-8 mb-12">
                                    <button
                                        onClick={() => setBulkQty(prev => Math.max(0, prev - 1))}
                                        className="size-12 rounded-full border border-[#EBC051]/30 flex items-center justify-center text-[#EBC051] active:bg-[#EBC051]/20 transition-all font-bold"
                                    >
                                        <span className="material-symbols-outlined">remove</span>
                                    </button>
                                    <div className="relative">
                                        <input
                                            autoFocus
                                            type="number"
                                            value={bulkQty}
                                            onChange={(e) => setBulkQty(parseInt(e.target.value) || 0)}
                                            className={`w-24 bg-transparent border-none text-center font-black text-white focus:ring-0 p-0 ${showBulkLoad ? 'text-4xl' : 'text-6xl'}`}
                                        />
                                        <div className={`absolute left-1/2 -translate-x-1/2 text-[10px] font-black text-[#EBC051] uppercase opacity-80 ${showBulkLoad ? '-bottom-4 tracking-[0.2em]' : '-bottom-5 tracking-[0.3em]'}`}>UNIDADES</div>
                                    </div>
                                    <button
                                        onClick={() => setBulkQty(prev => prev + 1)}
                                        className="size-12 rounded-full border border-[#EBC051]/30 flex items-center justify-center text-[#EBC051] active:bg-[#EBC051]/20 transition-all font-bold"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>

                                <div className={`space-y-4 ${showBulkLoad ? '' : 'px-2'}`}>
                                    <button
                                        onClick={() => handleBulkConfirm(showBulkLoad ? 'entrada' : 'saida')}
                                        className={`w-full outline-button-premium flex items-center justify-center text-[#EBC051] font-bold uppercase transition-all duration-300 ${showBulkLoad ? 'h-14 py-4 rounded-[22px] tracking-[0.25em] text-xs' : 'h-14 rounded-2xl tracking-[0.2em] text-sm'}`}
                                    >
                                        {showBulkLoad ? 'CONFIRMAR LOTE' : 'FINALIZAR LOTE'}
                                    </button>
                                    <button
                                        onClick={() => { setShowBulkLoad(false); setShowBulkDeliver(false); }}
                                        className={`w-full text-zinc-500 font-bold uppercase hover:text-white transition-colors ${showBulkLoad ? 'py-2 tracking-[0.15em] text-[11px]' : 'h-12 tracking-[0.15em] text-[10px]'}`}
                                    >
                                        CANCELAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Premium Confirmation Modal */}
            {
                showConfirmation && (
                    <div className="fixed inset-0 z-[200] glass-overlay-dark flex items-center justify-center px-8 animate-in fade-in zoom-in duration-300">
                        <div className="w-full max-w-[340px] modal-border-only rounded-[40px] overflow-hidden">
                            <div className="p-10 text-center">
                                <div className="relative size-24 mx-auto mb-8 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#EBC051]/15 blur-3xl rounded-full"></div>
                                    <div className="relative flex items-center justify-center animate-pulse-gold">
                                        <span className="material-symbols-outlined text-[#EBC051] text-[84px] leading-none gold-glow" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}>
                                            check_circle
                                        </span>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-black tracking-[0.2em] text-white uppercase mb-3" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>CONFIRMADO</h2>
                                <p className="text-white/50 text-sm font-medium mb-12 leading-relaxed">
                                    Operação realizada com sucesso
                                </p>
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="w-full py-4 outline-button-premium rounded-[20px] flex items-center justify-center text-[#EBC051] font-bold uppercase tracking-[0.25em] text-[10px] transition-all duration-300"
                                >
                                    ENTENDIDO
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default RouteActivity;
