import { useEffect, useRef, useState } from 'react';
import { changePassword } from '../../../shared/api/authApi';
import { validateChangePasswordForm } from '../../../shared/utils/validation';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

function ChangePasswordModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
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
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setStatus('');
    setSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateChangePasswordForm(form);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setStatus('');
    setSuccess(false);

    try {
      const { message } = await changePassword(form);
      setStatus(message || 'Password updated successfully.');
      setSuccess(true);
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setStatus(err.message || 'Unable to update password.');
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
        aria-label="Close change password dialog"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="account-modal__panel eduhive-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        tabIndex={-1}
      >
        <div className="account-modal__header">
          <div>
            <span className="st-label">Account Security</span>
            <h2 id="change-password-title" className="account-modal__title">
              Change Password
            </h2>
          </div>
          <button type="button" className="account-modal__close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="account-modal__form" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="change-current-password">
              Current password
            </label>
            <input
              id="change-current-password"
              type="password"
              className={`form-control${errors.currentPassword ? ' is-invalid' : ''}`}
              value={form.currentPassword}
              onChange={(event) => updateField('currentPassword', event.target.value)}
              autoComplete="current-password"
            />
            {errors.currentPassword && (
              <div className="invalid-feedback">{errors.currentPassword}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="change-new-password">
              New password
            </label>
            <input
              id="change-new-password"
              type="password"
              className={`form-control${errors.newPassword ? ' is-invalid' : ''}`}
              value={form.newPassword}
              onChange={(event) => updateField('newPassword', event.target.value)}
              autoComplete="new-password"
            />
            {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="change-confirm-password">
              Confirm new password
            </label>
            <input
              id="change-confirm-password"
              type="password"
              className={`form-control${errors.confirmPassword ? ' is-invalid' : ''}`}
              value={form.confirmPassword}
              onChange={(event) => updateField('confirmPassword', event.target.value)}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          {status && (
            <p
              className={`account-modal__status${success ? ' account-modal__status--success' : ''}`}
              role="status"
            >
              {status}
            </p>
          )}

          <div className="account-modal__actions">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Updating...' : 'Update password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
