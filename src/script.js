// JSON inicial
const jogadorasIniciais = [
  {
    nome: "Andressa Alves",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://via.placeholder.com/200x200",
    gols: 15,
    assistencias: 10,
    jogos: 28,
    favorita: false
  },
  {
    nome: "Dayana Rodríguez",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://via.placeholder.com/200x200",
    gols: 5,
    assistencias: 12,
    jogos: 30,
    favorita: false
  }
];

// Inicializar LocalStorage
function inicializarBD() {
  if (!localStorage.getItem("jogadoras")) {
    localStorage.setItem("jogadoras", JSON.stringify(jogadorasIniciais));
  }
}

function getJogadoras() {
  return JSON.parse(localStorage.getItem("jogadoras")) || [];
}

function salvarJogadoras(jogadoras) {
  localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
}

function renderJogadoras() {
  const container = document.getElementById("jogadoras-container");
  container.innerHTML = "";
  const jogadoras = getJogadoras();

  jogadoras.forEach((j, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${j.foto}" alt="${j.nome}">
      <h3>${j.nome}</h3>
      <p><b>Posição:</b> ${j.posicao}</p>
      <p><b>Clube:</b> ${j.clube}</p>
      <p><b>Gols:</b> ${j.gols} | <b>Assistências:</b> ${j.assistencias} | <b>Jogos:</b> ${j.jogos}</p>
      <button onclick="editarJogadora(${index})">Editar</button>
      <button onclick="removerJogadora(${index})">Excluir</button>
      <button onclick="toggleFavorita(${index})" class="${j.favorita ? 'favorita' : ''}">★</button>
    `;

    container.appendChild(card);
  });
}

// CRUD
function adicionarJogadora(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const posicao = document.getElementById("posicao").value;
  const clube = document.getElementById("clube").value;
  const foto = document.getElementById("foto").value;
  const gols = document.getElementById("gols").value;
  const assistencias = document.getElementById("assistencias").value;
  const jogos = document.getElementById("jogos").value;

  if (!nome || !posicao || !clube || !foto) {
    alert("Preencha todos os campos!");
    return;
  }

  const jogadoras = getJogadoras();
  jogadoras.push({ nome, posicao, clube, foto, gols, assistencias, jogos, favorita: false });
  salvarJogadoras(jogadoras);

  document.getElementById("jogadora-form").reset();
  alert("Jogadora adicionada com sucesso!");
  renderJogadoras();
}

function removerJogadora(index) {
  const jogadoras = getJogadoras();
  jogadoras.splice(index, 1);
  salvarJogadoras(jogadoras);
  alert("Jogadora removida com sucesso!");
  renderJogadoras();
}

function editarJogadora(index) {
  const jogadoras = getJogadoras();
  const j = jogadoras[index];

  document.getElementById("nome").value = j.nome;
  document.getElementById("posicao").value = j.posicao;
  document.getElementById("clube").value = j.clube;
  document.getElementById("foto").value = j.foto;
  document.getElementById("gols").value = j.gols;
  document.getElementById("assistencias").value = j.assistencias;
  document.getElementById("jogos").value = j.jogos;

  document.getElementById("form-title").innerText = "Editar Jogadora";
  document.querySelector("button[type='submit']").innerText = "Salvar Alterações";
  document.getElementById("cancelar-edicao").style.display = "inline-block";

  document.getElementById("jogadora-form").onsubmit = function(e) {
    e.preventDefault();
    jogadoras[index] = {
      nome: nome.value,
      posicao: posicao.value,
      clube: clube.value,
      foto: foto.value,
      gols: gols.value,
      assistencias: assistencias.value,
      jogos: jogos.value,
      favorita: j.favorita
    };
    salvarJogadoras(jogadoras);
    alert("Jogadora editada com sucesso!");
    resetForm();
    renderJogadoras();
  };
}

function toggleFavorita(index) {
  const jogadoras = getJogadoras();
  jogadoras[index].favorita = !jogadoras[index].favorita;
  salvarJogadoras(jogadoras);
  renderJogadoras();
}

function resetForm() {
  document.getElementById("jogadora-form").reset();
  document.getElementById("form-title").innerText = "Adicionar Jogadora";
  document.querySelector("button[type='submit']").innerText = "Cadastrar";
  document.getElementById("cancelar-edicao").style.display = "none";
  document.getElementById("jogadora-form").onsubmit = adicionarJogadora;
}

// Inicializar
inicializarBD();
renderJogadoras();
document.getElementById("jogadora-form").onsubmit = adicionarJogadora;
document.getElementById("cancelar-edicao").onclick = resetForm;
