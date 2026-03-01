
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LogEntry, DailySummary, QuickEntryRow } from '../types';
import { VALOR_POR_PACOTE } from '../constants';

// Cores Oficiais LogCash Elite
const GOLD_PRIMARY: [number, number, number] = [235, 192, 81]; // #EBC051
const GOLD_LIGHT: [number, number, number] = [249, 226, 156];   // #F9E29C
const GOLD_DARK: [number, number, number] = [170, 119, 28];    // #AA771C
const BLACK_BG: [number, number, number] = [10, 10, 10];       // #0A0A0A
const WHITE_PURE: [number, number, number] = [255, 255, 255];
const SLATE_400: [number, number, number] = [148, 163, 184];

export const generateQuickPDF = (rows: QuickEntryRow[], userName: string = 'Operador Logístico') => {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleDateString('pt-BR');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // --- FUNDO DARK ---
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // --- CABEÇALHO ---
  // Representação Minimalista da Logo Elite
  doc.setDrawColor(GOLD_PRIMARY[0], GOLD_PRIMARY[1], GOLD_PRIMARY[2]);
  doc.setLineWidth(0.5);
  doc.line(20, 20, 40, 20); // Linha acima

  doc.setFontSize(22);
  doc.setTextColor(GOLD_PRIMARY[0], GOLD_PRIMARY[1], GOLD_PRIMARY[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('LOGCASH', 20, 32);

  doc.setFontSize(8);
  doc.setTextColor(SLATE_400[0], SLATE_400[1], SLATE_400[2]);
  doc.text('ELITE DOCUMENT SERVICE • RELATÓRIO EXPRESSO', 20, 38);

  // INFO OPERADOR (Direita)
  doc.setTextColor(WHITE_PURE[0], WHITE_PURE[1], WHITE_PURE[2]);
  doc.setFontSize(8);
  doc.text(`OPERADOR:`, pageWidth - 20, 20, { align: 'right' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(userName.toUpperCase(), pageWidth - 20, 26, { align: 'right' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(dateStr, pageWidth - 20, 32, { align: 'right' });

  // --- RESUMO FINANCEIRO ---
  const totalGains = rows.reduce((acc, row) => acc + (row.entregues * VALOR_POR_PACOTE), 0);

  doc.setFillColor(15, 15, 15);
  doc.setDrawColor(GOLD_PRIMARY[0], GOLD_PRIMARY[1], GOLD_PRIMARY[2]);
  doc.setLineWidth(0.1);
  doc.roundedRect(14, 50, pageWidth - 28, 30, 2, 2, 'FD');

  doc.setTextColor(GOLD_PRIMARY[0], GOLD_PRIMARY[1], GOLD_PRIMARY[2]);
  doc.setFontSize(9);
  doc.text('VALOR LÍQUIDO A RECEBER', 20, 58);
  doc.setFontSize(20);
  doc.setFont('inter', 'bold');
  doc.text(`R$ ${totalGains.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 20, 72);

  // --- TABELA ---
  const tableColumn = ["DATA", "CARREGADOS", "ENTREGUES", "INSUCESSOS", "GANHOS"];
  const tableRows = rows.map(row => {
    const [y, m, d] = row.date.split('-');
    return [
      `${d}/${m}/${y}`,
      row.carregados.toString(),
      row.entregues.toString(),
      row.insucessos.toString(),
      `R$ ${(row.entregues * VALOR_POR_PACOTE).toFixed(2)}`
    ];
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 90,
    theme: 'plain',
    headStyles: {
      fillColor: [20, 20, 20],
      textColor: GOLD_PRIMARY,
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fillColor: [0, 0, 0],
      textColor: [200, 200, 200],
      fontSize: 8,
      halign: 'center',
      lineWidth: 0.1,
      lineColor: [30, 30, 30]
    },
    columnStyles: {
      0: { halign: 'left' },
      4: { fontStyle: 'bold', textColor: WHITE_PURE }
    }
  });

  doc.save(`logcash_express_${dateStr.replace(/\//g, '-')}.pdf`);
};

export const generatePDF = (logs: LogEntry[], userName: string = 'Operador Logístico') => {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleDateString('pt-BR');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // --- FUNDO DARK ---
  doc.setFillColor(BLACK_BG[0], BLACK_BG[1], BLACK_BG[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // --- CABEÇALHO DESIGN ---
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, pageWidth, 45, 'F');
  doc.setDrawColor(GOLD_PRIMARY[0], GOLD_PRIMARY[1], GOLD_PRIMARY[2]);
  doc.setLineWidth(0.5);
  doc.line(0, 45, pageWidth, 45);

  // LOGO LOGCASH ELITE
  doc.setFontSize(24);
  doc.setTextColor(GOLD_PRIMARY[0], GOLD_PRIMARY[1], GOLD_PRIMARY[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('LOGCASH', 20, 25);
  doc.setFontSize(10);
  doc.setTextColor(GOLD_DARK[0], GOLD_DARK[1], GOLD_DARK[2]);
  doc.text('PREMIUM OPERATIONAL REPORT', 20, 32);

  // INFO CABEÇALHO
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text(`EMISSÃO: ${dateStr}`, pageWidth - 20, 20, { align: 'right' });
  doc.setFontSize(10);
  doc.text(`OPERADOR: ${userName.toUpperCase()}`, pageWidth - 20, 28, { align: 'right' });

  // --- CÁLCULOS ---
  const dailyData: Record<string, DailySummary> = {};
  logs.forEach(log => {
    const day = new Date(log.timestamp).toLocaleDateString('pt-BR');
    if (!dailyData[day]) {
      dailyData[day] = { date: day, loaded: 0, delivered: 0, returns: 0, gains: 0 };
    }
    if (log.type === 'ENTRADA') dailyData[day].loaded += 1;
    else if (log.type === 'SAIDA') {
      dailyData[day].delivered += 1;
      dailyData[day].gains += VALOR_POR_PACOTE;
    }
    else if (log.type === 'DEVOLUCAO') dailyData[day].returns += 1;
  });

  const summaryRows = Object.values(dailyData).sort((a, b) => {
    const [da, ma, ya] = a.date.split('/').map(Number);
    const [db, mb, yb] = b.date.split('/').map(Number);
    return new Date(ya, ma - 1, da).getTime() - new Date(yb, mb - 1, db).getTime();
  });

  const totalGains = logs.filter(l => l.type === 'SAIDA').length * VALOR_POR_PACOTE;
  const totalDelivered = logs.filter(l => l.type === 'SAIDA').length;

  // --- CARD DE RESUMO ---
  doc.setFillColor(20, 20, 20);
  doc.roundedRect(14, 55, pageWidth - 28, 35, 2, 2, 'F');
  doc.setDrawColor(GOLD_DARK[0], GOLD_DARK[1], GOLD_DARK[2]);
  doc.setLineWidth(0.1);
  doc.roundedRect(14, 55, pageWidth - 28, 35, 2, 2, 'S');

  doc.setTextColor(GOLD_PRIMARY[0], GOLD_PRIMARY[1], GOLD_PRIMARY[2]);
  doc.setFontSize(10);
  doc.text('SALDO SEMANAL TOTAL', 22, 65);
  doc.setTextColor(WHITE_PURE[0], WHITE_PURE[1], WHITE_PURE[2]);
  doc.setFontSize(24);
  doc.text(`R$ ${totalGains.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 22, 80);

  doc.setTextColor(GOLD_LIGHT[0], GOLD_LIGHT[1], GOLD_LIGHT[2]);
  doc.setFontSize(11);
  doc.text(`${totalDelivered} ENTREGAS CONCLUÍDAS`, pageWidth - 25, 80, { align: 'right' });

  // --- TABELA ---
  const tableColumn = ["DATA", "CARREGADOS", "ENTREGUES", "DEVOLUÇÕES", "VALOR LÍQUIDO"];
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
    startY: 100,
    theme: 'plain',
    headStyles: {
      fillColor: [15, 15, 15],
      textColor: GOLD_PRIMARY,
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fillColor: [10, 10, 10],
      fontSize: 9,
      halign: 'center',
      textColor: [200, 200, 200],
      lineWidth: 0.1,
      lineColor: [30, 30, 30]
    },
    alternateRowStyles: {
      fillColor: [15, 15, 15]
    },
    columnStyles: {
      0: { halign: 'left' },
      4: { fontStyle: 'bold', textColor: GOLD_LIGHT }
    }
  });

  // --- RODAPÉ ---
  doc.setFontSize(8);
  doc.setTextColor(GOLD_DARK[0], GOLD_DARK[1], GOLD_DARK[2]);
  doc.text('LOGCASH ELITE SERVICES • DOCUMENTO DIGITAL AUTENTICADO', pageWidth / 2, pageHeight - 15, { align: 'center' });

  doc.save(`logcash_extrato_${dateStr.replace(/\//g, '-')}.pdf`);
};
