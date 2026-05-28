import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword, validateResetToken } from '../../shared/api/authApi';
import AuthLoadingScreen from '../../shared/components/AuthLoadingScreen';
import { useAuth } from '../../shared/auth/AuthContext';
import { validateResetPasswordForm } from '../../shared/utils/validation';
import { SITE_NAME, SITE_TAGLINE } from '../home/constants';
import '../../shared/styles/auth.css';
import '../signin/signin.css';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const { user, initializing } = useAuth();

  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [accountEmail, setAccountEmail] = useState('');
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkToken() {
      if (!token) {
        setValidating(false);
        setTokenValid(false);
        return;
      }

      try {
        const response = await validateResetToken(token);
        if (!cancelled) {
          setTokenValid(Boolean(response.valid));
          setAccountEmail(response.email || '');
        }
      } catch {
        if (!cancelled) {
          setTokenValid(false);
        }
      } finally {
        if (!cancelled) {
          setValidating(false);
        }
      }
    }

    checkToken();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (initializing || validating) {
    return <AuthLoadingScreen />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateResetPasswordForm(form);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      await resetPassword({ token, ...form });
      navigate('/signin', {
        replace: true,
        state: { passwordResetSuccess: true },
      });
    } catch (err) {
      setSubmitError(err.message || 'Unable to reset password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page eduhive-app">
      <div className="auth-card">
        <Link to="/" className="auth-card__brand">
          <span className="auth-card__brand-icon" aria-hidden="true">
            LP
          </span>
          <span>
            <strong>{SITE_NAME}</strong>
            <br />
            <small>{SITE_TAGLINE}</small>
          </span>
        </Link>

        <h1 className="auth-card__title">Reset password</h1>

        {!tokenValid ? (
          <>
            <p className="auth-card__subtitle">
              This reset link is invalid or has expired. Request a new link from the sign-in page.
            </p>
            <Link to="/signin" className="auth-crosslink">
              Back to sign in
            </Link>
          </>
        ) : (
          <>
            <p className="auth-card__subtitle">
              Choose a new password for <strong>{accountEmail}</strong>.
            </p>

            {submitError && (
              <div className="alert alert-danger auth-alert" role="alert">
                {submitError}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="reset-new-password" className="form-label">
                  New password
                </label>
                <input
                  id="reset-new-password"
                  type="password"
                  className={`form-control${errors.newPassword ? ' is-invalid' : ''}`}
                  value={form.newPassword}
                  onChange={(event) => updateField('newPassword', event.target.value)}
                  autoComplete="new-password"
                />
                {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="reset-confirm-password" className="form-label">
                  Confirm new password
                </label>
                <input
                  id="reset-confirm-password"
                  type="password"
                  className={`form-control${errors.confirmPassword ? ' is-invalid' : ''}`}
                  value={form.confirmPassword}
                  onChange={(event) => updateField('confirmPassword', event.target.value)}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>

              <button type="submit" className="auth-submit-btn" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update password'}
              </button>
            </form>

            <Link to="/signin" className="auth-crosslink">
              Back to sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
