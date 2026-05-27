const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const { submitContact, getContactMessages } = require('../controllers/contactController');

const router = express.Router();

router.post('/', submitContact);
router.get('/', authMiddleware, requireRole('admin'), getContactMessages);

module.exports = router;
