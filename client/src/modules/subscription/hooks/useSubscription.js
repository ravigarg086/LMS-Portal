import { useCallback, useEffect, useState } from 'react';
import {
  cancelMySubscription,
  fetchMySubscription,
  subscribeToPlan,
} from '../../../shared/api/subscriptionsApi';

export function useSubscription(enabled = true) {
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [history, setHistory] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadSubscription = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await fetchMySubscription();
      setActiveSubscription(data.activeSubscription ?? null);
      setHistory(data.history ?? []);
      setPlans(data.plans ?? []);
    } catch (err) {
      setError(err.message || 'Unable to load subscription details.');
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    loadSubscription();
  }, [loadSubscription]);

  const subscribe = async (planId) => {
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const result = await subscribeToPlan(planId);
      setSuccess(result.message || 'Subscription activated successfully.');
      await loadSubscription();
    } catch (err) {
      setError(err.message || 'Unable to activate subscription.');
    } finally {
      setSubmitting(false);
    }
  };

  const cancel = async () => {
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const result = await cancelMySubscription();
      setSuccess(result.message || 'Subscription cancelled.');
      await loadSubscription();
    } catch (err) {
      setError(err.message || 'Unable to cancel subscription.');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    activeSubscription,
    history,
    plans,
    loading,
    submitting,
    error,
    success,
    subscribe,
    cancel,
    reload: loadSubscription,
  };
}
