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
            // Chama o onSave imediatamente
            onSave({
                entrada: type === 'entrada' ? bulkQty : 0,
                saida: type === 'saida' ? bulkQty : 0,
                devolucao: 0
            });
            // Removido popup local para agilizar a experiência
        }
        setBulkQty(0);
        setShowBulkLoad(false);
        setShowBulkDeliver(false);
    };

    // Calculate progress for circular gauge (max 18 deliveries as per dashboard)
    const goal = 18;
    const progressPerc = Math.min(100, (counts.todaySaida / goal) * 100);
    const strokeDashoffset = 301 - (301 * progressPerc) / 100; // 301 is approx circumference for r=48 (2 * pi * 48)

    return (
        <div className="bg-log-black text-[#F5F5F5] min-h-screen font-sans antialiased overflow-x-hidden selection:bg-gold/30 animate-in fade-in duration-500">
            <style dangerouslySetInnerHTML={{
                __html: `
                .gold-gradient-text {
                    background: linear-gradient(135deg, #FDF0D5 0%, #EBC051 50%, #A67C00 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .glass-charcoal {
                    background: rgba(18, 18, 16, 0.4);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(235, 192, 81, 0.15);
                }
                .cinematic-glow {
                    box-shadow: 0 0 40px rgba(235, 192, 81, 0.08), inset 0 0 20px rgba(235, 192, 81, 0.03);
                    border: 1px solid rgba(235, 192, 81, 0.2);
                }
                .glow-pulse {
                    animation: glow-pulse-animation 4s infinite ease-in-out;
                }
                @keyframes glow-pulse-animation {
                    0%, 100% { box-shadow: 0 0 10px rgba(235, 192, 81, 0.03); }
                    50% { box-shadow: 0 0 20px rgba(235, 192, 81, 0.08); }
                }
                .ios-safe-bottom {
                    padding-bottom: env(safe-area-inset-bottom);
                }
                .ios-safe-top {
                    padding-top: env(safe-area-inset-top);
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
                `
            }} />

            <div className="max-w-md mx-auto p-6 flex flex-col relative z-20 h-full ios-safe-top pb-24">
                {/* Header / Circular Gauge */}
                <div className="glass-charcoal cinematic-glow rounded-[2.5rem] p-6 flex flex-col items-center justify-center relative mb-6 mt-2">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-[1.5px] border-gold/10"></div>
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                                className="transition-all duration-1000 ease-out opacity-80"
                                cx="50" cy="50" fill="none" r="48"
                                stroke="#EBC051"
                                strokeDasharray="301" // circumference 2*pi*48 = ~301
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                strokeWidth="1.5"
                            ></circle>
                        </svg>
                        <div className="text-center z-10">
                            <p className="text-[9px] font-bold tracking-[0.4em] text-gold/60 uppercase mb-2" style={{ fontFamily: "'Syncopate', sans-serif" }}>Total</p>
                            <div className="flex flex-col items-center">
                                <span className="text-[14px] font-medium text-gold/80 mb-1" style={{ fontFamily: "'Syncopate', sans-serif" }}>R$</span>
                                <span className="text-4xl font-extrabold tracking-tight text-[#F5F5F5]">{formatCurrency(totalValue)}</span>
                            </div>
                            <p className="text-[8px] font-bold tracking-[0.2em] text-zinc-500 mt-3 uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>Hoje</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid - One-click buttons */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                        onClick={() => handleOneClick('entrada')}
                        className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl bg-[#121210]/40 border transition-all active:scale-[0.98] relative overflow-hidden ${animatingCard === 'entrada' ? 'border-yellow-500 scale-95' : 'border-[#2A2A26]/30 glow-pulse'
                            }`}
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
                        <p className="text-[7px] font-bold tracking-[0.15em] text-zinc-500 mb-1 uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>Carregados</p>
                        <div className={`text-xl font-bold transition-colors ${animatingCard === 'entrada' ? 'text-yellow-400' : 'text-[#F5F5F5]'}`}>
                            {String(counts.todayEntrada).padStart(2, '0')}
                        </div>
                        <div className="mt-1.5 w-4 h-[1.5px] bg-yellow-500/40 rounded-full"></div>
                    </button>

                    {/* Entregues */}
                    <button
                        onClick={() => handleOneClick('saida')}
                        className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl bg-[#121210]/40 border transition-all active:scale-[0.98] relative overflow-hidden ${animatingCard === 'saida' ? 'border-emerald-500 scale-95' : 'border-[#2A2A26]/30 glow-pulse'
                            }`}
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
                        <p className="text-[7px] font-bold tracking-[0.15em] text-zinc-500 mb-1 uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>Entregues</p>
                        <div className={`text-xl font-bold transition-colors ${animatingCard === 'saida' ? 'text-emerald-400' : 'text-[#F5F5F5]'}`}>
                            {String(counts.todaySaida).padStart(2, '0')}
                        </div>
                        <div className="mt-1.5 w-4 h-[1.5px] bg-emerald-500/40 rounded-full"></div>
                    </button>

                    {/* Insucessos */}
                    <button
                        onClick={() => handleOneClick('devolucao')}
                        className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl bg-[#121210]/40 border transition-all active:scale-[0.98] relative overflow-hidden ${animatingCard === 'devolucao' ? 'border-red-500 scale-95' : 'border-[#2A2A26]/30 glow-pulse'
                            }`}
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
                        <p className="text-[7px] font-bold tracking-[0.15em] text-zinc-500 mb-1 uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>Insucessos</p>
                        <div className={`text-xl font-bold transition-colors ${animatingCard === 'devolucao' ? 'text-red-400' : 'text-[#F5F5F5]'}`}>
                            {String(counts.todayDevolucao).padStart(2, '0')}
                        </div>
                        <div className="mt-1.5 w-4 h-[1.5px] bg-red-500/40 rounded-full"></div>
                    </button>
                </div>

                {/* Bulk Action Buttons */}
                <div className="flex flex-col gap-3 flex-grow justify-start">
                    <button
                        onClick={() => { setBulkQty(0); setShowBulkLoad(true); }}
                        className="glass-charcoal w-full py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all group overflow-hidden"
                    >
                        <span className="material-symbols-outlined text-[#EBC051] font-light text-xl">layers</span>
                        <span className="text-[#EBC051] font-bold text-[10px] tracking-[0.2em]" style={{ fontFamily: "'Syncopate', sans-serif" }}>CARREGAR EM MASSA</span>
                    </button>
                    <button
                        onClick={() => { setBulkQty(0); setShowBulkDeliver(true); }}
                        className="glass-charcoal w-full py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all group overflow-hidden"
                    >
                        <span className="material-symbols-outlined text-[#EBC051] font-light text-xl">task_alt</span>
                        <span className="text-[#EBC051] font-bold text-[10px] tracking-[0.2em]" style={{ fontFamily: "'Syncopate', sans-serif" }}>ENTREGAS EM MASSA</span>
                    </button>
                </div>

                <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/5 rounded-full z-10"></div>
            </div>

            {/* Bulk Actions Modals */}
            {
                (showBulkLoad || showBulkDeliver) && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300 bg-black/80 backdrop-blur-xl">
                        <div className="w-full max-w-[380px] rounded-[32px] overflow-hidden bg-zinc-900/40 border border-[#EBC051]/30 p-8 shadow-2xl">
                            <div className="text-center">
                                <div className="size-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gold/5 border border-gold/20">
                                    <span className="material-symbols-outlined text-[#EBC051] text-3xl">
                                        {showBulkLoad ? 'move_to_inbox' : 'done_all'}
                                    </span>
                                </div>
                                <h2 className="text-xl font-black tracking-widest text-white uppercase mb-4">
                                    {showBulkLoad ? 'CARREGAMENTO EM MASSA' : 'ENTREGUES EM MASSA'}
                                </h2>
                                <p className="text-white/60 text-sm font-medium mb-10 leading-relaxed px-4">
                                    {showBulkLoad ? 'Confirme a quantidade de pacotes carregados na base:' : 'Confirme a quantidade de pacotes entregues com sucesso:'}
                                </p>

                                <div className="relative flex items-center justify-center gap-8 mb-12">
                                    <button
                                        onClick={() => setBulkQty(prev => Math.max(0, prev - 1))}
                                        className="size-12 rounded-full border border-gold/40 flex items-center justify-center text-[#EBC051] active:bg-gold/10 transition-all font-bold"
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
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#EBC051] uppercase tracking-[0.2em] opacity-60">UNIDADES</div>
                                    </div>
                                    <button
                                        onClick={() => setBulkQty(prev => prev + 1)}
                                        className="size-12 rounded-full border border-gold/40 flex items-center justify-center text-[#EBC051] active:bg-gold/10 transition-all font-bold"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => handleBulkConfirm(showBulkLoad ? 'entrada' : 'saida')}
                                        className="w-full h-14 rounded-2xl flex items-center justify-center text-[#EBC051] border border-[#EBC051] font-bold uppercase tracking-[0.25em] text-xs transition-all active:scale-[0.98] hover:bg-gold/5"
                                    >
                                        CONFIRMAR LOTE
                                    </button>
                                    <button
                                        onClick={() => { setShowBulkLoad(false); setShowBulkDeliver(false); }}
                                        className="w-full py-2 text-zinc-500 font-bold uppercase tracking-widest text-[11px] hover:text-white transition-colors"
                                    >
                                        CANCELAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default RouteActivity;
