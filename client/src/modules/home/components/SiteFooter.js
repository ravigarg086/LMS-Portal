import { Link, useLocation } from 'react-router-dom';
import LucideIcon from './LucideIcon';
import { useAuth } from '../../../shared/auth/AuthContext';
import { SITE_NAME, SITE_TAGLINE } from '../constants';
import { mainSidebarNav, secondarySidebarNav } from '../data/sidebarNav';
import { GUEST_SIDEBAR_HREFS, filterSecondarySidebarNav } from '../utils/dashboardNav';
import { handleSectionNavClick } from '../utils/scrollToSection';
import '../site-footer.css';

const CAMPUS_LOCATIONS = [
  { icon: 'book', label: 'Main Campus', detail: 'On-site learning hub' },
  { icon: 'graduation-cap', label: 'Online Learning', detail: 'Remote & hybrid cohorts' },
  { icon: 'calendar', label: 'Global Programs', detail: 'International partnerships' },
];

function FooterNavLink({ item }) {
  const location = useLocation();
  const className = 'site-footer__link';
  const isGuestHome = location.pathname === '/';
  const href = isGuestHome && GUEST_SIDEBAR_HREFS[item.id] ? GUEST_SIDEBAR_HREFS[item.id] : item.href;

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => handleSectionNavClick(event, href)}
    >
      {item.label}
    </a>
  );
}

function SiteFooter() {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);
  const portalLinks = filterSecondarySidebarNav(secondarySidebarNav, {
    isAuthenticated,
    routeLinksOnly: true,
  });

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__brand-link" aria-label="Return to homepage">
              <span className="site-footer__brand-icon" aria-hidden="true">
                <LucideIcon name="graduation-cap" size={22} />
              </span>
              <span className="site-footer__brand-text">
                <span className="site-footer__logo">{SITE_NAME}</span>
                <span className="site-footer__tagline">{SITE_TAGLINE}</span>
              </span>
            </Link>
            <p className="site-footer__mission">
              A modern learning platform for students, faculty, and administrators — designed for
              clarity, progress tracking, and focused growth.
            </p>
          </div>

          <div className="site-footer__columns">
            <div className="site-footer__col">
              <h3 className="site-footer__heading">Navigate</h3>
              <ul className="site-footer__list list-unstyled">
                {mainSidebarNav.slice(0, 4).map((item) => (
                  <li key={item.id}>
                    <FooterNavLink item={item} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="site-footer__col">
              <h3 className="site-footer__heading">Portal</h3>
              <ul className="site-footer__list list-unstyled">
                {portalLinks.map((item) => (
                  <li key={item.id}>
                    <FooterNavLink item={item} />
                  </li>
                ))}
                {!isAuthenticated && (
                  <li>
                    <Link to="/signin" className="site-footer__link">
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="site-footer__col">
              <h3 className="site-footer__heading">Campus</h3>
              <ul className="site-footer__list site-footer__list--meta list-unstyled">
                {CAMPUS_LOCATIONS.map(({ icon, label, detail }) => (
                  <li key={label} className="site-footer__meta-item">
                    <span className="site-footer__meta-icon" aria-hidden="true">
                      <LucideIcon name={icon} size={16} />
                    </span>
                    <span className="site-footer__meta-copy">
                      <span className="site-footer__meta-label">{label}</span>
                      <span className="site-footer__meta-detail">{detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="site-footer__bar">
          <span className="site-footer__copyright">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </span>
          <span className="site-footer__legal">
            <Link to="/faq" className="site-footer__legal-link">
              Privacy
            </Link>
            <Link to="/faq" className="site-footer__legal-link">
              Terms
            </Link>
            <Link to="/contact" className="site-footer__legal-link">
              Support
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
