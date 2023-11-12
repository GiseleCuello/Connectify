const Client = require('../../models/Client');
const jwt = require('jsonwebtoken');
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

// Función para generar un token JWT
const generarToken = (userId) => {
  const secretKey = 'MiClaveSecreta123';
  const payload = { userId };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secretKey, options);
};

const ClientRequestRecoveryPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(404).json({ message: 'Email no encontrado' });
    }
    const tokenRecovery = generarToken(client._id);
    const expiresIn = new Date(Date.now() + 3600000); // 1 hora

    client.tokenRecovery = tokenRecovery;
    client.expiresIn = expiresIn;
    await client.save();

    // Configuración del correo electrónico
    const mailOptions = {
      from: EmailConnectify,
      to: client.email,
      subject: 'Recuperación de contraseña',
      html: `
        <p>Hola ${client.name},</p>
        <p>Has solicitado restablecer tu contraseña en Connectify. Utiliza el siguiente enlace para completar el proceso:</p>
        <p><a href="http://localhost:5173/recovery/reset-password/${tokenRecovery}">Restablecer Contraseña</a></p>
        <p>Este enlace es válido por 1 hora.</p>
        <p>Si no solicitaste este restablecimiento, ignora este correo electrónico.</p>
        <p>Gracias,</p>
        <p>El equipo de Connectify</p>
    `,
    };

    // Enviar correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
      } else {
        console.log('Correo electrónico enviado: ' + info.response);
        res.status(200).json({ mensaje: 'Correo electrónico enviado' });
      }
    });
  } catch (error) {
    console.error('Error al solicitar recuperación de contraseña:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const ClientResetPassword = async (req, res) => {
  try {
    const { tokenRecovery, NewPassword } = req.body;

    const client = await Client.findOne({
      tokenRecovery: tokenRecovery,
      expiresIn: { $gt: new Date() },
    });

    if (!client) {
      return res.status(404).json({ message: 'Token no valido o expirado' });
    }

    client.password = NewPassword;
    client.tokenRecovery = null;
    client.expiresIn = null;
    await client.save();

    res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  ClientResetPassword,
  ClientRequestRecoveryPassword,
};
