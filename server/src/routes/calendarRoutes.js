const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getEvents,
  getEvent,
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
} = require('../controllers/calendarController');

const router = express.Router();

router.use(authMiddleware);

router.get('/events', getEvents);
router.get('/events/:id', getEvent);
router.post('/events', createEventHandler);
router.put('/events/:id', updateEventHandler);
router.delete('/events/:id', deleteEventHandler);

module.exports = router;
