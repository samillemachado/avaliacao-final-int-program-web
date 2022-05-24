
let formPainel = document.querySelector("#form-painel");

let inputId = document.querySelector("#input-numero-id")
let inputDescricao = document.querySelector("#input-desc");
let inputDetalhamento = document.querySelector("#input-det");

let btnEditar = document.querySelector("#btn-editar");
let btnApagar = document.querySelector("#btn-apagar");
let linkLogout = document.querySelector("#link-logout");

let tabelaRecados = document.querySelector("#tabela-recados");

let edicao = false;
let usuarioLogado = "";
let usuarios = [];
let indiceUsuarioLogado = 0;
let recadosUsuarioLogado = [];


document.addEventListener("DOMContentLoaded", () => {
    pegarDadosStorage();
    recadosUsuarioLogado.forEach((recado) => mostrarNaTabela(recado));
    if( recadosUsuarioLogado.length > 0 ) {
        removerLinhaTabela(1);
    }
});

formPainel.addEventListener("submit", (e) => {    
    e.preventDefault();
    if (validaInputs()) {
        salvarRecado();
    }
});

linkLogout.addEventListener("click", () => {
    localStorage.removeItem("usuario_logado");
})


function validaInputs(){
    return validaCamposPreenchidos() && ( edicao || validaIdUnico() );
}

function validaIdUnico() {
    let id = inputId.value;
    let existe = recadosUsuarioLogado.some((recado) => recado.id == id);

    if (existe) {
        alert("O ID deve ser único. Você já tem um recado com este ID.");
        inputId.value = "";
        inputId.focus();
    };
    return !existe;
}

function validaCamposPreenchidos() {
    let retorno = true;

    if (inputId.value.length === 0 || inputDescricao.value.length === 0 || inputDetalhamento.value.length === 0) {
        alert("Você deve preencher todos os campos.");
        retorno = false;
    };
    return retorno; 
}

function salvarRecado(){
    let indiceRecadoEdicao = 0;
    
    let id = inputId.value; 
    let descricao = inputDescricao.value;
    let detalhamento = inputDetalhamento.value;

    let recado = {
        id,
        descricao,
        detalhamento
    };

    if (edicao) {
        indiceRecadoEdicao = recadosUsuarioLogado.findIndex((recado) => recado.id = id);
        recadosUsuarioLogado.splice(indiceRecadoEdicao, 1, recado);
        edicao = false;
    } else {
        recadosUsuarioLogado.push(recado);
    }

    salvarNoLocalStorage(recadosUsuarioLogado);
    recarregaPagina();
}

function mostrarNaTabela(dadosRecado){  
        
    let novaLinha = document.createElement("tr");
    let colunaId = document.createElement("td");
    let colunaDesc = document.createElement("td");
    let colunaDet = document.createElement("td");
    let colunaAcoes = document.createElement("td");

    novaLinha.setAttribute("class", "linha");

    colunaId.innerHTML = dadosRecado.id;
    colunaDesc.innerHTML = dadosRecado.descricao;
    colunaDet.innerHTML = dadosRecado.detalhamento;
    colunaAcoes.innerHTML =  `
                                <input type="button" class="btn-registros" id="btn-editar" onclick="editarRecado(${dadosRecado.id})" value="Editar">
                                <input type="button" class="btn-registros" id="btn-apagar" onclick="apagarRecado(${dadosRecado.id})" value="Apagar">
                            `

    novaLinha.appendChild(colunaId);
    novaLinha.appendChild(colunaDesc);
    novaLinha.appendChild(colunaDet);
    novaLinha.appendChild(colunaAcoes);

    tabelaRecados.appendChild(novaLinha);   

};

function limparCampos(){
    inputId.value = "";
    inputDescricao.value = "";
    inputDetalhamento.value = "";
};

function salvarNoLocalStorage(listaRecados){    
    usuarios[indiceUsuarioLogado].recados = listaRecados;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

function pegarDadosStorage(){    
    usuarioLogado = localStorage.getItem("usuario_logado");

    if(usuarioLogado === null) {
        redirecionaParaLogin();
    }

    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    indiceUsuarioLogado = usuarios.findIndex((usuario) => usuario.email === usuarioLogado);
    recadosUsuarioLogado = usuarios[indiceUsuarioLogado].recados;
};

function removerLinhaTabela(linha){
    tabelaRecados.deleteRow(linha);
}

function apagarRecado(id){
    let indiceEncontrado = recadosUsuarioLogado.findIndex((recado) => recado.id === JSON.stringify(id));
    console.log(recadosUsuarioLogado);

    let confirma = confirm(`Tem certeza que deseja remover o recado nº ${id}?`);
    
    if(confirma){
        recadosUsuarioLogado.splice(indiceEncontrado, 1);
        salvarNoLocalStorage(recadosUsuarioLogado);
        recarregaPagina();
    }

};

function editarRecado(id){
    let recado = recadosUsuarioLogado.find((recado) => recado.id === JSON.stringify(id));

    edicao = true;

    inputId.value = recado.id;
    inputDescricao.value = recado.descricao;
    inputDetalhamento.value = recado.detalhamento;
}

function recarregaPagina() {
    location.reload();
}

function redirecionaParaLogin() {
    window.location.href = "./index.html";
}
