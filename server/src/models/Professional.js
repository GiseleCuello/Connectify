const mongoose = require("mongoose");

const professionalSchema = mongoose.Schema({
  name: {
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
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  remoteWork: {
    type: Boolean,
    required: true,
  },
  CustomerComments: {
    type: [
      {
        comment: String,
        date: Date,
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Client",
        },
      },
    ],
  },
  isDeleted: {
    // Inicialmente, no se ha borrado lógicamente
    type: Boolean,
    default: false,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al usuario creador
  },
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
  }
});

module.exports = mongoose.model("Professional", professionalSchema);
