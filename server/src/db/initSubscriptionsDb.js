const fs = require('fs/promises');
const path = require('path');
const { getPool } = require('../config/mysql');
const { ensureDatabaseExists } = require('./initContactDb');
const { seedSubscriptionPlansIfEmpty } = require('../store/subscriptionStore');

const PLANS_SCHEMA_PATH = path.join(__dirname, 'schema', 'subscription_plans.sql');
const SUBSCRIPTIONS_SCHEMA_PATH = path.join(__dirname, 'schema', 'student_subscriptions.sql');

async function ensureSubscriptionTables() {
  const pool = await getPool();
  const plansSql = await fs.readFile(PLANS_SCHEMA_PATH, 'utf8');
  const subscriptionsSql = await fs.readFile(SUBSCRIPTIONS_SCHEMA_PATH, 'utf8');
  await pool.query(plansSql);
  await pool.query(subscriptionsSql);
}

async function initSubscriptionsDb() {
  await ensureDatabaseExists();
  await ensureSubscriptionTables();
  const count = await seedSubscriptionPlansIfEmpty();
  console.log(`Subscription catalog ready (${count} plans in MySQL)`);
}

module.exports = {
  initSubscriptionsDb,
  ensureSubscriptionTables,
};
