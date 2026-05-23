import { useEffect, useState } from 'react';
import { fetchStudentDashboard } from '../../../shared/api/usersApi';

export function useStudentDashboard(enabled) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return undefined;
    }

    let active = true;
    setLoading(true);
    setError('');

    fetchStudentDashboard()
      .then(({ dashboard: data }) => {
        if (active) {
          setDashboard(data);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load dashboard data.');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [enabled]);

  return { dashboard, loading, error };
}
