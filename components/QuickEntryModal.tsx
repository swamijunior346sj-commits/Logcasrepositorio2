import React, { useState } from 'react';
import { X, Plus, Trash2, Download } from 'lucide-react';
import { TemporaryExpressRow } from '../types';
import { VALOR_POR_PACOTE } from '../constants';

interface QuickEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (rows: TemporaryExpressRow[]) => void;
}

interface RowData extends TemporaryExpressRow { }

const QuickEntryModal: React.FC<QuickEntryModalProps> = ({ isOpen, onClose, onExport }) => {
  const [rows, setRows] = useState<RowData[]>([
    { id: '1', date: new Date().toISOString().split('T')[0], loaded: 0, delivered: 0, returns: 0, totalValue: 0 }
  ]);

  if (!isOpen) return null;

  const addRow = () => {
    setRows([...rows, {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      loaded: 0,
      delivered: 0,
      returns: 0,
      totalValue: 0
    }]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(r => r.id !== id));
    }
  };

  const updateRow = (id: string, field: keyof RowData, value: any) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleExport = () => {
    onExport(rows);
    onClose();
    // Reset rows
    setRows([{ id: '1', date: new Date().toISOString().split('T')[0], loaded: 0, delivered: 0, returns: 0, totalValue: 0 }]);
  };

  const formatBRL = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-black w-full max-w-5xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/50">
          <div>
            <h3 className="font-game font-black text-white uppercase tracking-[0.2em] text-lg">Entrada Rápida</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Adicionar dados manuais ao fluxo</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="w-full min-w-[600px]">
            <div className="grid grid-cols-12 gap-4 mb-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              <div className="col-span-3">Período</div>
              <div className="col-span-2 text-center text-emerald-400">Carregados</div>
              <div className="col-span-2 text-center text-blue-400">Entregues</div>
              <div className="col-span-2 text-center text-orange-400">Insucessos</div>
              <div className="col-span-2 text-right">Total (R$)</div>
              <div className="col-span-1 text-center"></div>
            </div>

            <div className="space-y-2">
              {rows.map((row) => (
                <div key={row.id} className="grid grid-cols-12 gap-4 items-center bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">

                  {/* Date */}
                  <div className="col-span-3">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) => updateRow(row.id, 'date', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-bold uppercase focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  {/* Carregados */}
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="0"
                      value={row.loaded}
                      onChange={(e) => updateRow(row.id, 'loaded', Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-emerald-400 font-bold text-center focus:outline-none focus:border-emerald-500/50"
                      placeholder="0"
                    />
                  </div>

                  {/* Entregues */}
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="0"
                      value={row.delivered}
                      onChange={(e) => updateRow(row.id, 'delivered', Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-400 font-bold text-center focus:outline-none focus:border-blue-500/50"
                      placeholder="0"
                    />
                  </div>

                  {/* Insucessos */}
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="0"
                      value={row.returns}
                      onChange={(e) => updateRow(row.id, 'returns', Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-orange-400 font-bold text-center focus:outline-none focus:border-orange-500/50"
                      placeholder="0"
                    />
                  </div>

                  {/* Total */}
                  <div className="col-span-2 text-right font-mono font-bold text-white text-sm">
                    {formatBRL(row.delivered * VALOR_POR_PACOTE)}
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeRow(row.id)}
                      disabled={rows.length === 1}
                      className={`p-2 rounded-lg transition-colors ${rows.length === 1 ? 'text-slate-700 cursor-not-allowed' : 'text-red-400 hover:bg-red-500/10'}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addRow}
              className="mt-4 w-full py-3 border border-dashed border-white/10 rounded-xl text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
            >
              <Plus size={16} /> Adicionar Linha
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-black/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleExport}
            className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <Download size={16} /> Exportar
          </button>
        </div>

      </div>
    </div>
  );
};

export default QuickEntryModal;
