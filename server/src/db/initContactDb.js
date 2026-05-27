const { getPool, getRootConnection } = require('../config/mysql');

const DATABASE_NAME = process.env.MYSQL_DATABASE || 'lms-portal-db';

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS contact_messages (
    id CHAR(36) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    designation ENUM('student', 'faculty', 'admin') NOT NULL,
    location VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_contact_messages_created_at (created_at),
    INDEX idx_contact_messages_email (email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

async function ensureDatabaseExists() {
  const connection = await getRootConnection();

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${DATABASE_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  } finally {
    await connection.end();
  }
}

async function ensureContactMessagesTable() {
  const pool = await getPool();
  await pool.query(CREATE_TABLE_SQL);
}

async function initContactDb() {
  await ensureDatabaseExists();
  await ensureContactMessagesTable();
}

module.exports = {
  initContactDb,
  ensureDatabaseExists,
  ensureContactMessagesTable,
  CREATE_TABLE_SQL,
};
