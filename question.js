const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('questions', questionSchema);
