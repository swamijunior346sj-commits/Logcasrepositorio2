
import React, { useState } from 'react';
import { X, Package, Check } from 'lucide-react';

interface BulkActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  title: string;
  type: 'ENTRADA' | 'SAIDA';
}

const BulkActionModal: React.FC<BulkActionModalProps> = ({ isOpen, onClose, onConfirm, title, type }) => {
  const [quantity, setQuantity] = useState<number>(1);
  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 0) {
      setQuantity(val);
    } else if (e.target.value === '') {
      setQuantity(0);
    }
  };

  const handleConfirmAction = () => {
    if (quantity > 0) {
      onConfirm(quantity);
      // O onClose é chamado pelo pai via onConfirm para evitar race condition de estado
    }
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-slate-900 border-t md:border border-white/10 rounded-t-[2.5rem] md:rounded-[2.5rem] w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-10 md:zoom-in duration-300">
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <h3 className="text-xl font-game font-black text-white uppercase tracking-tighter">{title}</h3>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-slate-500 active:scale-90 transition-all"><X size={20} /></button>
        </div>
        
        <div className="p-8 space-y-8 flex flex-col items-center">
          <div className={`p-6 rounded-3xl border ${type === 'SAIDA' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
            <Package size={48} />
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              type="button"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-white active:scale-90 hover:bg-white/10 transition-colors"
            > - </button>
            
            <div className="text-center group">
              <input 
                type="number" 
                inputMode="numeric"
                value={quantity || ''}
                onChange={handleInputChange}
                className="w-24 bg-transparent text-4xl font-game font-black text-white text-center focus:outline-none focus:ring-2 focus:ring-white/10 rounded-lg p-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0"
              />
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Unidades</p>
            </div>

            <button 
              type="button"
              onClick={() => setQuantity(q => q + 1)}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-white active:scale-90 hover:bg-white/10 transition-colors"
            > + </button>
          </div>

          <div className="w-full flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 font-game font-bold text-slate-500 uppercase tracking-widest text-xs active:scale-95">Cancelar</button>
            <button 
              type="button"
              onClick={handleConfirmAction}
              className={`flex-[2] py-4 rounded-xl font-game font-black text-white flex items-center justify-center gap-2 shadow-xl active:scale-95 text-xs uppercase tracking-widest transition-all ${quantity > 0 ? (type === 'SAIDA' ? 'bg-blue-600' : 'bg-emerald-600') : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'}`}
            >
              Próximo <Check size={16} />
            </button>
          </div>
        </div>
        <div className="h-safe bg-slate-900 pb-safe"></div>
      </div>
    </div>
  );
};

export default BulkActionModal;
