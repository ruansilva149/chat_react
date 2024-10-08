const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Um cliente se conectou");

  socket.on('join_room', (room) => {
    socket.join(room); console.log(`Cliente entrou no canal: ${room}`);
  })

  //Formulario 1
  socket.on('send_message_user1', ({room, message}) =>{
    
    io.to(room).emit('receive_message', message)
  })

  //Formulario 2
  socket.on('send_message_user2', ({room, message}) =>{
    io.to(room).emit('receive_message', message)
  })


  socket.on("disconnect", () => {
    console.log("Um cliente se desconectou");
  });
});

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
}); 
