import { useCallback } from 'react';
import { homeNavItems } from '../data/homeNavItems';
import { NAVBAR_COLLAPSE_ID, SECTION_IDS, SITE_NAME } from '../constants';
import { closeMobileNav } from '../utils/closeMobileNav';

function HomeNavbar() {
  const handleNavClick = useCallback(() => {
    closeMobileNav();
  }, []);

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm"
        aria-label="Main navigation"
      >
        <div className="container">
          <a className="navbar-brand fw-semibold" href={`#${SECTION_IDS.home}`}>
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              {homeNavItems.map((item) => (
                <li className="nav-item" key={item.label}>
                  <a
                    className={`nav-link${item.emphasis ? ' fw-semibold' : ''}`}
                    href={item.href}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HomeNavbar;
