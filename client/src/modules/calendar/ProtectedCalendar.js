import { Navigate } from 'react-router-dom';
import { useAuth } from '../../shared/auth/AuthContext';
import AuthLoadingScreen from '../../shared/components/AuthLoadingScreen';
import CalendarPage from './CalendarPage';

function ProtectedCalendar() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <AuthLoadingScreen message="Loading calendar..." />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <CalendarPage />;
}

export default ProtectedCalendar;
