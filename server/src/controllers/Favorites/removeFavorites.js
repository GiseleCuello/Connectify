const Favorites = require("../../models/Favorites");

const removeFavorite = async (req, res) => {
  try {
    const { clientId, professionalId } = req.body;

    const existingFavorite = await Favorites.findOne({
      client: clientId,
      professional: professionalId,
    });

    if (!existingFavorite) {
      return res.status(404).json({
        message: "El profesional no se encuentra en la lista de favoritos",
      });
    }

    const result = await Favorites.deleteOne({ _id: existingFavorite._id });

    const newFavorite = await Favorites.find().populate("professional").exec();

    res.status(200).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = removeFavorite;
