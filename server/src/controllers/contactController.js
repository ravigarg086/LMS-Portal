const { saveContactMessage, listContactMessages } = require('../store/contactStore');

async function submitContact(req, res) {
  try {
    await saveContactMessage(req.body);
    res.status(201).json({ message: 'Thank you — we received your inquiry.' });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message, errors: error.errors });
    }
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR') {
      return res.status(503).json({ message: 'Contact service is temporarily unavailable.' });
    }
    return res.status(500).json({ message: 'Unable to save contact message.' });
  }
}

async function getContactMessages(req, res) {
  try {
    const messages = await listContactMessages({
      search: req.query.search,
      limit: req.query.limit,
    });
    res.json({ messages, total: messages.length });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load contact messages.' });
  }
}

module.exports = { submitContact, getContactMessages };
