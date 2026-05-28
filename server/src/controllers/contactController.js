const {
  saveContactMessage,
  listContactMessages,
  updateContactMessage,
  deleteContactMessage,
} = require('../store/contactStore');

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

async function updateContact(req, res) {
  try {
    const message = await updateContactMessage(req.params.id, req.body);
    res.json({ message: 'Contact message updated.', contact: message });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message, errors: error.errors });
    }
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR') {
      return res.status(503).json({ message: 'Contact service is temporarily unavailable.' });
    }
    return res.status(500).json({ message: 'Unable to update contact message.' });
  }
}

async function removeContact(req, res) {
  try {
    await deleteContactMessage(req.params.id);
    res.json({ message: 'Contact message deleted.' });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR') {
      return res.status(503).json({ message: 'Contact service is temporarily unavailable.' });
    }
    return res.status(500).json({ message: 'Unable to delete contact message.' });
  }
}

module.exports = { submitContact, getContactMessages, updateContact, removeContact };
