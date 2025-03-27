
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  permissions: {
    manageUsers: {
      type: Boolean,
      default: true
    },
    reviewFeedback: {
      type: Boolean,
      default: true
    },
    systemSettings: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Admin', AdminSchema);
