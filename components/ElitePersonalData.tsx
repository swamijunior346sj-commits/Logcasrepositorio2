import React, { useState } from 'react';
import PremiumDeleteSuccessPopup from './PremiumDeleteSuccessPopup';

interface ElitePersonalDataProps {
    userName: string;
    userEmail: string;
    vehicleName: string;
    onBack: () => void;
    onSave: (data: { userName: string, vehicleName: string }) => void;
}

const ElitePersonalData: React.FC<ElitePersonalDataProps> = ({ userName, userEmail, vehicleName, onBack, onSave }) => {
    const [vehicle, setVehicle] = useState(vehicleName);
    const [isVehicleMenuOpen, setIsVehicleMenuOpen] = useState(false);
    const [showDeleteAnim, setShowDeleteAnim] = useState(false);
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);

    return (
        <div className="flex flex-col items-center bg-pitch-black animate-in fade-in duration-700 min-h-screen">
            <style dangerouslySetInnerHTML={{
                __html: `
                .carbon-texture {
                    background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0);
                    background-size: 4px 4px;
                }
                .gold-glow {
                    box-shadow: 0 0 20px rgba(235, 192, 81, 0.2);
                }
                .metallic-gold-bg {
                    background: linear-gradient(135deg, #F9E29C 0%, #EBC051 50%, #AA771C 100%);
                }
                .input-card-border {
                    border: 1px solid rgba(235, 192, 81, 0.15);
                    background: rgba(18, 18, 18, 0.8);
                }
                .outline-gold-btn {
                    border: 1px solid #EBC051;
                    background: transparent;
                    color: #EBC051;
                    transition: all 0.3s ease;
                }
                .outline-gold-btn:active {
                    background: rgba(235, 192, 81, 0.05);
                    transform: translateY(1px);
                }
                .glass-overlay-premium {
                    background: rgba(0, 0, 0, 0.92);
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                }
                .modal-border-only {
                    background: transparent;
                    border: 1px solid #EBC051;
                    box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(235, 192, 81, 0.05);
                }
                .gold-glow-icon {
                    text-shadow: 0 0 30px rgba(235, 192, 81, 0.6);
                }
                .outline-button-gold-modal {
                    background: transparent;
                    border: 1px solid #EBC051;
                }
                .outline-button-gold-modal:active {
                    background: rgba(235, 192, 81, 0.1);
                    transform: scale(0.97);
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

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] bg-pitch-black shadow-2xl pb-12">
                {/* Header Actions */}
                <div className="flex items-center justify-center p-6 mt-4">
                    <h2 className="text-[12px] font-black tracking-[0.4em] text-white uppercase text-center">DADOS PESSOAIS</h2>
                </div>

                {/* Profile Picture */}
                <div className="flex flex-col items-center px-6 mt-4 mb-10">
                    <div className="relative">
                        <div className="size-32 rounded-full p-[2px] metallic-gold-bg gold-glow">
                            <div className="size-full rounded-full border-4 border-pitch-black overflow-hidden bg-charcoal-gray">
                                <img
                                    alt={userName}
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1nEhj2i0eHOa4yvLOI-Dx4CqWgy1r6IMkLx-3M027NbZ1cNThkwpalKZztGYj5sSGca61nITxbzLudi0yBlOvvon8q2t93Vi_4csBT3YVnKBlkDlQWuT97fHVb7KTqKSzv4MfJqd28EGi0Kx5N1b6MNVe8ICvDN8Iabft_hh3-ZH7UuV7gKsKNQwb8YJXhSdAnvVNE8AdxofmUcHl0uLYrxEd2Js3lgD7G_nbyTxUMFMYF_WJrIUCjQZdhItrPaGAaK4z3KLrgHLF"
                                />
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 size-10 rounded-full metallic-gold-bg border-4 border-pitch-black flex items-center justify-center text-black shadow-lg active:scale-90 transition-transform">
                            <span className="material-symbols-outlined text-xl font-bold">edit</span>
                        </button>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="px-6 space-y-5">
                    <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold text-primary-gold/60 uppercase tracking-widest ml-1">Nome Completo</label>
                        <div className="input-card-border rounded-2xl p-4 flex items-center opacity-60">
                            <span className="material-symbols-outlined text-primary-gold/50 mr-3">person</span>
                            <input
                                disabled
                                className="bg-transparent border-none p-0 text-white font-semibold focus:ring-0 w-full text-sm cursor-not-allowed"
                                type="text"
                                value={userName}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold text-primary-gold/60 uppercase tracking-widest ml-1">E-mail</label>
                        <div className="input-card-border rounded-2xl p-4 flex items-center opacity-60">
                            <span className="material-symbols-outlined text-primary-gold/50 mr-3">mail</span>
                            <input
                                disabled
                                className="bg-transparent border-none p-0 text-white font-semibold focus:ring-0 w-full text-sm cursor-not-allowed"
                                type="email"
                                value={userEmail || "Não informado"}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold text-primary-gold/60 uppercase tracking-widest ml-1">Telefone</label>
                        <div className="input-card-border rounded-2xl p-4 flex items-center">
                            <span className="material-symbols-outlined text-primary-gold/50 mr-3">smartphone</span>
                            <input
                                className="bg-transparent border-none p-0 text-white font-semibold focus:ring-0 w-full text-sm"
                                type="tel"
                                placeholder="(11) 90000-0000"
                            />
                        </div>
                    </div>

                    {/* Vehicles Section */}
                    <div className="pt-4 text-left">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Meus Veículos</h3>
                        </div>

                        <div className="space-y-3 relative">
                            <button
                                onClick={() => setIsVehicleMenuOpen(!isVehicleMenuOpen)}
                                className={`w-full input-card-border rounded-2xl p-4 flex items-center justify-between relative overflow-hidden group transition-all active:scale-[0.98] ${isVehicleMenuOpen ? 'ring-1 ring-primary-gold shadow-[0_0_15px_rgba(235,192,81,0.2)]' : ''}`}
                            >
                                <div className="flex items-center">
                                    <div className="size-11 rounded-xl bg-primary-gold/10 flex items-center justify-center mr-4">
                                        <span className="material-symbols-outlined text-primary-gold">local_shipping</span>
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="text-sm font-bold text-white mb-0.5">{vehicle}</div>
                                        <p className="text-[10px] text-white/40 font-medium tracking-wide uppercase">Operacional • Padrão LogCash</p>
                                    </div>
                                </div>
                                <div className="flex items-center bg-primary-gold/10 px-3 py-1.5 rounded-full border border-primary-gold/30 shrink-0">
                                    <span className="material-symbols-outlined text-[12px] text-primary-gold mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    <span className="text-[10px] font-black text-primary-gold uppercase tracking-tighter">ATIVO</span>
                                </div>
                            </button>

                            {/* Cockpit Menu */}
                            {isVehicleMenuOpen && (
                                <div className="z-20 flex justify-between gap-3 animate-in slide-in-from-top-2 fade-in duration-200 mt-2">
                                    <button
                                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 active:scale-95 transition-all text-[10px] font-bold tracking-widest uppercase"
                                        onClick={(e) => { e.stopPropagation(); alert("Interface de edição em breve"); setIsVehicleMenuOpen(false); }}
                                    >
                                        <span className="material-symbols-outlined text-[16px]">edit</span>
                                        Editar
                                    </button>
                                    <button
                                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 active:scale-95 transition-all text-[10px] font-bold tracking-widest uppercase"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsVehicleMenuOpen(false);
                                            setShowDeleteAnim(true);
                                        }}
                                    >
                                        <span className="material-symbols-outlined text-[16px]">delete</span>
                                        Excluir
                                    </button>
                                </div>
                            )}

                            <button className="w-full input-card-border border-dashed border-primary-gold/20 rounded-2xl p-4 flex items-center justify-center group active:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-primary-gold/30 mr-2 group-hover:text-primary-gold transition-colors">add</span>
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">Cadastrar novo veículo</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-12 px-6 mb-10">
                    <button
                        onClick={() => setShowSaveSuccess(true)}
                        className="w-full outline-gold-btn rounded-2xl py-5 font-black text-sm uppercase tracking-[0.2em] active:scale-[0.98] transition-all"
                    >
                        Salvar Alterações
                    </button>
                </div>

                <div className="mt-auto pb-4 flex justify-center">
                    <div className="w-32 h-1 bg-white/20 rounded-full"></div>
                </div>
            </div>

            <PremiumDeleteSuccessPopup
                isOpen={showDeleteAnim}
                onClose={() => setShowDeleteAnim(false)}
            />

            {/* Custom Confirm Save Popup */}
            {showSaveSuccess && (
                <div className="fixed inset-0 z-[100] glass-overlay-premium flex items-center justify-center px-8 animate-in fade-in duration-300">
                    <div className="w-full max-w-[340px] modal-border-only rounded-[40px] overflow-hidden bg-pitch-black">
                        <div className="p-10 text-center">
                            <div className="relative size-24 mx-auto mb-8 flex items-center justify-center">
                                <div className="absolute inset-0 bg-[#EBC051]/15 blur-3xl rounded-full"></div>
                                <div className="relative flex items-center justify-center animate-pulse-gold">
                                    <span className="material-symbols-outlined text-[#EBC051] text-[84px] leading-none gold-glow-icon" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}>
                                        check_circle
                                    </span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-black tracking-[0.2em] text-white uppercase mb-3">CONFIRMADO</h2>
                            <p className="text-white/50 text-sm font-medium mb-12 leading-relaxed">
                                Operação realizada com sucesso
                            </p>
                            <button
                                onClick={() => {
                                    setShowSaveSuccess(false);
                                    onSave({ userName: userName, vehicleName: vehicle });
                                }}
                                className="w-full py-4 outline-button-gold-modal rounded-[20px] flex items-center justify-center text-[#EBC051] font-bold uppercase tracking-[0.25em] text-[10px] transition-all duration-300"
                            >
                                ENTENDIDO
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ElitePersonalData;
