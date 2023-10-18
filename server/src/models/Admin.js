const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema({
  username: {
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
  isAdmin: {
    type: Boolean,
    default: false,
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
      next();npm
    });
  });
});

module.exports = mongoose.model("Admin", adminSchema);
