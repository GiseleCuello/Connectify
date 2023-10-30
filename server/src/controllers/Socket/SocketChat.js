const Message = require('../../models/Chat');

io.on('connection', (socket) => {
  console.log(socket.id);
});
