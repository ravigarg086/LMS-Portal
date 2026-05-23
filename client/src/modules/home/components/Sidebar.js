import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { courseStackKeys, courseStacks } from '../data/courseStacks';
import { mainSidebarNav, secondarySidebarNav } from '../data/sidebarNav';
import { SIDEBAR_ID, SITE_NAME, SITE_TAGLINE, THEMES } from '../constants';
import LucideIcon from './LucideIcon';
import { handleSectionNavClick } from '../utils/scrollToSection';
import { useTheme } from '../context/ThemeProvider';
import { useAuth } from '../../../shared/auth/AuthContext';

const COMING_SOON_NAV_IDS = new Set(['external-data', 'subscription', 'settings']);

function SidebarNavItem({ item, activeId, onNavigate, isSubmenuOpen, onSubmenuToggle }) {
  const location = useLocation();
  const isActive = item.href.startsWith('/') ? location.pathname === item.href : activeId === item.id;
  const comingSoonTitle = COMING_SOON_NAV_IDS.has(item.id) ? 'Coming soon' : undefined;

  const handleClick = (event, href = item.href) => {
    handleSectionNavClick(event, href);
    onNavigate?.();
  };

  const linkClassName = `sidebar-nav__link${isActive ? ' sidebar-nav__link--active' : ''}`;

  if (item.hasSubmenu) {
    const submenuId = `submenu-${item.id}`;

    const handleToggle = () => {
      onSubmenuToggle(item.id);
    };

    return (
      <li className={`sidebar-nav__group${isSubmenuOpen ? ' sidebar-nav__group--open' : ''}`}>
        <button
          type="button"
          className={`sidebar-nav__link sidebar-nav__link--toggle${isActive ? ' sidebar-nav__link--active' : ''}`}
          aria-expanded={isSubmenuOpen}
          aria-controls={submenuId}
          onClick={handleToggle}
        >
          <LucideIcon name={item.icon} size={20} />
          <span>{item.label}</span>
          <LucideIcon name="chevron-down" size={18} className="sidebar-nav__chevron" />
        </button>
        <ul
          id={submenuId}
          className="sidebar-nav__submenu list-unstyled mb-0"
          aria-label="Course stacks and related courses"
          hidden={!isSubmenuOpen}
        >
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

  if (item.href.startsWith('/')) {
    return (
      <li>
        <Link
          to={item.href}
          className={linkClassName}
          onClick={() => onNavigate?.()}
          aria-current={isActive ? 'page' : undefined}
        >
          <LucideIcon name={item.icon} size={20} />
          <span>{item.label}</span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href}
        className={linkClassName}
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

function Sidebar({ activeId = 'dashboard', onNavigate, mobileOpen, onClose, user = null }) {
  const { theme, setTheme } = useTheme();
  const { logout, getDashboardRoute } = useAuth();
  const navigate = useNavigate();
  const [openSubmenus, setOpenSubmenus] = useState(() => new Set());
  const isAuthenticated = Boolean(user);

  const portalNavItems = secondarySidebarNav.filter((item) => {
    if (isAuthenticated && item.id === 'registration') {
      return false;
    }
    return true;
  });

  const mainNavItems = useMemo(() => {
    if (!isAuthenticated) {
      return mainSidebarNav;
    }

    return mainSidebarNav.map((item) => {
      if (item.id === 'dashboard') {
        return {
          ...item,
          href: getDashboardRoute(user.role),
        };
      }
      return item;
    });
  }, [isAuthenticated, user?.role, getDashboardRoute]);

  useEffect(() => {
    if (activeId === 'courses') {
      setOpenSubmenus((prev) => new Set(prev).add('courses'));
    }
  }, [activeId]);

  const toggleSubmenu = (itemId) => {
    setOpenSubmenus((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const handleNav = (event, href) => {
    if (event && href) {
      handleSectionNavClick(event, href);
    }
    onNavigate?.();
    onClose?.();
  };

  const handleLogout = async () => {
    await logout();
    onClose?.();
    navigate('/signin');
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

        <Link to="/" className="sidebar-brand" onClick={() => onClose?.()}>
          <span className="sidebar-brand__icon" aria-hidden="true">
            <LucideIcon name="graduation-cap" size={22} />
          </span>
          <span className="sidebar-brand__text">
            <strong className="sidebar-brand__name">{SITE_NAME.toUpperCase()}</strong>
            <small>{SITE_TAGLINE}</small>
          </span>
        </Link>

        <nav className="sidebar-nav" aria-label="Primary">
          <p className="sidebar-nav__heading">Main Menu</p>
          <ul className="sidebar-nav__list list-unstyled mb-0">
            {mainNavItems.map((item) => (
              <SidebarNavItem
                key={item.id}
                item={item}
                activeId={activeId}
                onNavigate={handleNav}
                isSubmenuOpen={openSubmenus.has(item.id)}
                onSubmenuToggle={toggleSubmenu}
              />
            ))}
          </ul>

          <p className="sidebar-nav__heading sidebar-nav__heading--secondary">Portal</p>
          <ul className="sidebar-nav__list list-unstyled mb-0">
            {portalNavItems.map((item) => (
              <SidebarNavItem
                key={item.id}
                item={item}
                activeId={activeId}
                onNavigate={handleNav}
                isSubmenuOpen={openSubmenus.has(item.id)}
                onSubmenuToggle={toggleSubmenu}
              />
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
          {isAuthenticated ? (
            <button type="button" className="sidebar-logout" onClick={handleLogout}>
              <LucideIcon name="log-out" size={18} />
              Logout
            </button>
          ) : (
            <Link to="/signin" className="sidebar-logout sidebar-logout--signin" onClick={() => onClose?.()}>
              <LucideIcon name="log-in" size={18} />
              Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
