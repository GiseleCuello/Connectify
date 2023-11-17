const NewAd = require('../../models/NewAd');

const getAdsTrue = async (req, res) => {
  try {
    const ads = await NewAd.find().populate('creator').exec();

    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo anuncios.' });
  }
};

// Exportar la función para que pueda ser utilizada en otros archivos
module.exports = getAdsTrue;
