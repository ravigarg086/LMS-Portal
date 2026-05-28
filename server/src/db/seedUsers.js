const { createStudentDashboard } = require('../utils/studentDashboard');
const { DEMO_STUDENTS } = require('../utils/demoStudents');

const DEMO_PASSWORD_HASH = '$2b$12$NLd1PU5cAX5.BgYr160h6eSgfc9r7dpUWkjugeI1bR5N2DGJu/UlW';

const DEFAULT_SEED_USERS = [
  {
    id: 'seed-student-001',
    fullName: 'Alex Morgan',
    email: 'alex@campus.edu',
    password: DEMO_PASSWORD_HASH,
    role: 'student',
    academicTrack: 'Computer Science',
    graduationYear: '2027',
    department: '',
    employeeId: '',
    accessLevel: '',
    profilePictureUrl: '',
    dashboard: createStudentDashboard({
      email: 'alex@campus.edu',
      academicTrack: 'Computer Science',
    }),
  },
  {
    id: 'seed-faculty-001',
    fullName: 'Dr. Priya Shah',
    email: 'pshah@campus.edu',
    password: DEMO_PASSWORD_HASH,
    role: 'faculty',
    academicTrack: '',
    graduationYear: '',
    department: 'Computer Science',
    employeeId: 'FAC001',
    accessLevel: '',
    profilePictureUrl: '',
    dashboard: null,
  },
  {
    id: 'seed-admin-001',
    fullName: 'Jordan Lee',
    email: 'jlee@campus.edu',
    password: DEMO_PASSWORD_HASH,
    role: 'admin',
    academicTrack: '',
    graduationYear: '',
    department: '',
    employeeId: '',
    accessLevel: 'Super Admin',
    profilePictureUrl: '',
    dashboard: null,
  },
];

function getSeedUsers() {
  const demoWithDashboard = DEMO_STUDENTS.map((student) => ({
    ...student,
    profilePictureUrl: student.profilePictureUrl || '',
  }));

  return [...DEFAULT_SEED_USERS, ...demoWithDashboard];
}

module.exports = {
  DEFAULT_SEED_USERS,
  getSeedUsers,
};
