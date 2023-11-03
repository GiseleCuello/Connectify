const Professional = require("../../models/Professional");
const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");

const professionalLogin = async (req, res) => {
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

    const professionalFound = await Professional.findOne({
      email: email,
      types: types,
    });

    if (!professionalFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const passwordIsMatch = await bcrypt.compare(
      password,
      professionalFound.password
    );

    if (!passwordIsMatch) {
      return res.status(400).json({ message: "Password Incorrecto" });
    }

    res.status(200).json(professionalFound);
  } catch (error) {
    res.status(500).json({ error: "Error professionalLogin...", error });
  }
};

module.exports = professionalLogin;
