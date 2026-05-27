import { apiRequest } from './httpClient';

export async function submitContactMessage(payload) {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
