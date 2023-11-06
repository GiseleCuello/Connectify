const NewAd = require('../../models/NewAd');

const filtersCombined = async (req, res) => {
  try {
    let filterConditions = {};

    if (req.query.location) {
      filterConditions.location = req.query.location;
    }

    if (req.query.minPrice && req.query.maxPrice) {
      filterConditions.price = {
        $gte: req.query.minPrice,
        $lte: req.query.maxPrice,
      };
    }

    if (req.query.profession) {
      filterConditions.profession = req.query.profession;
    }

    if (req.query.workLocation === 'Remoto') {
      filterConditions.workLocation = req.query.workLocation;
    } else if (req.query.workLocation === 'Presencial') {
      filterConditions.workLocation = req.query.workLocation;
    }

    let query = NewAd.find(filterConditions);

    if (req.query.sortPrice === 'asc') {
      query = query.sort({ price: 1 });
    } else if (req.query.sortPrice === 'desc') {
      query = query.sort({ price: -1 });
    }

    const ads = await query.populate('creator').exec();

    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los anuncios' });
  }
};

module.exports = filtersCombined;
