const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newMessagesSchema = new Schema({
  message: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  timestamp: {
    type: Number,
    default: Math.floor(Date.now() / 1000),
  },
});

module.exports = mongoose.model('NewMessages', newMessagesSchema);
