const { saveContactMessage } = require('../store/contactStore');

async function submitContact(req, res) {
  try {
    await saveContactMessage(req.body);
    res.status(201).json({ message: 'Thank you — we received your inquiry.' });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message, errors: error.errors });
    }
    return res.status(500).json({ message: 'Unable to save contact message.' });
  }
}

module.exports = { submitContact };
