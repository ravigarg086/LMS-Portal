function CourseCardPlaceholder({ course }) {
  const titleId = `course-title-${course.id}`;

  return (
    <article
      id={`course-card-${course.id}`}
      className="card h-100 shadow-sm popular-course-card"
      data-track={course.id}
      aria-labelledby={titleId}
    >
      <div
        className="card-img-top popular-course-card__thumb bg-light d-flex align-items-center justify-content-center"
        aria-hidden="true"
      >
        <span className="badge text-bg-primary">{course.id}</span>
      </div>

      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-secondary align-self-start mb-2">{course.category}</span>
        <h3 id={titleId} className="card-title h5 mb-2">
          {course.title}
        </h3>
        <p className="card-text text-muted flex-grow-1">{course.description}</p>
        <p className="card-text mb-3">
          <small className="text-muted">{course.duration}</small>
        </p>
        <button type="button" className="btn btn-outline-primary mt-auto" disabled aria-disabled="true">
          View Course
        </button>
      </div>
    </article>
  );
}

export default CourseCardPlaceholder;
