const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professional",
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    // Añadir luego otras propiedades relacionadas con el pago, como número de factura, estado, etc.
});

module.exports = mongoose.model("Payment", paymentSchema);