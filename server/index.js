const server = require('./src/app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB;
const initializeSocket = require('./src/controllers/Utils/Socket');
const { Server } = require('socket.io');
const { createServer } = require('node:http');

// Conecta a MongoDB primero
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connection', error);
  });

// Luego inicia el servidor
const httpServer = createServer(server);

// Configura CORS para permitir solicitudes desde el origen de tu aplicación React
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});
// importaciones para que funcione socket.io en otro archivo
const socketChat = require('./src/controllers/Utils/Socket.io/ChatSocket');
socketChat(io);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
