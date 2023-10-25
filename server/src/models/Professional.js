const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const professionalSchema = new mongoose.Schema({
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
    required: true,
  },

  profession: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  province: {
    type: [String],
    required: true,
  },
  location: {
    type: [String],
    required: true,
  },

  workingRange: {
    provinceJob: {
      type: [String],
    },
    locationJob: {
      type: [String],
    },
  },
  remoteWork: {
    type: Boolean,
    required: true,
  },
  isDeleted: {
    // Inicialmente, no se ha borrado lógicamentenpm install bcrypt
    type: Boolean,
    default: false,
  },
  socketId: {
    type: String, // Almacena el socket.id del profesional
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional", // Referencia al usuario creador
  },
  clientComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewAd",
    },
  ],
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  purchase: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchase",
    },
  ],
});

professionalSchema.pre("save", function (next) {
  const professional = this;

  if (!professional.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(professional.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      professional.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("Professional", professionalSchema);
