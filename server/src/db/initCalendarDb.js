const fs = require('fs/promises');
const path = require('path');
const { getPool } = require('../config/mysql');
const { ensureDatabaseExists } = require('./initContactDb');
const { seedDemoEventsIfEmpty } = require('../store/calendarStore');

const EVENTS_SCHEMA_PATH = path.join(__dirname, 'schema', 'calendar_events.sql');

async function ensureCalendarTables() {
  const pool = await getPool();
  const eventsSql = await fs.readFile(EVENTS_SCHEMA_PATH, 'utf8');
  await pool.query(eventsSql);
}

async function initCalendarDb() {
  await ensureDatabaseExists();
  await ensureCalendarTables();
  const count = await seedDemoEventsIfEmpty();
  console.log(`Calendar events ready (${count} events in MySQL)`);
}

module.exports = {
  initCalendarDb,
  ensureCalendarTables,
};
