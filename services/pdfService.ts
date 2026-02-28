
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LogEntry, DailySummary, QuickEntryRow } from '../types';
import { VALOR_POR_PACOTE } from '../constants';

export const generateQuickPDF = (rows: QuickEntryRow[], userName: string = 'Operador Logístico') => {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleDateString('pt-BR');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // --- FUNDO ALL BLACK ---
  doc.setFillColor(0, 0, 0); // Black
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // --- LOGO DESENHADA (Baseada no SVG) ---
  const logoX = 20;
  const logoY = 20;
  
  // 1. Círculo Principal (Stroke Verde)
  doc.setDrawColor(16, 185, 129); // Emerald 500
  doc.setLineWidth(1.5);
  doc.circle(logoX + 10, logoY + 10, 12, 'S');

  // 2. Seta Ascendente (Verde)
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(1.5);
  doc.lines([[5, -5], [3, 3], [6, -8]], logoX + 6, logoY + 16, [1, 1]); // Simplificado
  // Desenhar seta manualmente para ficar mais parecido
  doc.line(logoX + 6, logoY + 16, logoX + 10, logoY + 12);
  doc.line(logoX + 10, logoY + 12, logoX + 13, logoY + 15);
  doc.line(logoX + 13, logoY + 15, logoX + 18, logoY + 8);
  // Ponta da seta
  doc.line(logoX + 18, logoY + 8, logoX + 15, logoY + 8);
  doc.line(logoX + 18, logoY + 8, logoX + 18, logoY + 11);

  // 3. Texto LOGCASH
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('LOG', logoX + 28, logoY + 12);
  doc.setTextColor(16, 185, 129);
  doc.text('CASH', logoX + 54, logoY + 12);

  // --- CABEÇALHO ---
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('RELATÓRIO DE AÇÃO RÁPIDA', logoX + 28, logoY + 18);

  // --- INFO USUÁRIO (Direita) ---
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text(`OPERADOR:`, pageWidth - 20, logoY + 5, { align: 'right' });
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(userName.toUpperCase(), pageWidth - 20, logoY + 11, { align: 'right' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(dateStr, pageWidth - 20, logoY + 18, { align: 'right' });

  // --- CÁLCULOS TOTAIS ---
  const totalGains = rows.reduce((acc, row) => acc + (row.entregues * VALOR_POR_PACOTE), 0);
  const totalDelivered = rows.reduce((acc, row) => acc + row.entregues, 0);

  // --- DESTAQUE DE VALOR (TOTAL A PAGAR) ---
  const cardY = 50;
  // Fundo do Card (Cinza Escuro)
  doc.setFillColor(20, 20, 20);
  doc.setDrawColor(50, 50, 50);
  doc.roundedRect(14, cardY, pageWidth - 28, 40, 4, 4, 'FD');

  // Label
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.setFontSize(10);
  doc.text('VALOR TOTAL A RECEBER', 24, cardY + 12);

  // Valor Grande
  doc.setTextColor(16, 185, 129); // Emerald 500
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(`R$ ${totalGains.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 24, cardY + 28);

  // Info Extra (Entregues)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text(`${totalDelivered} PACOTES`, pageWidth - 24, cardY + 20, { align: 'right' });
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('ENTREGUES', pageWidth - 24, cardY + 28, { align: 'right' });

  // --- TABELA ---
  const tableColumn = ["DATA", "CARREGADOS", "ENTREGUES", "INSUCESSOS", "TOTAL (R$)"];
  
  const tableRows = rows.map(row => {
    const [y, m, d] = row.date.split('-');
    const formattedDate = `${d}/${m}/${y}`;
    const rowTotal = row.entregues * VALOR_POR_PACOTE;
    
    return [
      formattedDate,
      row.carregados.toString(),
      row.entregues.toString(),
      row.insucessos.toString(),
      `R$ ${rowTotal.toFixed(2)}`
    ];
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: cardY + 50,
    theme: 'grid',
    headStyles: { 
      fillColor: [30, 30, 30], 
      textColor: [16, 185, 129], // Emerald Text
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center',
      lineWidth: 0.1,
      lineColor: [50, 50, 50]
    },
    bodyStyles: { 
      fillColor: [0, 0, 0], // Black bg for rows
      textColor: [200, 200, 200],
      fontSize: 9,
      halign: 'center',
      lineWidth: 0.1,
      lineColor: [40, 40, 40]
    },
    alternateRowStyles: { 
      fillColor: [10, 10, 10] // Slightly lighter black for alternate
    },
    columnStyles: {
      0: { halign: 'left' },
      4: { fontStyle: 'bold', textColor: [255, 255, 255] }
    },
    styles: {
      cellPadding: 4
    }
  });

  // --- RODAPÉ ---
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text('LOGCASH - SISTEMA DE GESTÃO LOGÍSTICA', pageWidth / 2, pageHeight - 10, { align: 'center' });

  doc.save(`logcash_expresso_${dateStr.replace(/\//g, '-')}.pdf`);
};

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
  const tableColumn = ["DATA DO FLUXO", "CARREGADOS", "ENTREGUES (OK)", "INSUCESSOS", "VALOR LÍQUIDO"];
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
