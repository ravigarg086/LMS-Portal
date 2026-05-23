import { featuredCourse } from '../data/dashboardStats';
import LucideIcon from './LucideIcon';

function FeaturedCourseCard() {
  return (
    <article className="eduhive-card eduhive-card--featured">
      <div className="featured-course__header">
        <span className="ui-label">Featured Course</span>
        <span className="featured-course__badge">{featuredCourse.progress}% Complete</span>
      </div>
      <h2 className="featured-course__title">{featuredCourse.title}</h2>
      <div className="featured-course__meta">
        <span>
          <LucideIcon name="clock" size={16} /> {featuredCourse.duration}
        </span>
        <span>
          <LucideIcon name="book" size={16} /> {featuredCourse.completedChapters}/{featuredCourse.chapters}{' '}
          chapters
        </span>
      </div>
      <div className="progress-bar" role="progressbar" aria-valuenow={featuredCourse.progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-bar__fill" style={{ width: `${featuredCourse.progress}%` }} />
      </div>
      <button type="button" className="btn-coral">
        Continue Learning
        <LucideIcon name="arrow-right" size={18} />
      </button>
    </article>
  );
}

export default FeaturedCourseCard;
