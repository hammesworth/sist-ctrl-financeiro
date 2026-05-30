export const despesas = [];

/**
 * Uma função geradora de objetos "despesa"
 * @param {*} descricao A descrição da despesa (mais o nome, na real)
 * @param {*} categoria A categoria da despesa
 * @param {*} valor O valor da despesa
 * @param {*} id O identificador da despesa (não inserido de fato) 
 */
export const Despesa = function (descricao = "não informado", categoria = "não informada", valor = 0, id = Date.now()) {
    this.id = id;
    this.descricao = descricao;
    this.categoria = categoria;
    this.valor = valor;
};

/**
 * Cria uma despesa com descrição, categoria e valor a partir de campos input de IDs #descricao, #categoria e #valor
 * Salva no localStorage
 */
export const criarDespesa = () => {

    const descricao = document.querySelector("#descricao").value;
    const categoria = document.querySelector("#categoria").value;
    const valor = parseFloat(document.querySelector("#valor").value);

    const despesaNova = new Despesa(descricao, categoria, valor);

    despesas.push(despesaNova);

    // salva no localStorage sempre que adiciona
    localStorage.setItem("despesas", JSON.stringify(despesas));
};

/**
 * Remove uma despesa
 * @param {*} index O índice da despesa a ser removida.
 */
export const removerDespesa = (index, atualizar) => {
    despesas.splice(index, 1);

    // Atualiza localStorage
    localStorage.setItem("despesas", JSON.stringify(despesas));

    if (atualizar) {
        atualizar();
    }
};

/**
 * Carrega as despesas do localStorage.
 * @returns Caso não tenha despesas salvas, não retorna nada, se houver, passa as despesas salvas para despesas[].
 */
export const carregarLocalStorage = () => {

    const despesasSalvas = JSON.parse(localStorage.getItem("despesas"));

    if (!despesasSalvas) return;

    despesasSalvas.forEach(d => {
        despesas.push(
            new Despesa(d.descricao, d.categoria, d.valor, d.id)
        );
    });
};

/**
 * Recupera o div de id #lista e carrega nele outros div de classe .item, contendo,
 * cada um, uma linha de registros (descrição, categoria e valor), além de inserir
 * um botão de remover ao lado de cada item.
 */
export const carregarLista = () => {

    const lista = document.querySelector("#lista");
    lista.innerHTML = '';

    despesas.forEach((d, idx) => {

        const div = document.createElement("div");
        div.classList.add("item");

        const texto = document.createElement("span");
        texto.textContent =
            `• Item ${idx + 1}: Descrição: ${d.descricao} - Categoria: ${d.categoria} - Valor: R$ ${d.valor.toFixed(2)}`;

        const btnRemover = document.createElement("button");
        btnRemover.classList.add("remover");

        const i = document.createElement("i");
        i.classList.add("fa-solid", "fa-trash");

        btnRemover.appendChild(i);

        btnRemover.addEventListener("click", () => {
            removerDespesa(idx, window.atualizar);
        });

        div.appendChild(texto);
        div.appendChild(btnRemover);

        lista.appendChild(div);
    });
};

const MAX_CHARS = 80;
const MSGS = {
    valor: "Valor inválido! Insira um número positivo maior que zero.",
    descricao: "Descrição inválida! Deve ter entre 1 e " + MAX_CHARS + " caracteres.",
    categoria: "Categoria inválida! Deve ter entre 1 e " + MAX_CHARS + " caracteres."
};

/**
 * Recebe a descrição, a categoria e o valor, validando eles.
 * @param {*} descricao 
 * @param {*} categoria 
 * @param {*} valor 
 * @returns true caso os dados sejam válidos, false se inválidos.
 */
export const validarDados = (descricao, categoria, valor) => {

    if (Number.isNaN(valor) || valor <= 0) {
        alert(MSGS.valor);
        return false;
    }

    const d = descricao.trim();
    const c = categoria.trim();

    if (d === "" || d.length > MAX_CHARS) {
        alert(MSGS.descricao);
        return false;
    }

    if (c === "" || c.length > MAX_CHARS) {
        alert(MSGS.categoria);
        return false;
    }

    return true;
};

/**
 * Recupera o orçamento máximo através de um input.
 * @returns O orçamento máximo como float.
 */
export const orcamentoRestante = () => {
    return parseFloat(
        document.querySelector("#orcamento").value
    ) || 0;
};

export const ordenarDespesas = (criterio) => {

    switch (criterio) {

        case "maior":
            despesas.sort((a, b) => b.valor - a.valor);
            break;

        case "menor":
            despesas.sort((a, b) => a.valor - b.valor);
            break;

        case "descricao":
            despesas.sort((a, b) =>
                a.descricao.localeCompare(b.descricao)
            );
            break;

        case "normal":
            despesas.sort((a, b) => a.id - b.id);
            break;
    }

    localStorage.setItem(
        "despesas",
        JSON.stringify(despesas)
    );
};