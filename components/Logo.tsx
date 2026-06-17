
import React from 'react';

export const LogCashLogo: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"
  >
    {/* Círculo Principal com Gradiente */}
    <circle cx="50" cy="50" r="48" stroke="url(#logo_grad)" strokeWidth="4" />
    
    {/* Barras de Gráfico */}
    <rect x="35" y="60" width="8" height="15" rx="2" fill="#1e293b" />
    <rect x="45" y="52" width="8" height="23" rx="2" fill="#1e293b" />
    
    {/* Cifrão */}
    <text x="60" y="75" fontFamily="Arial" fontSize="32" fontWeight="900" fill="#1e293b">$</text>
    
    {/* Caixas 3D (Simbolizadas) */}
    <path d="M35 30L45 25L55 30L45 35L35 30Z" fill="#1e293b" />
    <path d="M35 30V40L45 45V35L35 30Z" fill="#334155" />
    <path d="M45 45L55 40V30L45 35V45Z" fill="#475569" />
    
    <path d="M55 20L60 17.5L65 20L60 22.5L55 20Z" fill="#1e293b" />
    <path d="M55 20V25L60 27.5V22.5L55 20Z" fill="#334155" />
    <path d="M60 27.5L65 25V20L60 22.5V27.5Z" fill="#475569" />

    {/* Seta Ascendente Verde */}
    <path 
      d="M30 75L45 55L55 65L75 35M75 35H65M75 35V45" 
      stroke="#10b981" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />

    <defs>
      <linearGradient id="logo_grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e293b" />
        <stop offset="1" stopColor="#10b981" />
      </linearGradient>
    </defs>
  </svg>
);
