// const authGoogle = require("express").Router();
// const passport = require("passport");
// require("../controllers/Utils/AuthGoogle");

// // Ruta de inicio de sesión con Google
// authGoogle.get("/login", (req, res) => {
//   res.redirect("/auth/google/google");
// });

// // Ruta de autenticación de Google
// authGoogle.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// // Ruta de redirección después de la autenticación
// authGoogle.get(
//   "/google/home",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("/auth/google/home");
//   }
// );

// module.exports = authGoogle;
