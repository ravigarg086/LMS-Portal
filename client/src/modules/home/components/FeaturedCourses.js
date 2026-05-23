import { popularCoursePlaceholders } from '../data/popularCourses';
import { POPULAR_COURSES_CAROUSEL_ID, SECTION_IDS } from '../constants';
import CourseCardPlaceholder from './CourseCardPlaceholder';

function FeaturedCourses() {
  return (
    <section
      id={SECTION_IDS.popularCourses}
      className="featured-courses py-5 bg-light page-section"
      aria-labelledby="featured-courses-heading"
    >
      <div className="container">
        <div className="row mb-4 mb-lg-5">
          <div className="col-12 col-lg-8">
            <h2 id="featured-courses-heading" className="h2 fw-bold mb-2">
              Featured Courses
            </h2>
            <p className="text-muted mb-0">
              Popular course placeholders C1, C2, and C3 — ready for central course API integration.
            </p>
          </div>
        </div>

        <div
          id={POPULAR_COURSES_CAROUSEL_ID}
          className="carousel slide"
          data-bs-ride="false"
          data-bs-interval="false"
          role="region"
          aria-label="Featured courses"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row g-4">
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

export default FeaturedCourses;
