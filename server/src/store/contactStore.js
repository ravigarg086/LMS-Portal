const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '../../data');
const CONTACT_FILE = path.join(DATA_DIR, 'contact-messages.json');
const ALLOWED_DESIGNATIONS = new Set(['student', 'faculty', 'admin']);
const PHONE_REGEX = /^[+]?[\d\s().-]{10,}$/;

async function readStore() {
  try {
    const raw = await fs.readFile(CONTACT_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.messages) ? parsed : { messages: [] };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { messages: [] };
    }
    throw error;
  }
}

async function writeStore(store) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTACT_FILE, JSON.stringify(store, null, 2), 'utf8');
}

function validateContactPayload(body) {
  const errors = {};
  const fullName = String(body.fullName || '').trim();
  const email = String(body.email || '').trim();
  const designation = String(body.designation || '').trim().toLowerCase();
  const location = String(body.location || '').trim();
  const phone = String(body.phone || '').trim();
  const subject = String(body.subject || '').trim();
  const message = String(body.message || '').trim();

  if (!fullName) errors.fullName = 'Full name is required.';
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!designation) {
    errors.designation = 'Designation is required.';
  } else if (!ALLOWED_DESIGNATIONS.has(designation)) {
    errors.designation = 'Select a valid designation.';
  }
  if (!location) errors.location = 'Location is required.';
  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else if (phone.replace(/\D/g, '').length < 10 || !PHONE_REGEX.test(phone)) {
    errors.phone = 'Enter a valid phone number.';
  }
  if (!subject) errors.subject = 'Subject is required.';
  if (!message) {
    errors.message = 'Message is required.';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return { errors, fullName, email, designation, location, phone, subject, message };
}

async function saveContactMessage(payload) {
  const { errors, fullName, email, designation, location, phone, subject, message } =
    validateContactPayload(payload);
  if (Object.keys(errors).length) {
    const error = new Error('Validation failed.');
    error.status = 400;
    error.errors = errors;
    throw error;
  }

  const store = await readStore();
  const record = {
    id: crypto.randomUUID(),
    fullName,
    email,
    designation,
    location,
    phone,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  store.messages.push(record);
  await writeStore(store);
  return record;
}

module.exports = { saveContactMessage };
