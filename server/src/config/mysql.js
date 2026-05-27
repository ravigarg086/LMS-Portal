const mysql = require('mysql2/promise');

let pool;

function getMysqlConfig(withDatabase = true) {
  const config = {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD ?? '',
  };

  if (withDatabase) {
    config.database = process.env.MYSQL_DATABASE || 'lms-portal-db';
  }

  return config;
}

async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...getMysqlConfig(true),
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: false,
    });
  }

  return pool;
}

async function getRootConnection() {
  return mysql.createConnection(getMysqlConfig(false));
}

module.exports = {
  getMysqlConfig,
  getPool,
  getRootConnection,
};
