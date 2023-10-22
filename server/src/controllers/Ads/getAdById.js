const NewAd = require('../../models/NewAd');

const getAdById = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await NewAd.findById(id)
    .populate("creator") 
      .exec();
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found.' });
    }
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ error: 'Error getting ad.' });
  }
};

module.exports = getAdById;
