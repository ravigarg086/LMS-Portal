function StatisticsCard() {
  return (
    <article className="eduhive-card eduhive-card--stat">
      <div className="stat-card__header">
        <h3 id="learning-activity-title" className="stat-card__title">
          Learning Activity
        </h3>
        <span className="ui-label">This Week</span>
      </div>
      <div className="stat-chart" role="img" aria-label="Weekly learning activity chart with highest activity on Thursday">
        <div className="stat-chart__col">
          <div className="stat-chart__bar" style={{ height: '45%' }} />
          <span className="stat-chart__day">Mon</span>
        </div>
        <div className="stat-chart__col">
          <div className="stat-chart__bar" style={{ height: '72%' }} />
          <span className="stat-chart__day">Tue</span>
        </div>
        <div className="stat-chart__col">
          <div className="stat-chart__bar" style={{ height: '58%' }} />
          <span className="stat-chart__day">Wed</span>
        </div>
        <div className="stat-chart__col">
          <div className="stat-chart__bar" style={{ height: '95%' }} />
          <span className="stat-chart__day">Thu</span>
        </div>
        <div className="stat-chart__col">
          <div className="stat-chart__bar" style={{ height: '68%' }} />
          <span className="stat-chart__day">Fri</span>
        </div>
        <div className="stat-chart__col">
          <div className="stat-chart__bar stat-chart__bar--goal" style={{ height: '38%' }} />
          <span className="stat-chart__day">Sat</span>
        </div>
        <div className="stat-chart__col">
          <div className="stat-chart__bar stat-chart__bar--goal" style={{ height: '30%' }} />
          <span className="stat-chart__day">Sun</span>
        </div>
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
