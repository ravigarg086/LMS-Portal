const fs = require('fs/promises');
const path = require('path');
const { getPool } = require('../config/mysql');
const { ensureDatabaseExists } = require('./initContactDb');
const { createStudentDashboard } = require('../utils/studentDashboard');
const { getSeedUsers } = require('./seedUsers');

const USERS_FILE = path.join(__dirname, '../../data/users.json');

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'faculty', 'admin') NOT NULL,
    academic_track VARCHAR(255) NOT NULL DEFAULT '',
    graduation_year VARCHAR(50) NOT NULL DEFAULT '',
    department VARCHAR(255) NOT NULL DEFAULT '',
    employee_id VARCHAR(100) NOT NULL DEFAULT '',
    access_level VARCHAR(255) NOT NULL DEFAULT '',
    profile_picture_url MEDIUMTEXT NULL,
    dashboard_json JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_employee_id (employee_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

function normalizeLegacyUser(entry) {
  const email = String(entry.email || '').toLowerCase().trim();
  let dashboard = entry.dashboard || null;

  if (entry.role === 'student' && !dashboard?.featuredCourse?.title) {
    dashboard = createStudentDashboard({
      email,
      academicTrack: entry.academicTrack,
    });
  }

  return {
    id: entry.id,
    fullName: entry.fullName,
    email,
    password: entry.password,
    role: entry.role,
    academicTrack: entry.academicTrack || '',
    graduationYear: entry.graduationYear || '',
    department: entry.department || '',
    employeeId: entry.employeeId || '',
    accessLevel: entry.accessLevel || '',
    profilePictureUrl: entry.profilePictureUrl || '',
    dashboard,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  };
}

async function readLegacyUsersFile() {
  try {
    const raw = await fs.readFile(USERS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return (parsed.users || []).map(normalizeLegacyUser);
  } catch {
    return null;
  }
}

async function insertUserRecord(connection, record) {
  await connection.execute(
    `INSERT INTO users
      (id, full_name, email, password_hash, role, academic_track, graduation_year,
       department, employee_id, access_level, profile_picture_url, dashboard_json, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, NOW()), COALESCE(?, NOW()))`,
    [
      record.id,
      record.fullName,
      record.email,
      record.password,
      record.role,
      record.academicTrack || '',
      record.graduationYear || '',
      record.department || '',
      record.employeeId || '',
      record.accessLevel || '',
      record.profilePictureUrl || null,
      record.dashboard ? JSON.stringify(record.dashboard) : null,
      record.createdAt || null,
      record.updatedAt || null,
    ],
  );
}

async function seedUsersIfEmpty() {
  const pool = await getPool();
  const [rows] = await pool.execute('SELECT COUNT(*) AS total FROM users');
  const total = Number(rows[0]?.total || 0);

  if (total > 0) {
    console.log(`User store ready (${total} accounts in MySQL)`);
    return;
  }

  const legacyUsers = await readLegacyUsersFile();
  const seedUsers = legacyUsers?.length ? legacyUsers : getSeedUsers();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    for (const user of seedUsers) {
      await insertUserRecord(connection, user);
    }

    await connection.commit();
    console.log(`User store seeded (${seedUsers.length} accounts migrated to MySQL)`);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function ensureUsersTable() {
  const pool = await getPool();
  await pool.query(CREATE_TABLE_SQL);
}

async function initUsersDb() {
  await ensureDatabaseExists();
  await ensureUsersTable();
  await seedUsersIfEmpty();
}

module.exports = {
  initUsersDb,
  ensureUsersTable,
  seedUsersIfEmpty,
};
