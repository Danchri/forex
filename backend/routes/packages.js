const express = require('express');
const router = express.Router();

// @route   GET /api/packages
// @desc    Get all packages
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Mock packages data for now
    const packages = [
      {
        id: 1,
        name: 'Basic',
        price: 29,
        duration: 30,
        features: ['Basic courses', 'Email support', 'Community access'],
        isActive: true,
        subscribers: 156
      },
      {
        id: 2,
        name: 'Premium',
        price: 99,
        duration: 30,
        features: ['All courses', 'Telegram signals', '1-on-1 mentoring', 'Priority support'],
        isActive: true,
        subscribers: 642
      },
      {
        id: 3,
        name: 'VIP',
        price: 199,
        duration: 30,
        features: ['Everything in Premium', 'Personal coach', 'Custom strategies', 'Weekly sessions'],
        isActive: true,
        subscribers: 94
      }
    ];

    res.json({
      success: true,
      data: {
        packages
      }
    });

  } catch (error) {
    console.error('Get packages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
