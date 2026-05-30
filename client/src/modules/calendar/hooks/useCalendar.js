import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  createCalendarEvent,
  deleteCalendarEvent,
  fetchCalendarEvents,
  updateCalendarEvent,
} from '../../../shared/api/calendarApi';
import { getMonthEnd, getMonthStart, toLocalRangeEnd, toLocalRangeStart } from '../utils/calendarFormatters';

export function useCalendar(monthDate) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const loadRequestRef = useRef(0);

  const range = useMemo(() => {
    const start = getMonthStart(monthDate);
    const end = getMonthEnd(monthDate);
    return {
      start: toLocalRangeStart(start),
      end: toLocalRangeEnd(end),
    };
  }, [monthDate]);

  const loadEvents = useCallback(async ({ silent = false } = {}) => {
    const requestId = ++loadRequestRef.current;

    if (!silent) {
      setLoading(true);
    }
    setError('');

    try {
      const data = await fetchCalendarEvents(range);
      if (requestId !== loadRequestRef.current) {
        return;
      }
      setEvents(data.events ?? []);
    } catch (err) {
      if (requestId !== loadRequestRef.current) {
        return;
      }
      setError(err.message || 'Unable to load calendar events.');
    } finally {
      if (!silent) {
        setLoading(false);
      }
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
    } catch (err) {
      setError(err.message || 'Unable to delete event.');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const clearFeedback = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

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
