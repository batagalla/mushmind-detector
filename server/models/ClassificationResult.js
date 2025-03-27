
const mongoose = require('mongoose');

const ClassificationResultSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MushroomImage',
    required: true
  },
  classificationType: {
    type: String,
    required: true
  },
  isSafe: {
    type: Boolean,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ClassificationResult', ClassificationResultSchema);
