import { apiRequest } from './httpClient';

export function fetchCalendarEvents({ start, end } = {}) {
  const params = new URLSearchParams();
  if (start) params.set('start', start);
  if (end) params.set('end', end);
  const query = params.toString();
  return apiRequest(`/calendar/events${query ? `?${query}` : ''}`);
}

export function createCalendarEvent(payload) {
  return apiRequest('/calendar/events', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateCalendarEvent(eventId, payload) {
  return apiRequest(`/calendar/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteCalendarEvent(eventId) {
  return apiRequest(`/calendar/events/${eventId}`, {
    method: 'DELETE',
  });
}
