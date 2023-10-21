const Professional = require("../../models/Professional")
const initializeSocket = (httpServer) => {
    const io = require("socket.io")(httpServer);
  
    io.on("connection", (socket) => {
      console.log(`Client connect: ${socket.id}`);
  
      // Manejo del evento "login"
      socket.on("login", (professionalId) => {
        // Asocia el socket.id del profesional con su perfil
        Professional.findByIdAndUpdate(professionalId, { socketId: socket.id }, (error) => {
          if (error) {
            console.error(`Error in socketId: ${error}`);
          }
        });
      })
    });
  
    return io;
  };
  
  module.exports = initializeSocket;
 