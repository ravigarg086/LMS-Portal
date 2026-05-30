import { Navigate } from 'react-router-dom';
import { useAuth } from '../../shared/auth/AuthContext';
import AuthLoadingScreen from '../../shared/components/AuthLoadingScreen';
import { USER_ROLES } from '../../shared/constants/roles';
import SubscriptionPage from './SubscriptionPage';

function ProtectedStudentSubscription() {
  const { user, initializing, getDashboardRoute } = useAuth();

  if (initializing) {
    return <AuthLoadingScreen message="Loading subscription..." />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== USER_ROLES.STUDENT) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return <SubscriptionPage />;
}

export default ProtectedStudentSubscription;
