const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema({
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
    required: true,
  },
  rate: {
    type: Number,
    default: 0,
  },
  profession: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
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
  workingRange: {
    provinceJob: {
      type: [String],
    },
    locationJob: {
      type: [String],
    },
  },
  price: {
    type: Number,
    default: 1000,
  },
  remoteWork: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Professional", professionalSchema);
