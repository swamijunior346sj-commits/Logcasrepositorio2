
import { LogEntry, DailySummary, TemporaryExpressRow } from '../types';
import { VALOR_POR_PACOTE } from '../constants';

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const buildHTMLTemplate = (
  title: string,
  subtitle: string,
  rowsHtml: string,
  totalLiquid: number,
  bonusHtml: string = ''
) => {
  return `<!DOCTYPE html>
<html class="dark" lang="pt-BR">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>${title}</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script>
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: {
                    "primary-gold": "#EBC051",
                    "deep-gold": "#AA771C",
                    "pitch-black": "#000000",
                    "charcoal": "#0F0F0F",
                    "ice-white": "#F5F5F5",
                },
                fontFamily: {
                    "sans": ["Plus Jakarta Sans", "sans-serif"],
                    "geometric": ["Inter", "sans-serif"]
                },
            },
        },
    }
</script>
<style type="text/tailwindcss">
    @layer base {
        body { @apply bg-pitch-black text-ice-white antialiased font-geometric; }
    }
    .cinematic-glow { box-shadow: 0 0 60px -15px rgba(235, 192, 81, 0.12); }
    .spreadsheet-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1.2fr 1.5fr;
        align-items: center;
    }
    .row-divider { border-bottom: 0.5px solid rgba(235, 192, 81, 0.08); }
    .gold-gradient-text {
        background: linear-gradient(135deg, #EBC051 0%, #AA771C 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
<style>
    body { min-height: 100dvh; margin: 0; padding: 0; background-color: #000; }
    @media print {
        body { background-color: #000 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
</style>
</head>
<body class="flex justify-center items-center p-4 bg-pitch-black">
<div class="relative flex w-full flex-col max-w-[430px]">
    <div class="flex flex-col bg-charcoal border border-primary-gold/20 rounded-2xl cinematic-glow overflow-hidden">
        
        <!-- Cabeçalho -->
        <div class="px-6 py-10 flex flex-col items-center gap-2 border-b border-primary-gold/10">
            <div class="flex items-center gap-2 mb-2">
                <span class="material-symbols-outlined text-primary-gold text-2xl">diamond</span>
                <span class="text-[10px] font-black tracking-[0.6em] text-primary-gold uppercase">LOGCASH PREMIUM</span>
            </div>
            <h1 class="text-[16px] font-bold tracking-[0.5em] gold-gradient-text uppercase text-center font-sans">${title}</h1>
            <p class="text-[9px] text-white/30 tracking-widest uppercase">${subtitle}</p>
        </div>

        <!-- Tabela Header -->
        <div class="spreadsheet-grid px-6 py-4 bg-white/[0.02] border-b border-primary-gold/10">
            <div class="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase">DATA</div>
            <div class="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-center">CARREG.</div>
            <div class="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-center">ENTREG.</div>
            <div class="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-center">DEVOL.</div>
            <div class="text-[8px] font-black tracking-widest text-primary-gold/50 uppercase text-right">VALOR TOTAL</div>
        </div>

        <!-- Linhas dinâmicas -->
        <div class="flex flex-col">
            ${rowsHtml}
        </div>

        <!-- Resumo Financeiro -->
        <div class="px-6 py-10 bg-gradient-to-b from-transparent to-primary-gold/[0.03]">
            <div class="flex flex-col gap-4">
                <div class="flex justify-between items-center border-t border-primary-gold/20 pt-6">
                    <span class="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">RESUMO FINANCEIRO ${bonusHtml}</span>
                </div>
                <div class="flex justify-between items-end">
                    <div class="flex flex-col">
                        <span class="text-[9px] text-primary-gold/50 uppercase tracking-[0.2em] mb-1">VALOR LÍQUIDO TOTAL</span>
                        <span class="text-3xl font-bold text-ice-white font-sans tracking-tight">${formatCurrency(totalLiquid)}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Rodapé -->
        <div class="px-6 py-6 flex justify-center border-t border-primary-gold/10 bg-black/40">
            <p class="text-[7px] text-white/20 tracking-[0.4em] uppercase font-sans">Autenticidade Verificada LogCash Digital</p>
        </div>
    </div>
</div>
</body>
</html>`;
};

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const printHtmlPdf = (html: string) => {
  try {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '430px'; // Set to match the container width
    iframe.style.height = '1000px'; // Give it enough height to render
    iframe.style.border = '0';
    iframe.style.opacity = '0'; // Hide it visually but allow rendering
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();

      // Wait a moment for fonts/images to load in the iframe
      setTimeout(async () => {
        try {
          const elementToPrint = doc.querySelector('.pdf-container') as HTMLElement;
          if (elementToPrint) {
            const canvas = await html2canvas(elementToPrint, {
              scale: 2,
              useCORS: true,
              backgroundColor: '#000000',
              logging: false
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            // Calculate dimensions
            const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'px',
              format: [canvas.width / 2, canvas.height / 2]
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / 2, canvas.height / 2);
            pdf.save(`Extrato_LogCash_${new Date().getTime()}.pdf`);
          }
        } catch (canvasErr) {
          console.error("Erro no html2canvas:", canvasErr);
        } finally {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }
      }, 1500);
    }
  } catch (e) {
    console.error("Erro ao gerar PDF via modo de impressão HTML.", e);
  }
};

