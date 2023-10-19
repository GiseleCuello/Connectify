const server = require('./src/app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB;

// Conecta a MongoDB primero
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    // Luego inicia el servidor
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connection', error);
  });
