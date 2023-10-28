const Client = require("../../models/Client");

const clientDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const existingClient = await Client.findById(id);

    if (!existingClient) {
      return res.status(400).json({ message: "No se encontró al usuario" });
    }

    const isDeleted = !existingClient.isDeleted;

    const clientUpdate = await Client.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted } },
      { new: true }
    );

    res.status(200).json(clientUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor", error });
  }
};

module.exports = clientDelete;
