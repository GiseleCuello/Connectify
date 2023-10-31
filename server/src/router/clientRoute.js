const clientRoute = require("express").Router();

const clientRegister = require("../controllers/Client/clientRegister");
const clientLogin = require("../controllers/Client/clientLogin");
const clientUpdate = require("../controllers/Client/clientUpdate");
const clientDelete = require("../controllers/Client/clientDelete");
const getAllClients = require("../controllers/Client/getAllClients");
const clientGoogleLogin = require("../controllers/Client/loginGoogleRegister");

clientRoute.post("/register", clientRegister); // Guarda los clientes desde la base de datos

clientRoute.post("/login", clientLogin); // Trae los clientes desde la base de datos

clientRoute.get("/", getAllClients); // Trae todes les clientes desde la base de datos

clientRoute.patch("/:id", clientUpdate); // Actualiza los clientes desde la base de datos

clientRoute.patch("/:id/delete", clientDelete); // Borrado logico de los clientes desde la base de datos(y restitución)

clientRoute.post("/googlelogin", clientGoogleLogin); // Guarda clientes logueados con Google

module.exports = clientRoute;

//* Ruta para el borrado lógico del perfil del usuario
// router.patch('/users/:id/delete', (req, res) => {
//   const userId = req.params.id; // Realizar el borrado lógico
//   User.findByIdAndUpdate(userId, { isDeleted: true }, (err, result) => {
//     if (err)
//     { res.status(500).json({ error: 'Error al realizar el borrado lógico del perfil del usuario.' })
//   } else { res.json({ message: 'Borrado lógico del perfil del usuario exitoso.' })
//   }}})
