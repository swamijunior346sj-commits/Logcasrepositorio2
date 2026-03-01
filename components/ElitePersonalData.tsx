import React, { useState } from 'react';

interface ElitePersonalDataProps {
    userName: string;
    vehicleName: string;
    onBack: () => void;
    onSave: (data: { userName: string, vehicleName: string }) => void;
}

const ElitePersonalData: React.FC<ElitePersonalDataProps> = ({ userName, vehicleName, onBack, onSave }) => {
    const [name, setName] = useState(userName);
    const [vehicle, setVehicle] = useState(vehicleName);

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
                `
            }} />

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] bg-pitch-black shadow-2xl carbon-texture pb-12">
                {/* Header Actions */}
                <div className="flex items-center justify-between p-6 mt-4">
                    <button
                        onClick={onBack}
                        className="flex size-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-primary-gold active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-[12px] font-black tracking-[0.4em] text-white uppercase text-center">DADOS PESSOAIS</h2>
                    <div className="size-11"></div>
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
                        <div className="input-card-border rounded-2xl p-4 flex items-center">
                            <span className="material-symbols-outlined text-primary-gold/50 mr-3">person</span>
                            <input
                                className="bg-transparent border-none p-0 text-white font-semibold focus:ring-0 w-full text-sm"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                value="ricardo.silva@elitedelivery.com"
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
                                defaultValue="+55 (11) 98765-4321"
                            />
                        </div>
                    </div>

                    {/* Vehicles Section */}
                    <div className="pt-4 text-left">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Meus Veículos</h3>
                            <button className="text-[10px] font-black text-primary-gold uppercase tracking-widest flex items-center hover:opacity-80 transition-opacity">
                                <span className="material-symbols-outlined text-sm mr-1">add_circle</span>
                                Adicionar
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="input-card-border rounded-2xl p-4 flex items-center justify-between relative overflow-hidden group">
                                <div className="flex items-center">
                                    <div className="size-11 rounded-xl bg-primary-gold/10 flex items-center justify-center mr-4">
                                        <span className="material-symbols-outlined text-primary-gold">local_shipping</span>
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            className="bg-transparent border-none p-0 text-sm font-bold text-white focus:ring-0 w-full mb-0.5"
                                            value={vehicle}
                                            onChange={(e) => setVehicle(e.target.value)}
                                        />
                                        <p className="text-[10px] text-white/40 font-medium tracking-wide uppercase">Operacional • Padrão LogCash</p>
                                    </div>
                                </div>
                                <div className="flex items-center bg-primary-gold/10 px-3 py-1.5 rounded-full border border-primary-gold/30 shrink-0">
                                    <span className="material-symbols-outlined text-[12px] text-primary-gold mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    <span className="text-[10px] font-black text-primary-gold uppercase tracking-tighter">ATIVO</span>
                                </div>
                            </div>

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
                        onClick={() => onSave({ userName: name, vehicleName: vehicle })}
                        className="w-full outline-gold-btn rounded-2xl py-5 font-black text-sm uppercase tracking-[0.2em] active:scale-[0.98] transition-all"
                    >
                        Salvar Alterações
                    </button>
                </div>

                <div className="mt-auto pb-4 flex justify-center">
                    <div className="w-32 h-1 bg-white/20 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ElitePersonalData;
