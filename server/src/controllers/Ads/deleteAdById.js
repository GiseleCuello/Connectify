const NewAd = require("../../models/NewAd");

const deleteAdById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingAd = await NewAd.findById(id);

    if (!existingAd) {
      return res.status(400).json({ message: "No se encontró el anuncio" });
    }

    const isDeleted = !existingAd.isDeleted;

    const adUpdate = await NewAd.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted } },
      { new: true }
    );

    res.status(200).json(adUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor", error });
  }
};

module.exports = deleteAdById;
