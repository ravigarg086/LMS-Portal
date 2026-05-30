import { useEffect, useState } from 'react';
import { fetchCourses } from '../../../shared/api/coursesApi';
import {
  COURSE_MIN_SEARCH_LENGTH,
  COURSE_SEARCH_DEBOUNCE_MS,
  COURSE_SEARCH_RESULT_LIMIT,
} from '../../../shared/constants/courses';
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue';

export function useCourseSearch(query) {
  const debouncedQuery = useDebouncedValue(query, COURSE_SEARCH_DEBOUNCE_MS);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const term = debouncedQuery.trim();
    if (term.length < COURSE_MIN_SEARCH_LENGTH) {
      setResults([]);
      setError('');
      setLoading(false);
      return undefined;
    }

    let active = true;
    setLoading(true);
    setError('');

    fetchCourses({ search: term, limit: COURSE_SEARCH_RESULT_LIMIT })
      .then(({ courses }) => {
        if (!active) {
          return;
        }
        setResults(courses || []);
      })
      .catch((fetchError) => {
        if (!active) {
          return;
        }
        setResults([]);
        setError(fetchError.message || 'Unable to search courses.');
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  return { results, loading, error, debouncedQuery };
}
