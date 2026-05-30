import { formatDate, statusLabel } from '../utils/subscriptionFormatters';

function SubscriptionHistory({ history }) {
  if (!history.length) {
    return null;
  }

  return (
    <section className="subscription-history" aria-labelledby="subscription-history-heading">
      <header className="subscription-history__header">
        <span className="st-label">Billing History</span>
        <h2 id="subscription-history-heading" className="subscription-history__title">
          Past Subscriptions
        </h2>
      </header>

      <div className="table-responsive">
        <table className="table subscription-history__table align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Plan</th>
              <th scope="col">Status</th>
              <th scope="col">Started</th>
              <th scope="col">Ended</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.plan?.name || entry.planId}</td>
                <td>
                  <span className={`subscription-history__status subscription-history__status--${entry.status}`}>
                    {statusLabel(entry.status)}
                  </span>
                </td>
                <td>{formatDate(entry.startedAt)}</td>
                <td>{formatDate(entry.cancelledAt || entry.expiresAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default SubscriptionHistory;
