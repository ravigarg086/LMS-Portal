import LucideIcon from '../../home/components/LucideIcon';
import { useContactMessages } from '../hooks/useContactMessages';
import '../admin-contact-messages.css';

const DESIGNATION_LABELS = {
  student: 'Student',
  faculty: 'Faculty',
  admin: 'Admin',
};

function formatSubmittedAt(value) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function DesignationBadge({ designation }) {
  const label = DESIGNATION_LABELS[designation] || designation;

  return (
    <span className={`admin-contact-badge admin-contact-badge--${designation}`}>
      {label}
    </span>
  );
}

function ContactMessageCard({ message }) {
  return (
    <article className="admin-contact-card">
      <div className="admin-contact-card__top">
        <div>
          <h4 className="admin-contact-card__name">{message.fullName}</h4>
          <p className="admin-contact-card__date mb-0">{formatSubmittedAt(message.createdAt)}</p>
        </div>
        <DesignationBadge designation={message.designation} />
      </div>

      <p className="admin-contact-card__subject">{message.subject}</p>

      <dl className="admin-contact-card__details">
        <div>
          <dt>Email</dt>
          <dd>{message.email}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{message.location}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{message.phone}</dd>
        </div>
      </dl>

      <p className="admin-contact-card__message">{message.message}</p>
    </article>
  );
}

function AdminContactMessagesPanel() {
  const { messages, loading, error, search, setSearch, reload } = useContactMessages(true);

  return (
    <article
      className="eduhive-card role-panel role-panel--admin admin-contact-panel"
      aria-labelledby="admin-contact-messages-heading"
    >
      <div className="admin-contact-panel__header">
        <div>
          <span className="st-label">Inbox</span>
          <h3 id="admin-contact-messages-heading" className="admin-contact-panel__title">
            Contact Messages
          </h3>
          <p className="admin-contact-panel__meta">
            Review Contact Us submissions stored in MySQL.
          </p>
        </div>

        <div className="admin-contact-panel__toolbar">
          <label className="admin-contact-panel__search mb-0">
            <span className="visually-hidden">Search contact messages</span>
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search name, email, subject..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={reload}
            disabled={loading}
            aria-label="Refresh contact messages"
          >
            <LucideIcon name="trending-up" size={16} />
          </button>
        </div>
      </div>

      {loading && (
        <div className="admin-contact-panel__loading" aria-live="polite">
          Loading contact messages...
        </div>
      )}

      {!loading && error && (
        <p className="text-danger small mb-0" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && messages.length === 0 && (
        <div className="admin-contact-panel__empty">
          <p className="mb-0">
            {search ? 'No contact messages match your search.' : 'No contact messages yet.'}
          </p>
        </div>
      )}

      {!loading && !error && messages.length > 0 && (
        <>
          <p className="admin-contact-panel__meta mb-3">
            Showing {messages.length} message{messages.length === 1 ? '' : 's'}
          </p>

          <div className="table-responsive d-none d-md-block">
            <table className="table table-sm align-middle mb-0 admin-contact-panel__table">
              <thead>
                <tr>
                  <th scope="col">Submitted</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Location</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td>{formatSubmittedAt(message.createdAt)}</td>
                    <td>{message.fullName}</td>
                    <td>{message.email}</td>
                    <td>
                      <DesignationBadge designation={message.designation} />
                    </td>
                    <td>{message.location}</td>
                    <td>{message.phone}</td>
                    <td>{message.subject}</td>
                    <td>
                      <p className="admin-contact-panel__message">{message.message}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-md-none">
            {messages.map((message) => (
              <ContactMessageCard key={message.id} message={message} />
            ))}
          </div>
        </>
      )}
    </article>
  );
}

export default AdminContactMessagesPanel;
