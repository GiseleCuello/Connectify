const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  status:{
    type: String,
    require: true,
  },
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
});

module.exports = mongoose.model("Purchase", purchaseSchema);