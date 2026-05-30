const DEFAULT_USER_SETTINGS = {
  theme: 'light',
  notifications: {
    emailAssignments: true,
    emailCourseUpdates: true,
    emailAnnouncements: true,
    inAppAlerts: true,
  },
  privacy: {
    showProfileToMentors: true,
    showProgressPublicly: false,
  },
  dashboard: {
    compactLayout: false,
    showWelcomeBanner: true,
  },
  student: {
    assignmentReminders: true,
    weeklyProgressEmail: false,
  },
  faculty: {
    gradingNotifications: true,
    defaultStudentView: 'list',
  },
};

const DEFAULT_PLATFORM_SETTINGS = {
  portalName: 'LMS Portal',
  supportEmail: 'support@scholarlms.edu',
  registrationEnabled: true,
  maintenanceMode: false,
  defaultTimezone: 'America/Chicago',
};

function mergeDeep(base, patch) {
  if (!patch || typeof patch !== 'object') {
    return base;
  }

  const result = { ...base };

  Object.keys(patch).forEach((key) => {
    const value = patch[key];
    if (value && typeof value === 'object' && !Array.isArray(value) && base[key] && typeof base[key] === 'object') {
      result[key] = mergeDeep(base[key], value);
    } else if (value !== undefined) {
      result[key] = value;
    }
  });

  return result;
}

function sanitizeUserSettings(raw = {}) {
  const merged = mergeDeep(DEFAULT_USER_SETTINGS, raw);

  merged.theme = merged.theme === 'dark' ? 'dark' : 'light';

  Object.keys(merged.notifications).forEach((key) => {
    merged.notifications[key] = Boolean(merged.notifications[key]);
  });

  Object.keys(merged.privacy).forEach((key) => {
    merged.privacy[key] = Boolean(merged.privacy[key]);
  });

  merged.dashboard.compactLayout = Boolean(merged.dashboard.compactLayout);
  merged.dashboard.showWelcomeBanner = Boolean(merged.dashboard.showWelcomeBanner);

  merged.student.assignmentReminders = Boolean(merged.student.assignmentReminders);
  merged.student.weeklyProgressEmail = Boolean(merged.student.weeklyProgressEmail);

  merged.faculty.gradingNotifications = Boolean(merged.faculty.gradingNotifications);
  merged.faculty.defaultStudentView = merged.faculty.defaultStudentView === 'grid' ? 'grid' : 'list';

  return merged;
}

function sanitizePlatformSettings(raw = {}) {
  const merged = mergeDeep(DEFAULT_PLATFORM_SETTINGS, raw);

  merged.portalName = String(merged.portalName || DEFAULT_PLATFORM_SETTINGS.portalName).trim().slice(0, 120);
  merged.supportEmail = String(merged.supportEmail || DEFAULT_PLATFORM_SETTINGS.supportEmail).trim().slice(0, 255);
  merged.registrationEnabled = Boolean(merged.registrationEnabled);
  merged.maintenanceMode = Boolean(merged.maintenanceMode);
  merged.defaultTimezone = String(merged.defaultTimezone || DEFAULT_PLATFORM_SETTINGS.defaultTimezone).trim().slice(0, 80);

  return merged;
}

function validatePlatformSettings(settings) {
  const errors = {};

  if (!settings.portalName) {
    errors.portalName = 'Portal name is required.';
  }

  if (!settings.supportEmail) {
    errors.supportEmail = 'Support email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.supportEmail)) {
    errors.supportEmail = 'Enter a valid support email address.';
  }

  return errors;
}

module.exports = {
  DEFAULT_USER_SETTINGS,
  DEFAULT_PLATFORM_SETTINGS,
  mergeDeep,
  sanitizeUserSettings,
  sanitizePlatformSettings,
  validatePlatformSettings,
};
