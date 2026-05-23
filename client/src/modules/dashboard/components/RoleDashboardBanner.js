import { USER_ROLES } from '../../../shared/constants/roles';

function RoleDashboardBanner({ role, fullName }) {
  const labels = {
    [USER_ROLES.STUDENT]: 'Student Dashboard',
    [USER_ROLES.FACULTY]: 'Faculty Portal',
    [USER_ROLES.ADMIN]: 'Admin Control Panel',
  };

  const descriptions = {
    [USER_ROLES.STUDENT]: 'Assignment and progress views are read-only for your learning track.',
    [USER_ROLES.FACULTY]: 'Manage assignments and monitor student progress for your courses.',
    [USER_ROLES.ADMIN]: 'Manage users, roles, and portal-wide settings from this control panel.',
  };

  return (
    <section className={`role-banner role-banner--${role}`} aria-label="Active dashboard context">
      <div>
        <span className="role-banner__label">{labels[role]}</span>
        <h2 className="role-banner__title">Welcome, {fullName || 'User'}</h2>
        <p className="role-banner__desc">{descriptions[role]}</p>
      </div>
    </section>
  );
}

export default RoleDashboardBanner;
