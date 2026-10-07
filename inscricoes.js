const listaInscricoes = document.getElementById("lista-inscricoes");
const quantidadeSpan = document.getElementById("quantidade");
const totalSpan = document.getElementById("total");
const modalConfirmacao = document.getElementById("modal-confirmacao");
let oficinaSelecionada = null;

const botaoCancelar = document.getElementById("cancelar-remocao");

botaoCancelar.addEventListener("click", function () {
  modalConfirmacao.style.display = "none";
});

const botaoConfirmar = document.getElementById("confirmar-remocao");

botaoConfirmar.addEventListener("click", function () {
  let inscricoes = obterInscricoes();

  inscricoes = inscricoes.filter(function (oficina) {
    return oficina.nome !== oficinaSelecionada.nome;
  });

  localStorage.setItem("inscricoes", JSON.stringify(inscricoes));

  modalConfirmacao.style.display = "none";

  exibirInscricoes();
});

function obterInscricoes() {
  const dados = localStorage.getItem("inscricoes");
  return dados ? JSON.parse(dados) : [];
}

function exibirInscricoes() {
  const inscricoes = obterInscricoes();

  listaInscricoes.innerHTML = "";

  if (inscricoes.length === 0) {
    listaInscricoes.innerHTML = `<p class="mensagem-vazia">Você ainda não se inscreveu em nenhuma oficina.</p>`;
  }

  let total = 0;

  inscricoes.forEach(function (oficina) {
    total += oficina.preco;

    const item = document.createElement("div");
    item.classList.add("item-inscricao");

    item.innerHTML = `
  <div class="info">
    <h3>${oficina.nome}</h3>
    <p>Horário: ${oficina.horario}</p>
  </div>

  <div>
    <div class="preco">R$ ${oficina.preco.toFixed(2).replace(".", ",")}</div>
    <button class="btn-remover">Remover</button>
  </div>
`;

    listaInscricoes.appendChild(item);

    const botaoRemover = item.querySelector(".btn-remover");

    botaoRemover.addEventListener("click", function () {
      oficinaSelecionada = oficina;
      modalConfirmacao.style.display = "flex";
    });
  });

  quantidadeSpan.textContent = inscricoes.length;
  totalSpan.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

exibirInscricoes();

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
