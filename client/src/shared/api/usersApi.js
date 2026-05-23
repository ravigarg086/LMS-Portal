import { apiRequest } from './httpClient';

export function fetchStudentDashboard() {
  return apiRequest('/users/me/dashboard');
}

export function fetchStudents() {
  return apiRequest('/users/students');
}

export function fetchFaculty() {
  return apiRequest('/users/faculty');
}

export function fetchEnrollmentComparison() {
  return apiRequest('/users/enrollment-comparison');
}

export function createManagedUser(payload) {
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateManagedUser(id, payload) {
  return apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteManagedUser(id) {
  return apiRequest(`/users/${id}`, { method: 'DELETE' });
}
