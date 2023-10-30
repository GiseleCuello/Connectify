const Payments = require("../../models/Payments");

const paymentsByUser = async (req, res) => {
  try {
    const { clientUser } = req.params;

    console.log("CLIENT...", clientUser)

    const payments = await Payments.find({userName: clientUser})
        .populate({
          path: "professionalId",
          select: "name lastName userName email",
        }) 
        
        // .populate("clientId") 
        .exec();

    if (!payments || payments.length === 0) {
        return res.status(404).json({ error: "Payment Find not found." });
    }
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

module.exports = paymentsByUser;
