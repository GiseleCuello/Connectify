const Professional = require('../../models/Professional');
const Client = require('../../models/Client');
const uploadImage = require('../Utils/Upload.js');

const professionalRegister = async (req, res) => {
  try {
    const {
      name,
      lastName,
      username,
      email,
      address,
      password,
      profession,
      description,
      workingRange,
      price,
      remoteWork,
    } = req.body;

    // Obtén la imagen del avatar del cuerpo de la solicitud
    const image = req.files.image;

    // Restringe la carga solo a profesionales con una imagen
    if (!image) {
      return res
        .status(400)
        .json({ message: 'La imagen del avatar es obligatoria' });
    }

    // Procesa y carga la imagen utilizando la función uploadImage
    const { downloadURL } = await uploadImage(image[0]);

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
      image: downloadURL,
      password,
      address,
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
