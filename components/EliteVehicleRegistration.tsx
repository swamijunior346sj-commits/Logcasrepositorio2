import React, { useState } from 'react';

interface EliteVehicleRegistrationProps {
    onBack?: () => void;
    onSave?: (vehicleModel: string, licensePlate: string) => void;
}

const EliteVehicleRegistration: React.FC<EliteVehicleRegistrationProps> = ({ onBack, onSave }) => {
    const [model, setModel] = useState('Sprinter Executiva');
    const [plate, setPlate] = useState('LUX-2024');
    const [color, setColor] = useState('Preto Metalizado');
    const [renavam, setRenavam] = useState('12345678901');
    const [year, setYear] = useState('2024/2025');
    const [capacity, setCapacity] = useState('1500');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSave = () => {
        setShowSuccess(true);
    };

    const handleConfirmSuccess = () => {
        setShowSuccess(false);
        if (onSave) onSave(model, plate);
    };

    return (
        <div className="flex justify-center items-start min-h-screen animate-in fade-in duration-700">
            <style dangerouslySetInnerHTML={{
                __html: `
                .pinstripe-grid {
                    border-top: 0.3px solid rgba(235, 192, 81, 0.15);
                }
                .pinstripe-cell {
                    border-bottom: 0.3px solid rgba(235, 192, 81, 0.15);
                    border-right: 0.3px solid rgba(235, 192, 81, 0.15);
                }
                .pinstripe-cell:nth-child(2n) {
                    border-right: none;
                }
                .ultra-thin-border {
                    border: 0.3px solid #EBC051;
                }
                .gold-text-glow {
                    text-shadow: 0 0 15px rgba(235, 192, 81, 0.1);
                }
                .technical-input::placeholder {
                    color: rgba(255, 255, 255, 0.15);
                    font-weight: 200;
                }
                .technical-label {
                    font-size: 9px;
                    font-weight: bold;
                    color: #EBC051;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                    margin-bottom: 0.375rem;
                    display: block;
                    opacity: 0.8;
                }
                .technical-input {
                    background: transparent;
                    border: none;
                    padding: 0;
                    color: white;
                    font-weight: 300;
                    width: 100%;
                    font-size: 13px;
                    letter-spacing: -0.025em;
                }
                .technical-input:focus {
                    outline: none;
                    box-shadow: none;
                }

                /* MODAL CONFIRMACAO */
                .glass-overlay {
                    background: rgba(0, 0, 0, 0.92);
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                }
                .modal-border-only {
                    background: transparent;
                    border: 1px solid #EBC051;
                    box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(235, 192, 81, 0.05);
                }
                .gold-glow {
                    text-shadow: 0 0 30px rgba(235, 192, 81, 0.6);
                }
                .outline-button-gold {
                    background: transparent;
                    border: 1px solid #EBC051;
                }
                .outline-button-gold:active {
                    background: rgba(235, 192, 81, 0.1);
                    transform: scale(0.97);
                }
                @keyframes pulse-gold {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }
                .animate-pulse-gold {
                    animation: pulse-gold 3s ease-in-out infinite;
                }
                `
            }} />

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] bg-pitch-black shadow-2xl">
                {/* Header Removido */}

                <div className="flex-grow pt-4">
                    <div className="grid grid-cols-2 pinstripe-grid">
                        <div className="pinstripe-cell p-5 col-span-2">
                            <label className="technical-label">Modelo do Veículo</label>
                            <div className="flex items-center">
                                <input className="technical-input" placeholder="Ex: Van Executiva" type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                                <span className="material-symbols-outlined text-primary-gold/40 text-[18px]">minor_crash</span>
                            </div>
                        </div>
                        <div className="pinstripe-cell p-5">
                            <label className="technical-label">Placa</label>
                            <input className="technical-input" placeholder="AAA-0000" type="text" value={plate} onChange={(e) => setPlate(e.target.value)} />
                        </div>
                        <div className="pinstripe-cell p-5">
                            <label className="technical-label">Cor Predominante</label>
                            <input className="technical-input" placeholder="Ex: Preto Obsidian" type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                        </div>
                        <div className="pinstripe-cell p-5">
                            <label className="technical-label">RENAVAM</label>
                            <input className="technical-input" placeholder="00000000000" type="text" value={renavam} onChange={(e) => setRenavam(e.target.value)} />
                        </div>
                        <div className="pinstripe-cell p-5">
                            <label className="technical-label">Ano / Modelo</label>
                            <input className="technical-input" placeholder="2024/2024" type="text" value={year} onChange={(e) => setYear(e.target.value)} />
                        </div>
                        <div className="pinstripe-cell p-5">
                            <label className="technical-label">Capacidade Carga (kg)</label>
                            <input className="technical-input" placeholder="0.000" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                        </div>
                        <div className="pinstripe-cell p-5 cursor-pointer">
                            <label className="technical-label">Categoria</label>
                            <div className="flex items-center justify-between">
                                <span className="text-[13px] font-light text-white">Executivo Gold</span>
                                <span className="material-symbols-outlined text-primary-gold/40 text-[16px]">expand_margin</span>
                            </div>
                        </div>
                        <div className="pinstripe-cell p-5 col-span-2 flex items-center justify-between bg-primary-gold/[0.02]">
                            <div>
                                <label className="technical-label">Status do Certificado</label>
                                <p className="text-[11px] text-white/60 font-medium italic">Documentação técnica em conformidade</p>
                            </div>
                            <span className="material-symbols-outlined text-primary-gold text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                        </div>
                    </div>
                </div>

                <div className="px-8 pt-12 pb-10 mt-auto">
                    <button onClick={handleSave} className="w-full ultra-thin-border rounded-full h-[54px] font-bold text-[11px] uppercase tracking-[0.4em] text-primary-gold active:bg-primary-gold/10 transition-all duration-300">
                        Finalizar Cadastro
                    </button>
                </div>

                <div className="pb-4 flex justify-center">
                    <div className="w-32 h-1 bg-white/10 rounded-full"></div>
                </div>

                {/* MODAL SUCCESS */}
                {showSuccess && (
                    <div className="fixed inset-0 z-[100] glass-overlay flex items-center justify-center px-8">
                        <div className="w-full max-w-[340px] modal-border-only rounded-[40px] overflow-hidden">
                            <div className="p-10 text-center">
                                <div className="relative size-24 mx-auto mb-8 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#EBC051]/15 blur-3xl rounded-full"></div>
                                    <div className="relative flex items-center justify-center animate-pulse-gold">
                                        <span className="material-symbols-outlined text-[#EBC051] text-[84px] leading-none gold-glow" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}>
                                            check_circle
                                        </span>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-black tracking-[0.2em] text-white uppercase mb-3">CONFIRMADO</h2>
                                <p className="text-white/50 text-sm font-medium mb-12 leading-relaxed">
                                    Operação realizada com sucesso
                                </p>
                                <button onClick={handleConfirmSuccess} className="w-full py-4 outline-button-gold rounded-[20px] flex items-center justify-center text-[#EBC051] font-bold uppercase tracking-[0.25em] text-[10px] transition-all duration-300">
                                    ENTENDIDO
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EliteVehicleRegistration;
