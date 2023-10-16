const NewAd = require("../models/NewAd");

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

// Controlador para obtener todos los anuncios

const getAllAds = async (req, res) => {
  try {
    const ads = await NewAd.find();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ error: "Error creating ad." });
  }
};

// Controlador para obtener un anuncio por ID.

const getAdById = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await NewAd.findById(id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found." });
    }
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ error: "Error getting ad." });
  }
};

// Controlador para editar un anuncio por ID

const updateAdById = async (req, res) => {
  const { id } = req.params;

  try {
    const updateAd = await NewAd.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!updateAd) {
      return res.status(404).json({ error: "Ad not found." });
    }
    res.status(200).json(updateAd);
  } catch (error) {
    res.status(500).json({ errorMessage: "Error del servidor", error });
  }
};

// Controlador para eliminar un anuncio por ID

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAd = await NewAd.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!deleteAd) {
      res.status(404).json({ error: "Not found Ad." });
    }
    res.status(204).send("Aviso Borrado");
  } catch (error) {
    res.status(500).json({ error: "Error deleting ad." });
  }
};

module.exports = {
  createAd,
  getAllAds,
  getAdById,
  updateAdById,
  deleteById,
};
