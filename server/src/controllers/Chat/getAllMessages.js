const Message = require('../../models/Chat');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ timestamp: 1 }).exec();

    if (!messages || messages.length === 0) {
      return res.status(404).json({
        error: 'No se encontraron mensajes',
      });
    }

    // Mapear los mensajes para enviar la información del usuario al cliente
    const messagesWithUserInfo = messages.map((message) => {
      return {
        message: message.message,
        from: message.from,
        image: message.image,
        timestamp: message.timestamp,
      };
    });

    res.status(200).json(messagesWithUserInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener los mensajes',
    });
  }
};

module.exports = getMessages;
