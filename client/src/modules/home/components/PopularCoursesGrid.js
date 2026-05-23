import { popularCoursePlaceholders } from '../data/popularCourses';
import CourseCardPlaceholder from './CourseCardPlaceholder';
import RevealUp from './RevealUp';

function PopularCoursesGrid() {
  return (
    <RevealUp as="article" className="portfolio-section">
      <header className="portfolio-section__header">
        <span className="st-label">Course Catalog</span>
        <h2 id="popular-courses-heading" className="portfolio-section__title">
          Popular Courses
        </h2>
        <p className="portfolio-section__desc">
          Featured programs C1, C2, and C3 — ready for central course API integration.
        </p>
      </header>
      <div className="portfolio-stagger-grid">
        {popularCoursePlaceholders.map((course, index) => (
          <CourseCardPlaceholder key={course.id} course={course} staggered={index % 2 === 1} />
        ))}
      </div>
    </RevealUp>
  );
}

export default PopularCoursesGrid;
