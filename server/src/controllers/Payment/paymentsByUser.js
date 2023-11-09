const Payments = require("../../models/Payments");

const paymentsByUser = async (req, res) => {
  try {
    const { userName } = req.params;

    console.log(userName);

    const payments = await Payments.find({ userName: userName })
      .populate({
        path: "professionalId",
        select: "name lastName userName email image profession",
      })
      .exec();

    console.log(payments);

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = paymentsByUser;
