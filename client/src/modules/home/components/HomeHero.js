import { SECTION_IDS, SITE_NAME, SITE_TAGLINE } from '../constants';

function HomeHero() {
  return (
    <section id={SECTION_IDS.home} className="hero-banner py-5 py-lg-6 page-section">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-12 col-lg-7">
            <span className="badge rounded-pill text-bg-primary mb-3">Learning Management System</span>
            <h1 className="display-4 fw-bold mb-3">
              Welcome to {SITE_NAME}
            </h1>
            <p className="lead text-secondary mb-4">
              {SITE_TAGLINE}. Explore curated courses, track your progress, and learn on a responsive
              platform built for students and instructors.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <a href={`#${SECTION_IDS.popularCourses}`} className="btn btn-primary btn-lg">
                View Featured Courses
              </a>
              <a href={`#${SECTION_IDS.registration}`} className="btn btn-outline-primary btn-lg">
                Get Started
              </a>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm hero-banner__card">
              <div className="card-body p-4 p-lg-5">
                <h2 className="h5 fw-semibold mb-3">Why choose us?</h2>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex gap-2 mb-3">
                    <span className="badge text-bg-primary rounded-pill">1</span>
                    <span>Expert-led MEAN, MERN, and DevOps learning paths</span>
                  </li>
                  <li className="d-flex gap-2 mb-3">
                    <span className="badge text-bg-primary rounded-pill">2</span>
                    <span>Responsive SPA experience on every device</span>
                  </li>
                  <li className="d-flex gap-2">
                    <span className="badge text-bg-primary rounded-pill">3</span>
                    <span>Secure registration and subscription when you are ready</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
