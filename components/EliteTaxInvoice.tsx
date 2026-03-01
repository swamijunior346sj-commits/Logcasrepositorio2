
import React, { useState } from 'react';

interface EliteTaxInvoiceProps {
    pendingBalance: number;
    onBack: () => void;
    onEmit: (data: any) => void;
}

const EliteTaxInvoice: React.FC<EliteTaxInvoiceProps> = ({ pendingBalance, onBack, onEmit }) => {
    const [description, setDescription] = useState('Prestação de Serviços de Entrega Logística Premium - Período Atual');
    const [razaoSocial, setRazaoSocial] = useState('LOGÍSTICA ELITE BRASIL LTDA');
    const [cnpj, setCnpj] = useState('12.345.678/0001-90');

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
        .gold-glow {
            box-shadow: 0 0 50px -10px rgba(212, 175, 55, 0.15);
        }
        .metallic-gold-text {
            background: linear-gradient(135deg, #F9E29C 0%, #D4AF37 50%, #AA771C 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .gold-pinstripe {
            border: 0.5px solid rgba(212, 175, 55, 0.3);
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
        .input-label {
            text-[10px] font-black text-[#D4AF37] tracking-[0.2em] uppercase mb-2 block text-left;
        }
        .charcoal-input {
            width: 100%;
            background: #121212;
            border: 0.5px solid rgba(212, 175, 55, 0.3);
            border-radius: 0.75rem;
            padding: 1rem;
            color: white;
            font-weight: 500;
        }
        .charcoal-input:focus {
            outline: none;
            border-color: rgba(212, 175, 55, 0.6);
            box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.3);
        }
      `}} />

            <div className="relative flex w-full flex-col overflow-x-hidden max-w-[430px] bg-black shadow-2xl ring-1 ring-white/5 pb-10 gold-glow">
                <div className="pt-4"></div>

                <div className="px-6 flex-1">
                    <header className="mb-10 mt-4 text-center">
                        <h1 className="text-xl font-black tracking-[0.25em] metallic-gold-text uppercase">EMISSÃO DE NOTA FISCAL</h1>
                        <p className="text-[9px] font-bold text-white/30 tracking-widest uppercase mt-2">NOTA FISCAL ELETRÔNICA DE SERVIÇO</p>
                    </header>

                    <div className="space-y-6">
                        <div className="group">
                            <label className="input-label">VALOR DA NOTA</label>
                            <div className="relative">
                                <input
                                    className="charcoal-input !border-[#D4AF37]/50 !bg-[#D4AF37]/5 text-lg font-bold"
                                    readOnly
                                    type="text"
                                    value={formatBRL(pendingBalance)}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <span className="text-[8px] font-black text-[#D4AF37] uppercase">AUTO-PREENCHIDO</span>
                                    <span className="material-symbols-outlined text-[#D4AF37] text-xs">check_circle</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="input-label">DESCRIÇÃO DOS SERVIÇOS</label>
                            <textarea
                                className="charcoal-input resize-none"
                                placeholder="Ex: Prestação de Serviços de Entrega"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="bg-[#121212] gold-pinstripe rounded-2xl p-5 space-y-4">
                            <label className="input-label !mb-0 text-left">DADOS DO TOMADOR</label>
                            <div className="space-y-4 pt-2">
                                <div>
                                    <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest mb-1 text-left">RAZÃO SOCIAL / NOME</p>
                                    <input
                                        className="w-full bg-transparent border-b border-white/10 pb-2 text-sm font-semibold focus:outline-none focus:border-[#D4AF37] text-white"
                                        type="text"
                                        value={razaoSocial}
                                        onChange={(e) => setRazaoSocial(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest mb-1 text-left">CNPJ / CPF</p>
                                    <input
                                        className="w-full bg-transparent border-b border-white/10 pb-2 text-sm font-semibold focus:outline-none focus:border-[#D4AF37] text-white"
                                        type="text"
                                        value={cnpj}
                                        onChange={(e) => setCnpj(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-2">
                            <span className="material-symbols-outlined text-[#D4AF37] text-sm">info</span>
                            <p className="text-[9px] font-medium text-white/40 leading-tight text-left">
                                Os impostos serão calculados automaticamente com base no seu regime tributário cadastrado.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-6 mt-10 space-y-6">
                    <button
                        onClick={handleEmit}
                        className="w-full btn-3d-gold text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined font-bold">receipt_long</span>
                        EMITIR NOTA FISCAL
                    </button>

                    <div className="flex flex-col items-center gap-4">
                        <a className="text-[10px] font-bold text-[#D4AF37]/80 hover:text-[#F9E29C] underline underline-offset-4 tracking-widest uppercase transition-colors" href="#">
                            Dúvidas sobre tributação?
                        </a>
                        <div className="flex items-center gap-2 opacity-20">
                            <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                            <span className="material-symbols-outlined text-[10px] text-[#D4AF37]">security</span>
                            <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EliteTaxInvoice;
