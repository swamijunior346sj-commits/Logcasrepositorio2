import React, { useState, useEffect } from 'react';

interface EliteEditRouteProps {
    dateStr: string;
    initialData: {
        loaded: number;
        delivered: number;
        acareacao: number;
    };
    onSave: (data: { loaded: number, delivered: number, acareacao: number }) => void;
    onCancel: () => void;
    valorPorPacote: number;
}

const EliteEditRoute: React.FC<EliteEditRouteProps> = ({
    dateStr,
    initialData,
    onSave,
    onCancel,
    valorPorPacote
}) => {
    const [data, setData] = useState(initialData);

    const totalValue = data.delivered * valorPorPacote;

    const updateValue = (key: keyof typeof initialData, delta: number) => {
        setData(prev => ({
            ...prev,
            [key]: Math.max(0, prev[key] + delta)
        }));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap');
                
                :root {
                    --primary-gold: #EBC051;
                    --ice-white: #F5F5F5;
                    --charcoal-card: #0A0A0A;
                }
                .widget-card {
                    background: var(--charcoal-card);
                    border: 1px solid var(--primary-gold);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
                }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20;
                }
                .stepper-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2rem;
                    height: 2rem;
                    border-radius: 9999px;
                    border: 1px solid rgba(235, 192, 81, 0.2);
                    color: #EBC051;
                    transition: transform 0.2s;
                    background: transparent;
                }
                .stepper-btn:active {
                    transform: scale(0.9);
                }
                .bg-blur-overlay {
                    background: radial-gradient(circle at center, rgba(10, 10, 10, 0.8) 0%, rgba(0, 0, 0, 1) 100%);
                    backdrop-filter: blur(12px);
                }
                .font-display { font-family: 'Montserrat', sans-serif; }
                `
            }} />

            <div className="fixed inset-0 bg-blur-overlay animate-in fade-in duration-500"></div>

            <div className="widget-card w-full max-w-[320px] rounded-2xl overflow-hidden p-6 flex flex-col relative z-10 animate-in zoom-in-95 duration-300">
                <header className="mb-8 text-center">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary-gold">Editar Rota - {dateStr}</h2>
                </header>

                <div className="space-y-6 mb-10">
                    <div className="flex items-center justify-between">
                        <label className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Carregados</label>
                        <div className="flex items-center gap-4">
                            <button onClick={() => updateValue('loaded', -1)} className="stepper-btn">
                                <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="text-sm font-semibold text-[#F5F5F5] w-8 text-center">{data.loaded}</span>
                            <button onClick={() => updateValue('loaded', 1)} className="stepper-btn">
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Entregues</label>
                        <div className="flex items-center gap-4">
                            <button onClick={() => updateValue('delivered', -1)} className="stepper-btn">
                                <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="text-sm font-semibold text-[#F5F5F5] w-8 text-center">{data.delivered}</span>
                            <button onClick={() => updateValue('delivered', 1)} className="stepper-btn">
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Insucessos</label>
                        <div className="flex items-center gap-4">
                            <button onClick={() => updateValue('acareacao', -1)} className="stepper-btn">
                                <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="text-sm font-semibold text-[#F5F5F5] w-8 text-center">{data.acareacao.toString().padStart(2, '0')}</span>
                            <button onClick={() => updateValue('acareacao', 1)} className="stepper-btn">
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-transparent mb-10 flex flex-col items-center">
                    <p className="text-[7px] font-bold text-primary-gold uppercase tracking-[0.3em] mb-1">Valor Total</p>
                    <p className="text-3xl font-display font-extrabold text-[#F5F5F5] tracking-tight">
                        <span className="text-xs font-light mr-1">R$</span>
                        {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => onSave(data)}
                        className="w-full py-4 rounded-xl border border-primary-gold text-primary-gold font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-primary-gold/10 transition-colors active:scale-95"
                    >
                        Salvar
                    </button>
                    <button
                        onClick={onCancel}
                        className="w-full py-2 text-zinc-600 font-bold text-[8px] tracking-[0.2em] uppercase active:scale-95 transition-all"
                    >
                        Cancelar
                    </button>
                </div>
            </div>

            <footer className="fixed bottom-2 left-0 right-0 z-[60]">
                <div className="mx-auto w-24 h-1 bg-white/10 rounded-full"></div>
            </footer>
        </div>
    );
};

export default EliteEditRoute;
