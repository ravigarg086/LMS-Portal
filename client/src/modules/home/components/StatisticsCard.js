import { weeklyStats } from '../data/dashboardStats';

function StatisticsCard() {
  return (
    <article className="eduhive-card eduhive-card--stat">
      <div className="stat-card__header">
        <h3 className="stat-card__title">Learning Activity</h3>
        <span className="ui-label">This Week</span>
      </div>
      <div className="stat-chart" aria-hidden="true">
        {weeklyStats.map((item) => (
          <div key={item.day} className="stat-chart__col">
            <div
              className={`stat-chart__bar${item.isGoal ? ' stat-chart__bar--goal' : ''}`}
              style={{ height: `${item.value}%` }}
            />
            <span className="stat-chart__day">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="stat-card__legend">
        <span>
          <i className="stat-card__dot stat-card__dot--active" /> Active Learning
        </span>
        <span>
          <i className="stat-card__dot stat-card__dot--goal" /> Daily Goals
        </span>
      </div>
    </article>
  );
}

export default StatisticsCard;
