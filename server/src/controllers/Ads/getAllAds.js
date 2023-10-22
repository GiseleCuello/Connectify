const NewAd = require('../../models/NewAd');

const getAllAds = async (req, res) => {
  try {
    const ads = await NewAd.find()
    .populate("creator") // Esto poblará los datos del profesional
      .exec(); //ejecuta la consulta y obtiene resultados
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ error: 'Error creating ad.' });
  }
};

module.exports = getAllAds;
