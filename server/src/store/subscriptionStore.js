const crypto = require('crypto');
const { getPool } = require('../config/mysql');
const { SUBSCRIPTION_PLANS } = require('../data/subscriptionPlans');

const SUBSCRIPTION_JOIN_SELECT = `
  SELECT ss.id, ss.user_id, ss.plan_id, ss.status, ss.started_at, ss.expires_at,
         ss.cancelled_at, ss.auto_renew, ss.payment_reference, ss.created_at, ss.updated_at,
         sp.plan_id AS plan_plan_id, sp.name AS plan_name, sp.description AS plan_description,
         sp.price AS plan_price, sp.currency AS plan_currency, sp.duration_months AS plan_duration_months,
         sp.features AS plan_features, sp.is_active AS plan_is_active, sp.sort_order AS plan_sort_order
  FROM student_subscriptions ss
  INNER JOIN subscription_plans sp ON sp.plan_id = ss.plan_id
`;

function parseJsonArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function mapPlanRow(row) {
  return {
    id: row.plan_id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    currency: row.currency,
    durationMonths: row.duration_months,
    features: parseJsonArray(row.features),
    isActive: Boolean(row.is_active),
    sortOrder: row.sort_order,
  };
}

function mapSubscriptionRow(row, plan) {
  return {
    id: row.id,
    userId: row.user_id,
    planId: row.plan_id,
    status: row.status,
    startedAt: row.started_at ? new Date(row.started_at).toISOString() : null,
    expiresAt: row.expires_at ? new Date(row.expires_at).toISOString() : null,
    cancelledAt: row.cancelled_at ? new Date(row.cancelled_at).toISOString() : null,
    autoRenew: Boolean(row.auto_renew),
    paymentReference: row.payment_reference || null,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
    plan: plan || null,
  };
}

function mapPlanFromJoinRow(row) {
  return mapPlanRow({
    plan_id: row.plan_plan_id,
    name: row.plan_name,
    description: row.plan_description,
    price: row.plan_price,
    currency: row.plan_currency,
    duration_months: row.plan_duration_months,
    features: row.plan_features,
    is_active: row.plan_is_active,
    sort_order: row.plan_sort_order,
  });
}

function mapJoinedSubscriptionRow(row) {
  return mapSubscriptionRow(row, mapPlanFromJoinRow(row));
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

function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

async function seedSubscriptionPlansIfEmpty() {
  const pool = await getPool();
  const [rows] = await pool.execute('SELECT COUNT(*) AS total FROM subscription_plans');
  const total = Number(rows[0]?.total || 0);

  if (total > 0) {
    return total;
  }

  for (const plan of SUBSCRIPTION_PLANS) {
    await pool.execute(
      `INSERT INTO subscription_plans
        (plan_id, name, description, price, currency, duration_months, features, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        plan.planId,
        plan.name,
        plan.description,
        plan.price,
        plan.currency,
        plan.durationMonths,
        JSON.stringify(plan.features || []),
        plan.sortOrder,
      ],
    );
  }

  return SUBSCRIPTION_PLANS.length;
}

async function listActivePlans() {
  const pool = await getPool();
  const [rows] = await pool.execute(
    `SELECT plan_id, name, description, price, currency, duration_months, features, is_active, sort_order
     FROM subscription_plans
     WHERE is_active = 1
     ORDER BY sort_order ASC, name ASC`,
  );

  return rows.map(mapPlanRow);
}

async function findPlanById(planId) {
  const pool = await getPool();
  const [rows] = await pool.execute(
    `SELECT plan_id, name, description, price, currency, duration_months, features, is_active, sort_order
     FROM subscription_plans
     WHERE plan_id = ? AND is_active = 1
     LIMIT 1`,
    [planId],
  );

  return rows[0] ? mapPlanRow(rows[0]) : null;
}

async function expireDueSubscriptions(userId) {
  const pool = await getPool();
  await pool.execute(
    `UPDATE student_subscriptions
     SET status = 'expired', updated_at = CURRENT_TIMESTAMP
     WHERE user_id = ?
       AND status = 'active'
       AND expires_at IS NOT NULL
       AND expires_at <= CURRENT_TIMESTAMP`,
    [userId],
  );
}

async function findActiveSubscription(userId) {
  await expireDueSubscriptions(userId);

  const pool = await getPool();
  const [rows] = await pool.execute(
    `${SUBSCRIPTION_JOIN_SELECT}
     WHERE ss.user_id = ? AND ss.status = 'active'
     ORDER BY ss.started_at DESC
     LIMIT 1`,
    [userId],
  );

  return rows[0] ? mapJoinedSubscriptionRow(rows[0]) : null;
}

async function findSubscriptionById(subscriptionId) {
  const pool = await getPool();
  const [rows] = await pool.execute(
    `${SUBSCRIPTION_JOIN_SELECT}
     WHERE ss.id = ?
     LIMIT 1`,
    [subscriptionId],
  );

  return rows[0] ? mapJoinedSubscriptionRow(rows[0]) : null;
}

async function listSubscriptionHistory(userId, limit = 20) {
  await expireDueSubscriptions(userId);

  const pool = await getPool();
  const [rows] = await pool.execute(
    `${SUBSCRIPTION_JOIN_SELECT}
     WHERE ss.user_id = ?
     ORDER BY ss.created_at DESC
     LIMIT ?`,
    [userId, Math.min(Math.max(Number(limit) || 20, 1), 50)],
  );

  return rows.map(mapJoinedSubscriptionRow);
}

async function getStudentSubscriptionSummary(userId) {
  const [activeSubscription, history, plans] = await Promise.all([
    findActiveSubscription(userId),
    listSubscriptionHistory(userId),
    listActivePlans(),
  ]);

  return {
    activeSubscription,
    history,
    plans,
  };
}

async function subscribeStudent(userId, planId) {
  const plan = await findPlanById(planId);
  if (!plan) {
    throw createNotFoundError('Subscription plan not found.');
  }

  const active = await findActiveSubscription(userId);
  if (active) {
    throw createValidationError('You already have an active subscription.', {
      subscription: 'Cancel your current plan before subscribing to a new one.',
    });
  }

  const id = crypto.randomUUID();
  const startedAt = new Date();
  const expiresAt = addMonths(startedAt, plan.durationMonths);
  const paymentReference = `demo-${id.slice(0, 8)}`;

  const pool = await getPool();
  await pool.execute(
    `INSERT INTO student_subscriptions
      (id, user_id, plan_id, status, started_at, expires_at, auto_renew, payment_reference)
     VALUES (?, ?, ?, 'active', ?, ?, 1, ?)`,
    [id, userId, plan.id, startedAt, expiresAt, paymentReference],
  );

  return findActiveSubscription(userId);
}

async function cancelStudentSubscription(userId) {
  const active = await findActiveSubscription(userId);
  if (!active) {
    throw createNotFoundError('No active subscription to cancel.');
  }

  const pool = await getPool();
  await pool.execute(
    `UPDATE student_subscriptions
     SET status = 'cancelled',
         cancelled_at = CURRENT_TIMESTAMP,
         auto_renew = 0,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ?`,
    [active.id, userId],
  );

  return findSubscriptionById(active.id);
}

module.exports = {
  seedSubscriptionPlansIfEmpty,
  listActivePlans,
  findPlanById,
  getStudentSubscriptionSummary,
  subscribeStudent,
  cancelStudentSubscription,
};
