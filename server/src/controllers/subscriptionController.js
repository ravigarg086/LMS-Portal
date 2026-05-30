const {
  getStudentSubscriptionSummary,
  listActivePlans,
  subscribeStudent,
  cancelStudentSubscription,
} = require('../store/subscriptionStore');

function handleStoreError(error, res, fallbackMessage) {
  if (error.status === 400) {
    return res.status(400).json({ message: error.message, errors: error.errors });
  }

  if (error.status === 404) {
    return res.status(404).json({ message: error.message });
  }

  if (error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR') {
    return res.status(503).json({ message: 'Subscription service is temporarily unavailable.' });
  }

  return res.status(500).json({ message: fallbackMessage });
}

async function getPlans(req, res) {
  try {
    const plans = await listActivePlans();
    res.json({ plans });
  } catch (error) {
    return handleStoreError(error, res, 'Unable to load subscription plans.');
  }
}

async function getMySubscription(req, res) {
  try {
    const summary = await getStudentSubscriptionSummary(req.user.id);
    res.json(summary);
  } catch (error) {
    return handleStoreError(error, res, 'Unable to load subscription details.');
  }
}

async function createSubscription(req, res) {
  try {
    const planId = String(req.body?.planId || '').trim();
    if (!planId) {
      return res.status(400).json({
        message: 'Validation failed.',
        errors: { planId: 'Select a subscription plan.' },
      });
    }

    const subscription = await subscribeStudent(req.user.id, planId);
    res.status(201).json({
      message: 'Subscription activated successfully.',
      subscription,
    });
  } catch (error) {
    return handleStoreError(error, res, 'Unable to activate subscription.');
  }
}

async function cancelSubscription(req, res) {
  try {
    const subscription = await cancelStudentSubscription(req.user.id);
    res.json({
      message: 'Subscription cancelled. Access remains until the current period ends.',
      subscription,
    });
  } catch (error) {
    return handleStoreError(error, res, 'Unable to cancel subscription.');
  }
}

module.exports = {
  getPlans,
  getMySubscription,
  createSubscription,
  cancelSubscription,
};
