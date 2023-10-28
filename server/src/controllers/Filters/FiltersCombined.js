const NewAd = require('../../models/NewAd');

const filtersCombined = async (req, res) => {
  try {
    let query = NewAd.find();

    // Verifica si se ha especificado un filtro de ubicación en la URL
    if (req.query.location) {
      query = query.where({ location: req.query.location });
    }

    // Verifica si se especifica la ordenación por precio
    if (req.query.minPrice && req.query.maxPrice) {
      query = query.where({
        price: {
          $gte: req.query.minPrice,
          $lte: req.query.maxPrice, // Convierte a número
        },
      });
    }

    // Verifica si se ha especificado una profesión para filtrar
    if (req.query.profession) {
      query = query.where({ profession: req.query.profession });
    }

    const ads = await query
      .populate('creator') // Esto poblará los datos del profesional
      .exec(); //ejecuta la consulta y obtiene resultados
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los anuncios' });
  }
};

module.exports = filtersCombined;
