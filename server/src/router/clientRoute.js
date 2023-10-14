const clientRoute = require("express").Router();

clientRoute.post("/register"); // Guarda los clientes desde la base de datos

clientRoute.get("/login"); // Trae los clientes desde la base de datos

clientRoute.patch("/:id"); // Actualiza los clientes desde la base de datos

clientRoute.patch("/:id/delete"); // Borrado logico de los clientes desde la base de datos

module.exports = clientRoute;

//* Ruta para el borrado lógico del perfil del usuario
// router.patch('/users/:id/delete', (req, res) => {
//   const userId = req.params.id; // Realizar el borrado lógico
//   User.findByIdAndUpdate(userId, { isDeleted: true }, (err, result) => {
//     if (err)
//     { res.status(500).json({ error: 'Error al realizar el borrado lógico del perfil del usuario.' })
//   } else { res.json({ message: 'Borrado lógico del perfil del usuario exitoso.' })
//   }}})

//! En el controlador de registro de usuario, antes de almacenar la contraseña en la base de datos const
// plainTextPassword = 'contraseñaDelUsuario'; // Reemplaza esto con la contraseña proporcionada por el
// usuario bcrypt.hash(plainTextPassword, 10, (err, hashedPassword) => { if (err) { // Manejar errores
// } else { // Almacenar 'hashedPassword' en la base de datos
// } });
