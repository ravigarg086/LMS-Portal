export const USER_ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  ADMIN: 'admin',
};

export const ROLE_OPTIONS = [
  { value: USER_ROLES.STUDENT, label: 'Student' },
  { value: USER_ROLES.FACULTY, label: 'Faculty' },
  { value: USER_ROLES.ADMIN, label: 'Admin' },
];

export const ROLE_DASHBOARD_ROUTES = {
  [USER_ROLES.STUDENT]: '/dashboard/student',
  [USER_ROLES.FACULTY]: '/dashboard/faculty',
  [USER_ROLES.ADMIN]: '/dashboard/admin',
};

export const SESSION_USER_KEY = 'lms-portal-user';

export const REGISTRATION_DRAFT_KEY = 'registration_progress';

export const STUDENT_TRACKS = ['Computer Science', 'Information Technology', 'Data Science', 'Business Analytics'];
export const FACULTY_DEPARTMENTS = ['Engineering', 'Computer Science', 'Mathematics', 'Business', 'Humanities'];
export const ADMIN_ACCESS_LEVELS = ['Department Admin', 'Super Admin'];
