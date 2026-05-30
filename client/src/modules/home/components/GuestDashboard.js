import { Link } from 'react-router-dom';
import RevealUp from './RevealUp';
import PopularCoursesGrid from './PopularCoursesGrid';
import LucideIcon from './LucideIcon';
import {
  guestSectionAnchors,
  platformStats,
  portalQuickLinks,
  roleHighlights,
} from '../data/guestDashboardData';
import '../guest-dashboard.css';

function GuestDashboard() {
  return (
    <>
      <section
        id={guestSectionAnchors.overview}
        className="guest-dashboard__overview"
        aria-labelledby="guest-overview-heading"
      >
        <header className="guest-dashboard__header">
          <span className="st-label">Public Dashboard</span>
          <h2 id="guest-overview-heading" className="guest-dashboard__title">
            Explore the LMS Portal
          </h2>
          <p className="guest-dashboard__lead">
            Browse public resources, preview courses, and sign in when you are ready for a personalized workspace.
          </p>
        </header>

        <div className="row g-3 guest-stats">
          {platformStats.map((stat) => (
            <div key={stat.id} className="col-6 col-lg-3">
              <RevealUp>
                <article className="guest-stat-card eduhive-card h-100">
                  <LucideIcon name={stat.icon} size={22} />
                  <p className="guest-stat-card__value">{stat.value}</p>
                  <p className="guest-stat-card__label">{stat.label}</p>
                </article>
              </RevealUp>
            </div>
          ))}
        </div>
      </section>

      <section
        id={guestSectionAnchors.portal}
        className="guest-dashboard__portal"
        aria-labelledby="guest-portal-heading"
      >
        <header className="guest-dashboard__section-header">
          <span className="st-label">Quick Access</span>
          <h2 id="guest-portal-heading" className="guest-dashboard__section-title">
            Portal Services
          </h2>
        </header>

        <div className="row g-3">
          {portalQuickLinks.map((link) => (
            <div key={link.id} className="col-12 col-md-6 col-xl-4">
              <RevealUp>
                <article className="guest-portal-card eduhive-card h-100">
                  <div className="guest-portal-card__icon" aria-hidden="true">
                    <LucideIcon name={link.icon} size={22} />
                  </div>
                  <h3 className="guest-portal-card__title">{link.label}</h3>
                  <p className="guest-portal-card__desc">{link.description}</p>
                  <Link to={link.href} className="guest-portal-card__link">
                    {link.cta}
                    <LucideIcon name="arrow-right" size={16} />
                  </Link>
                </article>
              </RevealUp>
            </div>
          ))}
        </div>
      </section>

      <section
        id={guestSectionAnchors.roles}
        className="guest-dashboard__roles"
        aria-labelledby="guest-roles-heading"
      >
        <header className="guest-dashboard__section-header">
          <span className="st-label">Choose Your Path</span>
          <h2 id="guest-roles-heading" className="guest-dashboard__section-title">
            Built for Every Role
          </h2>
        </header>

        <div className="row g-3">
          {roleHighlights.map((role) => (
            <div key={role.id} className="col-12 col-md-4">
              <RevealUp>
                <article className={`guest-role-card eduhive-card guest-role-card--${role.id} h-100`}>
                  <span className="guest-role-card__badge">{role.label}</span>
                  <LucideIcon name={role.icon} size={24} />
                  <h3 className="guest-role-card__title">{role.title}</h3>
                  <p className="guest-role-card__desc">{role.description}</p>
                  <Link to={role.href} className="btn btn-primary guest-role-card__cta">
                    Create {role.label} Account
                  </Link>
                </article>
              </RevealUp>
            </div>
          ))}
        </div>
      </section>

      <section
        id={guestSectionAnchors.courses}
        className="guest-dashboard__courses"
        aria-labelledby="popular-courses-heading"
      >
        <PopularCoursesGrid />
      </section>
    </>
  );
}

export default GuestDashboard;
