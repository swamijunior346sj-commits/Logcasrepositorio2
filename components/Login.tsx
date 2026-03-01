import React, { useState, useEffect } from 'react';
import { supabaseService } from '../services/supabaseService';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedEmail = localStorage.getItem('logcash_saved_email');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        await supabaseService.signUp(email, password);
        setError('Conta criada! Verifique seu e-mail.');
        setIsSignUp(false);
      } else {
        await supabaseService.signIn(email, password);
        localStorage.setItem('logcash_saved_email', email);

        // Trigger transition animation immediately, bypass animation delay
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-pure-black font-display text-white-text antialiased overflow-hidden flex items-center justify-center ${isAuthenticated ? 'state-authenticated' : ''}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
                
                @keyframes float-particle {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
                    50% { transform: translateY(-100px) translateX(20px); opacity: 0.5; }
                }
                @keyframes subtle-pulse {
                    0%, 100% { opacity: 0.15; transform: scale(1); }
                    50% { opacity: 0.25; transform: scale(1.1); }
                }
                @keyframes reveal-glow {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; filter: blur(20px); }
                    50% { opacity: 0.8; filter: blur(60px); }
                    100% { transform: translate(-50%, -50%) scale(4); opacity: 0; filter: blur(100px); }
                }
                .animate-particle {
                    animation: float-particle var(--duration) ease-in-out infinite;
                    animation-delay: var(--delay);
                }
                .animate-glow-idle {
                    animation: subtle-pulse 8s ease-in-out infinite;
                }
                .glass-input {
                    background: #121210;
                    border: 1px solid #2A2A26;
                    transition: all 0.3s ease;
                }
                .glass-input:focus-within {
                    border-color: #EBC051;
                    box-shadow: 0 0 15px rgba(235, 192, 81, 0.1);
                }
                .minimal-luxury-button {
                    background: transparent;
                    border: 1px solid #EBC051;
                    color: #EBC051;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    text-shadow: 0 0 10px rgba(235, 192, 81, 0.3);
                }
                .minimal-luxury-button:active {
                    transform: scale(0.95);
                    background: rgba(235, 192, 81, 0.1);
                }
                #login-form, #logo-container, #dashboard-content {
                    transition: all 0.8s cubic-bezier(0.65, 0, 0.35, 1);
                }
                .state-authenticated #login-form {
                    transform: translateY(100px);
                    opacity: 0;
                    pointer-events: none;
                }
                .state-authenticated #logo-container {
                    transform: translateY(-35vh) scale(0.6);
                }
                .state-authenticated #dashboard-content {
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: auto;
                    backdrop-filter: blur(12px);
                }
                .state-authenticated #central-glow {
                    animation: reveal-glow 1.2s forwards ease-out;
                }
                .state-authenticated #tagline {
                    opacity: 0;
                }
                .dashboard-card {
                    background: rgba(18, 18, 16, 0.6);
                    border: 1px solid rgba(42, 42, 38, 0.5);
                    backdrop-filter: blur(20px);
                }
                .font-display { font-family: 'Space Grotesk', sans-serif; }
                `
      }} />

      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="animate-particle absolute top-[20%] left-[15%] w-1 h-1 bg-primary-gold rounded-full" style={{ '--duration': '15s', '--delay': '0s' } as any}></div>
        <div className="animate-particle absolute top-[60%] left-[25%] w-1.5 h-1.5 bg-dark-gold rounded-full" style={{ '--duration': '22s', '--delay': '-5s' } as any}></div>
        <div className="animate-particle absolute top-[40%] right-[20%] w-1 h-1 bg-primary-gold rounded-full" style={{ '--duration': '18s', '--delay': '-2s' } as any}></div>
        <div className="animate-particle absolute bottom-[15%] left-[40%] w-0.5 h-0.5 bg-primary-gold rounded-full" style={{ '--duration': '25s', '--delay': '-10s' } as any}></div>
        <div className="animate-particle absolute bottom-[30%] right-[15%] w-1.5 h-1.5 bg-dark-gold rounded-full" style={{ '--duration': '20s', '--delay': '-7s' } as any}></div>
        <div className="animate-particle absolute top-[80%] left-[10%] w-1 h-1 bg-primary-gold rounded-full" style={{ '--duration': '17s', '--delay': '-3s' } as any}></div>
      </div>

      {/* Central Glow (Animated on Auth) */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-gold rounded-full opacity-0 pointer-events-none z-20`}
        id="central-glow"
      ></div>

      <main className="relative h-screen w-full flex flex-col items-center justify-center p-6 z-10">

        {/* Logo Section */}
        <div className="flex flex-col items-center gap-6 mb-16" id="logo-container">
          <div className="relative">
            <div className="animate-glow-idle absolute inset-0 bg-primary-gold/20 rounded-full blur-[80px] scale-[2.5]"></div>
            <div className="text-center space-y-2 relative z-10">
              <h1 className="text-5xl font-bold tracking-tight text-white-text font-display transition-all duration-700">
                LOG<span className="text-primary-gold">CASH</span>
              </h1>
              <p className="text-secondary-gray text-[11px] font-bold uppercase tracking-[0.5em] opacity-80 transition-opacity duration-500 font-display" id="tagline">
                {isSignUp ? 'Elite Access Request' : 'Refined Delivery Excellence'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div
          className={`w-full max-w-[400px] space-y-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          id="login-form"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: error.includes('criada') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)',
                  border: error.includes('criada') ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(239,68,68,0.15)',
                  color: error.includes('criada') ? '#34d399' : '#f87171',
                }}>
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex items-center glass-input rounded-2xl px-4 py-1 group">
                <span className="material-symbols-outlined text-secondary-gray text-xl group-focus-within:text-primary-gold transition-colors">person</span>
                <input
                  className="bg-transparent border-none focus:ring-0 w-full text-white-text placeholder:text-secondary-gray py-4 px-3 text-sm font-medium focus:outline-none"
                  placeholder="E-mail ou Usuário"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center glass-input rounded-2xl px-4 py-1 group">
                <span className="material-symbols-outlined text-secondary-gray text-xl group-focus-within:text-primary-gold transition-colors">lock</span>
                <input
                  className="bg-transparent border-none focus:ring-0 w-full text-white-text placeholder:text-secondary-gray py-4 px-3 text-sm font-medium focus:outline-none"
                  placeholder="Senha de Acesso"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="material-symbols-outlined text-secondary-gray text-xl cursor-pointer hover:text-primary-gold transition-colors"
                >
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end px-1">
                <button type="button" className="text-xs text-secondary-gray hover:text-primary-gold transition-colors font-medium">
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || isAuthenticated}
              className={`w-full minimal-luxury-button py-4 rounded-2xl font-bold text-sm tracking-[0.2em] h-[58px] flex items-center justify-center uppercase active:scale-95 transition-all disabled:opacity-50`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-gold/30 border-t-primary-gold rounded-full animate-spin"></div>
              ) : (
                isSignUp ? 'Solicitar Acesso' : 'ENTRAR'
              )}
            </button>
          </form>

          <div className="pt-8 text-center">
            <p className="text-secondary-gray text-xs font-medium tracking-wide">
              {isSignUp ? 'Já possui acesso?' : 'Novo por aqui?'}
              <span
                onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                className="text-primary-gold font-bold ml-1 cursor-pointer border-b border-primary-gold/30 hover:brightness-110 transition-all font-display"
              >
                {isSignUp ? 'Fazer Login' : 'Solicitar Acesso'}
              </span>
            </p>
          </div>
        </div>

        {/* Dashboard Transition Content (Placeholder) */}
        <div
          className="absolute inset-x-0 pt-32 px-6 flex flex-col gap-6 opacity-0 translate-y-12 pointer-events-none"
          id="dashboard-content"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-secondary-gray text-[10px] uppercase tracking-widest font-bold">Patrimônio Total</p>
              <h2 className="text-2xl font-bold text-white-text font-display">R$ 1.240.500,00</h2>
            </div>
            <div className="w-10 h-10 rounded-full border border-primary-gold/30 flex items-center justify-center bg-[#121210]">
              <span className="material-symbols-outlined text-primary-gold text-xl">notifications</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="dashboard-card p-5 rounded-3xl">
              <span className="material-symbols-outlined text-primary-gold mb-3">trending_up</span>
              <p className="text-secondary-gray text-[10px] uppercase font-bold tracking-tighter">Ganhos Mensais</p>
              <p className="text-lg font-bold text-white-text font-display">+14.2%</p>
            </div>
            <div className="dashboard-card p-5 rounded-3xl">
              <span className="material-symbols-outlined text-primary-gold mb-3">account_balance_wallet</span>
              <p className="text-secondary-gray text-[10px] uppercase font-bold tracking-tighter">Disponível</p>
              <p className="text-lg font-bold text-white-text font-display">R$ 82.3k</p>
            </div>
          </div>

          <div className="dashboard-card p-6 rounded-3xl flex-1 flex flex-col justify-between overflow-hidden relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white-text font-bold text-lg font-display">Operações Ativas</h3>
                <p className="text-secondary-gray text-xs">Acompanhamento em tempo real</p>
              </div>
              <div className="bg-primary-gold/10 px-3 py-1 rounded-full border border-primary-gold/20">
                <span className="text-primary-gold text-[10px] font-bold uppercase">Ao Vivo</span>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary-gold/5 border border-primary-gold/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-gold text-sm">rocket_launch</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Logistics Alpha</p>
                    <p className="text-[10px] text-secondary-gray">Em trânsito • SP/RJ</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-primary-gold">R$ 12.4k</p>
              </div>
            </div>

            <button className="w-full bg-primary-gold text-pure-black font-bold py-3.5 rounded-2xl text-[10px] tracking-widest mt-6 uppercase">
              Nova Operação
            </button>
          </div>
        </div>
      </main>

      {/* Hidden Images for caching */}
      <div className="hidden">
        <img alt="Ref" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWyPINr-NDKzNXBa9r9slqhCy0POXMVqjFZY3nsNNgVRdeUNBthVVB1YmCboPAOvg2G3BcSPgAiwu8y5lY5k71k5QXelHQENfQekirYoQv9NwB2N-KUt9f_zySG-K5BV64y6I5L6TEcZjAM8KsmEGmBU9irK77juhequFEpwCIXbyzJcFyB15nwTh3VID0kyxJI5eBvscOt5xUe9hQEnSJdqnWnN5eL2_6B1Sc3eAa1-vjEwEVXfWgTnmdjrpf4VRf69mOaJ4B_lKI" />
        <img alt="Ref" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOQKUG-2AsjpZuFj8cDHqGFta1HLkTKgIpr3twLe9_SSD7gdWvteWS2FajZfKPa99y619NhxGDbNVsisnp10PQ_bbLuqJsmLPeXgxh0egG1O6blqFBmrIGP00pIsVHNfG6sajc8CT79pMox2vzHWHkAq9O8OhrchKRAFliBegVxOVvbStzfEZXYWhRV-i93xKAW3YfO97LgzbQCYg0ktuElD5etFmF9w1E80W4YthLQff9OC1mDTv9PSPuKQd-2zISPB_FS-1jsOL_" />
      </div>
    </div>
  );
};

export default Login;
