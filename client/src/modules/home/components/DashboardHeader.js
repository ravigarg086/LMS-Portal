import { Link } from 'react-router-dom';
import LucideIcon from './LucideIcon';
import ProfileMenu from './ProfileMenu';
import CourseSearch from './CourseSearch';
import { USER_HEADER_COPY, getUserHeaderMeta } from '../data/userHeaderMeta';
import { getUserAvatarUrl } from '../../../shared/utils/userAvatar';
import { useUserSettings } from '../../../shared/settings/UserSettingsContext';
import '../dashboard-user-header.css';
import '../guest-action-bar.css';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80';

function DashboardHeader({ sidebarOpen, onMenuToggle, user = null }) {
  const { userSettings, loading: settingsLoading } = useUserSettings();
  const isAuthenticated = Boolean(user);
  const displayName = user?.fullName || 'Learner';
  const firstName = displayName.split(' ')[0];
  const avatarUrl = getUserAvatarUrl(user);
  const roleCopy = user?.role ? USER_HEADER_COPY[user.role] : null;
  const metaItems = getUserHeaderMeta(user);
  const showWelcomeBanner = userSettings?.dashboard?.showWelcomeBanner ?? true;

  const menuButton = (
    <button
      type="button"
      className="dashboard-header__menu-btn"
      aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={sidebarOpen}
      aria-controls="eduhiveSidebar"
      onClick={onMenuToggle}
    >
      <LucideIcon name="menu" size={22} />
    </button>
  );

  const toolbar = (
    <div className="dashboard-user-panel__toolbar">
      <CourseSearch
        wrapperClassName="dashboard-search dashboard-search--compact"
        placeholder="Search courses..."
        inputId="dashboard-course-search"
      />
      <button
        type="button"
        className="icon-btn icon-btn--compact"
        aria-label="Notifications (coming soon)"
        disabled
      >
        <LucideIcon name="bell" size={20} />
      </button>
      <ProfileMenu user={user} />
    </div>
  );

  if (isAuthenticated) {
    if (!settingsLoading && !showWelcomeBanner) {
      return (
        <header className="dashboard-header dashboard-header--authenticated dashboard-header--compact">
          <div className={`dashboard-user-panel dashboard-user-panel--compact dashboard-user-panel--${user.role}`}>
            {menuButton}
            {toolbar}
          </div>
        </header>
      );
    }

    return (
      <header className="dashboard-header dashboard-header--authenticated">
        <div className={`dashboard-user-panel dashboard-user-panel--${user.role}`}>
          <div className="dashboard-user-panel__main">
            {menuButton}

            <div className="dashboard-user-panel__identity">
              <img
                src={avatarUrl}
                alt=""
                className="dashboard-user-panel__avatar"
              />
              <div className="dashboard-user-panel__copy">
                <span className={`dashboard-user-panel__badge dashboard-user-panel__badge--${user.role}`}>
                  {roleCopy?.label}
                </span>
                <h1 className="dashboard-user-panel__title">
                  Welcome back, {firstName}
                </h1>
                <p className="dashboard-user-panel__desc">{roleCopy?.description}</p>
                {metaItems.length > 0 && (
                  <dl className="dashboard-user-panel__meta">
                    {metaItems.map(({ label, value }) => (
                      <div key={label} className="dashboard-user-panel__meta-item">
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          </div>

          {toolbar}
        </div>
      </header>
    );
  }

  return (
    <>
      <div className="guest-top-bar">
        <button
          type="button"
          className="dashboard-header__menu-btn guest-top-bar__menu"
          aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={sidebarOpen}
          aria-controls="eduhiveSidebar"
          onClick={onMenuToggle}
        >
          <LucideIcon name="menu" size={22} />
        </button>

        <div className="guest-action-bar" role="region" aria-label="Search and account actions">
          <CourseSearch
            wrapperClassName="guest-action-bar__search"
            placeholder="Search courses, topics, or skills..."
            inputId="guest-course-search"
          />
          <div className="guest-action-bar__actions">
            <Link to="/signin" className="guest-action-bar__btn guest-action-bar__btn--ghost">
              Sign In
            </Link>
            <Link to="/register" className="guest-action-bar__btn guest-action-bar__btn--primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <header className="dashboard-header dashboard-hero dashboard-hero--guest">
        <div className="dashboard-hero__layout">
          <div className="dashboard-hero__left">
            <div className="dashboard-hero__copy">
              <span className="st-label">Learning Platform</span>
              <h1 className="dashboard-hero__title">
                Learn <em className="dashboard-hero__accent">smarter</em>. Grow faster.
              </h1>
              <p className="dashboard-hero__subtitle">
                Explore courses, sign in, or create your account to get started.
              </p>
              <Link to="/register" className="dashboard-hero__cta">
                Start Learning
                <span className="dashboard-hero__cta-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="dashboard-hero__right">
            <div className="dashboard-hero__card">
              <img src={HERO_IMAGE} alt="" className="dashboard-hero__image" />
              <div className="concierge-badge" aria-hidden="true">
                <span className="concierge-badge__num">LMS</span>
                <span className="concierge-badge__label">Portal</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default DashboardHeader;
