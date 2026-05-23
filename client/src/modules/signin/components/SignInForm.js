import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonaTabs from './PersonaTabs';
import { useAuth } from '../../../shared/auth/AuthContext';
import { USER_ROLES } from '../../../shared/constants/roles';
import { validateSignInForm } from '../../../shared/utils/validation';

const ROLE_MESSAGES = {
  [USER_ROLES.STUDENT]: 'You are signing in to the Student Dashboard.',
  [USER_ROLES.FACULTY]: 'You are signing in to the Faculty Portal.',
  [USER_ROLES.ADMIN]: 'You are signing in to the Admin Control Panel.',
};

function SignInForm() {
  const navigate = useNavigate();
  const { login, getDashboardRoute } = useAuth();
  const [role, setRole] = useState(USER_ROLES.STUDENT);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <PersonaTabs role={role} onChange={setRole} />

      <div className={`auth-role-banner auth-role-banner--${role}`} role="status">
        {ROLE_MESSAGES[role]}
      </div>

      {submitError && (
        <div className="alert alert-danger auth-alert" role="alert">
          {submitError}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="signin-user-id" className="form-label">
            User ID or Email
          </label>
          <input
            id="signin-user-id"
            type="text"
            className={`form-control${errors.userId ? ' is-invalid' : ''}`}
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            autoComplete="username"
          />
          {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="signin-password" className="form-label">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            className={`form-control${errors.password ? ' is-invalid' : ''}`}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <Link to="/register" className="auth-crosslink">
        New User Sign Here
      </Link>
    </>
  );
}

export default SignInForm;
