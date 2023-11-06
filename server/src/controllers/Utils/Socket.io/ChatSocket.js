module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message, nickname) => {
      socket.broadcast.emit('message', {
        body: message,
        from: nickname,
      });
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  });
};
