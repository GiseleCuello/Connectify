const Professional = require("../../models/Professional");
const uploadImage = require("../Utils/Cloudinary");
const nodemailer = require("nodemailer");

const professionalRegister = async (req, res) => {
  try {
    const {
      name,
      lastName,
      userName,
      email,
      province,
      location,
      password,
      profession,
      description,
      provinceJob,
      locationJob,
      price,
      remoteWork,
    } = req.body;

    const result = await uploadImage(req.files.image.tempFilePath);

    // Busca si hay un Usuario ya registrado con ese nombre
    const professionalFound = await Professional.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    // Aca busca si no esta registrado
    if (professionalFound) {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }

    const newProfessional = new Professional({
      name,
      lastName,
      userName,
      email,
      image: result.secure_url,
      password,
      province,
      location,
      profession,
      description,
      provinceJob,
      locationJob,
      price,
      remoteWork,
    });

    // Configura el servicio de envío de correos electrónicos
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORDMAIL,
      },
    });

    await newProfessional.save();

    // Envía un correo electrónico al cliente
    const mailOptions = {
      from: process.env.MAIL,
      to: newProfessional.email,
      subject: "Gracias por registrarte",
      text: "Gracias por registrarte en nuestra aplicación. Ya podes comenzar a disfrutar de nuestros servicios.",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo electrónico:", error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
      }
    });

    res.status(201).json({ message: "Profesional registrado exitosamente" });
  } catch (error) {
    console.error("Error en la función professionalRegister:", error);
    res.status(502).json({ error: "Error del servidor" });
  }
};

module.exports = professionalRegister;
