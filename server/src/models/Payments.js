const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professional', // Referencia a la colección de profesionales
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Referencia a la colección de clientes
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
