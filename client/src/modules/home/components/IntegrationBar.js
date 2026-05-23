import { frameworks, integrations } from '../data/integrations';

function IntegrationBar() {
  const marqueeItems = [...integrations, ...integrations];

  return (
    <div className="integration-bar glass-soft mx-auto">
      <div className="integration-bar__half">
        <span className="integration-bar__label font-display">Frameworks</span>
        <div className="integration-bar__logos">
          {frameworks.map((name) => (
            <span key={name} className="integration-bar__badge">
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="integration-bar__divider" aria-hidden="true" />
      <div className="integration-bar__half integration-bar__half--marquee">
        <span className="integration-bar__label font-display">Integrations</span>
        <div className="integration-bar__marquee-track" aria-hidden="true">
          <div className="integration-bar__marquee-inner">
            {marqueeItems.map((name, index) => (
              <span key={`${name}-${index}`} className="integration-bar__icon">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntegrationBar;
