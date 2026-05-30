const {
  listUserEvents,
  findEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../store/calendarStore');

function handleStoreError(error, res, fallbackMessage) {
  if (error.status === 400) {
    return res.status(400).json({ message: error.message, errors: error.errors });
  }

  if (error.status === 404) {
    return res.status(404).json({ message: error.message });
  }

  if (error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR') {
    return res.status(503).json({ message: 'Calendar service is temporarily unavailable.' });
  }

  return res.status(500).json({ message: fallbackMessage });
}

async function getEvents(req, res) {
  try {
    const events = await listUserEvents(req.user.id, {
      start: req.query.start,
      end: req.query.end,
    });
    res.json({ events });
  } catch (error) {
    return handleStoreError(error, res, 'Unable to load calendar events.');
  }
}

async function getEvent(req, res) {
  try {
    const event = await findEventById(req.params.id, req.user.id);
    if (!event) {
      return res.status(404).json({ message: 'Calendar event not found.' });
    }

    res.json({ event });
  } catch (error) {
    return handleStoreError(error, res, 'Unable to load calendar event.');
  }
}

async function createEventHandler(req, res) {
  try {
    const event = await createEvent(req.user.id, req.body);
    res.status(201).json({
      message: 'Event created successfully.',
      event,
    });
  } catch (error) {
    return handleStoreError(error, res, 'Unable to create calendar event.');
  }
}

async function updateEventHandler(req, res) {
  try {
    const event = await updateEvent(req.user.id, req.params.id, req.body);
    res.json({
      message: 'Event updated successfully.',
      event,
    });
  } catch (error) {
    return handleStoreError(error, res, 'Unable to update calendar event.');
  }
}

async function deleteEventHandler(req, res) {
  try {
    await deleteEvent(req.user.id, req.params.id);
    res.json({ message: 'Event deleted successfully.' });
  } catch (error) {
    return handleStoreError(error, res, 'Unable to delete calendar event.');
  }
}

module.exports = {
  getEvents,
  getEvent,
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
};
