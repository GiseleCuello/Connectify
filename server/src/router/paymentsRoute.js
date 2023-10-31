const paymentsRoute = require("express").Router();
const paymentsRegister = require("../controllers/Payment/paymentsRegister");
const paymentsByUser = require("../controllers/Payment/paymentsByUser");
const paymentsGet = require("../controllers/Payment/paymentGet");
const paymentCheck = require("../controllers/Payment/paymentCheck");

paymentsRoute.post("/register", paymentsRegister); 
paymentsRoute.get("/search/:userName", paymentsByUser); 
paymentsRoute.get("/", paymentsGet); 
paymentsRoute.get("/check/:paymentID", paymentCheck); 


module.exports = paymentsRoute;

