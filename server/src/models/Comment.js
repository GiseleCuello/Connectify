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

