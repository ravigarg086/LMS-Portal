import { useCallback, useEffect, useState } from 'react';
import { fetchFaculty, fetchStudents } from '../../../shared/api/usersApi';

export function useManagedUsers(role) {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      if (role === 'admin') {
        const [studentResponse, facultyResponse] = await Promise.all([fetchStudents(), fetchFaculty()]);
        setStudents(studentResponse.users);
        setFaculty(facultyResponse.users);
      } else if (role === 'faculty') {
        const studentResponse = await fetchStudents();
        setStudents(studentResponse.users);
      }
    } catch (err) {
      setError(err.message || 'Unable to load users.');
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { students, faculty, loading, error, reload };
}
