const Professional = require("../models/Professional");
const Client = require("../models/Client");
const bcrypt = require("bcryptjs");

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

const professionalLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const professionalFound = await Professional.findOne({ email });

    console.log(professionalFound);

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
    res.status(500).json({ error: "Error del servido", error });
  }
};

const professionalSearch = async (req, res) => {
  const { profession } = req.params;

  try {
    const professionalFound = await Professional.find({ profession });

    if (!professionalFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(professionalFound);
  } catch (error) {
    res.status(500).json({ error: "Error del servido", error });
  }
};

const getProfessionalById = async (req, res) => {
  const { id } = req.params;

  try {
    const professionalUpdate = await Professional.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!professionalUpdate) {
      return res.status(400).json({ message: "No se ha podido actualizar" });
    }

    res.status(200).json(professionalUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error del servido", error });
  }
};

const professionalDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const professionalUpdate = await Professional.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!professionalUpdate) {
      return res.status(400).json({ message: "No se ha podido actualizar" });
    }

    res.status(200).json(professionalUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error del servido", error });
  }
};

module.exports = {
  professionalRegister,
  professionalLogin,
  professionalSearch,
  getProfessionalById,
  professionalDelete,
};
