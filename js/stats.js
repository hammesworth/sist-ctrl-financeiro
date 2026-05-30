import { Despesa } from './funcs.js';
import { orcamentoRestante } from './funcs.js';

export const gerarStats = (despesas) => {

    const orcamento = orcamentoRestante();

    const gastos = despesas.reduce((a, d) => a + d.valor, 0);

    const restante = orcamento - gastos;
    const estourou = restante < 0;

    const valores = despesas.map(d => d.valor);
    const vazia = valores.length === 0;

    const maiorGasto = vazia ? 0 : Math.max(...valores);
    const menorGasto = vazia ? 0 : Math.min(...valores);

    const media = vazia ? 0 : Number((gastos / despesas.length).toFixed(2));

    const maiorQueCem = valores.filter(v => v > 100).length;

    const categorias = despesas.reduce((acumulador, despesa) => {

        if (!acumulador[despesa.categoria]) {
            acumulador[despesa.categoria] = {
                total: 0,
                itens: [],
                quantidade: 0
            };
        }

        acumulador[despesa.categoria].total += despesa.valor;

        acumulador[despesa.categoria].itens.push(despesa);

        acumulador[despesa.categoria].quantidade++;

        return acumulador;

    }, {});

    const entries = Object.entries(categorias);
    const sortedMaior = [...entries].sort((a, b) => b[1].total - a[1].total);
    const sortedMenor = [...entries].sort((a, b) => a[1].total - b[1].total);

    const maior = sortedMaior[0] || ['-', { total: 0 }];
    const menor = sortedMenor[0] || ['-', { total: 0 }];

    const perc = vazia ? [] : despesas.map((despesa) => {

        const per = `${((despesa.valor / gastos) * 100).toFixed(0)}%`;

        return new Despesa(
            despesa.descricao,
            per
        );
    });

    return {
        gastos,
        restante,
        estourou,

        maiorGasto,
        menorGasto,
        media,
        maiorQueCem,

        categorias,

        categoriaMaiorGasto: {
            nome: maior[0],
            total: maior[1].total
        },

        categoriaMenorGasto: {
            nome: menor[0],
            total: menor[1].total
        },

        perc
    };
};

export const campoStats = (stats) => {

    const estatisticas = document.querySelector("#estatisticas");

    estatisticas.innerHTML = `
        <div class="item">
            <strong>Total gasto:</strong> R$ ${stats.gastos.toFixed(2)}
        </div>

        <div class="item">
            <strong>Orçamento restante:</strong>
            ${stats.estourou
                ? `⚠️ R$ ${Math.abs(stats.restante).toFixed(2)} acima do orçamento`
                : `R$ ${stats.restante.toFixed(2)}`
            }
        </div>

        <div class="item">
            <strong>Maior gasto:</strong> R$ ${stats.maiorGasto.toFixed(2)}
        </div>

        <div class="item">
            <strong>Menor gasto:</strong> R$ ${stats.menorGasto.toFixed(2)}
        </div>

        <div class="item">
            <strong>Média de gastos:</strong> R$ ${stats.media.toFixed(2)}
        </div>

        <div class="item">
            <strong>Quantidade acima de R$ 100,00:</strong> ${stats.maiorQueCem}
        </div>

        <div class="item">
            <strong>Categoria com maior gasto:</strong>
            ${stats.categoriaMaiorGasto.nome}
            (R$ ${stats.categoriaMaiorGasto.total.toFixed(2)})
        </div>

        <div class="item">
            <strong>Categoria com menor gasto:</strong>
            ${stats.categoriaMenorGasto.nome}
            (R$ ${stats.categoriaMenorGasto.total.toFixed(2)})
        </div>
    `;
};