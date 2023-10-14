const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  professionalRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
  },
  isDeleted: {
    // Inicialmente, no se ha borrado lógicamente
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Client", clientSchema);
