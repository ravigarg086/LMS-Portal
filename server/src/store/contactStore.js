const crypto = require('crypto');
const { getPool } = require('../config/mysql');

const ALLOWED_DESIGNATIONS = new Set(['student', 'faculty', 'admin']);
const PHONE_REGEX = /^[+]?[\d\s().-]{10,}$/;

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

function createValidationError(errors) {
  const error = new Error('Validation failed.');
  error.status = 400;
  error.errors = errors;
  return error;
}

async function saveContactMessage(payload) {
  const { errors, fullName, email, designation, location, phone, subject, message } =
    validateContactPayload(payload);

  if (Object.keys(errors).length) {
    throw createValidationError(errors);
  }

  const id = crypto.randomUUID();
  const pool = await getPool();

  await pool.execute(
    `INSERT INTO contact_messages
      (id, full_name, email, designation, location, phone, subject, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, fullName, email, designation, location, phone, subject, message],
  );

  return {
    id,
    fullName,
    email,
    designation,
    location,
    phone,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };
}

function mapContactRow(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    designation: row.designation,
    location: row.location,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
  };
}

async function listContactMessages({ search = '', limit = 100 } = {}) {
  const pool = await getPool();
  const safeLimit = Math.min(Math.max(Number(limit) || 100, 1), 200);
  const trimmedSearch = String(search || '').trim();
  let query = `
    SELECT id, full_name, email, designation, location, phone, subject, message, created_at
    FROM contact_messages
  `;
  const params = [];

  if (trimmedSearch) {
    query += `
      WHERE full_name LIKE ?
         OR email LIKE ?
         OR subject LIKE ?
         OR location LIKE ?
         OR phone LIKE ?
    `;
    const term = `%${trimmedSearch}%`;
    params.push(term, term, term, term, term);
  }

  query += ' ORDER BY created_at DESC LIMIT ?';
  params.push(safeLimit);

  const [rows] = await pool.execute(query, params);
  return rows.map(mapContactRow);
}

async function getContactMessageById(id) {
  const pool = await getPool();
  const [rows] = await pool.execute(
    `SELECT id, full_name, email, designation, location, phone, subject, message, created_at
     FROM contact_messages
     WHERE id = ?`,
    [id],
  );

  return rows[0] ? mapContactRow(rows[0]) : null;
}

async function updateContactMessage(id, payload) {
  const existing = await getContactMessageById(id);
  if (!existing) {
    const error = new Error('Contact message not found.');
    error.status = 404;
    throw error;
  }

  const { errors, fullName, email, designation, location, phone, subject, message } =
    validateContactPayload(payload);

  if (Object.keys(errors).length) {
    throw createValidationError(errors);
  }

  const pool = await getPool();
  await pool.execute(
    `UPDATE contact_messages
     SET full_name = ?, email = ?, designation = ?, location = ?, phone = ?, subject = ?, message = ?
     WHERE id = ?`,
    [fullName, email, designation, location, phone, subject, message, id],
  );

  return getContactMessageById(id);
}

async function deleteContactMessage(id) {
  const pool = await getPool();
  const [result] = await pool.execute('DELETE FROM contact_messages WHERE id = ?', [id]);

  if (result.affectedRows === 0) {
    const error = new Error('Contact message not found.');
    error.status = 404;
    throw error;
  }

  return { id };
}

module.exports = {
  saveContactMessage,
  validateContactPayload,
  listContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage,
};
