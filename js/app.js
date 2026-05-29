import { gerarStats, campoStats } from './stats.js';
import { bar, pie } from './graficos.js';

/*
1. Ao clicar em btnAdicionar
1.1 Nova despesa no array despesas
1.2 Adicionar despesa na lista
1.3 Gerar estatísticas
*/

const btn = document.querySelector("#btnAdicionar");
const despesas = [];

/**
 * Função geradora de objetos "despesa"
 * @param {*} desc 
 * @param {*} valor 
 */
export const Despesa = function (descricao = "não informado", categoria = "não informada", valor = 0) {
    this.descricao = descricao;
    this.categoria = categoria;
    this.valor = valor;
}

const criarDespesa = () => {
    const descricao = document.querySelector("#descricao").value;
    const valor = parseFloat(document.querySelector("#valor").value);
    const categoria = document.querySelector("#categoria").value;

    // 1.1 Nova despesa no array despesas
    const despesaNova = new Despesa(descricao, categoria, valor);
    despesas.push(despesaNova);
}

const carregarLista = () => {

    // Recuperar o elemento lista e zerar ele
    const lista = document.querySelector("#lista");
    lista.innerHTML = '';

    despesas.forEach((despesas, idx) => {

        // Criar um elemento div
        const div = document.createElement("div");
        div.classList.add("item");

        // Adicionar o texto da descrição e valor
        div.textContent = `• Item ${idx + 1}: Descrição: ${despesas.descricao} - Categoria: ${despesas.categoria} - Valor: R$ ${(despesas.valor).toFixed(2)}`;

        // Adicionar o elemento div na lista
        lista.appendChild(div);
    })
}

const validarDados = (descricao, categoria, valor) => {

    if (Number.isNaN(valor) || valor < 0) {
        alert("Valor inválido!");
        return false;
    }

    if (descricao.trim() === "" || categoria.trim() === "") {
        alert("Descrição e/ou categoria inserida incorretamente!");
        return false;
    }

    return true;
}

// 1. Ao clicar em btnAdicionar
btn.addEventListener("click", () => {

    const descricao = document.querySelector("#descricao").value;
    const categoria = document.querySelector("#categoria").value;
    const valor = parseFloat(document.querySelector("#valor").value);

    // Validar os dados antes de adicionar
    if (!validarDados(descricao, categoria, valor)) {
        return;
    }

    criarDespesa();
    carregarLista();
    const stats = gerarStats(despesas);
    campoStats(stats);

    bar(stats);
    pie(stats);
});