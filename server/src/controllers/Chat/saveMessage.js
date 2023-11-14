const Message = require('../../models/Chat');

const saveMessage = async (req, res) => {
  const { message, from, image } = req.body;

  try {
    const messageObj = new Message({
      message: message,
      from: from,
      image: image,
    });

    await messageObj.save();
    res.status(200).json({ message: 'Mensaje guardado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
};

module.exports = saveMessage;
