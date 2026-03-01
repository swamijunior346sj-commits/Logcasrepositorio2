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
        <div className="flex flex-col items-center bg-pitch-black animate-in fade-in duration-700 min-h-screen">
            <style dangerouslySetInnerHTML={{
                __html: `
                .gold-glow-input {
                    box-shadow: 0 0 15px -5px rgba(235, 192, 81, 0.15);
                }
                .gold-glow-input:focus-within {
                    box-shadow: 0 0 20px -5px rgba(235, 192, 81, 0.3);
                    border-color: rgba(235, 192, 81, 0.5);
                }
                .metallic-gold-text {
                    background: linear-gradient(135deg, #F9E29C 0%, #D4AF37 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .btn-luxury-outline {
                    border: 1px solid #EBC051;
                    background: transparent;
                    color: #EBC051;
                    text-shadow: 0 0 8px rgba(235, 192, 81, 0.3);
                }
                .btn-luxury-outline:active {
                    background: rgba(235, 192, 81, 0.05);
                    transform: translateY(2px);
                }
                .gold-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(235, 192, 81, 0.3), transparent);
                }
                .custom-toggle {
                    width: 44px;
                    height: 24px;
                    background: #262626;
                    border-radius: 100px;
                    position: relative;
                    transition: all 0.3s;
                    cursor: pointer;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .custom-toggle::after {
                    content: '';
                    position: absolute;
                    left: 2px;
                    top: 2px;
                    width: 18px;
                    height: 18px;
                    background: #555;
                    border-radius: 50%;
                    transition: all 0.3s;
                }
                .toggle-active .custom-toggle {
                    background: #EBC051;
                    border-color: #EBC051;
                }
                .toggle-active .custom-toggle::after {
                    left: calc(100% - 20px);
                    background: #000;
                }
                `
            }} />

            <div className="relative flex min-h-screen w-full flex-col max-w-[430px] bg-pitch-black shadow-2xl pb-12">
                {/* Header */}
                <div className="flex items-center justify-between p-6 mt-4">
                    <button
                        onClick={onBack}
                        className="flex size-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-primary-gold active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-[12px] font-black tracking-[0.4em] text-white uppercase text-center">DADOS FISCAIS</h2>
                    <div className="size-11"></div>
                </div>

                <main className="flex-1 px-6 pt-2 pb-24">
                    {/* Informações da Empresa */}
                    <section className="mt-4">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[10px] font-black tracking-[0.2em] text-primary-gold/60 uppercase">Informações da Empresa</span>
                            <div className="flex-1 gold-divider text-left"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 gold-glow-input transition-all text-left">
                                <label className="block text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Razão Social</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={formData.razaoSocial}
                                    onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                                />
                            </div>
                            <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 gold-glow-input transition-all text-left">
                                <label className="block text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">CNPJ</label>
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
                            <span className="text-[10px] font-black tracking-[0.2em] text-primary-gold/60 uppercase">Endereço Fiscal</span>
                            <div className="flex-1 gold-divider"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 gold-glow-input transition-all text-left">
                                <label className="block text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">CEP</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={formData.cep}
                                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                                />
                            </div>
                            <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 gold-glow-input transition-all text-left">
                                <label className="block text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Logradouro</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={formData.logradouro}
                                    onChange={(e) => setFormData({ ...formData, logradouro: e.target.value })}
                                />
                            </div>
                            <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 gold-glow-input transition-all text-left">
                                <label className="block text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Número</label>
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
                            <span className="text-[10px] font-black tracking-[0.2em] text-primary-gold/60 uppercase">Configuração de Impostos</span>
                            <div className="flex-1 gold-divider"></div>
                        </div>

                        <div
                            className={`bg-[#121212] border border-white/5 rounded-2xl p-5 gold-glow-input flex items-center justify-between transition-all cursor-pointer ${formData.isMei ? 'toggle-active' : ''}`}
                            onClick={() => setFormData({ ...formData, isMei: !formData.isMei })}
                        >
                            <div className="text-left">
                                <h4 className="text-sm font-bold text-white">Optante pelo MEI</h4>
                                <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider font-semibold">Microempreendedor Individual</p>
                            </div>
                            <div className="custom-toggle"></div>
                        </div>
                    </section>
                </main>

                {/* Action Button */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-gradient-to-t from-pitch-black via-pitch-black to-transparent pt-12 z-20">
                    <button
                        onClick={handleSave}
                        className="w-full btn-luxury-outline py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.35em] flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                    >
                        <span className="material-symbols-outlined text-base">verified</span>
                        Salvar Alterações
                    </button>

                    <div className="flex justify-center items-center gap-2 pt-6 opacity-20">
                        <div className="h-[1px] w-8 bg-primary-gold"></div>
                        <span className="material-symbols-outlined text-[10px] text-primary-gold">security</span>
                        <div className="h-[1px] w-8 bg-primary-gold"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EliteTaxData;
