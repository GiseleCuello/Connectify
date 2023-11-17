const newMessage = require('../../models/Messages');
const nodemailer = require('nodemailer');
require('dotenv').config();
const EmailConnectify = process.env.MAIL;
const PasswordConnectify = process.env.PASSWORDMAIL;

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EmailConnectify,
    pass: PasswordConnectify,
  },
});

const NewMessageAdmin = async (req, res) => {
  try {
    const { message, name, email } = req.body;

    // Guarda el mensaje en la base de datos
    const savedMessage = await newMessage.create({
      name: name,
      email: email,
      message: message,
    });

    // Configura el contenido del correo electrónico para el administrador
    const adminMailOptions = {
      from: name,
      to: EmailConnectify,
      subject: 'Nuevo mensaje del formulario de contacto',
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
    };

    // Envía el correo electrónico al administrador
    await transporter.sendMail(adminMailOptions);

    // Configura el contenido del correo electrónico de agradecimiento
    const userMailOptions = {
      from: 'Tu Nombre', // Puedes personalizar el remitente
      to: email,
      subject: 'Gracias por tu mensaje',
      text: 'Gracias por contactarte con nosotros. Pronto recibirás una respuesta.',
    };

    // Envía el correo electrónico de agradecimiento al usuario
    await transporter.sendMail(userMailOptions);

    res.status(200).json({
      success: true,
      message:
        '¡Correo electrónico enviado con éxito! Por favor, espera en tu bandeja de entrada la respuesta del administrador. ¡Gracias por tu mensaje!',
      savedMessage,
    });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error al enviar el correo' });
  }
};

module.exports = NewMessageAdmin;
