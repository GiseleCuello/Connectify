const {
  createAd,
  getAllAds,
  getAdById,
  updateAdById,
  deleteById,
} = require("../controllers/Ads");
const adsRoute = require("express").Router();

adsRoute.post("/", createAd); // Guarda los avisos desde la base de datos

adsRoute.get("/", getAllAds); // Trae los avisos desde la base de datos

adsRoute.get("/:id", getAdById); // Trae los avisos desde la base de datos

adsRoute.patch("/:id", updateAdById); // Actualizar los avisos desde la base de datos

adsRoute.patch("/:id/delete", deleteById); // Borrado logico los avisos desde la base de datos

module.exports = adsRoute;
