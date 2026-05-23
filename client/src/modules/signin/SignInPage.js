import { Link } from 'react-router-dom';
import { SITE_NAME, SITE_TAGLINE } from '../home/constants';
import SignInForm from './components/SignInForm';
import '../home/home.css';
import '../../shared/styles/auth.css';
import './signin.css';

function SignInPage() {
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

        <SignInForm />
      </div>
    </div>
  );
}

export default SignInPage;
