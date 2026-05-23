import { featureSections } from '../data/features';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { SECTION_IDS } from '../constants';
import PopularCoursesCarousel from './PopularCoursesCarousel';

function FeatureVisual({ feature }) {
  if (feature.visual === 'courses') {
    return (
      <div className="feature-card__visual feature-card__visual--courses">
        <PopularCoursesCarousel embedded />
      </div>
    );
  }

  if (feature.visual === 'blueprint') {
    return (
      <div className="feature-card__visual feature-card__visual--blueprint" aria-hidden="true">
        <svg viewBox="0 0 400 260" className="feature-blueprint">
          <rect x="20" y="20" width="360" height="220" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="20" y1="80" x2="380" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="140" y1="20" x2="140" y2="240" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="280" cy="150" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
          <text x="40" y="55" fill="currentColor" fontSize="12" opacity="0.7">
            Analytics Blueprint
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="feature-card__visual feature-card__visual--code">
      <pre className="feature-code">
        <code>{feature.code}</code>
      </pre>
    </div>
  );
}

function FeatureScrollSpy() {
  const sectionIds = featureSections.map((feature) => feature.id);
  const activeId = useScrollSpy(sectionIds);

  return (
    <section id={SECTION_IDS.features} className="feature-scroll page-section">
      <div className="container">
        <div className="row g-5">
          <aside className="col-lg-3">
            <nav className="feature-scroll__nav sticky-nav" aria-label="Feature sections">
              <p className="feature-scroll__nav-title font-display">Explore</p>
              <ul className="feature-scroll__nav-list list-unstyled mb-0">
                {featureSections.map((feature) => (
                  <li key={feature.id}>
                    <a
                      href={`#${feature.id}`}
                      className={`feature-scroll__nav-link${
                        activeId === feature.id ? ' feature-scroll__nav-link--active' : ''
                      }`}
                    >
                      <span className="feature-scroll__dot" aria-hidden="true" />
                      {feature.navLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="col-lg-9">
            {featureSections.map((feature, index) => (
              <article
                id={feature.id}
                key={feature.id}
                className={`feature-card${index % 2 === 1 ? ' feature-card--reverse' : ''}`}
              >
                <div className="feature-card__text">
                  <h2 className="feature-card__title font-serif">{feature.title}</h2>
                  <p className="feature-card__desc font-body">{feature.description}</p>
                </div>
                <FeatureVisual feature={feature} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureScrollSpy;
