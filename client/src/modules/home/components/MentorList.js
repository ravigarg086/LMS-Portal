import { mentors } from '../data/mentors';
import LucideIcon from './LucideIcon';

function MentorList() {
  return (
    <article className="eduhive-card eduhive-card--mentors">
      <h3 id="mentors-title" className="stat-card__title">
        Your Mentors
      </h3>
      <ul className="mentor-list list-unstyled mb-0">
        {mentors.map((mentor) => (
          <li key={mentor.id} className="mentor-list__item">
            <div className="mentor-list__profile">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.seed}`}
                alt=""
                className="mentor-list__avatar"
              />
              <div>
                <p className="mentor-list__name">{mentor.name}</p>
                <p className="mentor-list__role">{mentor.role}</p>
              </div>
            </div>
            <button
              type="button"
              className="icon-btn icon-btn--sm"
              aria-label={`Message ${mentor.name}`}
              title="Messaging coming soon"
              disabled
            >
              <LucideIcon name="message-square" size={16} />
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default MentorList;
