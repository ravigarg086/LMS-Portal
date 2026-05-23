const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  return EMAIL_REGEX.test(String(email || '').trim());
}

function validatePassword(password) {
  return String(password || '').length >= 8;
}

function validateRegistrationPayload(body) {
  const errors = {};
  const role = body.role;

  if (!['student', 'faculty', 'admin'].includes(role)) {
    errors.role = 'A valid role is required.';
  }

  if (!String(body.fullName || '').trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!validateEmail(body.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!validatePassword(body.password)) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (role === 'student') {
    if (!String(body.academicTrack || '').trim()) {
      errors.academicTrack = 'Academic track is required.';
    }
    if (!String(body.graduationYear || '').trim()) {
      errors.graduationYear = 'Expected graduation year is required.';
    }
  }

  if (role === 'faculty') {
    if (!String(body.department || '').trim()) {
      errors.department = 'Department is required.';
    }
    if (!String(body.employeeId || '').trim()) {
      errors.employeeId = 'Employee ID is required.';
    }
  }

  if (role === 'admin') {
    if (!String(body.accessLevel || '').trim()) {
      errors.accessLevel = 'Access level is required.';
    }
    if (!String(body.inviteKey || '').trim()) {
      errors.inviteKey = 'Master access token is required.';
    }
  }

  return errors;
}

function validateLoginPayload(body) {
  const errors = {};

  if (!['student', 'faculty', 'admin'].includes(body.role)) {
    errors.role = 'Select a user persona.';
  }

  if (!String(body.userId || '').trim()) {
    errors.userId = 'User ID or email is required.';
  }

  if (!validatePassword(body.password)) {
    errors.password = 'Password must be at least 8 characters.';
  }

  return errors;
}

module.exports = {
  validateEmail,
  validatePassword,
  validateRegistrationPayload,
  validateLoginPayload,
};
