const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
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
  address: {
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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
});

// Middleware para hashear la contraseña antes de guardar
clientSchema.pre("save", async function (next) {
  const client = this;

  // Solo hashear la contraseña si es nueva o ha sido modificada
  if (!client.isModified("password")) {
    return next();
  }

  try {
    client.password = await bcrypt.hash(client.password, 10);
    next();
  } catch (error) {
    return next("Error CLient.js...", error);
  }



});

module.exports = mongoose.model("Client", clientSchema);
