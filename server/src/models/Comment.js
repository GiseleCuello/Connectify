const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  ranking: {
    type: Number,
    min: 1,
    max: 5,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
