import React, { useState } from 'react';

interface EliteTaxDataProps {
    onBack: () => void;
    onSave: (data: any) => void;
}

const EliteTaxData: React.FC<EliteTaxDataProps> = ({ onBack, onSave }) => {
    const [razaoSocial, setRazaoSocial] = useState('EXECUTIVE LOGISTICS LTDA');
    const [cnpj, setCnpj] = useState('12.345.678/0001-90');
    const [cep, setCep] = useState('01414-001');
    const [logradouro, setLogradouro] = useState('Alameda Santos');
    const [numero, setNumero] = useState('2159');
    const [isMei, setIsMei] = useState(true);

    const handleSave = () => {
        onSave({ razaoSocial, cnpj, cep, logradouro, numero, isMei });
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-pitch-black animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
                .metallic-gold-text {
                    background: linear-gradient(135deg, #F9E29C 0%, #EBC051 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .input-card-outline {
                    background: transparent;
                    border: 1px solid rgba(235, 192, 81, 0.4);
                    transition: all 0.3s duration-300;
                }
                .input-card-outline:focus-within {
                    border-color: #EBC051;
                    box-shadow: 0 0 15px rgba(235, 192, 81, 0.15);
                }
                .btn-luxury-outline {
                    background: transparent;
                    border: 1px solid #EBC051;
                    color: #EBC051;
                    transition: all 0.3s ease;
                }
                .btn-luxury-outline:active {
                    background: rgba(235, 192, 81, 0.05);
                    transform: scale(0.98);
                }
                .gold-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(235, 192, 81, 0.3), transparent);
                }
                .custom-toggle {
                    width: 40px;
                    height: 20px;
                    background: rgba(235, 192, 81, 0.1);
                    border: 1px solid rgba(235, 192, 81, 0.3);
                    border-radius: 100px;
                    position: relative;
                    transition: all 0.3s;
                }
                .custom-toggle::after {
                    content: '';
                    position: absolute;
                    left: 2px;
                    top: 2px;
                    width: 14px;
                    height: 14px;
                    background: rgba(235, 192, 81, 0.4);
                    border-radius: 50%;
                    transition: all 0.3s;
                }
                .toggle-active .custom-toggle {
                    background: rgba(235, 192, 81, 0.2);
                    border-color: #EBC051;
                }
                .toggle-active .custom-toggle::after {
                    left: calc(100% - 16px);
                    background: #EBC051;
                    box-shadow: 0 0 10px rgba(235, 192, 81, 0.4);
                }
                `
            }} />

            <div className="relative flex min-h-screen w-full flex-col max-w-[430px] bg-pitch-black shadow-2xl overflow-hidden">
                <header className="sticky top-0 z-30 flex items-center px-6 pt-14 pb-6 bg-pitch-black/80 backdrop-blur-xl">
                    <h1 className="flex-1 text-center text-sm font-black tracking-[0.4em] metallic-gold-text uppercase">
                        Dados Fiscais
                    </h1>
                </header>

                <main className="flex-1 px-6 pb-40 overflow-y-auto">
                    <section className="mt-4">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[9px] font-black tracking-[0.25em] text-primary-gold/50 uppercase">Informações da Empresa</span>
                            <div className="flex-1 gold-divider"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="input-card-outline rounded-xl p-4">
                                <label className="block text-[8px] font-bold text-primary-gold/60 uppercase tracking-[0.2em] mb-1">Razão Social</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-semibold text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={razaoSocial}
                                    onChange={(e) => setRazaoSocial(e.target.value)}
                                />
                            </div>
                            <div className="input-card-outline rounded-xl p-4">
                                <label className="block text-[8px] font-bold text-primary-gold/60 uppercase tracking-[0.2em] mb-1">CNPJ</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-semibold text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={cnpj}
                                    onChange={(e) => setCnpj(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="mt-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[9px] font-black tracking-[0.25em] text-primary-gold/50 uppercase">Endereço Fiscal</span>
                            <div className="flex-1 gold-divider"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="input-card-outline rounded-xl p-4">
                                <label className="block text-[8px] font-bold text-primary-gold/60 uppercase tracking-[0.2em] mb-1">CEP</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-semibold text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                />
                            </div>
                            <div className="input-card-outline rounded-xl p-4">
                                <label className="block text-[8px] font-bold text-primary-gold/60 uppercase tracking-[0.2em] mb-1">Logradouro</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-semibold text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={logradouro}
                                    onChange={(e) => setLogradouro(e.target.value)}
                                />
                            </div>
                            <div className="input-card-outline rounded-xl p-4">
                                <label className="block text-[8px] font-bold text-primary-gold/60 uppercase tracking-[0.2em] mb-1">Número</label>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-semibold text-white focus:ring-0 placeholder:text-white/20"
                                    type="text"
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="mt-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[9px] font-black tracking-[0.25em] text-primary-gold/50 uppercase">Configuração de Impostos</span>
                            <div className="flex-1 gold-divider"></div>
                        </div>
                        <div
                            className="input-card-outline rounded-xl p-5 flex items-center justify-between cursor-pointer select-none"
                            onClick={() => setIsMei(!isMei)}
                        >
                            <div>
                                <h4 className="text-sm font-bold text-white tracking-tight">Optante pelo MEI</h4>
                                <p className="text-[9px] text-primary-gold/40 mt-1 uppercase tracking-widest">Microempreendedor Individual</p>
                            </div>
                            <div className={isMei ? "toggle-active" : ""}>
                                <div className="custom-toggle"></div>
                            </div>
                        </div>
                    </section>
                </main>

                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-pitch-black via-pitch-black to-transparent pt-12">
                    <button
                        onClick={handleSave}
                        className="w-full btn-luxury-outline py-5 rounded-xl font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-3"
                    >
                        Salvar Alterações
                    </button>
                    <div className="flex justify-center items-center gap-2 pt-6 opacity-20">
                        <div className="h-[1px] w-6 bg-primary-gold"></div>
                        <span className="material-symbols-outlined text-[10px] text-primary-gold">verified_user</span>
                        <div className="h-[1px] w-6 bg-primary-gold"></div>
                    </div>
                </div>

                <div className="fixed top-0 right-0 w-[300px] h-[300px] bg-primary-gold/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
                <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-primary-gold/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            </div>
        </div>
    );
};

export default EliteTaxData;
