import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../shared/auth/AuthContext';
import AuthLoadingScreen from '../../shared/components/AuthLoadingScreen';
import { SITE_NAME, SITE_TAGLINE } from '../home/constants';
import SignInForm from './components/SignInForm';
import '../../shared/styles/auth.css';
import './signin.css';

function SignInPage() {
  const location = useLocation();
  const { user, initializing, getDashboardRoute } = useAuth();
  const registrationNotice = location.state?.registrationSuccess
    ? {
        role: location.state.role,
        email: location.state.email,
      }
    : null;

  if (initializing) {
    return <AuthLoadingScreen />;
  }

  if (user) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

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

        <h1 className="auth-card__title">Sign In</h1>
        <p className="auth-card__subtitle">Access your LMS Portal account by persona.</p>

        {registrationNotice && (
          <div className="alert alert-success auth-alert" role="status">
            Account created for {registrationNotice.email}. Sign in as{' '}
            {registrationNotice.role.charAt(0).toUpperCase()}
            {registrationNotice.role.slice(1)} to continue.
          </div>
        )}

        <SignInForm
          key={registrationNotice ? `registered-${registrationNotice.email}` : location.key}
          initialRole={registrationNotice?.role}
          initialUserId={registrationNotice?.email || ''}
        />
      </div>
    </div>
  );
}

export default SignInPage;
