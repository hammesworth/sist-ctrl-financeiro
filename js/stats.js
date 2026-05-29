import { Despesa } from './app.js';

export const gerarStats = (despesas) => {
    const gastos = despesas.reduce((a, d) => a + d.valor, 0);

    const valores = despesas.map(d => d.valor);

    const maiorGasto = Math.max(...valores);
    const menorGasto = Math.min(...valores);

    const media = Number((gastos / despesas.length).toFixed(2));

    const maiorQueCem = valores.filter(v => v > 100).length;

    const categorias = despesas.reduce((acc, despesa) => {

        if (!acc[despesa.categoria]) {
            acc[despesa.categoria] = {
                total: 0,
                itens: [],
                quantidade: 0
            };
        }

        // soma valores
        acc[despesa.categoria].total += despesa.valor;

        // adiciona item
        acc[despesa.categoria].itens.push(despesa);

        // quantidade de itens
        acc[despesa.categoria].quantidade++;

        return acc;

    }, {});

    const categoriaMaiorGasto = Object.entries(categorias)
        .sort((a, b) => b[1].total - a[1].total)[0];

    const categoriaMenorGasto = Object.entries(categorias)
        .sort((a, b) => a[1].total - b[1].total)[0];

    const perc = despesas.map((despesa) => {

        const per = `${((despesa.valor / gastos) * 100).toFixed(0)}%`;

        return new Despesa(
            despesa.descricao,
            per
        );
    });

    return {
        gastos,
        maiorGasto,
        menorGasto,
        media,
        maiorQueCem,

        categorias,

        categoriaMaiorGasto: {
            nome: categoriaMaiorGasto[0],
            total: categoriaMaiorGasto[1].total
        },

        categoriaMenorGasto: {
            nome: categoriaMenorGasto[0],
            total: categoriaMenorGasto[1].total
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