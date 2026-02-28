
import React from 'react';

interface EliteMapProps {
    onBack: () => void;
}

const EliteMap: React.FC<EliteMapProps> = ({ onBack }) => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-black animate-in fade-in duration-700 pb-0 overflow-hidden relative">
            <style dangerouslySetInnerHTML={{
                __html: `
        .glass-card {
            background: rgba(26, 26, 26, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(212, 185, 13, 0.2);
        }
        .gold-gradient {
            background: linear-gradient(135deg, #f2b90d 0%, #b8860b 100%);
        }
        .map-overlay {
            background: radial-gradient(circle at center, transparent 0%, #0a0a0a 90%);
        }
        @keyframes pulse-gold {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.5); opacity: 0.1; }
        }
        .animate-pulse-gold {
            animation: pulse-gold 2s infinite ease-in-out;
        }
      `}} />

            <div className="relative flex h-screen w-full flex-col max-w-[430px] mx-auto overflow-hidden shadow-2xl bg-background-dark">
                {/* Header / Status Bar Area - Internal Header for Map Info */}
                <div className="absolute top-0 left-0 w-full z-20 px-6 pt-12 pb-6 bg-gradient-to-b from-black to-transparent">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={onBack}
                            className="flex items-center justify-center size-10 rounded-full bg-[#1a1a1a]/80 border border-[#f2b90d]/20 text-[#f2b90d] active:scale-95 transition-all"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <div className="flex flex-col items-center">
                            <h2 className="text-[#f2b90d] text-xl font-extrabold tracking-tight">8 min • 2.4 km</h2>
                            <span className="text-[#f2b90d]/60 text-[10px] font-bold uppercase tracking-widest leading-none">Navegação Elite</span>
                        </div>
                        <button className="flex items-center justify-center size-10 rounded-full bg-[#1a1a1a]/80 border border-[#f2b90d]/20 text-[#f2b90d]">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                </div>

                {/* Main Map Area */}
                <div className="flex-1 relative bg-black">
                    {/* Simulated Dark Map */}
                    <div
                        className="absolute inset-0 z-0 bg-[#1a1a1a]"
                        style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGr4VElCygQuMDbGIj20QIgc5xWi0GgeZrT8mchIMGXhj7XzqXafWrQVXDnStFu1G7STgqv4xlM2TgnUJj3arQqXNXkTFKHB2C0SvWt91DL_60EwaLrxFkWllGspx9YtVKDsihaWc4j73T0DBmHKBPeBU26pKUxxKRU50pYKFGT2Y47jZqDvtwU2RDVLqrmF5wB2hnm-YiPw1hGJx_nhxcFFu_DTR9CQ96Hb_iAZSXId9Wiyt_DiCPpohQuDFE7KEQEzUyBjXbPN6J")',
                            backgroundSize: 'cover',
                            filter: 'grayscale(1) brightness(0.4) contrast(1.2)'
                        }}
                    ></div>

                    {/* Navigation Elements Layer */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {/* Route Line */}
                        <svg className="absolute inset-0 w-full h-full opacity-60">
                            <path
                                className="drop-shadow-[0_0_8px_rgba(242,185,13,0.8)]"
                                d="M200 800 L200 500 L100 400 L100 200"
                                fill="transparent"
                                stroke="#f2b90d"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="4"
                            ></path>
                        </svg>

                        {/* Current Location Pulse */}
                        <div className="absolute top-[500px] left-[200px] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute size-12 rounded-full bg-[#f2b90d]/40 animate-pulse-gold"></div>
                                <div className="relative flex items-center justify-center text-[#f2b90d] transform -rotate-45">
                                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>navigation</span>
                                </div>
                            </div>
                        </div>

                        {/* Destination Pin */}
                        <div className="absolute top-[200px] left-[100px] -translate-x-1/2 -translate-y-full">
                            <div className="flex flex-col items-center">
                                <div className="size-8 gold-gradient rounded-full flex items-center justify-center shadow-lg shadow-[#f2b90d]/40">
                                    <span className="material-symbols-outlined text-[#0a0a0a] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                                </div>
                                <div className="w-1 h-3 bg-[#f2b90d]/60"></div>
                            </div>
                        </div>
                    </div>

                    {/* Map UI Controls */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
                        <button className="flex size-12 items-center justify-center rounded-full glass-card text-[#f2b90d] active:scale-95 transition-all">
                            <span className="material-symbols-outlined font-bold">add</span>
                        </button>
                        <button className="flex size-12 items-center justify-center rounded-full glass-card text-[#f2b90d] active:scale-95 transition-all">
                            <span className="material-symbols-outlined font-bold">remove</span>
                        </button>
                        <button className="flex size-12 items-center justify-center rounded-full glass-card text-[#f2b90d] active:scale-95 transition-all">
                            <span className="material-symbols-outlined font-bold">my_location</span>
                        </button>
                    </div>
                </div>

                {/* Floating Glassmorphism Footer Card */}
                <div className="absolute bottom-12 left-0 w-full p-6 z-30">
                    <div className="glass-card rounded-[2.5rem] p-7 flex flex-col gap-6 shadow-2xl border border-[#f2b90d]/30">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1 text-left">
                                <p className="text-[#f2b90d] text-[10px] font-black uppercase tracking-widest opacity-80">Próxima Parada</p>
                                <h3 className="text-white text-lg font-black tracking-tight">Rua das Flores, 123</h3>
                                <p className="text-[#f2b90d]/60 text-xs font-bold">Previsão: 14:45 • Tempo: 8 min</p>
                            </div>
                            {/* Go Button */}
                            <button className="gold-gradient text-black size-16 rounded-3xl flex items-center justify-center font-black text-lg shadow-xl shadow-[#f2b90d]/20 hover:scale-105 transition-all active:scale-95">
                                GO
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-black/40 rounded-2xl p-4 border border-white/5 text-left">
                                <p className="text-[#f2b90d]/40 text-[9px] font-black uppercase tracking-wider">Trânsito</p>
                                <p className="text-white text-sm font-bold tracking-tight">Leve</p>
                            </div>
                            <div className="flex-1 bg-black/40 rounded-2xl p-4 border border-white/5 text-left">
                                <p className="text-[#f2b90d]/40 text-[9px] font-black uppercase tracking-wider">Distância</p>
                                <p className="text-white text-sm font-bold tracking-tight">2.4 km</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EliteMap;
