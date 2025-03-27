
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const Admin = require('../models/Admin');

// Apply both auth and admin middleware to all routes
router.use(auth.protect, admin.isAdmin);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/admin/feedback
// @desc    Get all feedback
// @access  Private/Admin
router.get('/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find({})
      .populate('userId', 'name email')
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

// @route   PUT /api/admin/feedback/:id/review
// @desc    Mark feedback as reviewed
// @access  Private/Admin
router.put('/feedback/:id/review', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }
    
    feedback.reviewedByAdmin = true;
    feedback.adminId = req.user.id;
    
    await feedback.save();
    
    res.json({
      success: true,
      feedback
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
// @access  Private/Admin
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    user.role = role;
    await user.save();
    
    // If making user an admin, create admin record if it doesn't exist
    if (role === 'admin') {
      const adminExists = await Admin.findOne({ userId: user._id });
      
      if (!adminExists) {
        const newAdmin = new Admin({
          userId: user._id
        });
        
        await newAdmin.save();
      }
    }
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
