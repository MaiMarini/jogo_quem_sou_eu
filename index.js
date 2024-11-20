// Array para armazenar os dados dos usuários
let usuarios = [];

// Função para pegar um nome aleatório da lista
function personagemAleatorio(personagens) {
  const indice = Math.floor(Math.random() * personagens.length);
  return personagens[indice];
}

// Supondo que você tenha o código já implementado para o sorteio do personagem e o nome do usuário

$(window).on("load", function () {
  document.getElementById("btnEntrar").addEventListener("click", (event) => {
    event.preventDefault(); // Previne o recarregamento da página

    const nomeUsuario = document.getElementById("nomeUsuario").value;

    if (!nomeUsuario) {
      alert("Por favor, insira seu nome.");
      return;
    }
    // Armazenar o nome do usuário no localStorage
    localStorage.setItem("usuarioNome", nomeUsuario);
    // Carregar a lista de personagens do arquivo JSON
    fetch("personagens.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Erro ao carregar o arquivo JSON: " + response.status
          );
        }
        return response.json();
      })
      .then((personagens) => {
        // Obter um personagem aleatório da lista
        const personagemSorteado = personagemAleatorio(personagens);

        // Armazenar dados do usuário
        const dadosUsuario = {
          nomeUsuario: nomeUsuario,
          personagemSecreto: personagemSorteado,
        };

        // Recuperar o array de usuários do localStorage, ou iniciar um novo array
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Adicionar o novo usuário ao array
        usuarios.push(dadosUsuario);

        // Armazenar novamente o array de usuários no localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Redireciona para a página de jogo após 2 segundos
        setTimeout(() => {
          window.location.href = "jogo.html";
        }, 2000);
      })
      .catch((error) =>
        console.error("Erro ao carregar a lista de personagens:", error)
      );
  });
});
