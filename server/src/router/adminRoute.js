const adminRoute = require("express").Router();
const adminRegister = require("../controllers/Admin/adminRegister");

adminRoute.post("/comments");

adminRoute.post("/register", adminRegister);

module.exports = adminRoute;
