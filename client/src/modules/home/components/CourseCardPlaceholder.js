function CourseCardPlaceholder({ course }) {
  const titleId = `course-title-${course.id}`;

  return (
    <article
      id={`course-card-${course.id}`}
      className="popular-course-card glass-soft h-100 w-100"
      data-track={course.id}
      aria-labelledby={titleId}
    >
      <div className="popular-course-card__thumb" aria-hidden="true">
        <span className="popular-course-card__id font-display">{course.id}</span>
      </div>

      <div className="popular-course-card__body">
        <span className="popular-course-card__category font-display">{course.category}</span>
        <h3 id={titleId} className="popular-course-card__title font-serif">
          {course.title}
        </h3>
        <p className="popular-course-card__desc font-body">{course.description}</p>
        <p className="popular-course-card__meta font-body">{course.duration}</p>
      </div>
    </article>
  );
}

export default CourseCardPlaceholder;
