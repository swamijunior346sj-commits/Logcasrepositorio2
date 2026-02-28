
import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, Check } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';
import { LogCashLogo } from './Logo';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('logcash_saved_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
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
        if (rememberMe) {
          localStorage.setItem('logcash_saved_email', email);
        } else {
          localStorage.removeItem('logcash_saved_email');
        }
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Erro na autenticação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-72 md:h-72 bg-emerald-600/10 rounded-full blur-[100px] md:blur-[120px]"></div>

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-black/60 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl relative">

          <div className="flex flex-col items-center mb-8 md:mb-10">
            <div className="mb-6">
              <LogCashLogo size={80} />
            </div>
            <h1 className="text-3xl md:text-4xl font-game font-black text-white tracking-[0.2em] uppercase leading-none">
              LOG<span className="text-emerald-400">CASH</span>
            </h1>
            <p className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] mt-3">Intelligence & Results</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] md:text-xs py-3 px-4 rounded-xl text-center font-bold uppercase tracking-wider">
                {error}
              </div>
            )}

            <div className="space-y-3 md:space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="E-mail"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder="Senha"
                />
              </div>
            </div>

            <div className="flex items-center px-1">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className={`w-5 h-5 md:w-6 md:h-6 rounded-lg border-2 transition-all flex items-center justify-center ${rememberMe ? 'bg-emerald-600 border-emerald-600' : 'border-white/10 bg-white/5'}`}>
                  {rememberMe && <Check size={12} className="text-white" />}
                </div>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Lembrar acesso
                </span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-game font-black text-base md:text-lg py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 shadow-xl active:scale-95 uppercase tracking-widest border border-emerald-400/20 transition-all"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>{isSignUp ? "Registrar" : "Entrar Agora"} <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-6 md:mt-8 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-slate-500 hover:text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              {isSignUp ? "Já tenho uma conta" : "Não tem conta? Cadastre-se"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
