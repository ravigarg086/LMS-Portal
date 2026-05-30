const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const {
  getMySettings,
  updateMySettings,
  getPlatformSettings,
  updatePlatformSettings,
} = require('../controllers/settingsController');

const router = express.Router();

router.get('/me', authMiddleware, getMySettings);
router.put('/me', authMiddleware, updateMySettings);

router.get('/platform', authMiddleware, requireRole('admin'), getPlatformSettings);
router.put('/platform', authMiddleware, requireRole('admin'), updatePlatformSettings);

module.exports = router;
