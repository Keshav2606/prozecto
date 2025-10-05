const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  statement: {
    type: String,
    required: true,
    trim: true
  },
  dp: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);