const oficinas = [
  {
    nome: "Introdução à Robótica",
    horario: "08:00",
    vagas: 20,
    preco: 30.0,
    imagem:
      "https://tse4.mm.bing.net/th/id/OIP.izjaVBurHD_7JPXtN_1Y4QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3/seed/robotica/400/300",
  },
  {
    nome: "Criação de Jogos com JavaScript",
    horario: "09:00",
    vagas: 15,
    preco: 45.0,
    imagem: "https://i.ytimg.com/vi/r9buAwVBDhA/maxresdefault.jpg",
  },
  {
    nome: "Primeiros Passos com Arduino",
    horario: "10:00",
    vagas: 18,
    preco: 40.0,
    imagem:
      "https://embarcados.com.br/wp-content/uploads/2021/09/Primeiros-passos-na-Arduino-IDE.png",
  },
  {
    nome: "Design de Interfaces no Figma",
    horario: "13:00",
    vagas: 25,
    preco: 25.0,
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQeuqjInsSVT5Wp56i-gRq6vgczYMdA1Je5e498oTCztbYiPsgt3v4FrA&s=10",
  },
  {
    nome: "Segurança na Internet",
    horario: "14:00",
    vagas: 30,
    preco: 20.0,
    imagem:
      "https://tse4.mm.bing.net/th/id/OIP.Gp-wvcmoC32W7o_EP_JKtwHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3/seed/seguranca/400/300",
  },
  {
    nome: "Introdução à Inteligência Artificial",
    horario: "15:00",
    vagas: 20,
    preco: 50.0,
    imagem: "https://i.ytimg.com/vi/hRZkHfyeaZA/maxresdefault.jpg",
  },
  {
    nome: "Desenvolvimento de Aplicativos",
    horario: "16:00",
    vagas: 15,
    preco: 55.0,
    imagem:
      "https://tse3.mm.bing.net/th/id/OIP.lExmj25nOF7PhDMVaVY8XgHaG1?r=0&rs=1&pid=ImgDetMain&o=7&rm=3/seed/ia/400/300",
  },
  {
    nome: "Criação de Sites Responsivos",
    horario: "17:00",
    vagas: 25,
    preco: 35.0,
    imagem:
      "https://tse3.mm.bing.net/th/id/OIP._h2BWSnpLtAChWg-nJZywwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3/seed/apps/400/300",
  },
];

const listaOficinas = document.getElementById("lista-oficinas");
const campoBusca = document.getElementById("campo-busca");
const selectOrdenar = document.getElementById("ordenar");
const contadorInscricoes = document.getElementById("contador-inscricoes");

function exibirOficinas(lista) {
  listaOficinas.innerHTML = "";

  if (lista.length === 0) {
    listaOficinas.innerHTML = `<p class="mensagem-vazia">Nenhuma oficina encontrada.</p>`;
    return;
  }

  lista.forEach(function (oficina) {
    const card = document.createElement("div");
    card.classList.add("card-oficina");

    const inscricoes = obterInscricoes();
    const jaInscrito = inscricoes.some(function (item) {
      return item.nome === oficina.nome;
    });

    card.innerHTML = `
      <img src="${oficina.imagem}" alt="${oficina.nome}">
      <div class="conteudo">
        <h3>${oficina.nome}</h3>
        <p class="info">Horário: ${oficina.horario}</p>
        <p class="info">Vagas: ${oficina.vagas}</p>
        <p class="preco">R$ ${oficina.preco.toFixed(2).replace(".", ",")}</p>
        <div class="btn-inscrever">
          <button ${jaInscrito ? "disabled" : ""} data-nome="${oficina.nome}">
            ${jaInscrito ? "Inscrito ✓" : "Inscrever-se"}
          </button>
        </div>
      </div>
    `;

    listaOficinas.appendChild(card);
  });

  const botoes = document.querySelectorAll(".btn-inscrever button");
  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const nomeOficina = botao.getAttribute("data-nome");
      inscreverOficina(nomeOficina);
    });
  });
}

campoBusca.addEventListener("input", function () {
  const termo = campoBusca.value.toLowerCase();

  const oficinasFiltradas = oficinas.filter(function (oficina) {
    return oficina.nome.toLowerCase().includes(termo);
  });

  exibirOficinas(oficinasFiltradas);
});

selectOrdenar.addEventListener("change", function () {
  const opcao = selectOrdenar.value;
  let oficinasOrdenadas = oficinas.slice();

  if (opcao === "menor") {
    oficinasOrdenadas.sort(function (a, b) {
      return a.preco - b.preco;
    });
  } else if (opcao === "maior") {
    oficinasOrdenadas.sort(function (a, b) {
      return b.preco - a.preco;
    });
  }

  exibirOficinas(oficinasOrdenadas);
});

function obterInscricoes() {
  const dados = localStorage.getItem("inscricoes");
  return dados ? JSON.parse(dados) : [];
}

function salvarInscricoes(lista) {
  localStorage.setItem("inscricoes", JSON.stringify(lista));
}

function inscreverOficina(nome) {
  const oficinaEscolhida = oficinas.find(function (oficina) {
    return oficina.nome === nome;
  });

  const inscricoes = obterInscricoes();

  const jaExiste = inscricoes.some(function (item) {
    return item.nome === nome;
  });

  if (!jaExiste) {
    inscricoes.push(oficinaEscolhida);
    salvarInscricoes(inscricoes);
  }

  atualizarContador();
  exibirOficinas(oficinas);
}

function atualizarContador() {
  const inscricoes = obterInscricoes();
  contadorInscricoes.textContent = `Minhas inscrições (${inscricoes.length})`;
}

const trilhaCarrossel = document.getElementById("lista-carrossel");
const itensCarrossel = document.querySelectorAll(".item-carrossel");
const btnAnterior = document.querySelector(".botao-carrossel.anterior");
const btnProximo = document.querySelector(".botao-carrossel.proximo");
let indiceAtual = 0;

function mostrarSlide(indice) {
  trilhaCarrossel.style.transform = `translateX(-${indice * 100}%)`;
}

btnProximo.addEventListener("click", function () {
  if (indiceAtual < itensCarrossel.length - 1) {
    indiceAtual++;
    mostrarSlide(indiceAtual);
  }
});

btnAnterior.addEventListener("click", function () {
  if (indiceAtual > 0) {
    indiceAtual--;
    mostrarSlide(indiceAtual);
  }
});

exibirOficinas(oficinas);
atualizarContador();

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
