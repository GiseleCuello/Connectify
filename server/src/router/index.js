const router = require("express").Router();
const adminRoute = require("./adminRoute");
const clientRoute = require("./clientRoute");
const professionalRoute = require("./professionalRoute");
const commentsRoute = require("./commentsRouter");
const adsRoute = require("./adsRoute");
// const authGoogle = require("./authGoogleRoute");
const mercadoPago = require("../controllers/Utils/MercadoPago");
const postSocket = require("../controllers/Socket/Socketio");
const favoritesRoute = require("./favoritesRoute");

router.use("/client", clientRoute);

// router.use("/auth/google", authGoogle);

router.use("/professional", professionalRoute);

router.use("/admin", adminRoute);

router.use("/comments", commentsRoute);

router.use("/ads", adsRoute);

router.use("/fav", favoritesRoute);

router.post("/create_preference", mercadoPago);

router.post("/purchase", postSocket);

router.get("/purchase", postSocket);

module.exports = router;
