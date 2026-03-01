
import React, { useState } from 'react';

interface EliteTaxInvoiceProps {
    pendingBalance: number;
    onBack: () => void;
    onEmit: (data: any) => void;
}

const EliteTaxInvoice: React.FC<EliteTaxInvoiceProps> = ({ pendingBalance, onBack, onEmit }) => {
    const [description, setDescription] = useState('Prestação de Serviços de Entrega Logística Premium - Período Atual');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');

    const formatBRL = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const handleEmit = () => {
        onEmit({
            value: pendingBalance,
            description,
            razaoSocial,
            cnpj
        });
    };

    return (
        <div className="flex flex-col items-center bg-black animate-in fade-in duration-700 pb-10 overflow-y-auto">
            <style dangerouslySetInnerHTML={{
                __html: `
                .gold-glow-invoice {
                    box-shadow: 0 0 50px -10px rgba(235, 192, 81, 0.1);
                }
                .metallic-gold-text-invoice {
                    background: linear-gradient(135deg, #F9E29C 0%, #EBC051 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .gold-pinstripe-invoice {
                    border: 0.5px solid rgba(235, 192, 81, 0.3);
                }
                .btn-minimal-gold-invoice {
                    background: transparent;
                    border: 1px solid #EBC051;
                    color: #EBC051;
                    transition: all 0.3s ease;
                }
                .btn-minimal-gold-invoice:active {
                    background: rgba(235, 192, 81, 0.1);
                    transform: scale(0.98);
                }
                .input-label-invoice {
                    text-[10px] font-black text-[#EBC051] tracking-[0.2em] uppercase mb-2 block text-left;
                }
                .charcoal-input-invoice {
                    width: 100%;
                    background: #121212;
                    border: 0.5px solid rgba(235, 192, 81, 0.3);
                    border-radius: 0.75rem;
                    padding: 1rem;
                    color: white;
                    font-weight: 500;
                }
                .charcoal-input-invoice:focus {
                    outline: none;
                    border-color: rgba(235, 192, 81, 0.6);
                    box-shadow: 0 0 0 1px rgba(235, 192, 81, 0.3);
                }
            `}} />

            <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] bg-black shadow-2xl pb-10 gold-glow-invoice min-h-screen">
                {/* Header Actions */}
                <div className="flex items-center justify-between p-6 mt-4">
                    <button
                        onClick={onBack}
                        className="flex size-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#EBC051] active:scale-90 transition-all"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                    </button>
                    <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">EMISSÃO NF-E</span>
                    <button className="flex size-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#EBC051]">
                        <span className="material-symbols-outlined text-2xl">help_outline</span>
                    </button>
                </div>

                <div className="px-6 flex-1">
                    <header className="mb-10 mt-4 text-center">
                        <h1 className="text-xl font-black tracking-[0.25em] metallic-gold-text-invoice uppercase">EMISSÃO DE NOTA FISCAL</h1>
                        <p className="text-[9px] font-bold text-white/30 tracking-widest uppercase mt-2">NOTA FISCAL ELETRÔNICA DE SERVIÇO</p>
                    </header>

                    <div className="space-y-6">
                        <div className="group text-left">
                            <label className="input-label-invoice">VALOR DA NOTA</label>
                            <div className="relative">
                                <input
                                    className="charcoal-input-invoice !border-[#EBC051]/50 !bg-[#EBC051]/5 text-lg font-bold"
                                    readOnly
                                    type="text"
                                    value={formatBRL(pendingBalance)}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <span className="text-[8px] font-black text-[#EBC051] uppercase">AUTO-PREENCHIDO</span>
                                    <span className="material-symbols-outlined text-[#EBC051] text-xs">check_circle</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-left">
                            <label className="input-label-invoice">DESCRIÇÃO DOS SERVIÇOS</label>
                            <textarea
                                className="charcoal-input-invoice resize-none"
                                placeholder="Ex: Prestação de Serviços de Entrega"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="bg-[#121212] gold-pinstripe-invoice rounded-2xl p-5 space-y-4">
                            <label className="input-label-invoice !mb-0 text-left">DADOS DO TOMADOR</label>
                            <div className="space-y-4 pt-2">
                                <div className="text-left">
                                    <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest mb-1">RAZÃO SOCIAL / NOME</p>
                                    <input
                                        className="w-full bg-transparent border-b border-white/10 pb-2 text-sm font-semibold focus:outline-none focus:border-[#EBC051] text-white"
                                        type="text"
                                        placeholder="Sua Razão Social"
                                        value={razaoSocial}
                                        onChange={(e) => setRazaoSocial(e.target.value)}
                                    />
                                </div>
                                <div className="text-left">
                                    <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest mb-1">CNPJ / CPF</p>
                                    <input
                                        className="w-full bg-transparent border-b border-white/10 pb-2 text-sm font-semibold focus:outline-none focus:border-[#EBC051] text-white"
                                        type="text"
                                        placeholder="00.000.000/0001-00"
                                        value={cnpj}
                                        onChange={(e) => setCnpj(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-2 text-left">
                            <span className="material-symbols-outlined text-[#EBC051] text-sm">info</span>
                            <p className="text-[9px] font-medium text-white/40 leading-tight">
                                Os impostos serão calculados automaticamente com base no seu regime tributário cadastrado.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-6 mt-10 space-y-6">
                    <button
                        onClick={handleEmit}
                        className="w-full btn-minimal-gold-invoice py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3"
                    >
                        <span className="material-symbols-outlined">receipt_long</span>
                        EMITIR NOTA FISCAL
                    </button>

                    <div className="flex flex-col items-center gap-4">
                        <a className="text-[10px] font-bold text-[#EBC051]/80 hover:text-[#F9E29C] underline underline-offset-4 tracking-widest uppercase transition-colors" href="#">
                            Dúvidas sobre tributação?
                        </a>
                        <div className="flex items-center gap-2 opacity-20">
                            <div className="h-[1px] w-8 bg-[#EBC051]"></div>
                            <span className="material-symbols-outlined text-[10px] text-[#EBC051]">security</span>
                            <div className="h-[1px] w-8 bg-[#EBC051]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EliteTaxInvoice;
