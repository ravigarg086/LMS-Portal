const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!String(email || '').trim()) {
    return 'Email is required.';
  }
  if (!EMAIL_REGEX.test(String(email).trim())) {
    return 'Enter a valid email address.';
  }
  return '';
}

export function validatePassword(password) {
  if (!String(password || '').trim()) {
    return 'Password is required.';
  }
  if (String(password).length < 8) {
    return 'Password must be at least 8 characters.';
  }
  return '';
}

export function validateRequired(value, label) {
  if (!String(value || '').trim()) {
    return `${label} is required.`;
  }
  return '';
}

export function validateSignInForm({ userId, password }) {
  const errors = {};
  const userIdError = validateRequired(userId, 'User ID or email');
  const passwordError = validatePassword(password);
  if (userIdError) errors.userId = userIdError;
  if (passwordError) errors.password = passwordError;
  return errors;
}

export function validateRegistrationForm(form) {
  const errors = {};
  const fullNameError = validateRequired(form.fullName, 'Full name');
  const emailError = validateEmail(form.email);
  const passwordError = validatePassword(form.password);

  if (fullNameError) errors.fullName = fullNameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  if (form.role === 'student') {
    const trackError = validateRequired(form.academicTrack, 'Academic track');
    const yearError = validateRequired(form.graduationYear, 'Graduation year');
    if (trackError) errors.academicTrack = trackError;
    if (yearError) errors.graduationYear = yearError;
  }

  if (form.role === 'faculty') {
    const deptError = validateRequired(form.department, 'Department');
    const empError = validateRequired(form.employeeId, 'Employee ID');
    if (deptError) errors.department = deptError;
    if (empError) errors.employeeId = empError;
  }

  if (form.role === 'admin') {
    const levelError = validateRequired(form.accessLevel, 'Access level');
    const tokenError = validateRequired(form.inviteKey, 'Master access token');
    if (levelError) errors.accessLevel = levelError;
    if (tokenError) errors.inviteKey = tokenError;
  }

  return errors;
}

export function validateChangePasswordForm({ currentPassword, newPassword, confirmPassword }) {
  const errors = {};
  const currentError = validateRequired(currentPassword, 'Current password');
  const newError = validatePassword(newPassword);
  const confirmError = validatePassword(confirmPassword);

  if (currentError) errors.currentPassword = currentError;
  if (newError) errors.newPassword = newError;
  if (confirmError) errors.confirmPassword = confirmError;

  if (!errors.confirmPassword && newPassword !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

export function validateProfileForm(form, role) {
  const errors = {};
  const fullNameError = validateRequired(form.fullName, 'Full name');
  const emailError = validateEmail(form.email);

  if (fullNameError) errors.fullName = fullNameError;
  if (emailError) errors.email = emailError;

  if (form.profilePictureUrl && form.profilePictureUrl.length > 500000) {
    errors.profilePictureUrl = 'Profile picture is too large (max 500 KB).';
  }

  if (role === 'student') {
    const trackError = validateRequired(form.academicTrack, 'Academic track');
    const yearError = validateRequired(form.graduationYear, 'Graduation year');
    if (trackError) errors.academicTrack = trackError;
    if (yearError) errors.graduationYear = yearError;
  }

  if (role === 'faculty') {
    const deptError = validateRequired(form.department, 'Department');
    const empError = validateRequired(form.employeeId, 'Employee ID');
    if (deptError) errors.department = deptError;
    if (empError) errors.employeeId = empError;
  }

  return errors;
}

export function validateResetPasswordForm({ newPassword, confirmPassword }) {
  const errors = {};
  const newError = validatePassword(newPassword);
  const confirmError = validatePassword(confirmPassword);

  if (newError) errors.newPassword = newError;
  if (confirmError) errors.confirmPassword = confirmError;

  if (!errors.confirmPassword && newPassword !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}
