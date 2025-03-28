
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const MushroomImage = require('../models/MushroomImage');
const ClassificationResult = require('../models/ClassificationResult');
const SearchHistory = require('../models/SearchHistory');

// @route   POST /api/images/upload
// @desc    Upload a mushroom image
// @access  Private
router.post('/upload', auth.protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    // Create new mushroom image record
    const mushroomImage = new MushroomImage({
      imageUrl: req.file.path,
      publicId: req.file.filename,
      userId: req.user.id
    });

    await mushroomImage.save();

    res.status(201).json({
      success: true,
      image: mushroomImage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   POST /api/images/:id/classify
// @desc    Classify a mushroom image
// @access  Private
router.post('/:id/classify', auth.protect, async (req, res) => {
  try {
    const image = await MushroomImage.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    
    // Check if user owns the image
    if (image.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // Mock classification result
    // In a real application, this would call an AI model API
    const isSafe = Math.random() > 0.5;
    const classificationType = isSafe 
      ? "Agaricus bisporus (Button Mushroom)" 
      : "Amanita phalloides (Death Cap)";
    
    const classificationResult = new ClassificationResult({
      imageId: image._id,
      classificationType,
      isSafe,
      confidence: 0.85 + Math.random() * 0.1,
      description: isSafe 
        ? "The button mushroom is one of the most commonly cultivated mushrooms worldwide. It has a mild flavor and is safe to eat both raw and cooked."
        : "The death cap is one of the most poisonous mushrooms known. Consumption can lead to severe liver damage and can be fatal. It contains amatoxins that are not destroyed by cooking."
    });

    await classificationResult.save();

    // Save to search history
    const searchHistory = new SearchHistory({
      userId: req.user.id,
      imageId: image._id,
      classificationResultId: classificationResult._id
    });

    await searchHistory.save();

    res.json({
      success: true,
      result: classificationResult
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/images/user
// @desc    Get all images uploaded by the user
// @access  Private
router.get('/user', auth.protect, async (req, res) => {
  try {
    const images = await MushroomImage.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      count: images.length,
      images
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/images/:id
// @desc    Get image by ID with classification result
// @access  Private
router.get('/:id', auth.protect, async (req, res) => {
  try {
    const image = await MushroomImage.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    
    // Check if user owns the image or is admin
    if (image.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    const classificationResult = await ClassificationResult.findOne({ imageId: image._id });
    
    res.json({
      success: true,
      image,
      classificationResult
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/images/search-history
// @desc    Get user's search history
// @access  Private
router.get('/search-history', auth.protect, async (req, res) => {
  try {
    const searchHistory = await SearchHistory.find({ userId: req.user.id })
      .populate({
        path: 'imageId',
        select: 'imageUrl'
      })
      .populate({
        path: 'classificationResultId',
        select: 'classificationType isSafe confidence description'
      })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: searchHistory.length,
      searches: searchHistory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
