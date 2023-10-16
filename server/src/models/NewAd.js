const mongoose = require("mongoose");

const newAdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    default: 0,
  },
  requiredSkills: [String],
  postingDate: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
  },
  creator: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professional",
      required: true,
    },
  ],
  categories: [String],
  contractType: {
    type: String,
    enum: ["Full-time", "Part-time", "Freelance", "Other"],
  },
  workLocation: {
    type: String,
    enum: ["Presencial", "Remoto"],
    required: true,
  },
});

module.exports = mongoose.model("NewAd", newAdSchema);
