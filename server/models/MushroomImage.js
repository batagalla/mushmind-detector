
const mongoose = require('mongoose');

const MushroomImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MushroomImage', MushroomImageSchema);
