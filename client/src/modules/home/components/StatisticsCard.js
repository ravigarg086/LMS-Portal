import { weeklyStats as defaultWeeklyStats } from '../data/dashboardStats';

function StatisticsCard({ weeklyStats }) {
  const stats = weeklyStats?.length ? weeklyStats : defaultWeeklyStats;
  const maxValue = Math.max(...stats.map((entry) => entry.value), 1);

  return (
    <article className="eduhive-card eduhive-card--stat">
      <div className="stat-card__header">
        <h3 id="learning-activity-title" className="stat-card__title">
          Learning Activity
        </h3>
        <span className="ui-label">This Week</span>
      </div>
      <div className="stat-chart" role="img" aria-label="Weekly learning activity chart">
        {stats.map((entry) => (
          <div className="stat-chart__col" key={entry.day}>
            <div
              className={`stat-chart__bar${entry.isGoal ? ' stat-chart__bar--goal' : ''}`}
              style={{ height: `${Math.round((entry.value / maxValue) * 100)}%` }}
            />
            <span className="stat-chart__day">{entry.day}</span>
          </div>
        ))}
      </div>
      <div className="stat-card__legend">
        <span>
          <i className="stat-card__dot stat-card__dot--active" aria-hidden="true" /> Active Learning
        </span>
        <span>
          <i className="stat-card__dot stat-card__dot--goal" aria-hidden="true" /> Daily Goals
        </span>
      </div>
    </article>
  );
}

export default StatisticsCard;
