const professionalRoute = require("express").Router();
const professionalRegister = require("../controllers/Professional/professionalRegister");
const getProfessionalById = require("../controllers/Professional/getProfessionalById");
const professionalDelete = require("../controllers/Professional/ProfessionalDelete");
const professionalLogin = require("../controllers/Professional/professionalLogin");
const professionalSearch = require("../controllers/Professional/professionalSearch");

professionalRoute.post("/register", professionalRegister); // Guarda los profesionales desde la base de datos

professionalRoute.get("/login", professionalLogin); // Trae los profesionales desde la base de datos

professionalRoute.get("/search/:profession", professionalSearch); // Trae los profesionales desde la base de datos

professionalRoute.patch("/:id", getProfessionalById); // Actualiza los profesionales desde la base de datos

professionalRoute.patch("/:id/delete", professionalDelete); // Borrado logico de los profesionales desde la base de datos

module.exports = professionalRoute;
