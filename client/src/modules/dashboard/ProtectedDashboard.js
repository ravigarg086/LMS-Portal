import { Navigate } from 'react-router-dom';
import { useAuth } from '../../shared/auth/AuthContext';
import HomePage from '../home';

function ProtectedDashboard({ role }) {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="auth-page eduhive-app">
        <p className="auth-card__subtitle">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return <HomePage user={user} />;
}

export default ProtectedDashboard;
