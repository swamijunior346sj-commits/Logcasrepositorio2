
import React, { useState } from 'react';

interface EliteTaxDataProps {
    onBack: () => void;
    onSave: (data: any) => void;
}

const EliteTaxData: React.FC<EliteTaxDataProps> = ({ onBack, onSave }) => {
    const [formData, setFormData] = useState({
        razaoSocial: 'EXECUTIVE LOGISTICS LTDA',
        cnpj: '12.345.678/0001-90',
        cep: '01414-001',
        logradouro: 'Alameda Santos',
        numero: '2159',
        isMei: true
    });

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="flex flex-col items-center bg-black animate-in fade-in duration-700 pb-10 overflow-y-auto">
            <style dangerouslySetInnerHTML={{
                __html: `
        .gold-glow-input {
            box-shadow: 0 0 15px -5px rgba(212, 175, 55, 0.15);
        }
        .gold-glow-input:focus-within {
            box-shadow: 0 0 20px -5px rgba(212, 175, 55, 0.3);
            border-color: rgba(212, 175, 55, 0.5);
        }
        .metallic-gold-text {
            background: linear-gradient(135deg, #F9E29C 0%, #D4AF37 50%, #AA771C 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .btn-3d-gold {
            background: linear-gradient(180deg, #F9E29C 0%, #D4AF37 40%, #AA771C 100%);
            box-shadow: 0 4px 0 #8B6914, 0 10px 20px rgba(0, 0, 0, 0.4);
            text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
        }
        .btn-3d-gold:active {
            transform: translateY(2px);
            box-shadow: 0 2px 0 #8B6914, 0 5px 10px rgba(0, 0, 0, 0.4);
        }
        .gold-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
        }
        .custom-toggle {
            width: 44px;
            height: 24px;
            background: #262626;
            border-radius: 100px;
            position: relative;
            transition: all 0.3s;
            cursor: pointer;
        }
        .custom-toggle::after {
            content: '';
            position: absolute;
            left: 2px;
            top: 2px;
            width: 20px;
            height: 20px;
            background: #555;
            border-radius: 50%;
            transition: all 0.3s;
        }
        .toggle-active .custom-toggle {
            background: #D4AF37;
        }
        .toggle-active .custom-toggle::after {
            left: calc(100% - 22px);
            background: #000;
        }
      `}} />

            <div className="relative flex w-full flex-col max-w-[430px] bg-black shadow-2xl ring-1 ring-white/5">
                <div className="pt-4"></div>

                <main className="flex-1 px-6 pb-10">
                    {/* Informações da Empresa */}
                    <section className="mt-4">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[10px] font-black tracking-[0.2em] text-[#D4AF37]/60 uppercase">Informações da Empresa</span>
                            <div className="flex-1 gold-divider"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 gold-glow-input transition-all">
                                <label className="block text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 text-left">Razão Social</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={formData.razaoSocial}
                                    onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                                />
                            </div>
                            <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 gold-glow-input transition-all">
                                <label className="block text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 text-left">CNPJ</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={formData.cnpj}
                                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Endereço Fiscal */}
                    <section className="mt-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[10px] font-black tracking-[0.2em] text-[#D4AF37]/60 uppercase">Endereço Fiscal</span>
                            <div className="flex-1 gold-divider"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 gold-glow-input transition-all">
                                <label className="block text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 text-left">CEP</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={formData.cep}
                                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                                />
                            </div>
                            <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 gold-glow-input transition-all">
                                <label className="block text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 text-left">Logradouro</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={formData.logradouro}
                                    onChange={(e) => setFormData({ ...formData, logradouro: e.target.value })}
                                />
                            </div>
                            <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 gold-glow-input transition-all">
                                <label className="block text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 text-left">Número</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={formData.numero}
                                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Configuração de Impostos */}
                    <section className="mt-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[10px] font-black tracking-[0.2em] text-[#D4AF37]/60 uppercase">Configuração de Impostos</span>
                            <div className="flex-1 gold-divider"></div>
                        </div>

                        <div className="bg-[#121212] border border-white/5 rounded-2xl p-5 gold-glow-input flex items-center justify-between transition-all">
                            <div className="text-left">
                                <h4 className="text-sm font-bold text-white">Optante pelo MEI</h4>
                                <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider font-semibold">Microempreendedor Individual</p>
                            </div>
                            <div
                                className={formData.isMei ? "toggle-active" : ""}
                                onClick={() => setFormData({ ...formData, isMei: !formData.isMei })}
                            >
                                <div className="custom-toggle"></div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Action Button */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black to-transparent pt-12 z-20">
                    <button
                        onClick={handleSave}
                        className="w-full btn-3d-gold text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                        Salvar Alterações
                    </button>

                    <div className="flex justify-center items-center gap-2 pt-6 opacity-20">
                        <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                        <span className="material-symbols-outlined text-[10px] text-[#D4AF37]">verified_user</span>
                        <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                    </div>
                </div>

                {/* Decorative background glows */}
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
                </div>
            </div>
        </div>
    );
};

export default EliteTaxData;
