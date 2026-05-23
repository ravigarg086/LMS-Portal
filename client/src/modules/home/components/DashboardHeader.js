import { Link } from 'react-router-dom';
import LucideIcon from './LucideIcon';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80';

function DashboardHeader({ sidebarOpen, onMenuToggle, user = null }) {
  const displayName = user?.fullName || 'Learner';
  const displayRole = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Guest';
  const avatarSeed = user?.email || 'LMSPortalLearner';
  const isAuthenticated = Boolean(user);

  return (
    <header className={`dashboard-header dashboard-hero${isAuthenticated ? ' dashboard-hero--compact' : ''}`}>
      <div className="dashboard-hero__layout">
        <div className="dashboard-hero__left">
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
          <div className="dashboard-hero__copy">
            <span className="st-label">Learning Platform</span>
            <h1 className="dashboard-hero__title">
              {isAuthenticated ? (
                <>
                  Welcome <em className="dashboard-hero__accent">back</em>, {displayName.split(' ')[0]}
                </>
              ) : (
                <>
                  Learn <em className="dashboard-hero__accent">smarter</em>. Grow faster.
                </>
              )}
            </h1>
            <p className="dashboard-hero__subtitle">
              {isAuthenticated
                ? 'Track progress and continue your learning journey.'
                : 'Explore courses, sign in, or create your account to get started.'}
            </p>
            {!isAuthenticated && (
              <Link to="/register" className="dashboard-hero__cta">
                Start Learning
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>

        <div className="dashboard-hero__right">
          <div className="dashboard-hero__card">
            <img
              src={HERO_IMAGE}
              alt=""
              className="dashboard-hero__image st-grayscale"
            />
            <div className="concierge-badge" aria-hidden="true">
              <span className="concierge-badge__num">01</span>
              <span className="concierge-badge__label">LMS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-header__toolbar">
        <label className="dashboard-search">
          <LucideIcon name="search" size={18} />
          <input type="search" placeholder="Search courses..." aria-label="Search courses" />
        </label>
        <button type="button" className="icon-btn" aria-label="Notifications (coming soon)" disabled>
          <LucideIcon name="bell" size={20} />
        </button>
        {!isAuthenticated && (
          <div className="dashboard-header__auth-actions">
            <Link to="/signin" className="st-pill-btn st-pill-btn--outline">
              Sign In
            </Link>
            <Link to="/register" className="st-pill-btn">
              Sign Up
            </Link>
          </div>
        )}
        <div className="profile-card" role="group" aria-label={`Signed in as ${displayName}, ${displayRole}`}>
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`}
            alt={`${displayName} profile`}
            className="profile-card__avatar st-grayscale"
          />
          <div className="profile-card__info">
            <span className="profile-card__name">{displayName}</span>
            <span className="profile-card__role">{displayRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
