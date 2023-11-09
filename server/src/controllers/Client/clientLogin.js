const Client = require("../../models/Client");
const Admin = require("../../models/Admin");
const bcryptjs = require("bcryptjs");

const clientLogin = async (req, res) => {
  const { email, password, types } = req.body;

  try {
    const adminSearch = await Admin.findOne({ email: email });

    if (adminSearch) {
      const passIsMatch = await bcryptjs.compare(
        password,
        adminSearch.password
      );

      if (!passIsMatch) {
        return res.status(400).json({ message: "Password Incorrecto" });
      }

      return res.status(200).json(adminSearch);
    }

    const clientSearch = await Client.findOne({ email: email, types: types });

    if (!clientSearch) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (clientSearch.isGoogleUser) {
      return res.status(200).json({ message: "Ha iniciado sesion con Google" });
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
