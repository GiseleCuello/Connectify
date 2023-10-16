const commentsRoute = require("express").Router();

commentsRoute.post("/"); // Guarda los comentarioslos clientes desde la base de datos

commentsRoute.get("/"); // Trae los comentarios desde la base de datos

commentsRoute.patch("/:id/delete"); // Borrado logico los comentarios desde la base de datos

module.exports = commentsRoute;
