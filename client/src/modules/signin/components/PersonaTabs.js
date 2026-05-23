import { ROLE_OPTIONS } from '../../../shared/constants/roles';

function PersonaTabs({ role, onChange }) {
  return (
    <div className="auth-persona-tabs" role="tablist" aria-label="Select user persona">
      {ROLE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={role === option.value}
          className={`auth-persona-tabs__btn auth-persona-tabs__btn--${option.value}${
            role === option.value ? ' auth-persona-tabs__btn--active' : ''
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default PersonaTabs;
