const Payments = require("../../models/Payments");

const paymentsByUser = async (req, res) => {
  try {
    const { userName } = req.params;



    const payments = await Payments.find({userName: userName})
        .populate({
          path: "professionalId",
          select: "name lastName userName email image profession",
        }) 
        
        
        .exec();

   
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

module.exports = paymentsByUser;
