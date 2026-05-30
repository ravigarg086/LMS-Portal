const { getPool } = require('../config/mysql');
const { ensureDatabaseExists } = require('./initContactDb');
const { DEFAULT_PLATFORM_SETTINGS, sanitizePlatformSettings } = require('../utils/defaultSettings');

const CREATE_PLATFORM_SETTINGS_SQL = `
  CREATE TABLE IF NOT EXISTS platform_settings (
    id TINYINT NOT NULL DEFAULT 1,
    settings_json JSON NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by CHAR(36) NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

async function ensureUserSettingsColumn() {
  const pool = await getPool();
  const [columns] = await pool.execute(
    `SELECT COLUMN_NAME
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'users'
       AND COLUMN_NAME = 'settings_json'`,
  );

  if (!columns.length) {
    await pool.query('ALTER TABLE users ADD COLUMN settings_json JSON NULL AFTER dashboard_json');
  }
}

async function ensurePlatformSettingsTable() {
  const pool = await getPool();
  await pool.query(CREATE_PLATFORM_SETTINGS_SQL);

  const [rows] = await pool.execute('SELECT id FROM platform_settings WHERE id = 1');

  if (!rows.length) {
    const defaults = sanitizePlatformSettings(DEFAULT_PLATFORM_SETTINGS);
    await pool.execute(
      'INSERT INTO platform_settings (id, settings_json) VALUES (1, ?)',
      [JSON.stringify(defaults)],
    );
  }
}

async function initSettingsDb() {
  await ensureDatabaseExists();
  await ensureUserSettingsColumn();
  await ensurePlatformSettingsTable();
}

module.exports = {
  initSettingsDb,
  ensureUserSettingsColumn,
  ensurePlatformSettingsTable,
};
