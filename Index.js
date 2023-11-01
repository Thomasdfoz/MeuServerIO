const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.use((socket, next) => {
    if (socket.handshake.query.token === "UNITY") {
        next();
    } else {
        next(new Error("Authentication error"));
    }
});

io.on('connection', (socket) => {
  console.log('Um cliente se conectou');

  socket.on('disconnect', () => {
    console.log('Um cliente se desconectou');
  });

  // Aqui você pode adicionar lógica para lidar com eventos personalizados
  socket.on('ola', (data) => {
      console.log('Recebido: ' + data);
      socket.emit('ola', {date: new Date().getTime(), data: data});
    // Você pode emitir uma resposta ou fazer qualquer outra ação aqui
  });
});

const port = 3000; // Você pode alterar a porta conforme necessário
server.listen(port, () => {
  console.log('Servidor Socket.io rodando na porta ' + port);
});
