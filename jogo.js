// Recuperar o nome do usuário e os dados dos usuários do localStorage
const nomeUsuario = localStorage.getItem("usuarioNome");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Verificar se o nome do usuário foi recuperado corretamente
if (!nomeUsuario) {
  console.error("Nome do usuário não encontrado!");
  alert("Erro: Nome do usuário não encontrado.");
}

const listaUsuarios = document.getElementById("usuarios-lista");

// Adicionar o próprio usuário sem mostrar seu personagem
const usuarioCard = document.createElement("div");
usuarioCard.classList.add("usuario-card");
usuarioCard.innerHTML = `<div><strong>${nomeUsuario}</strong></div><div>Você está jogando!</div>`;
listaUsuarios.appendChild(usuarioCard);

// Adicionar os outros usuários
usuarios.forEach((usuario) => {
  if (usuario.nomeUsuario !== nomeUsuario) {
    const card = document.createElement("div");
    card.classList.add("usuario-card");
    card.innerHTML = `<div><strong>${usuario.nomeUsuario}</strong></div><div>Personagem: ${usuario.personagemSecreto}</div>`;
    listaUsuarios.appendChild(card);
  }
  console.log(usuarios);
});
