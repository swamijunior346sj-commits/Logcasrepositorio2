import React, { useState } from 'react';
import { Profile } from '../types';

interface EliteSettingsProps {
    profile?: Profile | null;
    onBack: () => void;
    onLogout: () => void;
    onResetSystem?: () => void;
    onUpdateProfile?: (updates: Partial<Profile>) => Promise<void>;
}

const EliteSettings: React.FC<EliteSettingsProps> = ({ profile, onBack, onLogout, onResetSystem, onUpdateProfile }) => {
    const [packageValue, setPackageValue] = useState(profile?.package_value?.toString() || '2.50');
    const [isSaving, setIsSaving] = useState(false);

    const handleSavePackageValue = async () => {
        if (!onUpdateProfile) return;
        setIsSaving(true);
        try {
            await onUpdateProfile({ package_value: parseFloat(packageValue) || 2.50 });
            // Mostrar feedback de sucesso se necessário
        } finally {
            setIsSaving(false);
        }
    };
    return (
        <div className="flex justify-center items-center bg-pitch-black min-h-screen animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
                .metallic-gold-text {
                    background: linear-gradient(135deg, #F9E29C 0%, #EBC051 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .card-border-elite {
                    border: 0.1px solid rgba(235, 192, 81, 0.4);
                    background: transparent;
                }
                .gold-divider-thin {
                    height: 0.1px;
                    background: rgba(235, 192, 81, 0.2);
                }
                .gold-toggle {
                    position: relative;
                    display: inline-flex;
                    height: 1.25rem;
                    width: 2.25rem;
                    align-items: center;
                    border-radius: 9999px;
                    transition-property: background-color;
                    transition-duration: 200ms;
                    background-color: #EBC051;
                }
                .gold-toggle-dot {
                    display: inline-block;
                    height: 0.75rem;
                    width: 0.75rem;
                    transform: translateX(1.25rem);
                    border-radius: 9999px;
                    background-color: #000000;
                    transition-property: transform;
                    transition-duration: 200ms;
                }
                `
            }} />

            <div className="relative flex h-screen w-full flex-col max-w-[430px] bg-pitch-black shadow-2xl justify-center">
                <div className="flex items-center justify-center p-6 mb-4 mt-6">
                    <div className="h-4" />
                </div>

                <div className="px-6 flex flex-col gap-6 overflow-y-auto pb-24">
                    <div className="flex flex-col gap-3">
                        <span className="text-[9px] font-bold tracking-[0.4em] text-primary-gold/70 uppercase px-1 text-left">Preferências do App</span>
                        <div className="card-border-elite rounded-[1.2rem] overflow-hidden">
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-9 rounded-lg bg-primary-gold/5 flex items-center justify-center border border-primary-gold/10">
                                        <span className="material-symbols-outlined text-primary-gold text-lg">notifications_active</span>
                                    </div>
                                    <span className="text-sm font-medium text-white/90 tracking-tight">Notificações Push</span>
                                </div>
                                <div className="gold-toggle">
                                    <span className="gold-toggle-dot"></span>
                                </div>
                            </div>
                            <div className="gold-divider-thin mx-4"></div>
                            <button className="w-full p-4 flex items-center justify-between group active:bg-white/5 transition-all text-left">
                                <div className="flex items-center gap-4">
                                    <div className="size-9 rounded-lg bg-primary-gold/5 flex items-center justify-center border border-primary-gold/10">
                                        <span className="material-symbols-outlined text-primary-gold text-lg">fingerprint</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-white/90 tracking-tight">Segurança e Biometria</span>
                                        <span className="text-[9px] text-white/40 font-medium tracking-wide">FaceID ativado</span>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-primary-gold/60 text-lg">chevron_right</span>
                            </button>
                            <div className="gold-divider-thin mx-4"></div>
                            <button className="w-full p-4 flex items-center justify-between group active:bg-white/5 transition-all text-left">
                                <div className="flex items-center gap-4">
                                    <div className="size-9 rounded-lg bg-primary-gold/5 flex items-center justify-center border border-primary-gold/10">
                                        <span className="material-symbols-outlined text-primary-gold text-lg">language</span>
                                    </div>
                                    <span className="text-sm font-medium text-white/90 tracking-tight">Idioma</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-primary-gold">PT-BR</span>
                                    <span className="material-symbols-outlined text-primary-gold/60 text-lg">chevron_right</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-[9px] font-bold tracking-[0.4em] text-primary-gold/70 uppercase px-1 text-left">Personalização</span>
                        <div className="card-border-elite rounded-[1.2rem] overflow-hidden">
                            <button className="w-full p-4 flex items-center justify-between group active:bg-white/5 transition-all text-left">
                                <div className="flex items-center gap-4">
                                    <div className="size-9 rounded-lg bg-primary-gold/5 flex items-center justify-center border border-primary-gold/10">
                                        <span className="material-symbols-outlined text-primary-gold text-lg">dark_mode</span>
                                    </div>
                                    <span className="text-sm font-medium text-white/90 tracking-tight">Tema Visual</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-primary-gold uppercase">Dark Elite</span>
                                    <span className="material-symbols-outlined text-primary-gold/60 text-lg">chevron_right</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-[9px] font-bold tracking-[0.4em] text-primary-gold/70 uppercase px-1 text-left">Valores e Pagamentos</span>
                        <div className="card-border-elite rounded-[1.2rem] overflow-hidden p-4 space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-white/90 tracking-tight">Valor por Pacote Base</label>
                                <p className="text-[9px] text-white/40 font-medium leading-relaxed">
                                    Defina o valor padrão atual de cada pacote. Modificar isso não afetará o histórico passado, apenas as novas entregas.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl flex items-center px-4 py-3">
                                    <span className="text-primary-gold font-bold mr-2">R$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={packageValue}
                                        onChange={(e) => setPackageValue(e.target.value)}
                                        className="bg-transparent border-none text-white font-bold w-full focus:ring-0 p-0"
                                    />
                                </div>
                                <button 
                                    onClick={handleSavePackageValue}
                                    disabled={isSaving}
                                    className="px-6 py-3 bg-[#EBC051] text-black font-black uppercase tracking-wider text-[10px] rounded-xl active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {isSaving ? 'SALVANDO...' : 'SALVAR'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-[9px] font-bold tracking-[0.4em] text-primary-gold/70 uppercase px-1 text-left">Segurança de Dados</span>
                        <div className="card-border-elite rounded-[1.2rem] overflow-hidden">
                            <button className="w-full p-4 flex items-center justify-between group active:bg-white/5 transition-all text-left">
                                <div className="flex items-center gap-4">
                                    <div className="size-9 rounded-lg bg-primary-gold/5 flex items-center justify-center border border-primary-gold/10">
                                        <span className="material-symbols-outlined text-primary-gold text-lg">policy</span>
                                    </div>
                                    <span className="text-sm font-medium text-white/90 tracking-tight">Privacidade</span>
                                </div>
                                <span className="material-symbols-outlined text-primary-gold/60 text-lg">chevron_right</span>
                            </button>
                            <div className="gold-divider-thin mx-4"></div>
                            <button className="w-full p-4 flex items-center justify-between group active:bg-white/5 transition-all text-left">
                                <div className="flex items-center gap-4">
                                    <div className="size-9 rounded-lg bg-primary-gold/5 flex items-center justify-center border border-primary-gold/10">
                                        <span className="material-symbols-outlined text-primary-gold text-lg">info</span>
                                    </div>
                                    <span className="text-sm font-medium text-white/90 tracking-tight">Sobre</span>
                                </div>
                                <span className="material-symbols-outlined text-primary-gold/60 text-lg">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onLogout}
                            className="w-full p-4 rounded-[1.2rem] bg-transparent border-[0.1px] border-red-500/40 flex items-center justify-center gap-3 group active:bg-red-500/10 transition-all font-jakarta uppercase"
                        >
                            <span className="material-symbols-outlined text-red-500/80 text-lg">logout</span>
                            <span className="text-[11px] font-bold text-red-500/80 tracking-[0.2em] uppercase mt-0.5">Sair da Conta Elite</span>
                        </button>

                        <button
                            onClick={onResetSystem}
                            className="w-full p-4 rounded-[1.2rem] bg-transparent border-[0.1px] border-red-500/20 flex items-center justify-center gap-3 group active:bg-red-500/5 transition-all font-jakarta uppercase"
                        >
                            <span className="material-symbols-outlined text-red-500/40 text-lg">delete_forever</span>
                            <span className="text-[10px] font-bold text-red-500/40 tracking-[0.2em] uppercase mt-0.5">Limpar todos os dados</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EliteSettings;
