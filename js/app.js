// Imports
import * as funcs from './funcs.js';
import { gerarStats, campoStats } from './stats.js';
import { bar, pie, doughnut } from './graficos.js';

const btn = document.querySelector("#btnAdicionar");
const selectOrdenacao = document.querySelector("#ordenacao");
const campoOrcamento = document.querySelector("#orcamento");

campoOrcamento.addEventListener("input", () => {
    localStorage.setItem(
        "orcamento",
        campoOrcamento.value
    );
});

function atualizar() {
    funcs.carregarLista();

    const stats = gerarStats(funcs.despesas);

    localStorage.setItem("stats", JSON.stringify(stats));

    campoStats(stats);
    bar(stats);
    pie(stats);
    doughnut(stats);
}

window.atualizar = atualizar;

// Recupera dados do localStorage
window.addEventListener("DOMContentLoaded", () => {

    const orcamentoSalvo = localStorage.getItem("orcamento");

    if (orcamentoSalvo) {
        document.querySelector("#orcamento").value = orcamentoSalvo;
    }

    funcs.carregarLocalStorage();
    funcs.carregarLista();

    const stats = gerarStats(funcs.despesas);

    campoStats(stats);
    bar(stats);
    pie(stats);
    doughnut(stats);
});

btn.addEventListener("click", () => {

    // Recupera elementos do HTML
    const descricao = document.querySelector("#descricao").value;
    const categoria = document.querySelector("#categoria").value;
    const valor = parseFloat(document.querySelector("#valor").value);

    // Valida os dados antes de adicionar
    if (!funcs.validarDados(descricao, categoria, valor)) {
        return;
    }

    // Cria uma despesa
    funcs.criarDespesa();

    // Carrega a despesa na lista
    funcs.carregarLista();

    // Gera um dado "stats" com as estatísticas geradas por gerarStats
    const stats = gerarStats(funcs.despesas);

    // Salva no localStorage
    localStorage.setItem("stats", JSON.stringify(stats));

    // Gera o campo "estatísticas" no div de id #estatisticas
    campoStats(stats);

    // Criam os gráficos
    bar(stats);
    pie(stats);
    doughnut(stats);
});

selectOrdenacao.addEventListener("change", () => {

    funcs.ordenarDespesas(
        selectOrdenacao.value
    );

    atualizar();
});