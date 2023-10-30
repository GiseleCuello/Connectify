const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String,
  },
  from: {
    type: String,
  },
});

module.exports = mongoose.model('Message', messageSchema);
