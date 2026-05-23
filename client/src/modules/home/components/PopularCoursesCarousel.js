import { popularCoursePlaceholders } from '../data/popularCourses';
import { POPULAR_COURSES_CAROUSEL_ID, SECTION_IDS } from '../constants';
import CourseCardPlaceholder from './CourseCardPlaceholder';

function PopularCoursesCarousel() {
  return (
    <section
      id={SECTION_IDS.popularCourses}
      className="popular-courses py-5 bg-light page-section"
      aria-labelledby="popular-courses-heading"
    >
      <div className="container">
        <header className="row mb-4">
          <div className="col-12 col-md-8">
            <h2 id="popular-courses-heading" className="h2 fw-bold mb-2">
              Popular Courses
            </h2>
            <p className="text-muted mb-0">
              Featured course slots C1, C2, and C3 — ready for central course API integration.
            </p>
          </div>
        </header>

        <div
          id={POPULAR_COURSES_CAROUSEL_ID}
          className="carousel slide popular-courses__carousel"
          data-bs-ride="false"
          data-bs-interval="false"
          role="region"
          aria-label="Popular courses carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row g-4 popular-courses__grid">
                {popularCoursePlaceholders.map((course) => (
                  <div key={course.id} className="col-12 col-sm-6 col-lg-4 d-flex">
                    <CourseCardPlaceholder course={course} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularCoursesCarousel;
