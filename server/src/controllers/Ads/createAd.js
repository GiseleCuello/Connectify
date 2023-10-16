const NewAd = require("../../models/NewAd");

// Controlador para crear un anuncio
const createAd = async (req, res) => {
  try {
    const createAd = req.body;
    const newAdData = await NewAd.create(createAd);
    res.status(201).json(newAdData);
  } catch (error) {
    res.status(500).json({ error: "Error creating ad.", error });
  }
};

module.exports = createAd;


