const Client = require("../../models/Client");
const bcryptjs = require("bcryptjs");

const clientLogin = async (req, res) => {
  const { email, password, types } = req.body;

  try {
    const clientSearch = await Client.findOne({ email: email, types: types });

    if (!clientSearch) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const passIsMatch = await bcryptjs.compare(password, clientSearch.password);

    if (!passIsMatch) {
      return res.status(400).json({ message: "Password Incorrecto" });
    }

    res.status(200).json(clientSearch);
  } catch (error) {
    res.status(500).json({ error: "Error en clientLogin...", error });
  }
};

module.exports = clientLogin;
