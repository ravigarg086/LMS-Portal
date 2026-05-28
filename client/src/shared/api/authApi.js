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

export function changePassword(payload) {
  return apiRequest('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateProfile(payload) {
  return apiRequest('/auth/profile', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
