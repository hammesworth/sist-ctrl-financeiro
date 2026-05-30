import { orcamentoRestante } from './funcs.js';

const PALETA = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16'];
const gerarCores = n => Array.from({ length: n }, (_, i) => PALETA[i % PALETA.length]);
const fmt = v => 'R$ ' + v.toFixed(2);
const destruirChart = id => { const c = Chart.getChart(id); if (c) c.destroy(); };

const rotuloBarras = {
    id: 'rotuloBarras',
    afterDatasetsDraw(chart) {
        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        meta.data.forEach((bar, i) => {
            const val = chart.data.datasets[0].data[i];
            if (val === 0) return;
            ctx.save();
            ctx.fillStyle = '#1e293b';
            ctx.font = '600 12px Inter, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(fmt(val), bar.x, bar.y - 6);
            ctx.restore();
        });
    }
};

export const bar = (stats) => {
    destruirChart('pizza');
    const canvas = document.getElementById('pizza');
    if (!canvas) return;

    return new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Total Gasto', 'Menor Gasto', 'Maior Gasto', 'Média'],
            datasets: [{
                data: [stats.gastos, stats.menorGasto, stats.maiorGasto, stats.media],
                backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#8b5cf6'],
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 10,
                    cornerRadius: 8,
                    callbacks: { label: ctx => fmt(ctx.parsed.y) }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.06)' },
                    ticks: { callback: v => fmt(v) }
                }
            }
        },
        plugins: [rotuloBarras]
    });
};

export const pie = (stats) => {
    destruirChart('pie');
    const canvas = document.getElementById('pie');
    if (!canvas) return;

    const cats = Object.entries(stats.categorias);
    if (cats.length === 0) return;

    const total = cats.reduce((s, [, d]) => s + d.total, 0);

    return new Chart(canvas, {
        type: 'pie',
        data: {
            labels: cats.map(([nome]) => nome),
            datasets: [{
                data: cats.map(([, d]) => d.total),
                backgroundColor: gerarCores(cats.length),
                borderColor: '#fff',
                borderWidth: 2,
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 16,
                        usePointStyle: true,
                        font: { family: 'Inter, system-ui, sans-serif' }
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 10,
                    cornerRadius: 8,
                    callbacks: {
                        label: ctx => {
                            const pct = ((ctx.parsed / total) * 100).toFixed(1);
                            return ' ' + ctx.label + ': ' + fmt(ctx.parsed) + ' (' + pct + '%)';
                        }
                    }
                }
            }
        }
    });
};

export const doughnut = (stats) => {
    destruirChart('doughnut');
    const canvas = document.getElementById('doughnut');
    if (!canvas) return;

    const orcamento = orcamentoRestante();
    if (orcamento === 0 && stats.gastos === 0) return;

    const gastos = stats.gastos;
    const dentroOrcamento = gastos <= orcamento;
    const usado = dentroOrcamento ? gastos : orcamento;
    const excedente = dentroOrcamento ? orcamento - gastos : gastos - orcamento;

    const dados = dentroOrcamento
        ? [usado, excedente]
        : [usado, excedente];

    const cores = dentroOrcamento
        ? ['#4f46e5', '#10b981']
        : ['#4f46e5', '#ef4444'];

    const rotulos = dentroOrcamento
        ? ['Total Gasto', 'Orçamento Restante']
        : ['Orçamento', 'Acima do Orçamento'];

    return new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: rotulos,
            datasets: [{
                data: dados,
                backgroundColor: cores,
                borderColor: '#fff',
                borderWidth: 3,
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: true,
            cutout: '72%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 16,
                        usePointStyle: true,
                        font: { family: 'Inter, system-ui, sans-serif' }
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 10,
                    cornerRadius: 8,
                    callbacks: { label: ctx => fmt(ctx.parsed) }
                }
            }
        },
        plugins: [{
            id: 'centroDoughnut',
            afterDraw(chart) {
                const { ctx, chartArea: a } = chart;
                const cx = (a.left + a.right) / 2;
                const cy = (a.top + a.bottom) / 2;

                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#1e293b';
                ctx.font = '700 24px Inter, system-ui, sans-serif';
                ctx.fillText(fmt(gastos), cx, cy - 8);
                ctx.fillStyle = '#64748b';
                ctx.font = '500 11px Inter, system-ui, sans-serif';
                ctx.fillText('Total Gasto', cx, cy + 16);
                ctx.restore();
            }
        }]
    });
};
