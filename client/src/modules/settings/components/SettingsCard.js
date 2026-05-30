import LucideIcon from '../../home/components/LucideIcon';

function SettingsCard({ title, description, icon, children }) {
  return (
    <section className="eduhive-card settings-card">
      <header className="settings-card__header">
        <span className="settings-card__icon" aria-hidden="true">
          <LucideIcon name={icon} size={22} />
        </span>
        <div>
          <h2 className="settings-card__title">{title}</h2>
          {description && <p className="settings-card__description">{description}</p>}
        </div>
      </header>
      <div className="settings-card__body">{children}</div>
    </section>
  );
}

export default SettingsCard;
