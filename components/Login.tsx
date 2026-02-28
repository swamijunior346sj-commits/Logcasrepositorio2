import React, { useState, useEffect, useRef } from 'react';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedEmail = localStorage.getItem('logcash_saved_email');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // Animated golden particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number; r: number; speed: number; opacity: number; drift: number;
    }

    const particles: Particle[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.4 + 0.15,
      opacity: Math.random() * 0.35 + 0.05,
      drift: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 192, 81, ${p.opacity})`;
        ctx.fill();

        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
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
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center">
      {/* === BACKGROUND LAYERS === */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Carbon pattern overlay */}
      <div className="fixed inset-0 carbon-texture opacity-30 pointer-events-none z-[1]" />

      {/* Ambient gold glow top-right */}
      <div className="fixed -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, rgba(235,192,81,0.08) 0%, transparent 70%)' }} />
      {/* Ambient gold glow bottom-left */}
      <div className="fixed -bottom-40 -left-40 w-96 h-96 rounded-full pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, rgba(184,143,53,0.06) 0%, transparent 70%)' }} />

      {/* === MAIN CARD === */}
      <div className={`relative z-10 w-full max-w-[400px] mx-4 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Glass card container */}
        <div className="relative rounded-[28px] overflow-hidden"
          style={{
            background: 'linear-gradient(165deg, rgba(18,18,16,0.95) 0%, rgba(0,0,0,0.98) 100%)',
            border: '1px solid rgba(235,192,81,0.12)',
            boxShadow: '0 30px 80px -10px rgba(0,0,0,0.9), 0 0 60px -15px rgba(235,192,81,0.08)',
          }}>

          {/* Top gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(235,192,81,0.4), transparent)' }} />

          {/* Inner content */}
          <div className="px-8 pt-12 pb-10">

            {/* ──── LOGO SECTION ──── */}
            <div className="flex flex-col items-center mb-10">
              {/* Icon with glow ring */}
              <div className="relative mb-5">
                <div className="absolute inset-0 rounded-full animate-pulse"
                  style={{ background: 'radial-gradient(circle, rgba(235,192,81,0.15) 0%, transparent 70%)', transform: 'scale(2.5)' }} />
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(145deg, rgba(235,192,81,0.15) 0%, rgba(18,18,16,1) 100%)',
                    border: '1px solid rgba(235,192,81,0.25)',
                    boxShadow: '0 0 40px rgba(235,192,81,0.1)',
                  }}>
                  <span className="material-symbols-outlined text-5xl"
                    style={{
                      fontVariationSettings: "'FILL' 1, 'wght' 300",
                      background: 'linear-gradient(135deg, #F9E29C, #EBC051, #B88F35)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>payments</span>
                </div>
              </div>

              {/* Brand name */}
              <h1 className="text-[32px] font-bold tracking-tight mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="text-white">LOG</span>
                <span style={{
                  background: 'linear-gradient(135deg, #F9E29C, #EBC051, #B88F35)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>CASH</span>
              </h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.45em]"
                style={{ color: 'rgba(235,192,81,0.5)' }}>
                {isSignUp ? 'Crie sua Conta Elite' : 'Inteligência em Entregas'}
              </p>
            </div>

            {/* ──── FORM ──── */}
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

              {/* Email input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  E-mail ou Usuário
                </label>
                <div className="flex items-center rounded-2xl px-4 group transition-all duration-300"
                  style={{
                    background: '#0a0a0a',
                    border: '1px solid rgba(235,192,81,0.12)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(235,192,81,0.4)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(235,192,81,0.06)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(235,192,81,0.12)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                  <span className="material-symbols-outlined text-lg transition-colors duration-300"
                    style={{ color: 'rgba(122,122,122,0.7)', fontVariationSettings: "'wght' 300" }}>
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="motorista@logcash.app"
                    className="w-full bg-transparent border-none focus:ring-0 focus:outline-none py-4 px-3 text-sm font-medium text-white placeholder:text-white/15"
                  />
                </div>
              </div>

              {/* Password input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Senha de Acesso
                </label>
                <div className="flex items-center rounded-2xl px-4 group transition-all duration-300"
                  style={{
                    background: '#0a0a0a',
                    border: '1px solid rgba(235,192,81,0.12)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(235,192,81,0.4)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(235,192,81,0.06)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(235,192,81,0.12)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                  <span className="material-symbols-outlined text-lg transition-colors duration-300"
                    style={{ color: 'rgba(122,122,122,0.7)', fontVariationSettings: "'wght' 300" }}>
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-none focus:ring-0 focus:outline-none py-4 px-3 text-sm font-medium text-white placeholder:text-white/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex-shrink-0 transition-colors duration-300 hover:text-primary-gold"
                    style={{ color: 'rgba(122,122,122,0.5)' }}>
                    <span className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'wght' 300" }}>
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              {!isSignUp && (
                <div className="flex justify-end pt-0.5">
                  <a href="#" className="text-[11px] font-medium transition-colors duration-300 hover:text-primary-gold"
                    style={{ color: 'rgba(122,122,122,0.7)' }}>
                    Esqueceu a senha?
                  </a>
                </div>
              )}

              {/* ──── SUBMIT BUTTON ──── */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[56px] rounded-2xl font-bold text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.97] disabled:opacity-50 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #EBC051 0%, #B88F35 100%)',
                    color: '#000',
                    boxShadow: '0 8px 30px -4px rgba(235,192,81,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}>
                  {/* Shine sweep effect */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                      animation: 'shine-sweep 3s ease-in-out infinite',
                    }} />
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <span className="relative z-10">{isSignUp ? 'Criar Conta' : 'Entrar'}</span>
                  )}
                </button>
              </div>
            </form>

            {/* ──── DIVIDER + BIOMETRICS ──── */}
            {!isSignUp && (
              <div className="mt-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-1 h-[1px]" style={{ background: 'rgba(42,42,38,0.8)' }} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]"
                    style={{ color: 'rgba(122,122,122,0.5)' }}>
                    acesso rápido
                  </span>
                  <div className="flex-1 h-[1px]" style={{ background: 'rgba(42,42,38,0.8)' }} />
                </div>
                <div className="flex justify-center gap-4">
                  {[
                    { icon: 'face', label: 'Face ID' },
                    { icon: 'fingerprint', label: 'Digital' },
                  ].map((item) => (
                    <button key={item.icon} type="button"
                      className="w-[72px] h-[72px] rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-90 hover:border-primary-gold/40"
                      style={{
                        background: 'rgba(18,18,16,0.8)',
                        border: '1px solid rgba(42,42,38,0.8)',
                      }}>
                      <span className="material-symbols-outlined text-3xl"
                        style={{
                          fontVariationSettings: "'wght' 200",
                          color: '#EBC051',
                        }}>{item.icon}</span>
                      <span className="text-[8px] font-bold uppercase tracking-wider"
                        style={{ color: 'rgba(122,122,122,0.5)' }}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ──── FOOTER TOGGLE ──── */}
            <div className="mt-8 text-center">
              <p className="text-xs font-medium" style={{ color: 'rgba(122,122,122,0.6)' }}>
                {isSignUp ? 'Já possui acesso?' : 'Novo na plataforma?'}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                  className="ml-1.5 font-bold transition-colors duration-300 hover:brightness-125"
                  style={{
                    color: '#EBC051',
                    borderBottom: '1px solid rgba(235,192,81,0.3)',
                    paddingBottom: 1,
                  }}>
                  {isSignUp ? 'Fazer Login' : 'Solicitar Acesso'}
                </button>
              </p>
            </div>
          </div>

          {/* Bottom gold accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(235,192,81,0.2), transparent)' }} />
        </div>

        {/* Subtle bottom brand */}
        <p className="text-center mt-6 text-[9px] font-bold uppercase tracking-[0.4em]"
          style={{ color: 'rgba(122,122,122,0.2)' }}>
          © 2026 LogCash Elite
        </p>
      </div>
    </div>
  );
};

export default Login;
