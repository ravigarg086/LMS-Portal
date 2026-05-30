import { useCourseCatalog } from '../hooks/useCourseCatalog';
import CourseCardPlaceholder from './CourseCardPlaceholder';
import RevealUp from './RevealUp';

function PopularCoursesGrid({ featuredOnly = false, limit }) {
  const { courses, loading, usingFallback } = useCourseCatalog({
    featured: featuredOnly,
    limit: limit ?? (featuredOnly ? 3 : undefined),
  });

  const description = loading
    ? 'Loading courses from the LMS catalog...'
    : usingFallback
      ? 'Showing offline course previews — start the API server to load the live MySQL catalog.'
      : 'Browse programs from the central course API — use the search bar to find more.';

  return (
    <RevealUp as="article" className="portfolio-section">
      <header className="portfolio-section__header">
        <span className="st-label">Course Catalog</span>
        <h2 id="popular-courses-heading" className="portfolio-section__title">
          Popular Courses
        </h2>
        <p className="portfolio-section__desc">{description}</p>
      </header>
      <div className="portfolio-stagger-grid">
        {courses.map((course, index) => (
          <CourseCardPlaceholder key={course.id} course={course} staggered={index % 2 === 1} />
        ))}
      </div>
    </RevealUp>
  );
}

export default PopularCoursesGrid;
