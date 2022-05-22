let formLogin = document.querySelector("#form-login");

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    let InputEmail = document.querySelector("#input-email");
    let InputSenha = document.querySelector("#input-senha");

    console.log(InputEmail.value);
    console.log(InputSenha.value);
});


// window.location.reload();
// document.addEventListener("DOMContentLoaded", recarregarPagina);
// recarregou a página, faz alguma coisa:
// function recarregarPagina(){
//     window.location.href = "./outrapagina.html";
// }