const getRowHtml = (date: string, loaded: number | string, delivered: number | string, returns: number | string, valStr: string) => {
  const returnClass = Number(returns) > 0 ? 'text-primary-gold' : 'text-white/20';
  return `
    <div class="spreadsheet-grid px-6 py-5 row-divider">
        <div class="text-[11px] font-bold text-ice-white uppercase">${date}</div>
        <div class="text-[11px] font-medium text-white/90 text-center">${loaded}</div>
        <div class="text-[11px] font-medium text-white/90 text-center">${delivered}</div>
        <div class="text-[11px] font-medium ${returnClass} text-center">${String(returns).padStart(2, '0')}</div>
        <div class="text-[11px] font-bold text-ice-white text-right font-sans">${valStr}</div>
    </div>`;
};


export const generateQuickPDF = (rows: TemporaryExpressRow[], userName: string = 'Operador Logístico') => {
  const totalLiquid = rows.reduce((acc, row) => acc + (Number(row.totalValue) || 0), 0);

  const rowsHtml = rows.length > 0 ? rows.map(r =>
    getRowHtml(r.date || '', r.loaded || 0, r.delivered || 0, r.returns || 0, formatCurrency(r.totalValue || 0))
  ).join('') : `<div class="px-6 py-10 text-center text-[10px] text-white/20 uppercase tracking-widest">Nenhum registro encontrado</div>`;

  const fullHtml = buildHTMLTemplate(
    'RELATÓRIO EXPRESSO',
    'Documento Oficial de Movimentação',
    rowsHtml,
    totalLiquid
  );

  printHtmlPdf(fullHtml);
};


export const generatePDF = (logs: LogEntry[], userName: string = 'Operador Logístico') => {
  const dailyData: Record<string, DailySummary> = {};
  const costPerPackage = VALOR_POR_PACOTE || 2.50;

  const routeDataKey = () => {
    logs.forEach(log => {
      const d = new Date(log.timestamp);
      const dayStr = d.toLocaleDateString('pt-BR', { day: '2-digit' });
      const monthStr = d.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
      const day = `${dayStr}/${monthStr}`;

      const key = d.toISOString().split('T')[0];

      if (!dailyData[key]) {
        dailyData[key] = { date: day, loaded: 0, delivered: 0, returns: 0, gains: 0 };
      }
      if (log.type === 'ENTRADA') dailyData[key].loaded += 1;
      else if (log.type === 'SAIDA') {
        dailyData[key].delivered += 1;
        dailyData[key].gains += costPerPackage;
      }
      else if (log.type === 'DEVOLUCAO') dailyData[key].returns += 1;
    });

    return Object.keys(dailyData)
      .sort((a, b) => b.localeCompare(a))
      .map(key => dailyData[key]);
  };

  const summaryRows = routeDataKey();
  const totalLiquid = summaryRows.reduce((acc, curr) => acc + curr.gains, 0);

  const rowsHtml = summaryRows.length > 0 ? summaryRows.map(r =>
    getRowHtml(r.date || '', r.loaded || 0, r.delivered || 0, r.returns || 0, formatCurrency(r.gains || 0))
  ).join('') : `<div class="px-6 py-10 text-center text-[10px] text-white/20 uppercase tracking-widest">Nenhum registro neste mês</div>`;

  const fullHtml = buildHTMLTemplate(
    'RELATÓRIO MENSAL',
    'Resumo Operacional do Mês',
    rowsHtml,
    totalLiquid
  );

  printHtmlPdf(fullHtml);
};


export const generateWeeklyPDF = (data: {
  userName: string;
  vehicleName: string;
  counts: {
    delivered: number;
    todayEntrada: number;
    todaySaida: number;
    todayDevolucao: number;
  },
  rows?: DailySummary[]
}) => {
  const costPerPackage = VALOR_POR_PACOTE || 2.50;
  let rowsHtml = '';
  let totalLiquid = 0;

  if (data.rows && data.rows.length > 0) {
    const topRows = data.rows.slice(0, 10);
    const routeEarnings = topRows.reduce((a, b) => a + (b.gains || 0), 0);
    totalLiquid = routeEarnings + 180.0; // Bonus

    rowsHtml = topRows.map(r =>
      getRowHtml(r.date || '', r.loaded || 0, r.delivered || 0, r.returns || 0, formatCurrency(r.gains || 0))
    ).join('');
  } else {
    const dateStr = new Date().toLocaleDateString('pt-BR');
    const routeEarnings = (data.counts?.delivered || 0) * costPerPackage;
    totalLiquid = routeEarnings + 180.0; // Bonus

    rowsHtml = getRowHtml(
      dateStr,
      data.counts?.todayEntrada || 0,
      data.counts?.todaySaida || 0,
      data.counts?.todayDevolucao || 0,
      formatCurrency(routeEarnings)
    );
  }

  const fullHtml = buildHTMLTemplate(
    'RELATÓRIO SEMANAL',
    'Documento Oficial de Movimentação',
    rowsHtml,
    totalLiquid,
    '(+BÔNUS)'
  );

  printHtmlPdf(fullHtml);
};
