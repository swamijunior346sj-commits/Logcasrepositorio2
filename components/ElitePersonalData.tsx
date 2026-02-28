
import React from 'react';

interface ElitePersonalDataProps {
    userName: string;
    onBack: () => void;
    onSave: (data: any) => void;
}

const ElitePersonalData: React.FC<ElitePersonalDataProps> = ({ userName, onBack, onSave }) => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-black animate-in fade-in duration-700 pb-10">
            <style dangerouslySetInnerHTML={{
                __html: `
        .carbon-texture {
            background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0);
            background-size: 4px 4px;
        }
        .gold-glow {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }
        .metallic-gold-text {
            background: linear-gradient(135deg, #F9E29C 0%, #D4AF37 50%, #AA771C 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .metallic-gold-bg {
            background: linear-gradient(135deg, #F9E29C 0%, #D4AF37 50%, #AA771C 100%);
        }
        .input-card-border {
            border: 1px solid rgba(212, 175, 55, 0.25);
            background: rgba(18, 18, 18, 0.8);
        }
        .btn-3d-gold {
            background: linear-gradient(180deg, #F9E29C 0%, #D4AF37 50%, #AA771C 100%);
            box-shadow: 0 4px 0 #8A5E12, 0 10px 20px rgba(212, 175, 55, 0.3);
            text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
        }
        .btn-3d-gold:active {
            transform: translateY(2px);
            box-shadow: 0 2px 0 #8A5E12, 0 5px 10px rgba(212, 175, 55, 0.3);
        }
      `}} />

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] bg-black shadow-2xl carbon-texture pb-10">
                <div className="pt-4"></div>

                {/* Profile Picture */}
                <div className="flex flex-col items-center px-6 mt-4 mb-10">
                    <div className="relative">
                        <div className="size-32 rounded-full p-[2px] metallic-gold-bg gold-glow">
                            <div className="size-full rounded-full border-4 border-black overflow-hidden bg-[#121212]">
                                <img
                                    alt={userName}
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1nEhj2i0eHOa4yvLOI-Dx4CqWgy1r6IMkLx-3M027NbZ1cNThkwpalKZztGYj5sSGca61nITxbzLudi0yBlOvvon8q2t93Vi_4csBT3YVnKBlkDlQWuT97fHVb7KTqKSzv4MfJqd28EGi0Kx5N1b6MNVe8ICvDN8Iabft_hh3-ZH7UuV7gKsKNQwb8YJXhSdAnvVNE8AdxofmUcHl0uLYrxEd2Js3lgD7G_nbyTxUMFMYF_WJrIUCjQZdhItrPaGAaK4z3KLrgHLF"
                                />
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 size-10 rounded-full metallic-gold-bg border-4 border-black flex items-center justify-center text-black shadow-lg active:scale-90 transition-transform">
                            <span className="material-symbols-outlined text-xl font-bold">edit</span>
                        </button>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="px-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-[#D4AF37]/60 uppercase tracking-widest ml-1">Nome Completo</label>
                        <div className="input-card-border rounded-2xl p-4 flex items-center">
                            <span className="material-symbols-outlined text-[#D4AF37]/50 mr-3 text-lg">person</span>
                            <input
                                className="bg-transparent border-none p-0 text-white font-semibold focus:ring-0 w-full text-sm placeholder:text-white/20"
                                type="text"
                                defaultValue={userName}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-[#D4AF37]/60 uppercase tracking-widest ml-1">E-mail</label>
                        <div className="input-card-border rounded-2xl p-4 flex items-center">
                            <span className="material-symbols-outlined text-[#D4AF37]/50 mr-3 text-lg">mail</span>
                            <input
                                className="bg-transparent border-none p-0 text-white font-semibold focus:ring-0 w-full text-sm placeholder:text-white/20"
                                type="email"
                                defaultValue="ricardo.silva@elitedelivery.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-[#D4AF37]/60 uppercase tracking-widest ml-1">Telefone</label>
                        <div className="input-card-border rounded-2xl p-4 flex items-center">
                            <span className="material-symbols-outlined text-[#D4AF37]/50 mr-3 text-lg">smartphone</span>
                            <input
                                className="bg-transparent border-none p-0 text-white font-semibold focus:ring-0 w-full text-sm placeholder:text-white/20"
                                type="tel"
                                defaultValue="+55 (11) 98765-4321"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-[#D4AF37]/60 uppercase tracking-widest ml-1">CPF</label>
                        <div className="input-card-border rounded-2xl p-4 flex items-center">
                            <span className="material-symbols-outlined text-[#D4AF37]/50 mr-3 text-lg">badge</span>
                            <input
                                className="bg-transparent border-none p-0 text-white font-semibold focus:ring-0 w-full text-sm placeholder:text-white/20"
                                type="text"
                                defaultValue="456.***.***-89"
                            />
                        </div>
                    </div>

                    {/* Documents Section */}
                    <div className="pt-4">
                        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-4 ml-1">Documentos</h3>
                        <div className="input-card-border rounded-2xl p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="size-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mr-4">
                                    <span className="material-symbols-outlined text-[#D4AF37]">contact_page</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase tracking-tight">CNH - Categoria A/B</p>
                                    <p className="text-[10px] text-white/40 font-medium uppercase mt-0.5">Vencimento: 12/2026</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-[#D4AF37]/20 px-3 py-1.5 rounded-full border border-[#D4AF37]/30">
                                <span className="material-symbols-outlined text-[14px] text-[#D4AF37] mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-tighter">Validado</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-12 px-6 mb-10">
                    <button
                        onClick={() => onSave({})}
                        className="w-full btn-3d-gold rounded-2xl py-5 text-black font-black text-sm uppercase tracking-[0.2em] active:scale-[0.98] transition-all"
                    >
                        Salvar Alterações
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ElitePersonalData;
