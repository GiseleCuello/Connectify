const Favorites = require("../../models/Favorites");

const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorites.find()
      .populate("client")
      .populate("professional")
      .exec();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = getAllFavorites;
