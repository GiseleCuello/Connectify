const paymentsRoute = require("express").Router();
const paymentsRegister = require("../controllers/Payment/paymentsRegister");
const paymentsById = require("../controllers/Payment/paymentsById");
const paymentsGet = require("../controllers/Payment/paymentGet")

paymentsRoute.post("/register", paymentsRegister); // Guarda los clientes desde la base de datos
paymentsRoute.get("/:clientId", paymentsById); // Guarda los clientes desde la base de datos
paymentsRoute.get("/", paymentsGet); // Guarda los clientes desde la base de datos


module.exports = paymentsRoute;

