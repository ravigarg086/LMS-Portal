const SUBSCRIPTION_PLANS = [
  {
    planId: 'basic-monthly',
    name: 'Basic',
    description: 'Core course access with progress tracking and mentor Q&A.',
    price: 9.99,
    currency: 'USD',
    durationMonths: 1,
    features: ['Core course library', 'Progress tracking', 'Email support'],
    sortOrder: 1,
  },
  {
    planId: 'standard-quarterly',
    name: 'Standard',
    description: 'Expanded catalog access with assignment feedback and live sessions.',
    price: 24.99,
    currency: 'USD',
    durationMonths: 3,
    features: ['All Basic features', 'Assignment feedback', 'Monthly live sessions'],
    sortOrder: 2,
  },
  {
    planId: 'premium-annual',
    name: 'Premium',
    description: 'Full platform access including capstone projects and priority support.',
    price: 79.99,
    currency: 'USD',
    durationMonths: 12,
    features: ['All Standard features', 'Capstone projects', 'Priority mentor support', 'Certificate of completion'],
    sortOrder: 3,
  },
];

module.exports = {
  SUBSCRIPTION_PLANS,
};
