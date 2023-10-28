const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const pasportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");


const clientSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
   
  },
  lastName: {
    type: String,
    
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
    
  },
  image: {
    type: String,
  },
 
    province: {
      type: String,
      
    },
    location: {
      type: String,
      
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
  purchase: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchase",
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

clientSchema.plugin(pasportLocalMongoose);

clientSchema.plugin(findOrCreate);

module.exports = mongoose.model("Client", clientSchema);


