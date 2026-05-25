import { Navigate } from 'react-router-dom';
import { useAuth } from '../../shared/auth/AuthContext';
import AuthLoadingScreen from '../../shared/components/AuthLoadingScreen';
import HomePage from '../home';

function ProtectedDashboard({ role }) {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <AuthLoadingScreen message="Loading your dashboard..." />;
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
