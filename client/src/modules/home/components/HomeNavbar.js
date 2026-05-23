import { useCallback } from 'react';
import { homeNavItems } from '../data/homeNavItems';
import { NAVBAR_COLLAPSE_ID, SECTION_IDS, SITE_NAME } from '../constants';
import { closeMobileNav } from '../utils/closeMobileNav';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import CoursesNavDropdown from './CoursesNavDropdown';

function HomeNavbar() {
  const scrolled = useNavbarScroll();
  const handleNavClick = useCallback(() => {
    closeMobileNav();
  }, []);

  return (
    <header className={`home-nav ${scrolled ? 'home-nav--scrolled' : ''}`}>
      <nav className="navbar navbar-expand-lg home-nav__bar" aria-label="Main navigation">
        <div className="container home-nav__container">
          <a className="home-nav__brand" href={`#${SECTION_IDS.home}`}>
            <span className="home-nav__logo" aria-hidden="true">
              L
            </span>
            <span className="home-nav__title font-display">{SITE_NAME}</span>
          </a>

          <button
            className="navbar-toggler home-nav__toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${NAVBAR_COLLAPSE_ID}`}
            aria-controls={NAVBAR_COLLAPSE_ID}
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse home-nav__collapse" id={NAVBAR_COLLAPSE_ID}>
            <div className="home-nav__pill glass-soft mx-lg-auto">
              <ul className="navbar-nav home-nav__links align-items-lg-center">
                {homeNavItems.map((item) => {
                  if (item.type === 'courses') {
                    return <CoursesNavDropdown key={item.label} onNavigate={handleNavClick} />;
                  }

                  return (
                    <li className="nav-item" key={item.label}>
                      <a
                        className={`nav-link home-nav__link${item.emphasis ? ' fw-semibold' : ''}`}
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

            <a
              href={`#${SECTION_IDS.registration}`}
              className="home-nav__cta btn font-display"
              onClick={handleNavClick}
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HomeNavbar;
