import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { courseStackKeys, courseStacks } from '../data/courseStacks';
import { mainSidebarNav, secondarySidebarNav } from '../data/sidebarNav';
import { SIDEBAR_ID, SITE_NAME, SITE_TAGLINE, THEMES } from '../constants';
import LucideIcon from './LucideIcon';
import { handleSectionNavClick } from '../utils/scrollToSection';
import { getDashboardRootPath, isHomeDashboardRoute } from '../utils/homeRoutes';
import {
  buildDashboardNavUrl,
  filterMainSidebarNav,
  filterSecondarySidebarNav,
  getRoleNavIntent,
  GUEST_SIDEBAR_HREFS,
} from '../utils/dashboardNav';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import { useAuth } from '../../../shared/auth/AuthContext';

const COMING_SOON_NAV_IDS = new Set(['subscription']);

function SidebarNavItem({
  item,
  activeId,
  onNavigate,
  isSubmenuOpen,
  onSubmenuToggle,
  dashboardRootPath,
  userRole,
  isAuthenticated,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isRouteLink = item.href.startsWith('/');
  const isActive = isRouteLink ? location.pathname === item.href : activeId === item.id;
  const isOnHomeDashboard = isHomeDashboardRoute(location.pathname);
  const isComingSoon = COMING_SOON_NAV_IDS.has(item.id);

  const linkClassName = `sidebar-nav__link${isActive ? ' sidebar-nav__link--active' : ''}${isComingSoon ? ' sidebar-nav__link--disabled' : ''}`;

  const handleHashNav = (event, href = item.href) => {
    if (isComingSoon) {
      event.preventDefault();
      onNavigate?.();
      return;
    }

    if (isAuthenticated && userRole) {
      const intent = getRoleNavIntent(item.id, userRole);
      if (intent) {
        event.preventDefault();
        navigate(buildDashboardNavUrl(dashboardRootPath, intent));
        onNavigate?.();
        return;
      }
    }

    handleSectionNavClick(event, href);
    onNavigate?.();
  };

  if (isComingSoon) {
    return (
      <li>
        <button
          type="button"
          className={linkClassName}
          title="Coming soon"
          aria-disabled="true"
          onClick={() => onNavigate?.()}
        >
          <LucideIcon name={item.icon} size={20} />
          <span>{item.label}</span>
        </button>
      </li>
    );
  }

  if (item.hasSubmenu) {
    const submenuId = `submenu-${item.id}`;

    return (
      <li className={`sidebar-nav__group${isSubmenuOpen ? ' sidebar-nav__group--open' : ''}`}>
        <button
          type="button"
          className={`sidebar-nav__link sidebar-nav__link--toggle${isActive ? ' sidebar-nav__link--active' : ''}`}
          aria-expanded={isSubmenuOpen}
          aria-controls={submenuId}
          onClick={() => onSubmenuToggle(item.id)}
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
                    {isOnHomeDashboard ? (
                      <a
                        href={course.href}
                        className="sidebar-nav__course-link"
                        onClick={(event) => handleHashNav(event, course.href)}
                        title={course.title}
                      >
                        {course.label}
                      </a>
                    ) : (
                      <Link
                        to={buildDashboardNavUrl(
                          dashboardRootPath,
                          isAuthenticated && userRole === 'student'
                            ? { section: 'courses', hash: course.href }
                            : { hash: course.href },
                        )}
                        className="sidebar-nav__course-link"
                        onClick={() => onNavigate?.()}
                        title={course.title}
                      >
                        {course.label}
                      </Link>
                    )}
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

  if (!isOnHomeDashboard) {
    const intent = isAuthenticated && userRole ? getRoleNavIntent(item.id, userRole) : null;
    const destination = intent
      ? buildDashboardNavUrl(dashboardRootPath, intent)
      : { pathname: isAuthenticated ? dashboardRootPath : '/', hash: item.href };

    return (
      <li>
        <Link
          to={destination}
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
        onClick={handleHashNav}
        aria-current={isActive ? 'page' : undefined}
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
  const userRole = user?.role ?? null;

  const portalNavItems = filterSecondarySidebarNav(secondarySidebarNav, { isAuthenticated });

  const dashboardRootPath = getDashboardRootPath(isAuthenticated, user?.role, getDashboardRoute);

  const mainNavItems = useMemo(() => {
    const filteredMainNav = filterMainSidebarNav(mainSidebarNav, { isAuthenticated });

    if (!isAuthenticated) {
      return filteredMainNav.map((item) => ({
        ...item,
        href: GUEST_SIDEBAR_HREFS[item.id] ?? item.href,
      }));
    }

    return filteredMainNav.map((item) => {
      if (item.id === 'dashboard') {
        return {
          ...item,
          href: dashboardRootPath,
        };
      }
      return item;
    });
  }, [isAuthenticated, dashboardRootPath]);

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

  const handleNav = () => {
    onNavigate?.();
    onClose?.();
  };

  const handleLogout = async () => {
    await logout();
    onClose?.();
    navigate('/signin');
  };

  const navItemProps = {
    activeId,
    onNavigate: handleNav,
    onSubmenuToggle: toggleSubmenu,
    dashboardRootPath,
    userRole,
    isAuthenticated,
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
                isSubmenuOpen={openSubmenus.has(item.id)}
                {...navItemProps}
              />
            ))}
          </ul>

          <p className="sidebar-nav__heading sidebar-nav__heading--secondary">Portal</p>
          <ul className="sidebar-nav__list list-unstyled mb-0">
            {portalNavItems.map((item) => (
              <SidebarNavItem
                key={item.id}
                item={item}
                isSubmenuOpen={openSubmenus.has(item.id)}
                {...navItemProps}
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
