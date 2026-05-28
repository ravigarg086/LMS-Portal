import { useEffect, useRef, useState } from 'react';
import { requestPasswordReset } from '../../../shared/api/authApi';
import { USER_ROLES } from '../../../shared/constants/roles';
import { validateEmail } from '../../../shared/utils/validation';
import { useBodyScrollLock } from '../../home/hooks/useBodyScrollLock';
import PersonaTabs from './PersonaTabs';
import '../../../shared/styles/form-modal.css';

function ForgotPasswordModal({ open, onClose, initialRole = USER_ROLES.STUDENT, initialEmail = '' }) {
  const dialogRef = useRef(null);
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState(initialEmail);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    setRole(initialRole || USER_ROLES.STUDENT);
    setEmail(initialEmail || '');
    setErrors({});
    setStatus('');
    setSuccess(false);
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, initialRole, initialEmail]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailError = validateEmail(email);
    const nextErrors = {};

    if (emailError) {
      nextErrors.email = emailError;
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setStatus('');
    setSuccess(false);

    try {
      const response = await requestPasswordReset({ role, email: email.trim() });
      setStatus(response.message);
      setSuccess(true);
    } catch (err) {
      setStatus(err.message || 'Unable to send reset instructions.');
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="account-modal" role="presentation">
      <button
        type="button"
        className="account-modal__backdrop"
        aria-label="Close forgot password dialog"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="account-modal__panel eduhive-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-password-title"
        tabIndex={-1}
      >
        <div className="account-modal__header">
          <div>
            <span className="st-label">Account recovery</span>
            <h2 id="forgot-password-title" className="account-modal__title">
              Forgot password
            </h2>
          </div>
          <button type="button" className="account-modal__close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>

        <p className="auth-forgot-modal__intro">
          Select your persona and enter the email on your account. We will send a secure reset link if a matching
          account exists.
        </p>

        {success ? (
          <div className="auth-forgot-modal__success">
            <p className="account-modal__status account-modal__status--success" role="status">
              {status}
            </p>
            <p className="auth-forgot-modal__hint">
              Check your inbox. If email is not configured in development, look for the reset link in the LMS server
              console.
            </p>
            <button type="button" className="auth-submit-btn" onClick={onClose}>
              Back to sign in
            </button>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <PersonaTabs role={role} onChange={setRole} />

            <div className="mb-3">
              <label htmlFor="forgot-password-email" className="form-label">
                Email address
              </label>
              <input
                id="forgot-password-email"
                type="email"
                className={`form-control${errors.email ? ' is-invalid' : ''}`}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrors((current) => ({ ...current, email: '' }));
                }}
                autoComplete="email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {status && !success && (
              <p className="account-modal__status" role="alert">
                {status}
              </p>
            )}

            <button type="submit" className="auth-submit-btn" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
