const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const {
  getPlans,
  getMySubscription,
  createSubscription,
  cancelSubscription,
} = require('../controllers/subscriptionController');

const router = express.Router();

router.get('/plans', getPlans);
router.get('/me', authMiddleware, requireRole('student'), getMySubscription);
router.post('/', authMiddleware, requireRole('student'), createSubscription);
router.put('/me/cancel', authMiddleware, requireRole('student'), cancelSubscription);

module.exports = router;
