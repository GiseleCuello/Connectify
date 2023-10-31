const uploadImage = require("../Utils/Cloudinary");
const Client = require("../../models/Client");
const nodemailer = require("nodemailer");

const clientRegister = async (req, res) => {
  try {
    const { name, lastName, userName, email, province, location, password } =
      req.body;

    const result = await uploadImage(req.files.image.tempFilePath);

    // Busca si ya existe un usuario registrado con ese correo o userName
    const existingUser = await Client.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }

    // Crea una nueva instancia de Cliente
    const newClient = new Client({
      name,
      lastName,
      userName,
      email,
      image: result.secure_url,
      password,
      province,
      location,
    });

    // Configura el servicio de envío de correos electrónicos
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORDMAIL,
      },
    });

    await newClient.save();

    // Envía un correo electrónico al cliente
    const mailOptions = {
      from: process.env.MAIL,
      to: newClient.email,
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

    res.status(201).json({ message: "Successfully registered client." });
  } catch (error) {
    res.status(500).json({ error: "Error registering client...!", error });
  }
};

module.exports = clientRegister;
