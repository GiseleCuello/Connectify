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

    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ message: "Profesional eliminado de la lista de favoritos" });
    } else {
      res.status(500).json({ error: "No se pudo eliminar el favorito" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = removeFavorite;
