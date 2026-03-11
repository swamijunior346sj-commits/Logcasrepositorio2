import React from 'react';

interface EliteProfileProps {
    userName: string;
    avatarUrl?: string; // New prop
    onAvatarChange?: (url: string) => void; // New prop
    onBack: () => void;
    onLogout: () => void;
    onTaxData: () => void;
    onPersonalData: () => void;
    onSettings: () => void;
    onReset: () => void;
    onTaxInvoice?: () => void;
    stats: {
        rating: number;
        trips: number;
        years: number;
    }
}

const EliteProfile: React.FC<EliteProfileProps> = ({ userName, avatarUrl, onAvatarChange, onBack, onLogout, onTaxData, onPersonalData, onSettings, onReset, onTaxInvoice, stats }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = React.useState(false);

    const formatCount = (num: number) => {
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num.toString();
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !onAvatarChange) return;

        try {
            setIsUploading(true);
            const { supabaseService } = await import('../services/supabaseService');
            const url = await supabaseService.uploadAvatar(file);
            await supabaseService.updateProfile({ avatar_url: url });
            onAvatarChange(url);
        } catch (error) {
            console.error("Erro ao fazer upload da avatar:", error);
            alert("Falha ao atualizar foto de perfil.");
        } finally {
            setIsUploading(false);
        }
    };

    const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuA1nEhj2i0eHOa4yvLOI-Dx4CqWgy1r6IMkLx-3M027NbZ1cNThkwpalKZztGYj5sSGca61nITxbzLudi0yBlOvvon8q2t93Vi_4csBT3YVnKBlkDlQWuT97fHVb7KTqKSzv4MfJqd28EGi0Kx5N1b6MNVe8ICvDN8Iabft_hh3-ZH7UuV7gKsKNQwb8YJXhSdAnvVNE8AdxofmUcHl0uLYrxEd2Js3lgD7G_nbyTxUMFMYF_WJrIUCjQZdhItrPaGAaK4z3KLrgHLF";

    return (
        <div className="flex justify-center items-start min-h-screen animate-in fade-in duration-700 bg-pitch-black">
            <style dangerouslySetInnerHTML={{
                __html: `
                .pinstripe-border {
                    border: 0.5px solid rgba(212, 175, 55, 0.3);
                    background: transparent;
                }
                .aura-gold {
                    box-shadow: 0 0 60px rgba(212, 175, 55, 0.08), 0 0 100px rgba(212, 175, 55, 0.02);
                }
                .neon-border {
                    box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
                }
                .metallic-text {
                    background: linear-gradient(135deg, #F9E29C 0%, #D4AF37 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .thin-outline {
                    border: 1px solid rgba(212, 175, 55, 0.5);
                }
                .nfs-button-border {
                    border: 1px solid #EBC051;
                }
                `
            }} />

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] bg-pitch-black pb-12">
                <div className="flex items-center justify-between px-6 pt-6">
                    <button onClick={onBack} className="p-2 -ml-2 text-white/50 active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <button onClick={onSettings} className="p-2 -mr-2 text-primary-gold/50 active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-2xl">settings</span>
                    </button>
                </div>

                <div className="flex flex-col items-center px-6 pt-4 mb-10">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <div className="relative mb-8 cursor-pointer group" onClick={handleAvatarClick}>
                        <div className="absolute inset-0 rounded-full aura-gold scale-125"></div>
                        <div className="relative size-36 rounded-full p-[1px] bg-gradient-to-b from-[#F9E29C] to-[#AA771C] neon-border">
                            <div className="size-full rounded-full border-[4px] border-pitch-black overflow-hidden bg-black relative">
                                <img
                                    alt={userName}
                                    className={`w-full h-full object-cover grayscale-[0.2] transition-all duration-500 ${isUploading ? 'opacity-30' : 'group-hover:scale-110'}`}
                                    src={avatarUrl || defaultAvatar}
                                />
                                {isUploading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-8 border-2 border-primary-gold border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                    <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-5 py-1 thin-outline bg-pitch-black rounded-full shadow-lg">
                            <span className="text-[8px] font-bold text-primary-gold uppercase tracking-[0.4em]">ELITE</span>
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-extralight tracking-tight text-white flex gap-2">
                            {(userName || 'Usuário').split(' ')[0]} <span className="font-bold metallic-text">{(userName || '').split(' ').slice(1).join(' ') || ''}</span>
                        </h1>
                        <p className="text-[9px] font-medium text-white/40 tracking-[0.4em] uppercase">Motorista Verificado • Nível 15</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 px-8 mb-12">
                    <div className="pinstripe-border rounded-2xl py-5 flex flex-col items-center justify-center bg-white/[0.02]">
                        <span className="text-[7px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">Nota</span>
                        <span className="text-xl font-light text-white">{stats.rating.toFixed(1)}</span>
                    </div>
                    <div className="pinstripe-border rounded-2xl py-5 flex flex-col items-center justify-center bg-white/[0.02]">
                        <span className="text-[7px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">Viagens</span>
                        <span className="text-xl font-light text-white">{formatCount(stats.trips)}</span>
                    </div>
                    <div className="pinstripe-border rounded-2xl py-5 flex flex-col items-center justify-center bg-white/[0.02]">
                        <span className="text-[7px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">Anos</span>
                        <span className="text-xl font-light text-white">{stats.years}</span>
                    </div>
                </div>

                <div className="px-8 flex flex-col gap-4 mb-16">
                    <button
                        onClick={onPersonalData}
                        className="w-full pinstripe-border rounded-[2rem] p-6 flex items-center justify-between group active:bg-white/5 transition-all"
                    >
                        <div className="flex items-center gap-5">
                            <div className="size-11 rounded-full flex items-center justify-center bg-primary-gold/5 border border-primary-gold/10">
                                <span className="material-symbols-outlined text-primary-gold font-light text-xl">person</span>
                            </div>
                            <div className="flex flex-col items-start text-left">
                                <span className="text-[11px] font-bold text-white/80 tracking-widest uppercase">Dados Pessoais</span>
                                <span className="text-[8px] text-white/30 uppercase tracking-tight mt-0.5">Gestão de conta e segurança</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-white/20 text-sm">arrow_forward_ios</span>
                    </button>

                    <div className="w-full pinstripe-border rounded-[2rem] p-6 flex flex-col gap-6 bg-white/[0.01]">
                        <div
                            onClick={onTaxData}
                            className="flex items-center justify-between w-full cursor-pointer active:opacity-50 transition-opacity text-left"
                        >
                            <div className="flex items-center gap-5">
                                <div className="size-11 rounded-full flex items-center justify-center bg-primary-gold/5 border border-primary-gold/10">
                                    <span className="material-symbols-outlined text-primary-gold font-light text-xl">description</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[11px] font-bold text-white/80 tracking-widest uppercase">Dados Fiscais</span>
                                    <span className="text-[8px] text-white/30 uppercase tracking-tight mt-0.5">CNPJ e Faturamento Anual</span>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-white/20 text-sm">arrow_forward_ios</span>
                        </div>

                        <button
                            onClick={onTaxInvoice}
                            className="w-full nfs-button-border py-3 rounded-full bg-transparent active:bg-[#EBC051]/10 transition-colors flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[#EBC051] text-base">receipt_long</span>
                            <span className="text-[10px] font-bold text-[#EBC051] tracking-[0.25em] uppercase">Gerar NFS-e</span>
                        </button>
                    </div>
                </div>

                <div className="mt-auto px-8 text-center">
                    <button
                        onClick={onLogout}
                        className="text-[10px] font-medium text-white/20 hover:text-white/40 uppercase tracking-[0.5em] transition-colors py-4 inline-block"
                    >
                        Encerrar Sessão
                    </button>
                    <div className="w-16 h-[0.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mt-4"></div>
                    <div className="mt-6 text-[8px] text-white/10 uppercase tracking-[0.3em] font-light">
                        LogCash Premium • v2.4.0
                    </div>
                </div>
                <div className="w-32 h-1 bg-white/10 rounded-full mx-auto mt-10 mb-20"></div>
            </div>
        </div>
    );
};

export default EliteProfile;
