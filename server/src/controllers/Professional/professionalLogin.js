const Professional = require("../../models/Professional");

const bcrypt = require("bcryptjs");

const professionalLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const professionalFound = await Professional.findOne({ email:email });

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
