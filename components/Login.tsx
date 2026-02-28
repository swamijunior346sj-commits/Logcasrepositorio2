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

  useEffect(() => {
    const savedEmail = localStorage.getItem('logcash_saved_email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await supabaseService.signUp(email, password);
        setError("Conta criada! Verifique seu e-mail.");
        setIsSignUp(false);
      } else {
        await supabaseService.signIn(email, password);
        localStorage.setItem('logcash_saved_email', email);
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Erro na autenticação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pitch-black text-white antialiased">
      <div className="floating-particles">
        <div className="particle w-1 h-1" style={{ left: '10%', animationDelay: '0s' }}></div>
        <div className="particle w-1.5 h-1.5" style={{ left: '25%', animationDelay: '4s' }}></div>
        <div className="particle w-1 h-1" style={{ left: '45%', animationDelay: '8s' }}></div>
        <div className="particle w-2 h-2" style={{ left: '70%', animationDelay: '2s' }}></div>
        <div className="particle w-1 h-1" style={{ left: '85%', animationDelay: '12s' }}></div>
      </div>

      <div className="relative flex min-h-[max(884px,100dvh)] w-full flex-col overflow-hidden max-w-[430px] bg-pitch-black shadow-2xl z-10">
        <div className="flex flex-col items-center justify-center pt-24 pb-12">
          <div className="gold-glow mb-6">
            <div className="flex items-center gap-1.5">
              <div className="size-16 rounded-2xl metallic-3d-gold flex items-center justify-center p-0.5">
                <div className="bg-black size-full rounded-[14px] flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary-gold" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl logcash-logo-font metallic-text-gold tracking-tight">LogCash</h1>
          <p className="text-[10px] text-primary-gold font-bold tracking-[0.5em] mt-3 uppercase">Elite Luxo</p>
        </div>

        <div className="flex-1 px-8 space-y-6 flex flex-col">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] md:text-xs py-3 px-4 rounded-xl text-center font-bold uppercase tracking-wider">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">E-mail ou CPF</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input h-14 px-5 rounded-xl text-white placeholder:text-white/20 font-medium"
                placeholder="exemplo@logcash.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass-input h-14 px-5 rounded-xl text-white placeholder:text-white/20 font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary-gold transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              {!isSignUp && (
                <a href="#" className="text-[11px] font-bold text-white/60 hover:text-primary-gold transition-colors tracking-tight">Esqueci minha senha</a>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 metallic-3d-gold rounded-xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="text-black font-black text-sm tracking-[0.15em] uppercase">
                      {isSignUp ? "Registrar na Elite" : "Entrar na Elite"}
                    </span>
                    <span className="material-symbols-outlined text-black text-xl">arrow_forward_ios</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="pb-16 px-8 text-center relative mt-auto">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[12px] font-medium text-white/40 hover:text-white/80 transition-colors z-20 relative cursor-pointer"
          >
            {isSignUp ? "Já sou motorista Elite? " : "Ainda não sou motorista Elite? "}
            <span className="text-primary-gold font-black underline underline-offset-4 decoration-primary-gold/30">
              {isSignUp ? "Entrar" : "Cadastre-se"}
            </span>
          </button>
          <div className="absolute bottom-0 left-0 w-full h-40 carbon-texture -z-10 pointer-events-none"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-gold/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-gold/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default Login;
