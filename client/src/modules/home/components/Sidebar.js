import { useState } from 'react';
import { courseStackKeys, courseStacks } from '../data/courseStacks';
import { mainSidebarNav, secondarySidebarNav } from '../data/sidebarNav';
import { SIDEBAR_ID, SITE_NAME, SECTION_IDS } from '../constants';
import LucideIcon from './LucideIcon';

function SidebarNavItem({ item, activeId, onNavigate }) {
  const isActive = activeId === item.id;

  if (item.hasSubmenu) {
    return (
      <li className="sidebar-nav__group">
        <a
          href={item.href}
          className={`sidebar-nav__link${isActive ? ' sidebar-nav__link--active' : ''}`}
          onClick={onNavigate}
        >
          <LucideIcon name={item.icon} size={20} />
          <span>{item.label}</span>
        </a>
        <ul className="sidebar-nav__submenu list-unstyled mb-0">
          {courseStackKeys.map((stack) => (
            <li key={stack}>
              <span className="sidebar-nav__stack-label">{stack}</span>
              <ul className="list-unstyled mb-0">
                {courseStacks[stack].map((course) => (
                  <li key={course.label}>
                    <a href={course.href} className="sidebar-nav__course-link" onClick={onNavigate}>
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
        onClick={onNavigate}
      >
        <LucideIcon name={item.icon} size={20} />
        <span>{item.label}</span>
      </a>
    </li>
  );
}

function Sidebar({ activeId = 'dashboard', onNavigate, mobileOpen, onClose }) {
  const [theme, setTheme] = useState('light');

  const handleNav = () => {
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
        role="navigation"
      >
        <a href={`#${SECTION_IDS.home}`} className="sidebar-brand" onClick={handleNav}>
          <span className="sidebar-brand__icon" aria-hidden="true">
            <LucideIcon name="graduation-cap" size={22} />
          </span>
          <span className="sidebar-brand__text">
            <strong>{SITE_NAME}</strong>
            <small>Premium LMS</small>
          </span>
        </a>

        <nav className="sidebar-nav">
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
          <div className="theme-toggle" role="group" aria-label="Theme toggle">
            <button
              type="button"
              className={`theme-toggle__btn${theme === 'light' ? ' theme-toggle__btn--active' : ''}`}
              onClick={() => setTheme('light')}
            >
              <LucideIcon name="sun" size={16} />
              Light
            </button>
            <button
              type="button"
              className={`theme-toggle__btn${theme === 'dark' ? ' theme-toggle__btn--active' : ''}`}
              onClick={() => setTheme('dark')}
            >
              <LucideIcon name="moon" size={16} />
              Dark
            </button>
          </div>
          <a href="#logout" className="sidebar-logout" onClick={handleNav}>
            <LucideIcon name="log-out" size={18} />
            Logout
          </a>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
