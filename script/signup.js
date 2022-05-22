let formSignup = document.querySelector("#form-signup");

let labelInputEmail = document.querySelector("#label-input-email");
let inputEmail = document.querySelector("#input-signup-email");
let validEmail = false;

let labelInputSenha = document.querySelector("#label-input-senha");
let inputSenha = document.querySelector("#input-signup-senha");
let validSenha = false;

let labelInputRepeteSenha = document.querySelector("#label-input-repete-senha");
let inputRepeteSenha = document.querySelector("#input-signup-repete-senha");
let validRepeteSenha = false;

let regSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

// let btnCriar = document.querySelector("btn-criar");

//EVENTOS

inputEmail.addEventListener("keyup", verificaEmail);
inputSenha.addEventListener("keyup", verificaSenha);
inputRepeteSenha.addEventListener("keyup", verificaRepeteSenha);

formSignup.addEventListener("submit", (e) => {
    e.preventDefault();
    verificaCampos();
    criarRegistroUsuario();
});

//FUNÇÕES

function verificaEmail(){ 

    if(inputEmail.value.length < 10){
        labelInputEmail.style.color = 'red';
        labelInputEmail.innerHTML = "e-mail: insira no mínimo 10 caracteres";
        validEmail = false;
    } else{   
        labelInputEmail.style.color = '#592c12';    
        labelInputEmail.innerHTML = "e-mail:";
        validEmail = true;
    }
};

function verificaSenha(){  
    let senhaValida = inputSenha.value.match(regSenha);   

    if(inputSenha.value.length < 6){
        labelInputSenha.style.color = 'red';
        labelInputSenha.innerHTML = "senha: insira no mínimo 6 caracteres";
        validSenha = false;

    }else if(senhaValida === null){
        labelInputSenha.innerHTML = "senha deve conter uma letra maiúscula e um caracter especial";
        validSenha = false;

    } else{      
        labelInputSenha.style.color = '#592c12'; 
        labelInputSenha.innerHTML = "senha:";
        validSenha = true;
    }
};

function verificaRepeteSenha(){   

    if(inputRepeteSenha.value !== inputSenha.value){
        labelInputRepeteSenha.style.color = 'red';
        labelInputRepeteSenha.innerHTML = "senha: a senha digitada não corresponde";
        validRepeteSenha = false;
    } else{      
        labelInputRepeteSenha.style.color = '#592c12'; 
        labelInputRepeteSenha.innerHTML = "repete senha:";
        validRepeteSenha = true;
    }
};

function verificaCampos(){

    if(inputEmail.value === "" || inputSenha.value ==="" || inputRepeteSenha.value ===""){
        alert("Você deve preencher todos os campos!");

    } else if(!validEmail || !validSenha || !validRepeteSenha){
        alert("Você deve preencher todos os campos!");

    } else {
        alert("Cadastro efetuado com sucesso!");
        //vamos salvar os dados aqui no localStorage
    }
};

function criarRegistroUsuario(){
    //stringify
    window.localStorage.setItem(inputEmail.value, inputSenha.value);
}