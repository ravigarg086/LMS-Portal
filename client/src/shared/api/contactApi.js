import { apiRequest } from './httpClient';

export async function submitContactMessage(payload) {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function fetchContactMessages(search = '') {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return apiRequest(`/contact${query}`);
}
