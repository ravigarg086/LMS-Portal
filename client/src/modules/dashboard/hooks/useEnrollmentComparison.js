import { useEffect, useMemo, useState } from 'react';
import { DEMO_STUDENTS } from '../data/demoStudents';
import { buildEnrollmentAnalytics } from '../data/enrollmentStats';
import { fetchEnrollmentComparison } from '../../../shared/api/usersApi';

const DEMO_ANALYTICS = buildEnrollmentAnalytics(DEMO_STUDENTS);

function hasRichAnalytics(payload) {
  return Boolean(payload?.courses?.length && payload?.summary?.totalStudents > 0);
}

export function useEnrollmentComparison(enabled) {
  const demoFallback = useMemo(() => DEMO_ANALYTICS, []);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState('');
  const [usingDemo, setUsingDemo] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return undefined;
    }

    let active = true;
    setLoading(true);
    setError('');

    fetchEnrollmentComparison()
      .then((response) => {
        if (!active) {
          return;
        }
        if (hasRichAnalytics(response)) {
          setAnalytics(response);
          setUsingDemo(false);
        } else {
          setAnalytics(demoFallback);
          setUsingDemo(true);
        }
      })
      .catch((err) => {
        if (active) {
          setAnalytics(demoFallback);
          setUsingDemo(true);
          setError(err.message || 'Live analytics unavailable. Showing demo data.');
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
  }, [demoFallback, enabled]);

  return { analytics, loading, error, usingDemo };
}
