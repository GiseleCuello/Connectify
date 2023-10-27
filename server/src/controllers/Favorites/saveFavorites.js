const Favorites = require("../../models/Favorites");

const saveFavorites = async (req, res) => {
  try {
    const { clientId, professionalId } = req.body;

    const existingFavorite = await Favorites.findOne({
      client: clientId,
      professional: professionalId,
    })
      .populate("client")
      .populate("professional")
      .exec();

    if (existingFavorite) {
      return res
        .status(400)
        .json({ message: "El profesional ya está en Favoritos" });
    }

    const newFavorite = await Favorites.create({
      client: clientId,
      professional: professionalId,
    });

    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = saveFavorites;
