import { useCallback, useEffect, useState } from 'react';
import { fetchContactMessages } from '../../../shared/api/contactApi';

export function useContactMessages(enabled = true) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const reload = useCallback(async (nextSearch = search) => {
    if (!enabled) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetchContactMessages(nextSearch);
      setMessages(response.messages || []);
    } catch (err) {
      setError(err.message || 'Unable to load contact messages.');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [enabled, search]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      reload(search);
    }, search ? 250 : 0);

    return () => window.clearTimeout(timer);
  }, [enabled, search, reload]);

  return {
    messages,
    loading,
    error,
    search,
    setSearch,
    reload: () => reload(search),
  };
}
