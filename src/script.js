let jogadoras = [
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

function salvar() {
  localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
}

function carregar() {
  const dados = localStorage.getItem("jogadoras");
  if (dados) {
    jogadoras = JSON.parse(dados);
  }
}

function mostrarJogadoras() {
  carregar();
  const div = document.getElementById("jogadoras-container");
  div.innerHTML = "";
  jogadoras.forEach((j, i) => {
    div.innerHTML += `
      <div class="card">
        <img src="${j.foto}">
        <h3>${j.nome}</h3><br>
        <span>Posição: ${j.posicao}</span><br>
        <span>Clube: ${j.clube}</span><br>
        <span>Gols: ${j.gols} | Assistências: ${j.assistencias} | Jogos: ${j.jogos}</span><br>
        <button onclick="editar(${i})">Editar</button>
        <button onclick="remover(${i})">Excluir</button>
        <button onclick="favorita(${i})" class="${j.favorita ? 'favorita' : ''}">${j.favorita ? "❤️" : "🤍"}</button>
      </div>
    `;
  });
}

function adicionar(event) {
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

  jogadoras.push({
    nome, posicao, clube, foto,
    gols, assistencias, jogos,
    favorita: false
  });
  salvar();
  mostrarJogadoras();
  alert("Jogadora adicionada com sucesso!");
  document.getElementById("jogadora-form").reset();
}

function remover(i) {
  jogadoras.splice(i, 1);
  salvar();
  mostrarJogadoras();
  alert("Jogadora removida com sucesso!");
}

function editar(i) {
  const j = jogadoras[i];
  document.getElementById("nome").value = j.nome;
  document.getElementById("posicao").value = j.posicao;
  document.getElementById("clube").value = j.clube;
  document.getElementById("foto").value = j.foto;
  document.getElementById("gols").value = j.gols;
  document.getElementById("assistencias").value = j.assistencias;
  document.getElementById("jogos").value = j.jogos;

  document.getElementById("form-title").innerText = "Editar Jogadora";
  document.querySelector("button[type='submit']").innerText = "Salvar";
  document.getElementById("cancelar-edicao").style.display = "inline";

  document.getElementById("jogadora-form").onsubmit = function(e) {
    e.preventDefault();
    jogadoras[i] = {
      nome: document.getElementById("nome").value,
      posicao: document.getElementById("posicao").value,
      clube: document.getElementById("clube").value,
      foto: document.getElementById("foto").value,
      gols: document.getElementById("gols").value,
      assistencias: document.getElementById("assistencias").value,
      jogos: document.getElementById("jogos").value,
      favorita: j.favorita
    };
    salvar();
    mostrarJogadoras();
    alert("Jogadora editada com sucesso!");
    resetarForm();
  };
}

function favorita(i) {
  jogadoras[i].favorita = !jogadoras[i].favorita;
  salvar();
  mostrarJogadoras();
}

function resetarForm() {
  document.getElementById("jogadora-form").reset();
  document.getElementById("form-title").innerText = "Adicionar Jogadora";
  document.querySelector("button[type='submit']").innerText = "Cadastrar";
  document.getElementById("cancelar-edicao").style.display = "none";
  document.getElementById("jogadora-form").onsubmit = adicionar;
}

carregar();
mostrarJogadoras();
document.getElementById("jogadora-form").onsubmit = adicionar;
document.getElementById("cancelar-edicao").onclick = resetarForm;
