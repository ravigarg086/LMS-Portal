import LucideIcon from './LucideIcon';

function DashboardHeader({ sidebarOpen, onMenuToggle }) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__left">
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
        <div>
          <h1 className="dashboard-header__title">Welcome back, Learner 👋</h1>
          <p className="dashboard-header__subtitle">Track progress and continue your learning journey.</p>
        </div>
      </div>

      <div className="dashboard-header__right">
        <label className="dashboard-search">
          <LucideIcon name="search" size={18} />
          <input type="search" placeholder="Search courses..." aria-label="Search courses" />
        </label>
        <button type="button" className="icon-btn" aria-label="Notifications (coming soon)" disabled>
          <LucideIcon name="bell" size={20} />
        </button>
        <div className="profile-card" role="group" aria-label="Signed in as Alex Morgan, Student">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=LMSPortalLearner"
            alt="Alex Morgan profile"
            className="profile-card__avatar"
          />
          <div className="profile-card__info">
            <span className="profile-card__name">Alex Morgan</span>
            <span className="profile-card__role">Student</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
