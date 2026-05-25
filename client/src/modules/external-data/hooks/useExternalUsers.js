import { useEffect, useState } from 'react';
import { fetchExternalUsers } from '../services/jsonPlaceholderApi';

export function useExternalUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [source, setSource] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setSource('');

    fetchExternalUsers()
      .then(({ users: records, source: dataSource }) => {
        if (active) {
          setUsers(records);
          setSource(dataSource);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load external users.');
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
  }, []);

  return { users, loading, error, source };
}
