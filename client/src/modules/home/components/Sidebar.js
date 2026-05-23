import { courseStackKeys, courseStacks } from '../data/courseStacks';
import { mainSidebarNav, secondarySidebarNav } from '../data/sidebarNav';
import { SIDEBAR_ID, SITE_NAME, SITE_TAGLINE, SECTION_IDS, THEMES } from '../constants';
import LucideIcon from './LucideIcon';
import { handleSectionNavClick } from '../utils/scrollToSection';
import { useTheme } from '../context/ThemeProvider';

const COMING_SOON_NAV_IDS = new Set(['registration', 'external-data', 'subscription', 'settings']);

function SidebarNavItem({ item, activeId, onNavigate }) {
  const isActive = activeId === item.id;
  const comingSoonTitle = COMING_SOON_NAV_IDS.has(item.id) ? 'Coming soon' : undefined;

  const handleClick = (event, href = item.href) => {
    handleSectionNavClick(event, href);
    onNavigate?.();
  };

  if (item.hasSubmenu) {
    return (
      <li className="sidebar-nav__group">
        <a
          href={item.href}
          className={`sidebar-nav__link${isActive ? ' sidebar-nav__link--active' : ''}`}
          onClick={handleClick}
          aria-current={isActive ? 'page' : undefined}
        >
          <LucideIcon name={item.icon} size={20} />
          <span>{item.label}</span>
        </a>
        <ul className="sidebar-nav__submenu list-unstyled mb-0" aria-label="Course stacks and related courses">
          {courseStackKeys.map((stack) => (
            <li key={stack}>
              <span className="sidebar-nav__stack-label">{stack}</span>
              <ul className="list-unstyled mb-0">
                {courseStacks[stack].map((course) => (
                  <li key={course.label}>
                    <a
                      href={course.href}
                      className="sidebar-nav__course-link"
                      onClick={(event) => handleClick(event, course.href)}
                      title={course.title}
                    >
                      {course.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href}
        className={`sidebar-nav__link${isActive ? ' sidebar-nav__link--active' : ''}`}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        title={comingSoonTitle}
      >
        <LucideIcon name={item.icon} size={20} />
        <span>{item.label}</span>
      </a>
    </li>
  );
}

function Sidebar({ activeId = 'dashboard', onNavigate, mobileOpen, onClose }) {
  const { theme, setTheme } = useTheme();

  const handleNav = (event, href) => {
    if (event && href) {
      handleSectionNavClick(event, href);
    }
    onNavigate?.();
    onClose?.();
  };

  return (
    <>
      <div
        className={`sidebar-backdrop${mobileOpen ? ' sidebar-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        id={SIDEBAR_ID}
        className={`eduhive-sidebar${mobileOpen ? ' eduhive-sidebar--open' : ''}`}
        aria-label="Sidebar navigation"
        role={mobileOpen ? 'dialog' : 'navigation'}
        aria-modal={mobileOpen ? 'true' : undefined}
      >
        <button
          type="button"
          className="sidebar-close-btn"
          aria-label="Close navigation menu"
          onClick={onClose}
        >
          <LucideIcon name="x" size={20} />
        </button>

        <a
          href={`#${SECTION_IDS.home}`}
          className="sidebar-brand"
          onClick={(event) => handleNav(event, `#${SECTION_IDS.home}`)}
        >
          <span className="sidebar-brand__icon" aria-hidden="true">
            <LucideIcon name="graduation-cap" size={22} />
          </span>
          <span className="sidebar-brand__text">
            <strong>{SITE_NAME}</strong>
            <small>{SITE_TAGLINE}</small>
          </span>
        </a>

        <nav className="sidebar-nav" aria-label="Primary">
          <p className="sidebar-nav__heading">Main Menu</p>
          <ul className="sidebar-nav__list list-unstyled mb-0">
            {mainSidebarNav.map((item) => (
              <SidebarNavItem key={item.id} item={item} activeId={activeId} onNavigate={handleNav} />
            ))}
          </ul>

          <p className="sidebar-nav__heading sidebar-nav__heading--secondary">Portal</p>
          <ul className="sidebar-nav__list list-unstyled mb-0">
            {secondarySidebarNav.map((item) => (
              <SidebarNavItem key={item.id} item={item} activeId={activeId} onNavigate={handleNav} />
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="theme-toggle" role="group" aria-label="Theme preference">
            <button
              type="button"
              className={`theme-toggle__btn${theme === THEMES.light ? ' theme-toggle__btn--active' : ''}`}
              aria-pressed={theme === THEMES.light}
              onClick={() => setTheme(THEMES.light)}
            >
              <LucideIcon name="sun" size={16} />
              Light
            </button>
            <button
              type="button"
              className={`theme-toggle__btn${theme === THEMES.dark ? ' theme-toggle__btn--active' : ''}`}
              aria-pressed={theme === THEMES.dark}
              onClick={() => setTheme(THEMES.dark)}
            >
              <LucideIcon name="moon" size={16} />
              Dark
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
