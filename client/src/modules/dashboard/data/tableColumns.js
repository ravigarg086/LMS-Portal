export const CONTACT_MESSAGE_COLUMNS = [
  { key: 'createdAt', label: 'Submitted', filterType: 'text' },
  { key: 'fullName', label: 'Name', filterType: 'text' },
  { key: 'email', label: 'Email', filterType: 'text' },
  { key: 'designation', label: 'Role', filterType: 'select' },
  { key: 'location', label: 'Location', filterType: 'text' },
  { key: 'phone', label: 'Phone', filterType: 'text' },
  { key: 'subject', label: 'Subject', filterType: 'text' },
  { key: 'message', label: 'Message', filterType: 'text' },
];

export const CONTACT_MESSAGE_SEARCH_FIELDS = [
  'fullName',
  'email',
  'designation',
  'location',
  'phone',
  'subject',
  'message',
  'createdAt',
];

export const STUDENT_USER_COLUMNS = [
  { key: 'fullName', label: 'Name', filterType: 'text' },
  { key: 'email', label: 'Email', filterType: 'text' },
  { key: 'academicTrack', label: 'Track', filterType: 'select' },
  { key: 'graduationYear', label: 'Graduation', filterType: 'text' },
];

export const FACULTY_USER_COLUMNS = [
  { key: 'fullName', label: 'Name', filterType: 'text' },
  { key: 'email', label: 'Email', filterType: 'text' },
  { key: 'department', label: 'Department', filterType: 'select' },
  { key: 'employeeId', label: 'Employee ID', filterType: 'text' },
];

export const FACULTY_STUDENT_COLUMNS = [
  { key: 'fullName', label: 'Name', filterType: 'text' },
  { key: 'email', label: 'Email', filterType: 'text' },
  { key: 'academicTrack', label: 'Track', filterType: 'select' },
  { key: 'graduationYear', label: 'Graduation', filterType: 'text' },
  {
    key: 'progress',
    label: 'Progress',
    filterType: 'text',
    accessor: (student) =>
      student.dashboard?.overallProgress != null ? `${student.dashboard.overallProgress}%` : '',
  },
];

export const STUDENT_USER_SEARCH_FIELDS = ['fullName', 'email', 'academicTrack', 'graduationYear'];
export const FACULTY_USER_SEARCH_FIELDS = ['fullName', 'email', 'department', 'employeeId'];
export const FACULTY_STUDENT_SEARCH_FIELDS = [
  'fullName',
  'email',
  'academicTrack',
  'graduationYear',
  (student) => (student.dashboard?.overallProgress != null ? `${student.dashboard.overallProgress}%` : ''),
];
