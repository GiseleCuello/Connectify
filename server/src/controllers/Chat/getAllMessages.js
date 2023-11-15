const Message = require('../../models/Chat');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ timestamp: 1 }).exec();

    if (!messages || messages.length === 0) {
      return res.status(404).json({
        error: 'No se encontraron mensajes',
      });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener los mensajes',
    });
  }
};

module.exports = getMessages;
