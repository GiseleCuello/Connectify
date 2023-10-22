const NewAd = require('../../models/NewAd');

const updateAdById = async (req, res) => {
  const { id } = req.params;

  try {
    const updateAd = await NewAd.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    })
    .populate("creator");
    if (!updateAd) {
      return res.status(404).json({ error: 'Ad not found.' });
    }
    res.status(200).json(updateAd);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Error del servidor', error });
  }
};

module.exports = updateAdById;
