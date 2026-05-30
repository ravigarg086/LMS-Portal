function SettingsToggle({ id, label, description, checked, onChange, disabled = false }) {
  return (
    <div className="settings-toggle">
      <div className="form-check form-switch settings-toggle__control">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id={id}
          checked={Boolean(checked)}
          onChange={(event) => onChange(event.target.checked)}
          disabled={disabled}
        />
      </div>
      <label className="settings-toggle__label" htmlFor={id}>
        <span className="settings-toggle__name">{label}</span>
        {description && <span className="settings-toggle__hint">{description}</span>}
      </label>
    </div>
  );
}

export default SettingsToggle;
