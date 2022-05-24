let formLogin = document.querySelector("#form-login");

let inputEmail = document.querySelector("#input-email");
let inputSenha = document.querySelector("#input-senha");

let usuarios = JSON.parse(localStorage.getItem("usuarios"));


formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    if (verificaCampos()) {
        if (validaUsuario() && validaSenha()) {
            salvarNoLocalStorage();
            redirecionaPagina();
        }
    }
});


function verificaCampos(){

    let retorno = true;

    if(inputEmail.value === "" || inputSenha.value ===""){
        alert("Você deve preencher todos os campos!");
        retorno = false;
    }
    return retorno;
}

function validaUsuario(){

    let usuarioExistente = usuarios.some((usuario) => usuario.email === inputEmail.value);

    if (!usuarioExistente) {
        alert("Usuário não cadastrado! Primeiro crie uma conta.");
    }
    return usuarioExistente;
}


function validaSenha() {
    let senhaCorreta = usuarios.find((usuario) => usuario.email === inputEmail.value).senha === inputSenha.value;

    if (!senhaCorreta) {
        alert("Senha incorreta, tente novamente.");
    }
    return senhaCorreta;
}

function redirecionaPagina() {
    window.location.href = "./painel.html";
}

function salvarNoLocalStorage() {
    localStorage.setItem("usuario_logado", inputEmail.value);
}