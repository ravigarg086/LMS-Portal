import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../shared/auth/AuthContext';
import AuthLoadingScreen from '../../shared/components/AuthLoadingScreen';
import { SITE_NAME, SITE_TAGLINE } from '../home/constants';
import RegistrationForm from './components/RegistrationForm';
import '../../shared/styles/auth.css';
import './registration.css';

function RegistrationPage() {
  const { user, initializing, getDashboardRoute } = useAuth();

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

        <h1 className="auth-card__title">Create Account</h1>
        <p className="auth-card__subtitle">Sign up as a Student, Faculty member, or Admin.</p>

        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegistrationPage;
