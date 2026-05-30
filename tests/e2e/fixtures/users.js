/**
 * Demo accounts seeded in MySQL (password for all: password123456).
 * Mirrors SignInForm DEMO_ACCOUNTS and server/src/db/seedUsers.js.
 */
const TEST_USERS = {
  student: {
    role: 'student',
    roleLabel: 'Student',
    email: 'alex@campus.edu',
    password: 'password123456',
    fullName: 'Alex Morgan',
    firstName: 'Alex',
    dashboardPath: '/dashboard/student',
    headerLabel: 'Student Dashboard',
    welcomePattern: /Welcome back,\s*Alex/i,
  },
  faculty: {
    role: 'faculty',
    roleLabel: 'Faculty',
    email: 'pshah@campus.edu',
    password: 'password123456',
    fullName: 'Dr. Priya Shah',
    firstName: 'Dr.',
    dashboardPath: '/dashboard/faculty',
    headerLabel: 'Faculty Portal',
    welcomePattern: /Welcome back,\s*Dr\./i,
  },
  admin: {
    role: 'admin',
    roleLabel: 'Admin',
    email: 'jlee@campus.edu',
    password: 'password123456',
    fullName: 'Jordan Lee',
    firstName: 'Jordan',
    dashboardPath: '/dashboard/admin',
    headerLabel: 'Admin Control Panel',
    welcomePattern: /Welcome back,\s*Jordan/i,
  },
};

const ALL_PERSONAS = Object.values(TEST_USERS);

module.exports = { TEST_USERS, ALL_PERSONAS };
