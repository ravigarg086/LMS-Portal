import { SECTION_IDS } from '../constants';

export const mainSidebarNav = [
  { id: 'dashboard', label: 'Dashboard', href: '/', icon: 'layout-dashboard' },
  { id: 'courses', label: 'Courses', href: `#${SECTION_IDS.popularCourses}`, icon: 'book-open', hasSubmenu: true },
  { id: 'assignment', label: 'Assignment', href: `#${SECTION_IDS.assignment}`, icon: 'file-text' },
  { id: 'progress', label: 'Progress', href: `#${SECTION_IDS.progress}`, icon: 'bar-chart-2' },
  { id: 'calendar', label: 'Calendar', href: `#${SECTION_IDS.calendar}`, icon: 'calendar' },
];

export const secondarySidebarNav = [
  { id: 'registration', label: 'Registration', href: '/register', icon: 'check-circle' },
  { id: 'photo-gallery', label: 'Photo Gallery', href: '/photo-gallery', icon: 'image' },
  { id: 'faq', label: 'FAQ', href: '/faq', icon: 'help-circle' },
  { id: 'external-data', label: 'External Data', href: '/external-data', icon: 'trending-up' },
  { id: 'contact', label: 'Contact Us', href: '/contact', icon: 'mail' },
  { id: 'subscription', label: 'Subscription', href: `#${SECTION_IDS.subscription}`, icon: 'plus' },
  { id: 'settings', label: 'Settings', href: '#settings', icon: 'settings' },
];
