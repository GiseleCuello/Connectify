const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
});

module.exports = mongoose.model("Favorites", favoritesSchema);
