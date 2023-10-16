const adsRoute = require("express").Router();

adsRoute.post("/"); // Guarda los avisos desde la base de datos

adsRoute.get("/"); // Trae los avisos desde la base de datos

adsRoute.patch("/:id"); // Actualizar los avisos desde la base de datos

adsRoute.patch("/:id/delete"); // Borrado logico los avisos desde la base de datos

module.exports = adsRoute;
