const router = require("express").Router();
const clientRoute = require("./clientRoute");
const professionalRoute = require("./professionalRoute");

router.use("/client", clientRoute);

router.use("/professional", professionalRoute);

module.exports = router;
