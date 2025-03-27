
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Feedback = require('../models/Feedback');
const MushroomImage = require('../models/MushroomImage');

// @route   POST /api/feedback
// @desc    Submit feedback for an image
// @access  Private
router.post('/', auth.protect, async (req, res) => {
  try {
    const { imageId, text, rating } = req.body;
    
    // Check if image exists
    const image = await MushroomImage.findById(imageId);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    
    // Create new feedback
    const feedback = new Feedback({
      userId: req.user.id,
      imageId,
      text,
      rating
    });
    
    await feedback.save();
    
    res.status(201).json({
      success: true,
      feedback
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/feedback/user
// @desc    Get all feedback submitted by the user
// @access  Private
router.get('/user', auth.protect, async (req, res) => {
  try {
    const feedback = await Feedback.find({ userId: req.user.id })
      .populate('imageId')
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      count: feedback.length,
      feedback
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/feedback/image/:imageId
// @desc    Get feedback for a specific image
// @access  Private
router.get('/image/:imageId', auth.protect, async (req, res) => {
  try {
    const image = await MushroomImage.findById(req.params.imageId);
    
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    
    // Check if user owns the image or is admin
    if (image.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    const feedback = await Feedback.find({ imageId: req.params.imageId })
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      count: feedback.length,
      feedback
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
