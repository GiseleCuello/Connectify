const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String,
  },
  from: {
    type: String,
  },
  timestamp: {
    type: Number,
    default: Math.floor(Date.now() / 1000),
  },

  image: {
    type: String,
  },

});

module.exports = mongoose.model('Message', messageSchema);
