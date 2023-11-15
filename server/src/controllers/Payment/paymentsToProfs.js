const Payments = require("../../models/Payments");
const Clients = require("../../models/Client");

const paymentsToProfs = async (req, res) => {
  try {
    const { _id } = req.params;

    const payments = await Payments.find({ professionalId: _id });

    const clientsData = await Promise.all(
      payments.map(async (payment) => {
        try {
          const client = await Clients.findOne({ userName: payment.userName })
            .select("name lastName userName email image profession")
            .exec();
          return client;
        } catch (error) {
          return null;
        }
      })
    );

    const combinedData = payments.map((payment, index) => ({
      ...payment.toObject(),
      clientData: clientsData[index],
    }));

    console.log(combinedData);

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = paymentsToProfs;

// const Payments = require("../../models/Payments");
// const Clients = require("../../models/Client"); // Import the Client model

// const paymentsToProfs = async (req, res) => {
//   try {
//     const { _id } = req.params;

//     const payments = await Payments.find({ professionalId: _id })
//         .populate({
//           path: "userName",
//       model: Clients,
//       select: "name lastName userName email image profession",
//         })
//       .exec();

//     console.log(payments);

//     res.status(200).json(payments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = paymentsToProfs;
