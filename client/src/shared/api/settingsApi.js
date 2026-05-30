import { apiRequest } from './httpClient';

export function fetchUserSettings() {
  return apiRequest('/settings/me');
}

export function updateUserSettings(settings) {
  return apiRequest('/settings/me', {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
}

export function fetchPlatformSettings() {
  return apiRequest('/settings/platform');
}

export function updatePlatformSettings(settings) {
  return apiRequest('/settings/platform', {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
}
