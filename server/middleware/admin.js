
const Admin = require('../models/Admin');

// Check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized as admin' });
    }
    
    // Find admin details
    const admin = await Admin.findOne({ userId: req.user.id });
    
    if (!admin) {
      return res.status(403).json({ success: false, message: 'Admin profile not found' });
    }
    
    // Add admin permissions to request
    req.admin = admin;
    
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  isAdmin
};
