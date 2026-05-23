import { apiRequest } from './httpClient';

export function registerUser(payload) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function logoutUserRequest() {
  return apiRequest('/auth/logout', { method: 'POST' });
}

export function fetchCurrentUser() {
  return apiRequest('/auth/me');
}
