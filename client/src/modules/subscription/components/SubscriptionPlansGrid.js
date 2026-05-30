import LucideIcon from '../../home/components/LucideIcon';
import { formatPrice } from '../utils/subscriptionFormatters';

function SubscriptionPlansGrid({ plans, activePlanId, onSubscribe, submitting }) {
  if (!plans.length) {
    return (
      <p className="subscription-plans__empty mb-0">No subscription plans are available right now.</p>
    );
  }

  return (
    <div className="row g-3 subscription-plans">
      {plans.map((plan) => {
        const isCurrent = activePlanId === plan.id;

        return (
          <div key={plan.id} className="col-12 col-md-6 col-xl-4">
            <article className={`eduhive-card subscription-plan h-100${isCurrent ? ' subscription-plan--current' : ''}`}>
              <header className="subscription-plan__header">
                <span className="st-label st-label--accent">{plan.durationMonths} month{plan.durationMonths > 1 ? 's' : ''}</span>
                <h3 className="subscription-plan__title">{plan.name}</h3>
                <p className="subscription-plan__price">
                  {formatPrice(plan.price, plan.currency)}
                </p>
              </header>

              <p className="subscription-plan__desc">{plan.description}</p>

              <ul className="subscription-plan__features list-unstyled mb-0">
                {(plan.features || []).map((feature) => (
                  <li key={feature}>
                    <LucideIcon name="check" size={16} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="subscription-plan__actions mt-auto">
                {isCurrent ? (
                  <button type="button" className="btn btn-secondary w-100" disabled>
                    Current plan
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => onSubscribe(plan.id)}
                    disabled={submitting || Boolean(activePlanId)}
                    title={activePlanId ? 'Cancel your current plan before switching' : undefined}
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}

export default SubscriptionPlansGrid;
