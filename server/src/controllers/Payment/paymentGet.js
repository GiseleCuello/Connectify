const Payments = require("../../models/Payments");

const paymentsGet = async (req, res) => {
  try {
    const payments = await Payments.find()
    
    if (!payments || payments.length === 0) {
        return res.status(404).json({ error: "Payment GET not found." });
    }
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

module.exports = paymentsGet;
