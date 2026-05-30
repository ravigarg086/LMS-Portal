import { SECTION_IDS } from '../constants';

/** Guest dashboard sidebar targets — real section ids, not bottom placeholders. */
export const GUEST_SIDEBAR_HREFS = {
  dashboard: '#guest-overview',
  courses: `#${SECTION_IDS.popularCourses}`,
  assignment: '#guest-roles',
  progress: '#guest-portal',
  calendar: '#guest-overview',
};

/** Role dashboard tab + hash targets for authenticated main-menu items. */
export function getRoleNavIntent(navId, role) {
  if (role === 'student') {
    const map = {
      assignment: { section: 'overview', hash: `#${SECTION_IDS.assignment}` },
      progress: { section: 'overview', hash: `#${SECTION_IDS.progress}` },
      calendar: { section: 'overview', hash: `#${SECTION_IDS.calendar}` },
      courses: { section: 'courses', hash: `#${SECTION_IDS.popularCourses}` },
    };
    return map[navId] || null;
  }

  if (role === 'faculty') {
    const map = {
      assignment: { section: 'students' },
      progress: { section: 'analytics' },
      calendar: { section: 'analytics' },
    };
    return map[navId] || null;
  }

  if (role === 'admin') {
    const map = {
      assignment: { section: 'users' },
      progress: { section: 'analytics' },
      calendar: { section: 'analytics' },
    };
    return map[navId] || null;
  }

  return null;
}

export function buildDashboardNavUrl(dashboardRootPath, intent) {
  if (!intent) {
    return dashboardRootPath;
  }

  const params = new URLSearchParams();
  if (intent.section) {
    params.set('section', intent.section);
  }

  const search = params.toString();
  const hash = intent.hash || '';
  return `${dashboardRootPath}${search ? `?${search}` : ''}${hash}`;
}

/** Shared secondary nav rules for sidebar, footer, and other portal menus. */
export function filterSecondarySidebarNav(items, { isAuthenticated, routeLinksOnly = false } = {}) {
  return items.filter((item) => {
    if (routeLinksOnly && !item.href.startsWith('/')) {
      return false;
    }

    if (isAuthenticated && item.id === 'registration') {
      return false;
    }

    if (!isAuthenticated && item.id === 'settings') {
      return false;
    }

    return true;
  });
}
