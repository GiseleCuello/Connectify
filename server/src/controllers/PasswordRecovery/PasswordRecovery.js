const Professional = require('../../models/Professional');
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

const RequestRecoveryPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const professional = await Professional.findOne({ email });

    if (!professional) {
      return res.status(404).json({ message: 'Email no encontrado' });
    }
    const tokenRecovery = generarToken(professional._id);
    const expiresIn = new Date(Date.now() + 3600000); // 1 hora

    professional.tokenRecovery = tokenRecovery;
    professional.expiresIn = expiresIn;
    await professional.save();

    // Configuración del correo electrónico
    const mailOptions = {
      from: EmailConnectify,
      to: professional.email,
      subject: 'Recuperación de contraseña',
      text: `Utiliza el siguiente enlace para restablecer tu contraseña: http://localhost:5173/recovery/reset-password/${tokenRecovery}`,
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

const ResetPassword = async (req, res) => {
  try {
    const { tokenRecovery, NewPassword } = req.body;

    const professional = await Professional.findOne({
      tokenRecovery: tokenRecovery,
      expiresIn: { $gt: new Date() },
    });

    if (!professional) {
      return res.status(404).json({ message: 'Token no valido o expirado' });
    }

    professional.password = NewPassword;
    professional.tokenRecovery = null;
    professional.expiresIn = null;
    await professional.save();

    res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  ResetPassword,
  RequestRecoveryPassword,
};
