const Professional = require("../../models/Professional");
const Client = require("../../models/Client");

const professionalRegister = async (req, res) => {
  try {
    const {
      name,
      lastName,
      username,
      email,
      image,
      address,
      password,
      profession,
      description,
      workingRange,
      price,
      remoteWork,
    } = req.body;

    // Busca si hay un Usuario ya registrado con ese nombre
    const professionalFound = await Professional.findOne({
      $or: [{ email: email }, { username: username }],
    });

    const clientFound = await Client.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (professionalFound || clientFound) {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }

    const newProfessional = new Professional({
      name,
      lastName,
      username,
      email,
      image,
      password,
      address,
      profession,
      description,
      workingRange,
      price,
      remoteWork,
    });

    if (!newProfessional) {
      return res.status(400).json({ message: "No se pudo registrar" });
    }

    await newProfessional.save();

    res.status(201).json({ message: "Profesional registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error del servido", error });
  }
};

module.exports = professionalRegister;
