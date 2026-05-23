import { popularCoursePlaceholders } from '../data/popularCourses';
import CourseCardPlaceholder from './CourseCardPlaceholder';

function PopularCoursesGrid() {
  return (
    <article className="eduhive-card eduhive-card--large">
      <header className="popular-grid__header">
        <div>
          <span className="ui-label">Course Catalog</span>
          <h2 className="popular-grid__title">Popular Courses</h2>
          <p className="popular-grid__desc">
            Featured placeholders C1, C2, and C3 — ready for central course API integration.
          </p>
        </div>
      </header>
      <div className="row g-4">
        {popularCoursePlaceholders.map((course) => (
          <div key={course.id} className="col-12 col-md-4 d-flex">
            <CourseCardPlaceholder course={course} />
          </div>
        ))}
      </div>
    </article>
  );
}

export default PopularCoursesGrid;
