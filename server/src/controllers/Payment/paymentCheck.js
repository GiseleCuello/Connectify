const Payments = require("../../models/Payments");

const paymentCheck = async (req, res) => {
  try {
    const { paymentID } = req.params;

    console.log(paymentID);

    const existingPayment = await Payments.findOne({ paymentID });

    console.log(existingPayment);

    if (existingPayment) {
      // Si existe un registro con el mismo paymentID, devuelve un mensaje de éxito.
      res.status(200).json({ exists: true });
    } else {
      // Si no existe un registro con el mismo paymentID, devuelve un mensaje indicando que no existe.
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = paymentCheck;
