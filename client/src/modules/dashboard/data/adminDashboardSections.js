export const DEFAULT_ADMIN_SECTION = 'analytics';

export const ADMIN_DASHBOARD_SECTIONS = [
  { id: 'analytics', label: 'Platform Analytics' },
  { id: 'contact', label: 'Contact Messages' },
  { id: 'users', label: 'User Management' },
];

export function isValidAdminSection(sectionId) {
  return ADMIN_DASHBOARD_SECTIONS.some((section) => section.id === sectionId);
}
