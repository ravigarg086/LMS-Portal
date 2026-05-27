import { SECTION_IDS } from '../constants';

export const platformStats = [
  { id: 'courses', label: 'Active Courses', value: '120+', icon: 'book-open' },
  { id: 'learners', label: 'Enrolled Learners', value: '8,400+', icon: 'graduation-cap' },
  { id: 'mentors', label: 'Expert Mentors', value: '95', icon: 'message-square' },
  { id: 'completion', label: 'Avg Completion', value: '78%', icon: 'trending-up' },
];

export const portalQuickLinks = [
  {
    id: 'register',
    label: 'Create Account',
    description: 'Register as Student, Faculty, or Admin.',
    href: '/register',
    icon: 'check-circle',
    cta: 'Get Started',
  },
  {
    id: 'signin',
    label: 'Sign In',
    description: 'Access assignments, progress, and role tools.',
    href: '/signin',
    icon: 'log-in',
    cta: 'Sign In',
  },
  {
    id: 'faq',
    label: 'FAQ',
    description: 'Answers about enrollment, roles, and platform use.',
    href: '/faq',
    icon: 'help-circle',
    cta: 'Browse FAQ',
  },
  {
    id: 'contact',
    label: 'Contact Us',
    description: 'Reach the LMS Portal team for support.',
    href: '/contact',
    icon: 'mail',
    cta: 'Contact',
  },
  {
    id: 'photo-gallery',
    label: 'Photo Gallery',
    description: 'Preview course visuals and campus highlights.',
    href: '/photo-gallery',
    icon: 'image',
    cta: 'View Gallery',
  },
  {
    id: 'external-data',
    label: 'External Data',
    description: 'Explore the live JSONPlaceholder user directory.',
    href: '/external-data',
    icon: 'trending-up',
    cta: 'Open Directory',
  },
];

export const roleHighlights = [
  {
    id: 'student',
    label: 'Student',
    title: 'Track learning progress',
    description: 'View enrolled courses, assignment deadlines, and completion metrics after sign-in.',
    icon: 'book-open',
    href: '/register',
  },
  {
    id: 'faculty',
    label: 'Faculty',
    title: 'Manage your class',
    description: 'Edit student profiles and monitor class performance analytics from your portal.',
    icon: 'bar-chart-2',
    href: '/register',
  },
  {
    id: 'admin',
    label: 'Admin',
    title: 'Run the platform',
    description: 'Manage users, review system health, and configure LMS-wide settings.',
    icon: 'settings',
    href: '/register',
  },
];

export const guestSectionAnchors = {
  overview: 'guest-overview',
  portal: 'guest-portal',
  roles: 'guest-roles',
  courses: SECTION_IDS.popularCourses,
};
