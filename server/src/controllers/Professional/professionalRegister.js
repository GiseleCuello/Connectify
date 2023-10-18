const Professional = require('../../models/Professional');
const Client = require('../../models/Client');
const uploadImage = require('../Utils/Cloudinary');

const professionalRegister = async (req, res) => {
  try {
    const {
      name,
      lastName,
      username,
      email,
      province,
      location,
      password,
      profession,
      description,
      workingRange,
      price,
      remoteWork,
    } = req.body;

    const result = await uploadImage(req.files.image.tempFilePath);

    // Busca si hay un Usuario ya registrado con ese nombre
    const professionalFound = await Professional.findOne({
      $or: [{ email: email }, { username: username }],
    });

    const clientFound = await Client.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (professionalFound || clientFound) {
      return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    const newProfessional = new Professional({
      name,
      lastName,
      username,
      email,
      image: result.secure_url,
      password,
      province,
      location,
      profession,
      description,
      workingRange,
      price,
      remoteWork,
    });

    await newProfessional.save();

    res.status(201).json({ message: 'Profesional registrado exitosamente' });
  } catch (error) {
    console.error('Error en la función professionalRegister:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = professionalRegister;
