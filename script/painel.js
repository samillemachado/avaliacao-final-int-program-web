//criar um objeto dadosUsuario = {nome, senha, recados[objetos]}
//criar um objeto recado = {código, desc, det}
// dar push dos recado no dadosUsuario.recados

//lista de usuários
//objeto usuários
//com uma lista de recados
//objeto recados

// tabelaRecados.deleteRow(1);

window.addEventListener("load", pegarDadosStorage);

let formPainel = document.querySelector("#form-painel");

let inputDescricao = document.querySelector("#input-desc");
let inputDetalhamento = document.querySelector("#input-det");

let btnEditar = document.querySelector("#btn-editar");
let btnApagar = document.querySelector("#btn-apagar");

let tabelaRecados = document.querySelector("#tabela-recados");

let listaRecados = [];


formPainel.addEventListener("submit", (e) => {    
    e.preventDefault();
    adicionarNovoRecado();
});

function adicionarNovoRecado(){ 
    let descricao = inputDescricao.value;
    let detalhamento = inputDetalhamento.value;

    let recado = {
        numeroid: listaRecados.length + 1,
        descricao,
        detalhamento
    };

    if (listaRecados.length === 0 ) {
        limparLinhaInicial();
    }

    listaRecados.push(recado);

    mostrarNaTabela(recado);
    salvarNoLocalStorage(listaRecados);
    limparCampos();    
}

function mostrarNaTabela(dadosRecado){  
        
    let novaLinha = document.createElement("tr");
    let colunaId = document.createElement("td");
    let colunaDesc = document.createElement("td");
    let colunaDet = document.createElement("td");
    let colunaAcoes = document.createElement("td");

    novaLinha.setAttribute("class", "linha");

    colunaId.innerHTML = dadosRecado.numeroid;
    colunaDesc.innerHTML = dadosRecado.descricao;
    colunaDet.innerHTML = dadosRecado.detalhamento;
    colunaAcoes.innerHTML =  `
                                <input type="button" class="btn-registros" id="btn-editar" value="Editar">
                                <input type="button" class="btn-registros" id="btn-apagar" value="Apagar">
                            `

    novaLinha.appendChild(colunaId);
    novaLinha.appendChild(colunaDesc);
    novaLinha.appendChild(colunaDet);
    novaLinha.appendChild(colunaAcoes);

    tabelaRecados.appendChild(novaLinha);   

};

function limparCampos(){
    inputDescricao.value = "";
    inputDetalhamento.value = "";
};

function salvarNoLocalStorage(listaRecados){    
    localStorage.setItem("recados", JSON.stringify(listaRecados));
};

function pegarDadosStorage(){    
    let dadosStorage = JSON.parse(localStorage.getItem("recados")); 
    if (dadosStorage) {
        limparLinhaInicial();
        for (const recado of dadosStorage) {
            mostrarNaTabela(recado);
        }
        listaRecados.push(...dadosStorage);
    } 
};

function limparLinhaInicial(){
    tabelaRecados.deleteRow(1);
}

// function criarLinhaInicial(){
    
// }

// botão apagar e botão editar
