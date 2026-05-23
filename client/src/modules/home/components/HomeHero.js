import { heroHighlights } from '../data/heroHighlights';
import { SECTION_IDS } from '../constants';

function HomeHero() {
  return (
    <section id={SECTION_IDS.home} className="hero-section py-5 py-lg-6 bg-primary text-white">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-7">
            <p className="text-uppercase small fw-semibold mb-2 opacity-75">
              Learning Management System
            </p>
            <h1 className="display-4 fw-bold mb-3">
              Learn smarter with the LMS Portal
            </h1>
            <p className="lead mb-4 opacity-90">
              Access curated courses, track your progress, and grow your skills — all from one
              responsive platform built for learners and institutions.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <a href={`#${SECTION_IDS.popularCourses}`} className="btn btn-light btn-lg">
                Browse Popular Courses
              </a>
              <a href={`#${SECTION_IDS.registration}`} className="btn btn-outline-light btn-lg">
                Get Started
              </a>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow hero-section__panel">
              <div className="card-body p-4">
                <h2 className="h5 text-dark mb-3">Why learners choose us</h2>
                <ul className="list-unstyled mb-0 text-dark">
                  {heroHighlights.map((highlight, index) => (
                    <li
                      key={highlight}
                      className={`d-flex align-items-start gap-2${index < heroHighlights.length - 1 ? ' mb-3' : ''}`}
                    >
                      <span className="badge rounded-pill text-bg-primary mt-1">{index + 1}</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
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
