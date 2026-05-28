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

function validateChangePasswordPayload(body) {
  const errors = {};

  if (!String(body.currentPassword || '').trim()) {
    errors.currentPassword = 'Current password is required.';
  }

  if (!validatePassword(body.newPassword)) {
    errors.newPassword = 'New password must be at least 8 characters.';
  }

  if (String(body.newPassword || '') !== String(body.confirmPassword || '')) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

function validateProfileUpdatePayload(body, role) {
  const errors = {};

  if (!String(body.fullName || '').trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!validateEmail(body.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (body.profilePictureUrl !== undefined && body.profilePictureUrl !== null && body.profilePictureUrl !== '') {
    const picture = String(body.profilePictureUrl);
    if (picture.length > 500000) {
      errors.profilePictureUrl = 'Profile picture is too large (max 500 KB).';
    } else if (!picture.startsWith('data:image/') && !/^https?:\/\//i.test(picture)) {
      errors.profilePictureUrl = 'Profile picture must be an image URL or uploaded file.';
    }
  }

  if (role === 'student') {
    if (body.academicTrack !== undefined && !String(body.academicTrack || '').trim()) {
      errors.academicTrack = 'Academic track is required.';
    }
    if (body.graduationYear !== undefined && !String(body.graduationYear || '').trim()) {
      errors.graduationYear = 'Graduation year is required.';
    }
  }

  if (role === 'faculty') {
    if (body.department !== undefined && !String(body.department || '').trim()) {
      errors.department = 'Department is required.';
    }
    if (body.employeeId !== undefined && !String(body.employeeId || '').trim()) {
      errors.employeeId = 'Employee ID is required.';
    }
  }

  return errors;
}

function validateForgotPasswordPayload(body) {
  const errors = {};

  if (!['student', 'faculty', 'admin'].includes(body.role)) {
    errors.role = 'Select a user persona.';
  }

  if (!validateEmail(body.email)) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
}

function validateResetPasswordPayload(body) {
  const errors = {};

  if (!String(body.token || '').trim()) {
    errors.token = 'Reset token is required.';
  }

  if (!validatePassword(body.newPassword)) {
    errors.newPassword = 'New password must be at least 8 characters.';
  }

  if (String(body.newPassword || '') !== String(body.confirmPassword || '')) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

module.exports = {
  validateEmail,
  validatePassword,
  validateRegistrationPayload,
  validateLoginPayload,
  validateChangePasswordPayload,
  validateProfileUpdatePayload,
  validateForgotPasswordPayload,
  validateResetPasswordPayload,
};
