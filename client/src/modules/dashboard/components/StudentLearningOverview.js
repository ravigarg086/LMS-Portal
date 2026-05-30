import FeaturedCourseCard from '../../home/components/FeaturedCourseCard';
import StatisticsCard from '../../home/components/StatisticsCard';
import ProgressRing from '../../home/components/ProgressRing';
import RevealUp from '../../home/components/RevealUp';
import { SECTION_IDS } from '../../home/constants';

function StudentLearningOverview({ dashboard, loading, error }) {
  if (loading) {
    return <p className="auth-card__subtitle mb-0">Loading your learning data...</p>;
  }

  if (error) {
    return (
      <p className="text-danger small mb-0" role="alert">
        {error}
      </p>
    );
  }

  return (
    <section className="services-section">
      <header className="services-section__header">
        <span className="st-label">Your Dashboard</span>
        <h2 className="services-section__title">Learning Services</h2>
      </header>
      <div className="services-grid">
        <RevealUp className="services-grid__item">
          <section id={SECTION_IDS.assignment} aria-labelledby="featured-course-title">
            <FeaturedCourseCard course={dashboard?.featuredCourse} />
          </section>
        </RevealUp>

        <RevealUp className="services-grid__item">
          <section id={SECTION_IDS.learningActivity} aria-labelledby="learning-activity-title">
            <StatisticsCard weeklyStats={dashboard?.weeklyStats} />
          </section>
        </RevealUp>

        <RevealUp className="services-grid__item">
          <section id={SECTION_IDS.progress} aria-labelledby="overall-progress-title">
            <ProgressRing progress={dashboard?.overallProgress} />
          </section>
        </RevealUp>
      </div>
    </section>
  );
}

export default StudentLearningOverview;
