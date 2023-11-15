module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message, nickname, image) => {
      socket.broadcast.emit('message', {
        body: message,
        from: nickname,
        image: image,
      });
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  });
};
