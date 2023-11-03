const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema({
  userName: {
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
  types: {
    type: String,
    default: "admin",
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

adminSchema.pre("save", function (next) {
  const admin = this;

  if (!admin.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(admin.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      admin.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("Admin", adminSchema);
