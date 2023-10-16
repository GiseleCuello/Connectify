const adsRoute = require("express").Router();
const createAd = require("../controllers/Ads/createAd");
const getAllAds = require("../controllers/Ads/getAllAds");
const getAdById = require("../controllers/Ads/getAdById");
const updateAdById = require("../controllers/Ads/updateAdById");
const deleteAdById = require("../controllers/Ads/deleteAdById");

adsRoute.post("/", createAd); // Guarda los avisos desde la base de datos

adsRoute.get("/", getAllAds); // Trae los avisos desde la base de datos

adsRoute.get("/:id", getAdById); // Trae los avisos desde la base de datos

adsRoute.patch("/:id", updateAdById); // Actualizar los avisos desde la base de datos

adsRoute.patch("/:id/delete", deleteAdById); // Borrado logico los avisos desde la base de datos

module.exports = adsRoute;
