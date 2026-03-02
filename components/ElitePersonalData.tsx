import React, { useState } from 'react';
import PremiumDeleteSuccessPopup from './PremiumDeleteSuccessPopup';

interface ElitePersonalDataProps {
    userName: string;
    userEmail: string;
    vehicleName: string;
    onBack: () => void;
    onSave: (data: any) => void;
    onAddVehicle?: () => void;
}

const ElitePersonalData: React.FC<ElitePersonalDataProps> = ({ userName, userEmail, vehicleName, onBack, onSave, onAddVehicle }) => {
    const [vehicle, setVehicle] = useState(vehicleName);
    const [name, setName] = useState(userName);
    const [email, setEmail] = useState(userEmail || '');
    const [phone, setPhone] = useState('');
    const [showDeleteAnim, setShowDeleteAnim] = useState(false);
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);

    return (
        <div className="flex justify-center items-start min-h-screen bg-pitch-black animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
                .ultra-thin-border {
                    border: 0.5px solid rgba(235, 192, 81, 0.3);
                }
                .gold-text-glow {
                    text-shadow: 0 0 10px rgba(235, 192, 81, 0.2);
                }
                .metallic-gold-bg {
                    background: linear-gradient(135deg, #F9E29C 0%, #EBC051 50%, #AA771C 100%);
                }
                .outline-gold-btn {
                    border: 0.5px solid #EBC051;
                    background: transparent;
                    color: #EBC051;
                    transition: all 0.3s ease;
                }
                .outline-gold-btn:active {
                    background: rgba(235, 192, 81, 0.05);
                    transform: scale(0.98);
                }
                input::placeholder {
                    color: rgba(255, 255, 255, 0.2);
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

                {/* Header Actions Removido */}

                <div className="flex flex-col items-center px-6 mt-2 mb-10">
                    <div className="relative">
                        <div className="size-28 rounded-full p-[1px] bg-primary-gold/40">
                            <div className="size-full rounded-full border-[3px] border-pitch-black overflow-hidden bg-black">
                                <img alt="User Profile" className="w-full h-full object-cover grayscale-[20%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1nEhj2i0eHOa4yvLOI-Dx4CqWgy1r6IMkLx-3M027NbZ1cNThkwpalKZztGYj5sSGca61nITxbzLudi0yBlOvvon8q2t93Vi_4csBT3YVnKBlkDlQWuT97fHVb7KTqKSzv4MfJqd28EGi0Kx5N1b6MNVe8ICvDN8Iabft_hh3-ZH7UuV7gKsKNQwb8YJXhSdAnvVNE8AdxofmUcHl0uLYrxEd2Js3lgD7G_nbyTxUMFMYF_WJrIUCjQZdhItrPaGAaK4z3KLrgHLF" />
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 size-9 rounded-full metallic-gold-bg border-2 border-pitch-black flex items-center justify-center text-black shadow-lg active:scale-90 transition-transform">
                            <span className="material-symbols-outlined text-[18px] font-bold">edit</span>
                        </button>
                    </div>
                </div>

                <div className="px-6 space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-primary-gold/80 uppercase tracking-[0.2em] ml-1">Nome Completo</label>
                        <div className="ultra-thin-border rounded-lg p-3.5 flex items-center bg-transparent">
                            <span className="material-symbols-outlined text-primary-gold text-[20px] mr-3">person</span>
                            <input
                                className="bg-transparent border-none p-0 text-white font-medium focus:ring-0 w-full text-[14px] placeholder-white/20"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-primary-gold/80 uppercase tracking-[0.2em] ml-1">E-mail</label>
                        <div className="ultra-thin-border rounded-lg p-3.5 flex items-center bg-transparent">
                            <span className="material-symbols-outlined text-primary-gold text-[20px] mr-3">mail</span>
                            <input
                                className="bg-transparent border-none p-0 text-white font-medium focus:ring-0 w-full text-[14px] placeholder-white/20"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-primary-gold/80 uppercase tracking-[0.2em] ml-1">Telefone</label>
                        <div className="ultra-thin-border rounded-lg p-3.5 flex items-center bg-transparent">
                            <span className="material-symbols-outlined text-primary-gold text-[20px] mr-3">smartphone</span>
                            <input
                                className="bg-transparent border-none p-0 text-white font-medium focus:ring-0 w-full text-[14px] placeholder-white/20"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+55 (11) 98765-4321"
                            />
                        </div>
                    </div>

                    <div className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[9px] font-bold text-white uppercase tracking-[0.3em]">Meus Veículos</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="ultra-thin-border rounded-lg p-4 flex items-center justify-between bg-transparent">
                                <div className="flex items-center">
                                    <div className="size-11 rounded border-[0.5px] border-primary-gold/20 flex items-center justify-center mr-4">
                                        <span className="material-symbols-outlined text-primary-gold text-[22px]">local_shipping</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[13px] font-bold text-white tracking-tight">{vehicle}</p>
                                        <p className="text-[9px] text-white/40 font-bold tracking-[0.15em] mt-0.5 uppercase">ABC-1234 • CARGA</p>
                                    </div>
                                </div>
                                <div className="flex items-center px-2.5 py-1 rounded-full border-[0.5px] border-primary-gold bg-transparent">
                                    <span className="material-symbols-outlined text-[12px] text-primary-gold mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    <span className="text-[9px] font-black text-primary-gold uppercase tracking-wider">ATIVO</span>
                                </div>
                            </div>

                            <button onClick={onAddVehicle} className="w-full border-[0.5px] border-dashed border-primary-gold/30 rounded-lg p-4 flex items-center justify-center group active:bg-primary-gold/5 transition-colors">
                                <span className="material-symbols-outlined text-primary-gold/40 mr-2 text-[18px] group-hover:text-primary-gold transition-colors">add</span>
                                <span className="text-[9px] font-bold text-primary-gold/50 uppercase tracking-[0.2em] group-hover:text-primary-gold transition-colors">Cadastrar novo veículo</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 px-6 pt-12 mb-8">
                    <button
                        onClick={() => setShowSaveSuccess(true)}
                        className="w-full outline-gold-btn rounded-lg py-4.5 h-[56px] font-bold text-[12px] uppercase tracking-[0.3em] flex items-center justify-center"
                    >
                        Salvar Alterações
                    </button>
                </div>

                <div className="mt-auto pb-4 flex justify-center">
                    <div className="w-32 h-1 bg-white/10 rounded-full"></div>
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
                                    onSave({ userName: name, vehicleName: vehicle });
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
