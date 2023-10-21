const server = require("./src/app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB;
const initializeSocket = require("./src/controllers/Utils/Socket")

// Conecta a MongoDB primero
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    // Luego inicia el servidor
    const httpServer = server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    // Inicializa Socket.io y pasa el servidor HTTP
    const io = initializeSocket(httpServer);
  })
  .catch((error) => {
    console.error("Error connection", error);
  });
