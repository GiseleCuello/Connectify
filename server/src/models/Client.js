const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  adress: {
    province: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  isDeleted: {
    // Inicialmente, no se ha borrado lógicamente
    type: Boolean,
    default: false,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  }
});

module.exports = mongoose.model("Client", clientSchema);
