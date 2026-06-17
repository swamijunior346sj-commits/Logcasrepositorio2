import React from 'react';
import { LogEntry } from '../types';

interface NexusDashboardProps {
  counts: {
    todayEntrada: number;
    todaySaida: number;
    todayDevolucao: number;
  };
  onAction: (type: 'ENTRADA' | 'SAIDA') => void;
  logs: LogEntry[];
  isSyncing: boolean;
}

const NexusDashboard: React.FC<NexusDashboardProps> = ({ counts, onAction, logs, isSyncing }) => {
  // Calculate percentages for progress bars (assuming a target or just visual representation)
  // For now, we'll use arbitrary max values or just visual scaling
  const maxLoad = Math.max(counts.todayEntrada, 100); 
  const loadPercent = Math.min((counts.todayEntrada / maxLoad) * 100, 100);
  
  const maxDeliver = Math.max(counts.todayEntrada, 1); // Avoid div by zero
  const deliverPercent = Math.min((counts.todaySaida / maxDeliver) * 100, 100);
  
  const failurePercent = Math.min((counts.todayDevolucao / maxDeliver) * 100, 100);

  // Recent Activity - Get last 5 logs
  const recentLogs = logs.slice(0, 5);

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'ENTRADA': return 'inventory';
      case 'SAIDA': return 'task_alt';
      case 'DEVOLUCAO': return 'error';
      default: return 'info';
    }
  };

  const getLogTitle = (type: string) => {
    switch (type) {
      case 'ENTRADA': return 'Shipment Loaded';
      case 'SAIDA': return 'Package Delivered';
      case 'DEVOLUCAO': return 'Delivery Failure';
      default: return 'System Event';
    }
  };

  const getLogDesc = (type: string) => {
    switch (type) {
      case 'ENTRADA': return 'Carrier Unit - Hub Prime';
      case 'SAIDA': return 'Zone 7 - Sector G-4';
      case 'DEVOLUCAO': return 'Return to Base';
      default: return 'Log Entry';
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Loaded Card */}
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-[#0a0a0a] border border-[#0d7ff2]/20 shadow-[0_0_15px_rgba(13,127,242,0.4)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-5xl text-white">package_2</span>
          </div>
          <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Loaded</p>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-100 tracking-tighter text-4xl font-bold">{counts.todayEntrada}</p>
            <p className="text-[#0d7ff2] text-sm font-medium">+12%</p>
          </div>
          <div className="w-full bg-[#0d7ff2]/10 h-1 mt-2 rounded-full overflow-hidden">
            <div className="bg-[#0d7ff2] h-full rounded-full" style={{ width: `${loadPercent}%` }}></div>
          </div>
        </div>

        {/* Delivered Card */}
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-[#0a0a0a] border border-[#0d7ff2]/20 shadow-[0_0_15px_rgba(13,127,242,0.4)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-5xl text-white">local_shipping</span>
          </div>
          <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Delivered</p>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-100 tracking-tighter text-4xl font-bold">{counts.todaySaida}</p>
            <p className="text-[#0d7ff2] text-sm font-medium">+8%</p>
          </div>
          <div className="w-full bg-[#0d7ff2]/10 h-1 mt-2 rounded-full overflow-hidden">
            <div className="bg-[#0d7ff2] h-full rounded-full" style={{ width: `${deliverPercent}%` }}></div>
          </div>
        </div>

        {/* Failures Card */}
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-[#0a0a0a] border border-red-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-5xl text-white">error</span>
          </div>
          <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Failures</p>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-100 tracking-tighter text-4xl font-bold">{counts.todayDevolucao}</p>
            <p className="text-red-500 text-sm font-medium">-2%</p>
          </div>
          <div className="w-full bg-red-500/10 h-1 mt-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full rounded-full" style={{ width: `${failurePercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-[#0d7ff2] text-xs font-bold leading-tight tracking-[0.3em] uppercase mb-4 px-1">Tactical Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={() => onAction('ENTRADA')}
            className="flex items-center justify-center gap-3 rounded-xl h-14 bg-[#0d7ff2] text-white text-sm font-bold tracking-widest uppercase transition-all hover:brightness-110 active:scale-[0.98] shadow-[0_0_20px_rgba(13,127,242,0.5)]"
          >
            <span className="material-symbols-outlined">add_box</span>
            <span>Registrar Carregamento</span>
          </button>
          <button 
            onClick={() => onAction('SAIDA')}
            className="flex items-center justify-center gap-3 rounded-xl h-14 bg-[#0a0a0a] border-2 border-[#0d7ff2] text-[#0d7ff2] text-sm font-bold tracking-widest uppercase transition-all hover:bg-[#0d7ff2]/10 active:scale-[0.98] shadow-[0_0_20px_rgba(13,127,242,0.2)]"
          >
            <span className="material-symbols-outlined">location_on</span>
            <span>Marcar Entrega</span>
          </button>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[#0d7ff2] text-xs font-bold leading-tight tracking-[0.3em] uppercase">Live Activity Stream</h3>
          <span className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase">{isSyncing ? 'Syncing...' : 'Live'}</span>
        </div>
        <div className="space-y-2">
          {recentLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a] border border-[#0d7ff2]/10 hover:border-[#0d7ff2]/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#0d7ff2]/10 flex items-center justify-center text-[#0d7ff2]">
                  <span className="material-symbols-outlined">{getLogIcon(log.type)}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-100">{getLogTitle(log.type)}</p>
                  <p className="text-xs text-slate-500">{getLogDesc(log.type)}</p>
                </div>
              </div>
              <p className="text-[10px] font-mono text-slate-500">{formatTimeAgo(log.timestamp)}</p>
            </div>
          ))}
          {recentLogs.length === 0 && (
            <div className="p-8 text-center text-slate-600 text-xs uppercase tracking-widest">No recent activity</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NexusDashboard;
