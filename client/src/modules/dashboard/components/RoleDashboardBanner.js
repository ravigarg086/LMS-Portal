import { USER_ROLES } from '../../../shared/constants/roles';

function RoleDashboardBanner({ role, fullName }) {
  const labels = {
    [USER_ROLES.STUDENT]: 'Student Dashboard',
    [USER_ROLES.FACULTY]: 'Faculty Portal',
    [USER_ROLES.ADMIN]: 'Admin Control Panel',
  };

  const descriptions = {
    [USER_ROLES.STUDENT]: 'View your assignments, course progress, and learning activity (read-only).',
    [USER_ROLES.FACULTY]: 'Add and edit student profiles, and monitor class progress analytics.',
    [USER_ROLES.ADMIN]: 'Add and edit students and faculty, and review system health metrics.',
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
