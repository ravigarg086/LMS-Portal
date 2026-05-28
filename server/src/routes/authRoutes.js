const express = require('express');
const {
  register,
  login,
  logout,
  getCurrentUser,
  changePassword,
  updateProfile,
  forgotPassword,
  resetPassword,
  validateResetToken,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password/validate', validateResetToken);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);
router.get('/me', authMiddleware, getCurrentUser);
router.put('/profile', authMiddleware, updateProfile);
router.post('/profile', authMiddleware, updateProfile);
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;
