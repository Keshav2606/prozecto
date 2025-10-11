const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    required: true,
    enum: ['web', 'app', 'software', 'design', 'video', 'excel']
  },
  projectDetails: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema);