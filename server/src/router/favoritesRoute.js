const favoritesRoute = require("express").Router();
const getAllFavorites = require("../controllers/Favorites/getAllFavorites");
const removeFavorite = require("../controllers/Favorites/removeFavorites");
const saveFavorites = require("../controllers/Favorites/saveFavorites");

favoritesRoute.get("/:clientId", getAllFavorites);

favoritesRoute.post("/save", saveFavorites);

favoritesRoute.post("/delete", removeFavorite);

module.exports = favoritesRoute;
