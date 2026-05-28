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

export function requestPasswordReset(payload) {
  return apiRequest('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function validateResetToken(token) {
  const query = encodeURIComponent(token);
  return apiRequest(`/auth/reset-password/validate?token=${query}`);
}

export function resetPassword(payload) {
  return apiRequest('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
