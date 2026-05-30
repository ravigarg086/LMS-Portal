import { apiRequest } from './httpClient';

export function fetchSubscriptionPlans() {
  return apiRequest('/subscriptions/plans');
}

export function fetchMySubscription() {
  return apiRequest('/subscriptions/me');
}

export function subscribeToPlan(planId) {
  return apiRequest('/subscriptions', {
    method: 'POST',
    body: JSON.stringify({ planId }),
  });
}

export function cancelMySubscription() {
  return apiRequest('/subscriptions/me/cancel', {
    method: 'PUT',
  });
}
