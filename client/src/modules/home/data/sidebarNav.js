import { SECTION_IDS } from '../constants';

export const mainSidebarNav = [
  { id: 'dashboard', label: 'Dashboard', href: `#${SECTION_IDS.home}`, icon: 'layout-dashboard' },
  { id: 'courses', label: 'Courses', href: `#${SECTION_IDS.popularCourses}`, icon: 'book-open', hasSubmenu: true },
  { id: 'assignment', label: 'Assignment', href: `#${SECTION_IDS.assignment}`, icon: 'file-text' },
  { id: 'progress', label: 'Progress', href: `#${SECTION_IDS.progress}`, icon: 'bar-chart-2' },
  { id: 'calendar', label: 'Calendar', href: `#${SECTION_IDS.calendar}`, icon: 'calendar' },
];

export const secondarySidebarNav = [
  { id: 'registration', label: 'Registration', href: `#${SECTION_IDS.registration}`, icon: 'check-circle' },
  { id: 'faq', label: 'FAQ', href: `#${SECTION_IDS.faq}`, icon: 'help-circle' },
  { id: 'external-data', label: 'External Data', href: `#${SECTION_IDS.externalData}`, icon: 'trending-up' },
  { id: 'subscription', label: 'Subscription', href: `#${SECTION_IDS.subscription}`, icon: 'plus' },
  { id: 'settings', label: 'Settings', href: '#settings', icon: 'settings' },
  { id: 'sign-in', label: 'Sign In', href: `#${SECTION_IDS.signIn}`, icon: 'log-out' },
];
