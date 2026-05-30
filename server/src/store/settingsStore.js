const { getPool } = require('../config/mysql');
const {
  sanitizeUserSettings,
  sanitizePlatformSettings,
  mergeDeep,
  DEFAULT_USER_SETTINGS,
  DEFAULT_PLATFORM_SETTINGS,
} = require('../utils/defaultSettings');

function parseJson(value, fallback) {
  if (!value) {
    return fallback;
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  return value;
}

async function getUserSettings(userId) {
  const { settings } = await getUserSettingsWithMeta(userId);
  return settings;
}

async function getUserSettingsWithMeta(userId) {
  const pool = await getPool();
  const [rows] = await pool.execute('SELECT settings_json FROM users WHERE id = ?', [userId]);

  if (!rows.length) {
    const error = new Error('User not found.');
    error.status = 404;
    throw error;
  }

  const raw = rows[0].settings_json;
  const stored = parseJson(raw, {});

  return {
    settings: sanitizeUserSettings(mergeDeep(DEFAULT_USER_SETTINGS, stored)),
    persisted: raw != null,
  };
}

async function updateUserSettings(userId, patch) {
  const current = await getUserSettings(userId);
  const next = sanitizeUserSettings(mergeDeep(current, patch));

  const pool = await getPool();
  const [result] = await pool.execute(
    'UPDATE users SET settings_json = ?, updated_at = NOW() WHERE id = ?',
    [JSON.stringify(next), userId],
  );

  if (result.affectedRows === 0) {
    const error = new Error('User not found.');
    error.status = 404;
    throw error;
  }

  return next;
}

async function getPlatformSettings() {
  const pool = await getPool();
  const [rows] = await pool.execute(
    'SELECT settings_json, updated_at, updated_by FROM platform_settings WHERE id = 1',
  );

  if (!rows.length) {
    return sanitizePlatformSettings(DEFAULT_PLATFORM_SETTINGS);
  }

  const stored = parseJson(rows[0].settings_json, DEFAULT_PLATFORM_SETTINGS);
  return sanitizePlatformSettings(stored);
}

async function updatePlatformSettings(patch, adminUserId) {
  const current = await getPlatformSettings();
  const next = sanitizePlatformSettings(mergeDeep(current, patch));

  const pool = await getPool();
  await pool.execute(
    'UPDATE platform_settings SET settings_json = ?, updated_by = ?, updated_at = NOW() WHERE id = 1',
    [JSON.stringify(next), adminUserId || null],
  );

  return next;
}

module.exports = {
  getUserSettings,
  getUserSettingsWithMeta,
  updateUserSettings,
  getPlatformSettings,
  updatePlatformSettings,
};
