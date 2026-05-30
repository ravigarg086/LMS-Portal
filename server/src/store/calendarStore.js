const crypto = require('crypto');
const { getPool } = require('../config/mysql');
const { VALID_EVENT_TYPES, buildSeedEventsForUser } = require('../data/calendarSeedEvents');

function mapEventRow(row) {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    description: row.description || '',
    eventType: row.event_type,
    startAt: new Date(row.start_at).toISOString(),
    endAt: row.end_at ? new Date(row.end_at).toISOString() : null,
    allDay: Boolean(row.all_day),
    location: row.location || '',
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

function createValidationError(message, errors = {}) {
  const error = new Error(message);
  error.status = 400;
  error.errors = errors;
  return error;
}

function createNotFoundError(message) {
  const error = new Error(message);
  error.status = 404;
  return error;
}

function parseDate(value, fieldName) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw createValidationError('Validation failed.', {
      [fieldName]: 'Enter a valid date and time.',
    });
  }

  return date;
}

function normalizeEventInput(input = {}) {
  const title = String(input.title || '').trim();
  const description = String(input.description || '').trim();
  const eventType = String(input.eventType || 'other').trim().toLowerCase();
  const allDay = Boolean(input.allDay);
  const location = String(input.location || '').trim();
  const startAt = parseDate(input.startAt, 'startAt');
  let endAt = input.endAt ? parseDate(input.endAt, 'endAt') : null;

  const errors = {};

  if (!title) {
    errors.title = 'Title is required.';
  } else if (title.length > 200) {
    errors.title = 'Title must be 200 characters or fewer.';
  }

  if (!startAt) {
    errors.startAt = 'Start date and time are required.';
  }

  if (!VALID_EVENT_TYPES.has(eventType)) {
    errors.eventType = 'Select a valid event type.';
  }

  if (location.length > 255) {
    errors.location = 'Location must be 255 characters or fewer.';
  }

  if (Object.keys(errors).length > 0) {
    throw createValidationError('Validation failed.', errors);
  }

  if (!endAt) {
    endAt = new Date(startAt);
    if (allDay) {
      endAt.setHours(23, 59, 59, 999);
    } else {
      endAt.setHours(endAt.getHours() + 1);
    }
  }

  if (endAt < startAt) {
    throw createValidationError('Validation failed.', {
      endAt: 'End time must be after the start time.',
    });
  }

  return {
    title,
    description,
    eventType,
    startAt,
    endAt,
    allDay,
    location,
  };
}

async function seedDemoEventsIfEmpty() {
  const pool = await getPool();
  const [countRows] = await pool.execute('SELECT COUNT(*) AS total FROM calendar_events');
  const total = Number(countRows[0]?.total || 0);

  if (total > 0) {
    return total;
  }

  const [users] = await pool.execute(
    `SELECT id, role FROM users
     WHERE email IN ('alex@campus.edu', 'pshah@campus.edu', 'jlee@campus.edu')`,
  );

  let seeded = 0;

  for (const user of users) {
    const events = buildSeedEventsForUser(user.id, user.role);

    for (const event of events) {
      await pool.execute(
        `INSERT INTO calendar_events
          (id, user_id, title, description, event_type, start_at, end_at, all_day, location)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          crypto.randomUUID(),
          event.userId,
          event.title,
          event.description,
          event.eventType,
          event.startAt,
          event.endAt,
          event.allDay ? 1 : 0,
          event.location,
        ],
      );
      seeded += 1;
    }
  }

  return seeded;
}

async function listUserEvents(userId, { start, end } = {}) {
  const pool = await getPool();
  const params = [userId];
  let rangeClause = '';

  const startDate = start ? parseDate(start, 'start') : null;
  const endDate = end ? parseDate(end, 'end') : null;

  if (startDate) {
    rangeClause += ' AND start_at >= ?';
    params.push(startDate);
  }

  if (endDate) {
    rangeClause += ' AND start_at <= ?';
    params.push(endDate);
  }

  const [rows] = await pool.execute(
    `SELECT id, user_id, title, description, event_type, start_at, end_at, all_day, location, created_at, updated_at
     FROM calendar_events
     WHERE user_id = ?${rangeClause}
     ORDER BY start_at ASC`,
    params,
  );

  return rows.map(mapEventRow);
}

async function findEventById(eventId, userId) {
  const pool = await getPool();
  const [rows] = await pool.execute(
    `SELECT id, user_id, title, description, event_type, start_at, end_at, all_day, location, created_at, updated_at
     FROM calendar_events
     WHERE id = ? AND user_id = ?
     LIMIT 1`,
    [eventId, userId],
  );

  return rows[0] ? mapEventRow(rows[0]) : null;
}

async function createEvent(userId, input) {
  const payload = normalizeEventInput(input);
  const id = crypto.randomUUID();
  const pool = await getPool();

  await pool.execute(
    `INSERT INTO calendar_events
      (id, user_id, title, description, event_type, start_at, end_at, all_day, location)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      userId,
      payload.title,
      payload.description,
      payload.eventType,
      payload.startAt,
      payload.endAt,
      payload.allDay ? 1 : 0,
      payload.location,
    ],
  );

  return findEventById(id, userId);
}

async function updateEvent(userId, eventId, input) {
  const existing = await findEventById(eventId, userId);
  if (!existing) {
    throw createNotFoundError('Calendar event not found.');
  }

  const payload = normalizeEventInput({
    title: input.title ?? existing.title,
    description: input.description ?? existing.description,
    eventType: input.eventType ?? existing.eventType,
    startAt: input.startAt ?? existing.startAt,
    endAt: input.endAt ?? existing.endAt,
    allDay: input.allDay ?? existing.allDay,
    location: input.location ?? existing.location,
  });

  const pool = await getPool();
  await pool.execute(
    `UPDATE calendar_events
     SET title = ?, description = ?, event_type = ?, start_at = ?, end_at = ?, all_day = ?, location = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`,
    [
      payload.title,
      payload.description,
      payload.eventType,
      payload.startAt,
      payload.endAt,
      payload.allDay ? 1 : 0,
      payload.location,
      eventId,
      userId,
    ],
  );

  return findEventById(eventId, userId);
}

async function deleteEvent(userId, eventId) {
  const existing = await findEventById(eventId, userId);
  if (!existing) {
    throw createNotFoundError('Calendar event not found.');
  }

  const pool = await getPool();
  await pool.execute('DELETE FROM calendar_events WHERE id = ? AND user_id = ?', [eventId, userId]);
  return existing;
}

module.exports = {
  seedDemoEventsIfEmpty,
  listUserEvents,
  findEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
