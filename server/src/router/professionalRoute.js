const professionalRoute = require("express").Router();
const {
  professionalRegister,
  professionalLogin,
  professionalSearch,
  getProfessionalById,
  professionalDelete,
} = require("../controllers/professional");

professionalRoute.post("/register", professionalRegister); // Guarda los profesionales desde la base de datos

professionalRoute.get("/login", professionalLogin); // Trae los profesionales desde la base de datos

professionalRoute.get("/search/:profession", professionalSearch); // Trae los profesionales desde la base de datos

professionalRoute.patch("/:id", getProfessionalById); // Actualiza los profesionales desde la base de datos

professionalRoute.patch("/:id/delete", professionalDelete); // Borrado logico de los profesionales desde la base de datos

module.exports = professionalRoute;
