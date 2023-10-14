const router = require("express").Router();
const adminRoute = require("./adminRoute");
const clientRoute = require("./clientRoute");
const professionalRoute = require("./professionalRoute");

router.use("/client", clientRoute);

router.use("/professional", professionalRoute);

router.use("/admin", adminRoute);

module.exports = router;
