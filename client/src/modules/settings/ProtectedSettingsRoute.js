import { Navigate } from 'react-router-dom';
import { useAuth } from '../../shared/auth/AuthContext';
import AuthLoadingScreen from '../../shared/components/AuthLoadingScreen';
import SettingsPage from './SettingsPage';

function ProtectedSettingsRoute() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <AuthLoadingScreen message="Loading settings..." />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <SettingsPage />;
}

export default ProtectedSettingsRoute;
