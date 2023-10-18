const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const pasportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const clientSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  secret: {
    type: String,
  },
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
clientSchema.pre("save", function (next) {
  const client = this;

  // Solo hashear la contraseña si es nueva o ha sido modificada
  if (!client.isModified("password")) {
    return next();
  }

  // Cadena aleatoria que se agrega a la contraseña antes de aplicar la función de hash
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(client.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      client.password = hash;
      next();
    });
  });
});

clientSchema.plugin(pasportLocalMongoose);

clientSchema.plugin(findOrCreate);

module.exports = mongoose.model("Client", clientSchema);
