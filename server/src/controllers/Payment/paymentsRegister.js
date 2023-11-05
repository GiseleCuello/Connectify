const Payment = require("../../models/Payments");
const Professional = require("../../models/Professional");
const Client = require("../../models/Client");
const { sendPurchaseNotification } = require("../Utils/PurchaseSocket");

const paymentsRegister = async (req, res) => {
  console.log("DATOS register...", req.body);

  try {
    const { userName, professionalId, date, isCompleted, paymentID } = req.body;

    // Creo una nueva instancia de Cliente...
    const payment = new Payment({
      userName,
      professionalId,
      date,
      isCompleted,
      paymentID,
    });

    await payment.save();

    res.status(201).json({ message: "Successfully registered Payment." });

    const notificationPurchase = "¡Tenes una nueva contratación!";
  } catch (error) {
    res.status(501).json({ error: "Error registering Payment...!", error });
  }
};

module.exports = paymentsRegister;
