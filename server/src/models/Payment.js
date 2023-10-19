const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  paymentDate: {
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  paymentMethod: {
    type: String,
    required: true,
  },
  paymentHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentHistory",
    },
  ],

  professional: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professional",
    },
  ],
  client: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
});

module.exports = mongoose.model("Payment", paymentSchema);
