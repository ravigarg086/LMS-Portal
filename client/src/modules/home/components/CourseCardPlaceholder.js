import LucideIcon from './LucideIcon';

function CourseCardPlaceholder({ course }) {
  const titleId = `course-title-${course.id}`;

  return (
    <article
      id={`course-card-${course.id}`}
      className="course-card-eduhive h-100 w-100"
      data-track={course.id}
      aria-labelledby={titleId}
    >
      <div className="course-card-eduhive__badge">{course.id}</div>
      <span className="course-card-eduhive__category">{course.category}</span>
      <h3 id={titleId} className="course-card-eduhive__title">
        {course.title}
      </h3>
      <p className="course-card-eduhive__desc">{course.description}</p>
      <div className="course-card-eduhive__footer">
        <span>
          <LucideIcon name="clock" size={14} /> {course.duration}
        </span>
        <button type="button" className="course-card-eduhive__btn" disabled aria-disabled="true">
          View
        </button>
      </div>
    </article>
  );
}

export default CourseCardPlaceholder;
