const Client = require("../../models/Client");

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().exec();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllClients;
