const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const { submitContact, getContactMessages, updateContact, removeContact } = require('../controllers/contactController');

const router = express.Router();

router.post('/', submitContact);
router.get('/', authMiddleware, requireRole('admin'), getContactMessages);
router.put('/:id', authMiddleware, requireRole('admin'), updateContact);
router.delete('/:id', authMiddleware, requireRole('admin'), removeContact);

module.exports = router;
