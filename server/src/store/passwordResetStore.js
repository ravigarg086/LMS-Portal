const crypto = require('crypto');
const { getPool } = require('../config/mysql');

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    token_hash CHAR(64) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_reset_token_hash (token_hash),
    INDEX idx_reset_user_id (user_id),
    INDEX idx_reset_expires_at (expires_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

function hashToken(rawToken) {
  return crypto.createHash('sha256').update(String(rawToken)).digest('hex');
}

async function ensurePasswordResetTable() {
  const pool = await getPool();
  await pool.query(CREATE_TABLE_SQL);
}

async function invalidateUserTokens(userId) {
  const pool = await getPool();
  await pool.execute(
    `UPDATE password_reset_tokens
     SET used_at = NOW()
     WHERE user_id = ? AND used_at IS NULL`,
    [userId],
  );
}

async function createResetToken(userId) {
  const pool = await getPool();
  await invalidateUserTokens(userId);

  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(rawToken);
  const id = crypto.randomUUID();
  const ttlMinutes = Number(process.env.PASSWORD_RESET_TTL_MINUTES || 60);

  await pool.execute(
    `INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at)
     VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL ? MINUTE))`,
    [id, userId, tokenHash, ttlMinutes],
  );

  return rawToken;
}

async function findValidTokenRecord(rawToken) {
  const pool = await getPool();
  const tokenHash = hashToken(rawToken);
  const [rows] = await pool.execute(
    `SELECT prt.id, prt.user_id, prt.expires_at, u.email, u.role, u.full_name
     FROM password_reset_tokens prt
     INNER JOIN users u ON u.id = prt.user_id
     WHERE prt.token_hash = ?
       AND prt.used_at IS NULL
       AND prt.expires_at > NOW()
     LIMIT 1`,
    [tokenHash],
  );

  return rows[0] || null;
}

async function markTokenUsed(tokenId) {
  const pool = await getPool();
  await pool.execute(
    `UPDATE password_reset_tokens SET used_at = NOW() WHERE id = ?`,
    [tokenId],
  );
}

module.exports = {
  ensurePasswordResetTable,
  createResetToken,
  findValidTokenRecord,
  markTokenUsed,
  invalidateUserTokens,
};
