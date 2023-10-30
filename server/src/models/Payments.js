const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professional', // Referencia a la colección de profesionales
    required: true,
  },
  userName: {
    type: String, // Campo para almacenar el userName del cliente
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

// Antes de guardar el pago, busca el clientId basado en el userName del cliente
paymentSchema.pre('save', async function (next) {
  try {
    const Client = mongoose.model('Client');
    const client = await Client.findOne({ userName: this.userName });

    if (client) {
      this.clientId = client._id;
    } else {
      return next(new Error('Cliente no encontrado'));
    }

    next();
  } catch (error) {
    return next(error);
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;






// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   professionalId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Professional', 
//     required: true,
//   },
//   clientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Client', 
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   isCompleted: {
//     type: Boolean,
//     default: false,
//   },
// });

// const Payment = mongoose.model('Payment', paymentSchema);

// module.exports = Payment;
