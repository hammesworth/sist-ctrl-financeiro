# 💰 Controle Financeiro

Sistema pra controlar gastos pessoais. Você adiciona despesas com descrição, valor e categoria, define um orçamento, e o sistema calcula estatísticas, mostra gráficos e salva tudo no navegador (localStorage). Feito em JS puro, sem framework.

## Arquivos

- **index.html** — A página principal. Tem os campos de input, botão de adicionar, select de ordenação e os 3 canvas pros gráficos.
- **css/style.css** — O visual do site. Design simples e com animações aqui e acolá.
- **js/app.js** — O coração do sistema. Importa tudo: pega os dados do HTML, chama as funções de validação, estatística e gráficos.
- **js/funcs.js** — As funções básicas: criar/remover/carregar despesas, validar dados, ordenar, calcular orçamento restante.
- **js/stats.js** — Gera as estatísticas (total gasto, média, maior/menor gasto, categoria campeã etc.) e renderiza os cards na tela.
- **js/graficos.js** — Os 3 gráficos via Chart.js: barra (resumo geral), pizza (gasto por categoria) e doughnut (orçamento vs gasto).
