const NewAd = require('../../models/NewAd');

// Controlador para crear un anuncio
const createAd = async (req, res) => {
  try {
    const creatorId = req.body.creator;
    // Verificar la cantidad de anuncios existentes para el creador
    const existingAdsCount = await NewAd.countDocuments({ creator: creatorId });

    // Permitir la creación si el número de anuncios existentes es menor que 2
    if (existingAdsCount < 4) {
      const newAdData = await NewAd.create(req.body);
      console.log(newAdData);
      res.status(201).json(newAdData);
    } else {
      res
        .status(400)
        .json({ error: 'No se pueden crear más de dos anuncios.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error creating ad.', error });
  }
};

module.exports = createAd;
