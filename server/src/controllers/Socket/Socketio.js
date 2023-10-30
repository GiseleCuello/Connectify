const Purchase = require('../../models/Purchase');
const Client = require('../../models/Client');
const Professional = require('../../models/Professional');
const nodemailer = require('nodemailer');
const postSocket = async (req, res) => {
  try {
    //Datos que vienen del Front
    const { clienteId, professionalId, date } = req.body;

    const newPurchase = new Purchase({
      Client: clienteId,
      Professional: professionalId,
      date: date,
    });

    //guarda la compra en la DB
    await newPurchase.save();

    await Client.findByIdAndUpdate(clienteId, {
      $push: { purchases: newPurchase._id },
    });

    //Busca el id de Socket
    const profesionalSocketId = await SocketIdProfessional(professionalId);
    // Verifica si el estado de la compra es "approved" antes de enviar notificaciones
    if (newPurchase.status === 'approved') {
      // Envía una notificación al profesional
      const profesionalSocketId = await SocketIdProfessional(professionalId);
      io.to(profesionalSocketId).emit(
        'notificacion',
        'Has recibido una nueva compra'
      );
    }
    // Busca el correo electrónico del profesional
    const professional = await Professional.findById(professionalId);
    if (!professional) {
      return res.status(404).json({ error: 'Professional not found.' });
    }

    if (newPurchase.status === 'approved') {
      // Envía un correo electrónico al profesional
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSWORDMAIL,
        },
      });
    }

    const mailOptions = {
      from: process.env.MAIL,
      to: Professional.email, // Utiliza el correo del profesional
      subject: 'Tienes una nueva compra',
      text: `¡Hola ${Professional.name}! 
      Has recibido una nueva compra de ${Client.name}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico: ' + error);
      } else {
        console.log('Correo electrónico enviado: ' + info.response);
      }
    });

    res.status(200).json('Successful purchase');
  } catch (error) {
    res.status(500).json('Error while processing the purchase');
  }
};
module.exports = postSocket;
