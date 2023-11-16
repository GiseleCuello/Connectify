const Client = require("../../models/Client");

const clientDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const existingClient = await Client.findById(id);

    if (!existingClient) {
      return res.status(400).json({ message: "No se encontró al usuario" });
    }
    let types = "";
    const isDeleted = !existingClient.isDeleted;
    if (existingClient.types === "professional") {
      types = "professionat";
    } else {
      if (existingClient.types === "professionat") {
        types = "professional";
      } else {
        if (existingClient.types === "client") {
          types = "clienl";
        } else {
          if (existingClient.types === "clienl") {
            types = "client";
          }
        }
      }
    }
    const clientUpdate = await Client.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted, types: types } },
      { new: true }
    );

    res.status(200).json(clientUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor", error });
  }
};

module.exports = clientDelete;
