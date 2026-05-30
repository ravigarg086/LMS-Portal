import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createCalendarEvent,
  deleteCalendarEvent,
  fetchCalendarEvents,
  updateCalendarEvent,
} from '../../../shared/api/calendarApi';
import { getMonthEnd, getMonthStart } from '../utils/calendarFormatters';

export function useCalendar(monthDate) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const range = useMemo(() => {
    const start = getMonthStart(monthDate);
    const end = getMonthEnd(monthDate);
    return {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  }, [monthDate]);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchCalendarEvents(range);
      setEvents(data.events ?? []);
    } catch (err) {
      setError(err.message || 'Unable to load calendar events.');
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const createEvent = async (payload) => {
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const result = await createCalendarEvent(payload);
      setSuccess(result.message || 'Event created successfully.');
      await loadEvents();
      return result.event;
    } catch (err) {
      setError(err.message || 'Unable to create event.');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const updateEvent = async (eventId, payload) => {
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const result = await updateCalendarEvent(eventId, payload);
      setSuccess(result.message || 'Event updated successfully.');
      await loadEvents();
      return result.event;
    } catch (err) {
      setError(err.message || 'Unable to update event.');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const removeEvent = async (eventId) => {
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const result = await deleteCalendarEvent(eventId);
      setSuccess(result.message || 'Event deleted successfully.');
      await loadEvents();
    } catch (err) {
      setError(err.message || 'Unable to delete event.');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const clearFeedback = () => {
    setError('');
    setSuccess('');
  };

  return {
    events,
    loading,
    submitting,
    error,
    success,
    createEvent,
    updateEvent,
    removeEvent,
    reload: loadEvents,
    clearFeedback,
  };
}
