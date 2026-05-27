export function isHomeDashboardRoute(pathname) {
  return pathname === '/' || pathname.startsWith('/dashboard/');
}

export function getDashboardRootPath(isAuthenticated, role, getDashboardRoute) {
  if (isAuthenticated && role) {
    return getDashboardRoute(role);
  }
  return '/';
}
