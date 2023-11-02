const Favorites = require("../../models/Favorites");

const saveFavorites = async (req, res) => {
  try {
    const { clientId, professionalId } = req.body;

    const existingFavorite = await Favorites.findOne({
      client: clientId,
      professional: professionalId,
    });

    console.log(existingFavorite);

    if (existingFavorite) {
      return res.status(400).json({
        message: "El professional ya esta en favoritos",
      });
    }

    await Favorites.create({
      client: clientId,
      professional: professionalId,
      isSave: true,
    });

    const saveFavorite = await Favorites.find({
      client: clientId,
      professional: professionalId,
    })
      .populate("professional")
      .exec();

    res.status(201).json(saveFavorite);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = saveFavorites;
