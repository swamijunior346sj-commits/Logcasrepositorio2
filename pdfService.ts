import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LogEntry, DailySummary } from './types';
import { VALOR_POR_PACOTE } from './constants';

export const generatePDF = (logs: LogEntry[], userName: string = 'Operador Logístico') => {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleDateString('pt-BR');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // --- FUNDO ---
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // --- CABEÇALHO DESIGN ---
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, pageWidth, 40, 'F');

  // LOGO LOGCASH (REPRESENTAÇÃO VISUAL)
  doc.setDrawColor(16, 185, 129); // Emerald 500
  doc.setLineWidth(1);
  doc.circle(20, 20, 8, 'S');
  doc.setFillColor(16, 185, 129);
  doc.rect(17, 18, 6, 2, 'F');
  doc.rect(17, 22, 6, 2, 'F');
  
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('LOG', 32, 23);
  doc.setTextColor(16, 185, 129);
  doc.text('CASH', 52, 23);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('TERMINAL DE GESTÃO LOGÍSTICA INTELIGENTE', 32, 28);

  // INFO OPERADOR
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(`DATA: ${dateStr}`, pageWidth - 15, 18, { align: 'right' });
  doc.setFontSize(10);
  doc.text(`OPERADOR: ${userName.toUpperCase()}`, pageWidth - 15, 25, { align: 'right' });

  // --- CÁLCULOS ---
  const dailyData: Record<string, DailySummary> = {};
  logs.forEach(log => {
    const day = new Date(log.timestamp).toLocaleDateString('pt-BR');
    if (!dailyData[day]) {
      dailyData[day] = { date: day, loaded: 0, delivered: 0, returns: 0, gains: 0 };
    }
    
    if (log.type === 'ENTRADA') {
      dailyData[day].loaded += 1;
    } else if (log.type === 'SAIDA') {
      dailyData[day].delivered += 1;
      dailyData[day].gains += VALOR_POR_PACOTE;
    } else if (log.type === 'DEVOLUCAO') {
      dailyData[day].returns += 1;
    }
  });

  const summaryRows = Object.values(dailyData).sort((a, b) => {
     const [da, ma, ya] = a.date.split('/').map(Number);
     const [db, mb, yb] = b.date.split('/').map(Number);
     return new Date(ya, ma-1, da).getTime() - new Date(yb, mb-1, db).getTime();
  });

  const totalGains = logs.filter(l => l.type === 'SAIDA').length * VALOR_POR_PACOTE;
  const totalDelivered = logs.filter(l => l.type === 'SAIDA').length;

  // --- CARD DE RESUMO ---
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(14, 50, pageWidth - 28, 30, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 50, pageWidth - 28, 30, 3, 3, 'S');

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9);
  doc.text('SALDO ACUMULADO TOTAL', 20, 60);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(20);
  doc.text(`R$ ${totalGains.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 20, 72);

  doc.setTextColor(16, 185, 129);
  doc.setFontSize(10);
  doc.text(`${totalDelivered} ENTREGAS FINALIZADAS`, pageWidth - 20, 72, { align: 'right' });

  // --- TABELA ---
  const tableColumn = ["DATA DO FLUXO", "CARREGADOS", "ENTREGAS (OK)", "DEVOLUÇÕES", "VALOR LÍQUIDO"];
  const tableRows = summaryRows.map(row => [
    row.date,
    row.loaded.toString(),
    row.delivered.toString(),
    row.returns.toString(),
    `R$ ${row.gains.toFixed(2)}`
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 90,
    theme: 'grid',
    headStyles: { 
      fillColor: [15, 23, 42], 
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: { 
      fontSize: 9,
      halign: 'center',
      textColor: [51, 65, 85]
    },
    alternateRowStyles: { 
      fillColor: [241, 245, 249]
    },
    columnStyles: {
      0: { halign: 'left' },
      4: { fontStyle: 'bold', textColor: [16, 185, 129] }
    }
  });

  // --- RODAPÉ ---
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('EXTRATO GERADO VIA LOGCASH APP - SINCRONIZADO COM SUPABASE CLOUD', pageWidth / 2, pageHeight - 15, { align: 'center' });

  doc.save(`logcash_extrato_${dateStr.replace(/\//g, '-')}.pdf`);
};