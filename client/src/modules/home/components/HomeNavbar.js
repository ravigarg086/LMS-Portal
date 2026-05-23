import { useCallback } from 'react';
import { homeNavItems } from '../data/homeNavItems';
import { NAVBAR_COLLAPSE_ID, SECTION_IDS, SITE_NAME } from '../constants';
import { closeMobileNav } from '../utils/closeMobileNav';
import CoursesNavDropdown from './CoursesNavDropdown';

function HomeNavbar() {
  const handleNavClick = useCallback(() => {
    closeMobileNav();
  }, []);

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm border-bottom home-navbar"
        aria-label="Main navigation"
      >
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href={`#${SECTION_IDS.home}`}>
            {SITE_NAME}
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${NAVBAR_COLLAPSE_ID}`}
            aria-controls={NAVBAR_COLLAPSE_ID}
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id={NAVBAR_COLLAPSE_ID}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
              {homeNavItems.map((item) => {
                if (item.type === 'courses') {
                  return <CoursesNavDropdown key={item.label} onNavigate={handleNavClick} />;
                }

                return (
                  <li className="nav-item" key={item.label}>
                    <a
                      className={`nav-link${item.emphasis ? ' fw-semibold' : ''}`}
                      href={item.href}
                      onClick={handleNavClick}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HomeNavbar;
