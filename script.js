const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Middleware para servir arquivos estáticos (incluindo seu 'index.html' e 'script.js')
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let usuarios = []; // Para armazenar os dados dos usuários

io.on("connection", (socket) => {
  console.log("a user connected");

  // Envia a lista de usuários para todos os clientes conectados
  socket.emit("atualizar usuarios", usuarios);

  // Quando um usuário envia seu nome, sorteia um personagem e envia para todos os clientes
  socket.on("novo usuario", (nomeUsuario) => {
    // Sorteio do personagem
    fetchPersonagem().then((personagemSorteado) => {
      // Armazenar o novo usuário
      const dadosUsuario = {
        nomeUsuario,
        personagemSecreto: personagemSorteado,
      };
      usuarios.push(dadosUsuario);

      // Emite para todos os clientes a adição do novo usuário
      io.emit("novo usuario", dadosUsuario);
    });
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

// Função para simular o sorteio de um personagem
function fetchPersonagem() {
  return new Promise((resolve, reject) => {
    // Simula o sorteio de personagem
    const personagens = ["Personagem1", "Personagem2", "Personagem3"];
    const personagemSorteado =
      personagens[Math.floor(Math.random() * personagens.length)];
    resolve(personagemSorteado);
  });
}
