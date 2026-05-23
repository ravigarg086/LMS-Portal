import { popularCoursePlaceholders } from '../data/popularCourses';
import CourseCardPlaceholder from './CourseCardPlaceholder';

function PopularCoursesCarousel() {
  return (
    <section
      id="popular-courses"
      className="popular-courses py-5 bg-light page-section"
      aria-labelledby="popular-courses-heading"
    >
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 col-md-8">
            <h2 id="popular-courses-heading" className="h2 fw-bold mb-2">
              Popular Courses
            </h2>
            <p className="text-muted mb-0">
              Featured placeholders C1, C2, and C3 — ready for course API integration.
            </p>
          </div>
        </div>

        <div
          id="popularCoursesCarousel"
          className="carousel slide popular-courses__carousel"
          data-bs-ride="false"
          data-bs-interval="false"
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

          <button
            className="carousel-control-prev d-none"
            type="button"
            data-bs-target="#popularCoursesCarousel"
            data-bs-slide="prev"
            aria-hidden="true"
            tabIndex={-1}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next d-none"
            type="button"
            data-bs-target="#popularCoursesCarousel"
            data-bs-slide="next"
            aria-hidden="true"
            tabIndex={-1}
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default PopularCoursesCarousel;
