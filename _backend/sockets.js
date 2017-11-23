const ws = require('ws');

let sockets = [];

exports.connect = httpServer => {
  const wsServer = new ws.Server({
    server: httpServer,
  });

  wsServer.on('connection', socket => {
    sockets.push(socket);

    socket.on('close', () => {
      console.log('disconnected');
      sockets = sockets.filter(savedSocket => savedSocket !== socket);
    });

    socket.on('message', data => {
      console.log(data);
      sockets.forEach(socket => socket.send(data));
    });
  });
};
