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
        <div className="flex justify-center items-start min-h-screen bg-pitch-black animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
                .gold-glow {
                    box-shadow: 0 0 50px -10px rgba(235, 192, 81, 0.05);
                }
                .metallic-gold-text {
                    background: linear-gradient(135deg, #F9E29C 0%, #EBC051 50%, #AA771C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .btn-minimal-gold {
                    background: transparent;
                    border: 1px solid #EBC051;
                    color: #EBC051;
                    transition: all 0.3s ease;
                }
                .btn-minimal-gold:active {
                    background: rgba(235, 192, 81, 0.1);
                    transform: scale(0.98);
                }
                .input-label {
                    font-size: 10px;
                    font-weight: 900;
                    color: #EBC051;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    margin-bottom: 0.5rem;
                    display: block;
                }
                .outline-input {
                    width: 100%;
                    background: transparent;
                    border: 1px solid #EBC051;
                    border-radius: 1rem;
                    padding: 1rem;
                    color: white;
                    font-weight: 500;
                }
                .outline-input::placeholder {
                    color: rgba(255, 255, 255, 0.2);
                }
                .outline-input:focus {
                    outline: none;
                    box-shadow: 0 0 0 1px #EBC051;
                }
                `
            }} />

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] bg-pitch-black shadow-2xl pb-10">

                {/* Header Removido */}
                <div className="px-6 flex-1 pt-6">

                    <div className="space-y-6">
                        <div className="group text-left">
                            <label className="input-label">VALOR DA NOTA</label>
                            <div className="relative">
                                <input
                                    className="outline-input text-lg font-bold bg-transparent border-primary-gold/50"
                                    readOnly
                                    type="text"
                                    value={formatBRL(pendingBalance)}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <span className="text-[8px] font-black text-primary-gold uppercase">AUTO-PREENCHIDO</span>
                                    <span className="material-symbols-outlined text-primary-gold text-xs">check_circle</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-left">
                            <label className="input-label">DESCRIÇÃO DOS SERVIÇOS</label>
                            <textarea
                                className="outline-input resize-none"
                                placeholder="Ex: Prestação de Serviços de Entrega"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="border border-primary-gold rounded-2xl p-5 space-y-4 bg-transparent text-left">
                            <label className="input-label !mb-0">DADOS DO TOMADOR</label>
                            <div className="space-y-4 pt-2">
                                <div>
                                    <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest mb-1">RAZÃO SOCIAL / NOME</p>
                                    <input
                                        className="w-full bg-transparent border-b border-white/10 pb-2 text-sm font-semibold focus:outline-none focus:border-primary-gold transition-colors text-white"
                                        type="text"
                                        value={razaoSocial}
                                        onChange={(e) => setRazaoSocial(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest mb-1">CNPJ / CPF</p>
                                    <input
                                        className="w-full bg-transparent border-b border-white/10 pb-2 text-sm font-semibold focus:outline-none focus:border-primary-gold transition-colors text-white"
                                        type="text"
                                        value={cnpj}
                                        onChange={(e) => setCnpj(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-2 text-left">
                            <span className="material-symbols-outlined text-primary-gold text-sm">info</span>
                            <p className="text-[9px] font-medium text-white/40 leading-tight">Os impostos serão calculados automaticamente com base no seu regime tributário cadastrado.</p>
                        </div>
                    </div>
                </div>

                <div className="px-6 mt-10 space-y-6">
                    <button
                        onClick={handleEmit}
                        className="w-full btn-minimal-gold py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3"
                    >
                        <span className="material-symbols-outlined">receipt_long</span>
                        EMITIR NOTA FISCAL
                    </button>

                    <div className="flex flex-col items-center gap-4">
                        <a className="text-[10px] font-bold text-primary-gold/80 hover:text-[#F9E29C] underline underline-offset-4 tracking-widest uppercase transition-colors" href="#">
                            Dúvidas sobre tributação?
                        </a>
                        <div className="flex items-center gap-2 opacity-20">
                            <div className="h-[1px] w-8 bg-primary-gold"></div>
                            <span className="material-symbols-outlined text-[10px] text-primary-gold">security</span>
                            <div className="h-[1px] w-8 bg-primary-gold"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EliteTaxInvoice;
