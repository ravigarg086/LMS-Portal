import { useCallback, useEffect, useState } from 'react';
import {
  fetchContactMessages,
  updateContactMessage as updateContactMessageApi,
  deleteContactMessage as deleteContactMessageApi,
} from '../../../shared/api/contactApi';

export function useContactMessages(enabled = true) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const reload = useCallback(async () => {
    if (!enabled) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetchContactMessages();
      setMessages(response.messages || []);
    } catch (err) {
      if (err.status === 404) {
        setError('Contact inbox API not found. Stop and restart the server (npm start in server/) to load the latest routes.');
      } else if (err.status === 401) {
        setError('Session expired. Sign in again as admin to view contact messages.');
      } else if (err.status === 403) {
        setError('Only administrators can view contact messages.');
      } else {
        setError(err.message || 'Unable to load contact messages.');
      }
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    reload();
  }, [reload]);

  const updateMessage = useCallback(async (id, payload) => {
    setSubmitting(true);
    setActionError('');

    try {
      const response = await updateContactMessageApi(id, payload);
      const updated = response.contact;
      setMessages((current) => current.map((item) => (item.id === id ? updated : item)));
      return updated;
    } catch (err) {
      const message = err.message || 'Unable to update contact message.';
      setActionError(message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const deleteMessage = useCallback(async (id) => {
    setSubmitting(true);
    setActionError('');

    try {
      await deleteContactMessageApi(id);
      setMessages((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      const message = err.message || 'Unable to delete contact message.';
      setActionError(message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return {
    messages,
    loading,
    error,
    actionError,
    submitting,
    reload,
    updateMessage,
    deleteMessage,
    setActionError,
  };
}
