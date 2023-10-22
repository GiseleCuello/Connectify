const NewAd = require('../../models/NewAd');

const deleteAdById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAd = await NewAd.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    })
    .populate("creator");
    if (!deleteAd) {
      res.status(404).json({ error: 'Not found Ad.' });
    }
    res.status(204).send('Aviso Borrado');
  } catch (error) {
    res.status(500).json({ error: 'Error deleting ad.' });
  }
};

module.exports = deleteAdById;
