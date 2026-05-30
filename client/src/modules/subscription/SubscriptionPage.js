import RevealUp from '../home/components/RevealUp';
import DashboardShell from '../../shared/layout/DashboardShell';
import { useSubscription } from './hooks/useSubscription';
import SubscriptionStatusCard from './components/SubscriptionStatusCard';
import SubscriptionPlansGrid from './components/SubscriptionPlansGrid';
import SubscriptionHistory from './components/SubscriptionHistory';
import './subscription.css';

function SubscriptionPage() {
  const {
    activeSubscription,
    history,
    plans,
    loading,
    submitting,
    error,
    success,
    subscribe,
    cancel,
  } = useSubscription(true);

  const handleCancel = () => {
    if (window.confirm('Cancel your subscription? Access continues until the current period ends.')) {
      cancel();
    }
  };

  return (
    <DashboardShell activeId="subscription" pageClassName="subscription-page" mainClassName="subscription-page__main">
      <RevealUp className="subscription-page__content">
        <header className="subscription-page__header">
          <span className="st-label">Student Portal</span>
          <h1 id="subscription-heading" className="subscription-page__title">
            My Subscription
          </h1>
          <p className="subscription-page__lead mb-0">
            Manage your learning plan, view billing history, and subscribe to programs that match your goals.
          </p>
        </header>

        {error && (
          <div className="alert alert-danger subscription-page__alert" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success subscription-page__alert" role="status">
            {success}
          </div>
        )}

        {loading ? (
          <p className="subscription-page__loading mb-0">Loading subscription details...</p>
        ) : (
          <>
            <SubscriptionStatusCard
              subscription={activeSubscription}
              onCancel={handleCancel}
              submitting={submitting}
            />

            <section className="subscription-page__plans" aria-labelledby="subscription-plans-heading">
              <header className="subscription-page__section-header">
                <span className="st-label">Available Plans</span>
                <h2 id="subscription-plans-heading" className="subscription-page__section-title">
                  Choose a Plan
                </h2>
                <p className="subscription-page__section-desc mb-0">
                  Payment processing is simulated for demo purposes. Live PayPal and RBI integrations will be added later.
                </p>
              </header>

              <SubscriptionPlansGrid
                plans={plans}
                activePlanId={activeSubscription?.planId}
                onSubscribe={subscribe}
                submitting={submitting}
              />
            </section>

            <SubscriptionHistory history={history} />
          </>
        )}
      </RevealUp>
    </DashboardShell>
  );
}

export default SubscriptionPage;
