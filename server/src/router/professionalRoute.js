const professionalRoute = require("express").Router();

professionalRoute.post("/register"); // Guarda los profesionales desde la base de datos

professionalRoute.get("/login"); // Trae los profesionales desde la base de datos

professionalRoute.get("/search"); // Trae los profesionales desde la base de datos

professionalRoute.patch("/:id"); // Actualiza los profesionales desde la base de datos

professionalRoute.patch("/:id/delete"); // Borrado logico de los profesionales desde la base de datos

module.exports = professionalRoute;
