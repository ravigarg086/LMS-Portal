const fs = require('fs/promises');
const path = require('path');
const { getPool } = require('../config/mysql');
const { ensureDatabaseExists } = require('./initContactDb');
const { seedCoursesIfEmpty } = require('../store/courseStore');

const SCHEMA_PATH = path.join(__dirname, 'schema', 'courses.sql');

async function ensureCoursesTable() {
  const pool = await getPool();
  const createTableSql = await fs.readFile(SCHEMA_PATH, 'utf8');
  await pool.query(createTableSql);
}

async function initCoursesDb() {
  await ensureDatabaseExists();
  await ensureCoursesTable();
  const count = await seedCoursesIfEmpty();
  console.log(`Course catalog ready (${count} courses in MySQL)`);
}

module.exports = {
  initCoursesDb,
  ensureCoursesTable,
};
