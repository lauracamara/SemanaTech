const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "escuro") {
  document.body.classList.add("tema-escuro");
}

const botaoTema = document.getElementById("botao-tema");

botaoTema.addEventListener("click", function () {
  document.body.classList.toggle("tema-escuro");

  if (document.body.classList.contains("tema-escuro")) {
    localStorage.setItem("tema", "escuro");
  } else {
    localStorage.setItem("tema", "claro");
  }
});

const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", function () {
  menu.classList.toggle("menu-aberto");
});

const campoNome = document.getElementById("nome");
const mensagemNome = document.getElementById("mensagem-nome");

campoNome.addEventListener("input", function () {
  const nome = campoNome.value.trim();

  if (nome.length >= 3 && nome.includes(" ")) {
    mensagemNome.textContent = "Nome válido.";
    mensagemNome.style.color = "#00a80f";
  } else {
    mensagemNome.textContent = "Digite seu nome completo.";
    mensagemNome.style.color = "#ed0000";
  }
});

const campoEmail = document.getElementById("email");
const mensagemEmail = document.getElementById("mensagem-email");

campoEmail.addEventListener("input", function () {
  const email = campoEmail.value;

  if (email.includes("@") && email.includes(".")) {
    mensagemEmail.textContent = "E-mail válido.";
    mensagemEmail.style.color = "#00a80f";
  } else {
    mensagemEmail.textContent = "Digite um e-mail válido.";
    mensagemEmail.style.color = "#ed0000";
  }
});

const campoSenha = document.getElementById("senha");
const botaoMostrarSenha = document.getElementById("mostrar-senha");

botaoMostrarSenha.addEventListener("click", function () {
  if (campoSenha.type === "password") {
    campoSenha.type = "text";
    botaoMostrarSenha.textContent = "Ocultar";
  } else {
    campoSenha.type = "password";
    botaoMostrarSenha.textContent = "Mostrar";
  }
});

const formulario = document.getElementById("formulario-conta");
const meuPerfil = document.getElementById("meu-perfil");
const mensagemSucesso = document.getElementById("mensagem-sucesso");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const idade = document.getElementById("idade").value;
  const cidade = document.getElementById("cidade").value;
  const senha = document.getElementById("senha").value;

  meuPerfil.innerHTML = `
    <h2>Meu perfil</h2>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>E-mail:</strong> ${email}</p>
    <p><strong>Idade:</strong> ${idade} anos</p>
    <p><strong>Cidade:</strong> ${cidade}</p>
  `;

  mensagemSucesso.textContent = "Dados atualizados com sucesso!";

  setTimeout(function () {
    mensagemSucesso.textContent = "";
  }, 3000);
});

const imagemPerfil = document.getElementById("imagem-perfil");
const miniaturas = document.querySelectorAll(".miniatura");

miniaturas.forEach(function (miniatura) {
  miniatura.addEventListener("click", function () {
    imagemPerfil.src = miniatura.src;
  });
});
