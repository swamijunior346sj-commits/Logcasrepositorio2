
import React, { useState } from 'react';
import { LogEntry } from '../types';

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
    const [entryType, setEntryType] = useState<'single' | 'batch'>('single');
    const [formData, setFormData] = useState({
        entrada: 0,
        saida: 0,
        devolucao: 0
    });
    const [showBulkLoad, setShowBulkLoad] = useState(false);
    const [showBulkDeliver, setShowBulkDeliver] = useState(false);
    const [bulkQty, setBulkQty] = useState(0);

    const totalGoal = 18;
    const currentTotal = counts.todaySaida;
    const progress = Math.min(100, Math.round((currentTotal / totalGoal) * 100));

    const handleSave = () => {
        onSave({
            entrada: Number(formData.entrada),
            saida: Number(formData.saida),
            devolucao: Number(formData.devolucao)
        });
        setFormData({ entrada: 0, saida: 0, devolucao: 0 });
    };

    const handleMassAction = (type: 'entrada' | 'saida') => {
        setBulkQty(0);
        if (type === 'entrada') {
            setShowBulkLoad(true);
        } else {
            setShowBulkDeliver(true);
        }
    };

    const confirmBulk = (type: 'entrada' | 'saida') => {
        setFormData({ ...formData, [type]: bulkQty });
        setShowBulkLoad(false);
        setShowBulkDeliver(false);
    };

    return (
        <div className="flex flex-col bg-black min-h-screen text-white font-display pb-10 animate-in fade-in duration-500">
            <style dangerouslySetInnerHTML={{
                __html: `
                .gold-gradient {
                    background: linear-gradient(135deg, #996515 0%, #D4AF37 50%, #F9E498 100%);
                }
                .gold-3d-effect {
                    box-shadow: 
                        0 4px 0px 0px #856404,
                        0 8px 15px rgba(212, 175, 55, 0.3);
                }
                .gold-3d-effect:active {
                    transform: translateY(2px);
                    box-shadow: 
                        0 2px 0px 0px #856404,
                        0 4px 10px rgba(212, 175, 55, 0.2);
                }
                .gold-text-gradient {
                    background: linear-gradient(135deg, #F9E498 0%, #D4AF37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .gold-border-subtle {
                    border: 1px solid rgba(212, 175, 55, 0.3);
                }
                .gold-border-focus:focus-within {
                    border-color: #D4AF37;
                    box-shadow: 0 0 0 1px #D4AF37;
                }
            `}} />

            {/* Header */}
            <header className="flex items-center p-6 justify-between sticky top-0 bg-black/90 backdrop-blur-xl z-30">
                <button
                    onClick={onBack}
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/20 text-[#D4AF37] active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold tracking-tight flex-1 text-center text-white">Atividade da Rota</h2>
                <div className="flex w-11 items-center justify-end">
                    <button className="flex size-11 items-center justify-center rounded-full border border-[#D4AF37]/20 text-[#D4AF37]">
                        <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
                    </button>
                </div>
            </header>

            {/* Progress Card */}
            <div className="px-6 py-4">
                <div className="bg-[#121212] p-6 rounded-2xl border border-[#D4AF37]/20 relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 opacity-10">
                        <span className="material-symbols-outlined text-[120px] text-[#D4AF37]">local_shipping</span>
                    </div>
                    <div className="flex justify-between items-end mb-5 relative z-10">
                        <div>
                            <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-left">CONQUISTA ATUAL</p>
                            <h3 className="text-2xl font-bold text-white">{currentTotal}/{totalGoal} <span className="text-sm font-medium text-zinc-500">Pacotes</span></h3>
                        </div>
                        <div className="gold-gradient px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#D4AF37]/20">
                            <span className="material-symbols-outlined text-sm font-bold text-black">workspace_premium</span>
                            <span className="text-[11px] font-black text-black uppercase">Elite Nível 4</span>
                        </div>
                    </div>
                    <div className="flex gap-6 justify-between mb-3 text-left">
                        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">CONCLUSÃO DA ROTA</p>
                        <p className="text-[#D4AF37] text-sm font-bold">{progress}%</p>
                    </div>
                    <div className="h-[6px] w-full rounded-full bg-zinc-800 overflow-hidden">
                        <div className="h-full rounded-full gold-gradient" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Type Toggle */}
            <div className="px-6 py-3">
                <div className="flex h-14 w-full items-center justify-center rounded-full bg-[#121212] border border-[#D4AF37]/20 p-1.5">
                    <button
                        onClick={() => setEntryType('single')}
                        className={`flex flex-1 h-full items-center justify-center rounded-full px-2 text-sm font-bold transition-all duration-300 gap-2 ${entryType === 'single' ? 'gold-gradient text-black' : 'text-zinc-500'}`}
                    >
                        <span className="material-symbols-outlined text-lg">edit_note</span>
                        Entrada Individual
                    </button>
                    <button
                        onClick={() => setEntryType('batch')}
                        className={`flex flex-1 h-full items-center justify-center rounded-full px-2 text-sm font-bold transition-all duration-300 gap-2 ${entryType === 'batch' ? 'gold-gradient text-black' : 'text-zinc-500'}`}
                    >
                        <span className="material-symbols-outlined text-lg">cloud_upload</span>
                        Adição em Lote
                    </button>
                </div>
            </div>

            <main className="flex-1 px-6 pt-4 pb-12 space-y-8">
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">inventory_2</span>
                        LOGÍSTICA DE PACOTES
                    </h3>

                    {/* Mass Actions */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleMassAction('entrada')}
                            className="gold-gradient gold-3d-effect h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all text-black active:scale-95"
                        >
                            <span className="material-symbols-outlined text-xl font-bold">file_upload</span>
                            <span className="text-[10px] font-black uppercase tracking-tighter">Carregamento Massa</span>
                        </button>
                        <button
                            onClick={() => handleMassAction('saida')}
                            className="gold-gradient gold-3d-effect h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all text-black active:scale-95"
                        >
                            <span className="material-symbols-outlined text-xl font-bold">done_all</span>
                            <span className="text-[10px] font-black uppercase tracking-tighter">Entregues em Massa</span>
                        </button>
                    </div>

                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1 text-left">CARREGADOS (SUCESSO)</label>
                            <div className="relative flex items-center bg-[#121212] gold-border-subtle rounded-xl overflow-hidden gold-border-focus transition-all duration-300">
                                <span className="material-symbols-outlined absolute left-4 text-[#D4AF37] opacity-70">check_circle</span>
                                <input
                                    type="number"
                                    value={formData.entrada || ''}
                                    onChange={(e) => setFormData({ ...formData, entrada: parseInt(e.target.value) || 0 })}
                                    className="w-full h-16 bg-transparent border-none pl-12 pr-4 text-xl font-bold text-white focus:ring-0 outline-none placeholder-zinc-700 font-elite"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div className="group">
                            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1 text-left">ENTREGUES</label>
                            <div className="relative flex items-center bg-[#121212] gold-border-subtle rounded-xl overflow-hidden gold-border-focus transition-all duration-300">
                                <span className="material-symbols-outlined absolute left-4 text-[#D4AF37] opacity-70">local_post_office</span>
                                <input
                                    type="number"
                                    value={formData.saida || ''}
                                    onChange={(e) => setFormData({ ...formData, saida: parseInt(e.target.value) || 0 })}
                                    className="w-full h-16 bg-transparent border-none pl-12 pr-4 text-xl font-bold text-white focus:ring-0 outline-none placeholder-zinc-700 font-elite"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div className="group">
                            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1 text-left">DIVERGÊNCIAS (ACAREAÇÃO)</label>
                            <div className="relative flex items-center bg-[#121212] gold-border-subtle rounded-xl overflow-hidden gold-border-focus transition-all duration-300">
                                <span className="material-symbols-outlined absolute left-4 text-[#D4AF37] opacity-70">warning</span>
                                <input
                                    type="number"
                                    value={formData.devolucao || ''}
                                    onChange={(e) => setFormData({ ...formData, devolucao: parseInt(e.target.value) || 0 })}
                                    className="w-full h-16 bg-transparent border-none pl-12 pr-4 text-xl font-bold text-white focus:ring-0 outline-none placeholder-zinc-700 font-elite"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Insight Box */}
                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-5 rounded-2xl flex items-start gap-4">
                    <div className="bg-[#D4AF37]/10 p-2.5 rounded-full ring-1 ring-[#D4AF37]/30">
                        <span className="material-symbols-outlined text-[#D4AF37] text-xl">auto_awesome</span>
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-black text-[#D4AF37] uppercase tracking-widest mb-1">INSIGHT ELITE</p>
                        <p className="text-[13px] text-zinc-400 leading-relaxed font-medium">
                            Complete mais {Math.max(0, totalGoal - currentTotal)} entregas perfeitas para desbloquear o status <span className="text-white">"Piloto de Precisão"</span>.
                        </p>
                    </div>
                </div>
            </main>

            {/* Save Button */}
            <div className="px-6 py-8 flex justify-center z-30">
                <button
                    onClick={handleSave}
                    className="w-full max-w-[382px] h-16 gold-gradient text-black rounded-2xl shadow-2xl shadow-[#D4AF37]/20 flex items-center justify-center gap-3 text-base font-black uppercase tracking-widest pointer-events-auto active:scale-95 transition-transform gold-3d-effect"
                >
                    <span className="material-symbols-outlined font-bold">save</span>
                    REGISTRAR ATIVIDADE
                </button>
            </div>

            {/* Carregamento em Massa Modal */}
            {
                showBulkLoad && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in fade-in zoom-in duration-300">
                        <div className="w-full max-w-[380px] bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent rounded-full"></div>
                            <div className="pt-10 pb-6 px-8 text-center w-full">
                                <h2 className="text-[14px] font-black tracking-[0.3em] text-[#D4AF37] uppercase mb-10 text-center">Carregamento em Massa</h2>
                                <div className="relative inline-flex mb-10 mx-auto">
                                    <div className="absolute inset-0 bg-[#D4AF37]/20 blur-2xl rounded-full scale-150"></div>
                                    <div className="relative bg-[#121212] w-24 h-24 rounded-full flex items-center justify-center border border-[#D4AF37]/20 shadow-2xl">
                                        <span className="material-symbols-outlined text-5xl gold-text-gradient font-light">barcode_scanner</span>
                                    </div>
                                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl-sm"></div>
                                    <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-sm"></div>
                                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-sm"></div>
                                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br-sm"></div>
                                </div>
                                <div className="space-y-8 w-full">
                                    <div className="group text-left">
                                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-2">Quantidade a Carregar</label>
                                        <div className="relative flex items-center bg-[#121212] gold-border-subtle rounded-2xl overflow-hidden focus-within:border-[#D4AF37] transition-all duration-300">
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
                                        onClick={() => confirmBulk('entrada')}
                                        className="w-full h-16 gold-gradient gold-3d-effect text-black rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.15em] active:scale-95 transition-transform mb-2"
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
                )
            }

            {/* Entregues em Massa Modal */}
            {
                showBulkDeliver && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in fade-in zoom-in duration-300">
                        <div className="w-full max-w-[380px] bg-[#121212] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <div className="p-8 text-center">
                                <div className="size-16 mx-auto mb-6 rounded-full gold-border-subtle flex items-center justify-center bg-[#D4AF37]/5">
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
                                        onClick={() => confirmBulk('saida')}
                                        className="w-full h-14 gold-gradient gold-3d-effect rounded-2xl flex items-center justify-center text-black font-black uppercase tracking-widest text-sm"
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
                )
            }
        </div >
    );
};

export default RouteActivity;
