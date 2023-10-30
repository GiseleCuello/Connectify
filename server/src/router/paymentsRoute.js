const paymentsRoute = require("express").Router();
const paymentsRegister = require("../controllers/Payment/paymentsRegister");
const paymentsByUser = require("../controllers/Payment/paymentsByUser");
const paymentsGet = require("../controllers/Payment/paymentGet")

paymentsRoute.post("/register", paymentsRegister); // Guarda los clientes desde la base de datos
paymentsRoute.get("/:clientUser", paymentsByUser); // Guarda los clientes desde la base de datos
paymentsRoute.get("/", paymentsGet); // Guarda los clientes desde la base de datos


module.exports = paymentsRoute;

