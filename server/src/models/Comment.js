  const mongoose = require('mongoose');

  const commentSchema = new mongoose.Schema({
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    isDeleted: {
      // Inicialmente, no se ha borrado lógicamente
      type: Boolean,
      default: false,
    },
    Client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      
    },
    Professional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professional',
    },
  });

  module.exports = mongoose.model('Comment', commentSchema);
