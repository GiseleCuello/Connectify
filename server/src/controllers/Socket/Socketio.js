const Purchase = require("../../models/Purchase");
const Client = require("../../models/Client");
const Professional = require("../../models/Professional");
const postSocket = async (req, res) => {
  try {
    //Datos que vienen del Front
    const { clienteId, professionalId, date } = req.body;

    const newPurchase = new Purchase({
      client: clienteId,
      professional: professionalId,
      date: date,
    });

    //guarda la compra en la DB
    await newPurchase.save();

    await Client.findByIdAndUpdate(clienteId, {
      $push: { purchases: newPurchase._id },
    });

    //Busca el id de Socket
    const profesionalSocketId = await SocketIdProfessional(professionalId);
    // Emite una notificación al profesional
    io.to(profesionalSocketId).emit(
      "notificacion",
      "Has recibido una nueva compra"
    );
    res.status(200).json("Successful purchase");
  } catch (error) {
    res.status(500).json("Error while processing the purchase");
  }
};

module.exports = postSocket;
