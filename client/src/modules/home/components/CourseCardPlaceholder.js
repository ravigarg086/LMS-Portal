import LucideIcon from './LucideIcon';

function CourseCardPlaceholder({ course, staggered = false }) {
  const titleId = `course-title-${course.id}`;

  return (
    <article
      id={`course-card-${course.id}`}
      className={`portfolio-item${staggered ? ' portfolio-item--offset' : ''}`}
      data-track={course.id}
      aria-labelledby={titleId}
    >
      <div className="portfolio-item__media">
        <img
          src={course.image}
          alt=""
          className="portfolio-item__image st-grayscale"
          loading="lazy"
        />
        <div className="portfolio-item__overlay">
          <span className="portfolio-item__view-btn">View Case</span>
        </div>
      </div>
      <div className="portfolio-item__body">
        <span className="st-label st-label--accent">{course.category}</span>
        <h3 id={titleId} className="portfolio-item__title">
          {course.title}
        </h3>
        <p className="portfolio-item__tags">
          {(course.tags || []).join(' · ')}
        </p>
        <p className="portfolio-item__desc">{course.description}</p>
        <div className="portfolio-item__footer">
          <span>
            <LucideIcon name="clock" size={14} aria-hidden="true" /> {course.duration}
          </span>
          <button
            type="button"
            className="portfolio-item__link"
            disabled
            aria-disabled="true"
            title="Course details coming soon"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
}

export default CourseCardPlaceholder;
