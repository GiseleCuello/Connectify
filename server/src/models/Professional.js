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
    type: Array,
  },
});

module.exports = mongoose.model("Professional", professionalSchema);
