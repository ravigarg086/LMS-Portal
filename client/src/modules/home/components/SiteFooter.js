import { Link } from 'react-router-dom';
import { SITE_NAME, SITE_TAGLINE } from '../constants';
import { mainSidebarNav, secondarySidebarNav } from '../data/sidebarNav';
import RevealUp from './RevealUp';

function FooterNavLink({ item }) {
  if (item.href.startsWith('/')) {
    return <Link to={item.href}>{item.label}</Link>;
  }

  return <a href={item.href}>{item.label}</a>;
}

function SiteFooter() {
  const portalLinks = secondarySidebarNav.filter((item) => item.href.startsWith('/'));

  return (
    <RevealUp as="footer" className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <p className="site-footer__logo">{SITE_NAME.toUpperCase()}</p>
          <p className="site-footer__mission">{SITE_TAGLINE}. A premium learning experience built for focused growth.</p>
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
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          </div>
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Campus</h3>
            <ul className="site-footer__list list-unstyled">
              <li>Main Campus</li>
              <li>Online Learning</li>
              <li>Global Programs</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="site-footer__bar">
        <span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
        <span className="site-footer__legal">
          <Link to="/faq">Privacy</Link>
          <Link to="/faq">Terms</Link>
        </span>
      </div>
    </RevealUp>
  );
}

export default SiteFooter;
