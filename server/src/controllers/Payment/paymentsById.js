const Payments = require("../../models/Payments");

const paymentsById = async (req, res) => {
  try {
    const { clientId } = req.params;
    const payments = await Payments.find({clientId: clientId})
        // .populate("professionalId") 
        // .populate("clientId") 
        // .exec();

    if (!payments || payments.length === 0) {
        return res.status(404).json({ error: "Payment not found." });
    }
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

module.exports = paymentsById;
