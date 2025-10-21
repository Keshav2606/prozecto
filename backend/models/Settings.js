const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  phoneVisible: {
    type: Boolean,
    default: false
  },
  socialMedia: [{
    platform: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);