
import React from 'react';

interface EliteProfileProps {
    userName: string;
    onBack: () => void;
    onLogout: () => void;
    onTaxData: () => void;
    onPersonalData: () => void;
    onSettings: () => void;
}

const EliteProfile: React.FC<EliteProfileProps> = ({ userName, onBack, onLogout, onTaxData, onPersonalData, onSettings }) => {
    return (
        <div className="flex flex-col items-center pb-10">
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
        .card-border {
            border: 1px solid rgba(212, 175, 55, 0.2);
            background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
        }
        .gold-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
        }
      `}} />

            <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] shadow-2xl ring-1 ring-white/5 bg-pitch-black pb-12">
                {/* Header */}
                <header className="flex items-center justify-end p-6 mt-4">
                    <button
                        onClick={onSettings}
                        className="flex size-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#D4AF37] active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-2xl">settings</span>
                    </button>
                </header>

                {/* Profile Info */}
                <div className="flex flex-col items-center px-6 mt-4 mb-8">
                    <div className="relative mb-6">
                        <div className="size-32 rounded-full p-[2px] metallic-gold-bg gold-glow">
                            <div className="size-full rounded-full border-4 border-black overflow-hidden bg-[#121212]">
                                <img
                                    alt={userName}
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1nEhj2i0eHOa4yvLOI-Dx4CqWgy1r6IMkLx-3M027NbZ1cNThkwpalKZztGYj5sSGca61nITxbzLudi0yBlOvvon8q2t93Vi_4csBT3YVnKBlkDlQWuT97fHVb7KTqKSzv4MfJqd28EGi0Kx5N1b6MNVe8ICvDN8Iabft_hh3-ZH7UuV7gKsKNQwb8YJXhSdAnvVNE8AdxofmUcHl0uLYrxEd2Js3lgD7G_nbyTxUMFMYF_WJrIUCjQZdhItrPaGAaK4z3KLrgHLF"
                                />
                            </div>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 metallic-gold-bg rounded-full shadow-lg">
                            <span className="text-[9px] font-black text-black uppercase tracking-widest">ELITE</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-f5-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] mt-3 text-center">{userName}</h1>
                    <p className="text-xs font-bold text-primary-gold tracking-[0.3em] mt-2 uppercase">NÍVEL 15 — MESTRE DAS ROTAS</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 px-6 mb-8 mt-2">
                    <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg">
                        <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Nota Média</span>
                        <span className="text-2xl font-black text-white drop-shadow-md">4.9</span>
                        <span className="material-symbols-outlined text-sm text-[#D4AF37] mt-1">star</span>
                    </div>
                    <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg">
                        <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Entregas</span>
                        <span className="text-2xl font-black text-white drop-shadow-md">12K</span>
                        <span className="material-symbols-outlined text-sm text-[#D4AF37] mt-1">package_2</span>
                    </div>
                    <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg">
                        <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Anos Elite</span>
                        <span className="text-2xl font-black text-white drop-shadow-md">3</span>
                        <span className="material-symbols-outlined text-sm text-[#D4AF37] mt-1">workspace_premium</span>
                    </div>
                </div>

                {/* Profile Options */}
                <div className="px-6 flex flex-col gap-3">
                    <button
                        onClick={onPersonalData}
                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] rounded-2xl p-5 flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-[#121212]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="size-11 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex items-center justify-center border border-[#D4AF37]/30">
                                <span className="material-symbols-outlined text-primary-gold text-2xl drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">person_edit</span>
                            </div>
                            <span className="text-base font-extrabold text-[#F5F5F5] tracking-wide">Dados Pessoais</span>
                        </div>
                        <span className="material-symbols-outlined text-white/40 group-hover:text-primary-gold transition-colors">chevron_right</span>
                    </button>

                    <button
                        onClick={onTaxData}
                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] rounded-2xl p-5 flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-[#121212]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="size-11 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex items-center justify-center border border-[#D4AF37]/30">
                                <span className="material-symbols-outlined text-primary-gold text-2xl drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">account_balance_wallet</span>
                            </div>
                            <span className="text-base font-extrabold text-[#F5F5F5] tracking-wide">Dados Fiscais</span>
                        </div>
                        <span className="material-symbols-outlined text-white/40 group-hover:text-primary-gold transition-colors">chevron_right</span>
                    </button>


                    <button className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] rounded-2xl p-5 flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-[#121212]">
                        <div className="flex items-center gap-4">
                            <div className="size-11 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex items-center justify-center border border-[#D4AF37]/30">
                                <span className="material-symbols-outlined text-primary-gold text-2xl drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">trophy</span>
                            </div>
                            <span className="text-base font-extrabold text-[#F5F5F5] tracking-wide">Conquistas Desbloqueadas</span>
                        </div>
                        <span className="material-symbols-outlined text-white/40 group-hover:text-primary-gold transition-colors">chevron_right</span>
                    </button>

                    <button className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] rounded-2xl p-5 flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-[#121212]">
                        <div className="flex items-center gap-4">
                            <div className="size-11 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex items-center justify-center border border-[#D4AF37]/30">
                                <span className="material-symbols-outlined text-primary-gold text-2xl drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">support_agent</span>
                            </div>
                            <span className="text-base font-extrabold text-[#F5F5F5] tracking-wide">Suporte VIP</span>
                        </div>
                        <span className="material-symbols-outlined text-white/40 group-hover:text-primary-gold transition-colors">chevron_right</span>
                    </button>

                    <button
                        onClick={onLogout}
                        className="w-full bg-[#1A0505] border border-red-900/40 shadow-[0_4px_15px_rgba(0,0,0,0.5)] rounded-2xl p-5 flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-[#2A0505] mt-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="size-11 rounded-xl bg-red-950/40 flex items-center justify-center border border-red-900/50">
                                <span className="material-symbols-outlined text-red-500 text-2xl">logout</span>
                            </div>
                            <span className="text-base font-extrabold text-red-500 tracking-wide">Sair da Conta</span>
                        </div>
                        <span className="material-symbols-outlined text-red-500/40 group-hover:text-red-500 transition-colors">logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EliteProfile;
