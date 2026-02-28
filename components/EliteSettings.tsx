
import React from 'react';

interface EliteSettingsProps {
    onBack: () => void;
    onLogout: () => void;
}

const EliteSettings: React.FC<EliteSettingsProps> = ({ onBack, onLogout }) => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-black animate-in fade-in duration-700 pb-10">
            <style dangerouslySetInnerHTML={{
                __html: `
        .carbon-texture {
            background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0);
            background-size: 4px 4px;
        }
        .metallic-gold-text {
            background: linear-gradient(135deg, #F9E29C 0%, #D4AF37 50%, #AA771C 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .card-border {
            border: 1px solid rgba(212, 175, 55, 0.15);
            background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
        }
        .gold-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.25), transparent);
        }
        .gold-toggle {
            position: relative;
            display: inline-flex;
            height: 24px;
            width: 44px;
            align-items: center;
            border-radius: 9999px;
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 200ms;
            background-color: #D4AF37;
        }
        .gold-toggle-dot {
            display: inline-block;
            height: 16px;
            width: 16px;
            transform: translateX(24px);
            border-radius: 9999px;
            background-color: #000000;
            transition-property: transform;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 200ms;
        }
      `}} />

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] bg-black shadow-2xl carbon-texture">
                <div className="pt-4"></div>

                <div className="px-6 mt-6 flex flex-col gap-6">
                    {/* App Preferences */}
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase px-2 mb-2 text-left">Preferências do App</span>
                        <div className="card-border rounded-3xl overflow-hidden">
                            <div className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#D4AF37] text-xl">notifications_active</span>
                                    </div>
                                    <span className="text-sm font-bold text-white/90 tracking-wide">Preferências de Notificação</span>
                                </div>
                                <div className="gold-toggle">
                                    <span className="gold-toggle-dot"></span>
                                </div>
                            </div>
                            <div className="gold-divider mx-5"></div>
                            <button className="w-full p-5 flex items-center justify-between group active:bg-white/5 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#D4AF37] text-xl">fingerprint</span>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-bold text-white/90 tracking-wide text-left">Segurança e Biometria</span>
                                        <span className="text-[10px] text-white/40 font-medium text-left">FaceID / Digital ativado</span>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-[#D4AF37] text-lg">chevron_right</span>
                            </button>
                            <div className="gold-divider mx-5"></div>
                            <button className="w-full p-5 flex items-center justify-between group active:bg-white/5 transition-all text-left">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#D4AF37] text-xl">language</span>
                                    </div>
                                    <span className="text-sm font-bold text-white/90 tracking-wide">Idioma do Aplicativo</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#D4AF37]/60">PT-BR</span>
                                    <span className="material-symbols-outlined text-[#D4AF37] text-lg">chevron_right</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Customization */}
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase px-2 mb-2 text-left">Personalização</span>
                        <div className="card-border rounded-3xl overflow-hidden">
                            <button className="w-full p-5 flex items-center justify-between group active:bg-white/5 transition-all text-left">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#D4AF37] text-xl">dark_mode</span>
                                    </div>
                                    <span className="text-sm font-bold text-white/90 tracking-wide">Tema (Dark/Light)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#D4AF37]/60 uppercase">Dark Elite</span>
                                    <span className="material-symbols-outlined text-[#D4AF37] text-lg">chevron_right</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Data Security */}
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase px-2 mb-2 text-left">Segurança de Dados</span>
                        <div className="card-border rounded-3xl overflow-hidden text-left">
                            <button className="w-full p-5 flex items-center justify-between group active:bg-white/5 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#D4AF37] text-xl">policy</span>
                                    </div>
                                    <span className="text-sm font-bold text-white/90 tracking-wide">Privacidade</span>
                                </div>
                                <span className="material-symbols-outlined text-[#D4AF37] text-lg">chevron_right</span>
                            </button>
                            <div className="gold-divider mx-5"></div>
                            <button className="w-full p-5 flex items-center justify-between group active:bg-white/5 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#D4AF37] text-xl">info</span>
                                    </div>
                                    <span className="text-sm font-bold text-white/90 tracking-wide">Sobre o App</span>
                                </div>
                                <span className="material-symbols-outlined text-[#D4AF37] text-lg">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={onLogout}
                        className="mt-4 w-full p-5 rounded-2xl bg-red-500/5 border border-red-500/20 flex items-center justify-center gap-2 group active:scale-[0.98] transition-all"
                    >
                        <span className="material-symbols-outlined text-red-500 text-xl">logout</span>
                        <span className="text-sm font-bold text-red-500 tracking-wide">Sair da Conta Elite</span>
                    </button>
                </div>

                <div className="mt-auto flex flex-col items-center py-10">
                    <span className="text-[10px] font-bold text-white/20 tracking-widest uppercase text-center">Versão 4.12.0 Gold Edition</span>
                </div>
            </div>
        </div>
    );
};

export default EliteSettings;
