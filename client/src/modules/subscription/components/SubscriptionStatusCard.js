import LucideIcon from '../../home/components/LucideIcon';
import { formatDate, formatPrice, statusLabel } from '../utils/subscriptionFormatters';

function SubscriptionStatusCard({ subscription, onCancel, submitting }) {
  if (!subscription) {
    return (
      <article className="eduhive-card subscription-status subscription-status--empty">
        <header className="subscription-status__header">
          <span className="st-label">My Plan</span>
          <h2 className="subscription-status__title">No active subscription</h2>
        </header>
        <p className="subscription-status__lead mb-0">
          Choose a plan below to unlock full course access, mentor support, and progress tracking.
        </p>
      </article>
    );
  }

  const { plan, status, startedAt, expiresAt, autoRenew, paymentReference } = subscription;

  return (
    <article className="eduhive-card subscription-status">
      <header className="subscription-status__header">
        <span className="st-label">My Plan</span>
        <div className="subscription-status__title-row">
          <h2 className="subscription-status__title">{plan?.name}</h2>
          <span className={`subscription-status__badge subscription-status__badge--${status}`}>
            {statusLabel(status)}
          </span>
        </div>
        <p className="subscription-status__lead mb-0">{plan?.description}</p>
      </header>

      <dl className="subscription-status__meta">
        <div>
          <dt>Price</dt>
          <dd>{formatPrice(plan?.price, plan?.currency)}</dd>
        </div>
        <div>
          <dt>Started</dt>
          <dd>{formatDate(startedAt)}</dd>
        </div>
        <div>
          <dt>Renews / Expires</dt>
          <dd>{formatDate(expiresAt)}</dd>
        </div>
        <div>
          <dt>Auto-renew</dt>
          <dd>{autoRenew ? 'Enabled' : 'Disabled'}</dd>
        </div>
      </dl>

      {paymentReference && (
        <p className="subscription-status__reference mb-0">
          <LucideIcon name="credit-card" size={14} aria-hidden="true" />
          Reference: {paymentReference}
        </p>
      )}

      {status === 'active' && (
        <div className="subscription-status__actions">
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel subscription
          </button>
        </div>
      )}
    </article>
  );
}

export default SubscriptionStatusCard;
