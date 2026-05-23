import { featuredCourse as defaultFeaturedCourse } from '../data/dashboardStats';
import { SECTION_IDS } from '../constants';
import LucideIcon from './LucideIcon';

function FeaturedCourseCard({ course }) {
  const featuredCourse = course || defaultFeaturedCourse;

  return (
    <article className="eduhive-card eduhive-card--featured">
      <div className="featured-course__header">
        <span className="ui-label">Featured Course</span>
        <span className="featured-course__badge">{featuredCourse.progress}% Complete</span>
      </div>
      <h2 id="featured-course-title" className="featured-course__title">
        {featuredCourse.title}
      </h2>
      <div className="featured-course__meta">
        <span>
          <LucideIcon name="clock" size={16} aria-hidden="true" /> {featuredCourse.duration}
        </span>
        <span>
          <LucideIcon name="book" size={16} aria-hidden="true" /> {featuredCourse.completedChapters}/
          {featuredCourse.chapters} chapters
        </span>
      </div>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={featuredCourse.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Course progress ${featuredCourse.progress} percent`}
      >
        <div className="progress-bar__fill" style={{ width: `${featuredCourse.progress}%` }} />
      </div>
      <a href={`#${SECTION_IDS.popularCourses}`} className="btn-coral">
        Continue Learning
        <LucideIcon name="arrow-right" size={18} aria-hidden="true" />
      </a>
    </article>
  );
}

export default FeaturedCourseCard;
