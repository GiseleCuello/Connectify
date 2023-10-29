const Payment = require("../../models/Payments");
const Professional = require("../../models/Professional");
const Client = require("../../models/Client");


const paymentsRegister = async (req, res) => {
  
  console.log("DATOS register...", req.body);
  
  try {
    const { clientId, professionalId, date, isCompleted } = req.body;

    // Creo una nueva instancia de Cliente...
    const payment = new Payment({
      clientId,
      professionalId,
      date,
      isCompleted
    });

    await payment.save();

    res.status(201).json({ message: "Successfully registered Payment." });
  } catch (error) {
    console.log("ERROR...", error);
    res.status(501).json({ error: "Error registering Payment...!", error });
  }
};

module.exports = paymentsRegister;
