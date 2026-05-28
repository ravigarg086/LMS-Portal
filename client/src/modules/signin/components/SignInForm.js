import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonaTabs from './PersonaTabs';
import ForgotPasswordModal from './ForgotPasswordModal';
import { useAuth } from '../../../shared/auth/AuthContext';
import { USER_ROLES } from '../../../shared/constants/roles';
import { validateSignInForm } from '../../../shared/utils/validation';

const ROLE_MESSAGES = {
  [USER_ROLES.STUDENT]: 'You are signing in to the Student Dashboard.',
  [USER_ROLES.FACULTY]: 'You are signing in to the Faculty Portal.',
  [USER_ROLES.ADMIN]: 'You are signing in to the Admin Control Panel.',
};

const DEMO_ACCOUNTS = [
  { role: 'Student', id: 'alex@campus.edu', password: 'password123456' },
  { role: 'Faculty', id: 'pshah@campus.edu', password: 'password123456' },
  { role: 'Admin', id: 'jlee@campus.edu', password: 'password123456' },
];

function SignInForm({ initialRole, initialUserId = '' }) {
  const navigate = useNavigate();
  const { login, getDashboardRoute } = useAuth();
  const [role, setRole] = useState(initialRole || USER_ROLES.STUDENT);
  const [userId, setUserId] = useState(initialUserId);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  useEffect(() => {
    setRole(initialRole || USER_ROLES.STUDENT);
    setUserId(initialUserId || '');
    setPassword('');
    setErrors({});
    setSubmitError('');
  }, [initialRole, initialUserId]);

  const handleRoleChange = (nextRole) => {
    if (nextRole === role) {
      return;
    }
    setRole(nextRole);
    setUserId('');
    setPassword('');
    setErrors({});
    setSubmitError('');
  };

  const fillDemoAccount = (account) => {
    setRole(account.role.toLowerCase());
    setUserId(account.id);
    setPassword(account.password);
    setErrors({});
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const nextErrors = validateSignInForm({ userId, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }

    setIsSubmitting(true);
    try {
      const signedInUser = await login({ role, userId, password });
      navigate(getDashboardRoute(signedInUser.role), { replace: true });
    } catch (error) {
      setSubmitError(error.message || 'Sign in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PersonaTabs role={role} onChange={handleRoleChange} />

      <div className={`auth-role-banner auth-role-banner--${role}`} role="status">
        {ROLE_MESSAGES[role]}
      </div>

      <details className="auth-demo-panel">
        <summary>Try demo accounts</summary>
        <ul className="auth-demo-panel__list list-unstyled mb-0">
          {DEMO_ACCOUNTS.map((account) => (
            <li key={account.role}>
              <button type="button" className="auth-demo-panel__btn" onClick={() => fillDemoAccount(account)}>
                Use {account.role} demo
              </button>
              <span className="auth-demo-panel__meta">{account.id}</span>
            </li>
          ))}
        </ul>
      </details>

      {submitError && (
        <div className="alert alert-danger auth-alert" role="alert">
          {submitError}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="mb-3">
          <label htmlFor={`signin-user-id-${role}`} className="form-label">
            User ID or Email
          </label>
          <input
            key={`signin-user-id-${role}`}
            id={`signin-user-id-${role}`}
            name={`signin-user-id-${role}`}
            type="text"
            className={`form-control${errors.userId ? ' is-invalid' : ''}`}
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            autoComplete="off"
          />
          {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor={`signin-password-${role}`} className="form-label">
            Password
          </label>
          <input
            key={`signin-password-${role}`}
            id={`signin-password-${role}`}
            name={`signin-password-${role}`}
            type="password"
            className={`form-control${errors.password ? ' is-invalid' : ''}`}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          <div className="auth-forgot-link-wrap">
            <button
              type="button"
              className="auth-forgot-link"
              onClick={() => setForgotOpen(true)}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="auth-help-text">
        New here?{' '}
        <Link to="/register" className="auth-crosslink auth-crosslink--inline">
          Sign up
        </Link>{' '}
        as a Student, Faculty member, or Admin.
      </p>

      <ForgotPasswordModal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        initialRole={role}
        initialEmail={userId.includes('@') ? userId : ''}
      />
    </>
  );
}

export default SignInForm;
