import { overallProgress } from '../data/dashboardStats';

function ProgressRing() {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (overallProgress / 100) * circumference;

  return (
    <article className="eduhive-card eduhive-card--stat progress-ring-card">
      <h3 id="overall-progress-title" className="stat-card__title">
        Overall Progress
      </h3>
      <div
        className="progress-ring"
        role="img"
        aria-label={`Overall learning progress ${overallProgress} percent complete`}
      >
        <svg className="progress-ring__svg" viewBox="0 0 192 192" aria-hidden="true">
          <circle className="progress-ring__track" cx="96" cy="96" r={radius} />
          <circle
            className="progress-ring__fill"
            cx="96"
            cy="96"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="progress-ring__center" aria-hidden="true">
          <strong>{overallProgress}%</strong>
          <span>Complete</span>
        </div>
      </div>
    </article>
  );
}

export default ProgressRing;
