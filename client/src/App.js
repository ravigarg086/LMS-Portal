import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './shared/auth/AuthContext';
import { ThemeProvider } from './modules/home/context/ThemeProvider';
import HomePage from './modules/home';
import SignInPage from './modules/signin';
import RegistrationPage from './modules/registration';
import FaqPage from './modules/faq/FaqPage';
import ProtectedDashboard from './modules/dashboard/ProtectedDashboard';
import { USER_ROLES } from './shared/constants/roles';

function PublicHomeRoute() {
  const { user, initializing, getDashboardRoute } = useAuth();

  if (initializing) {
    return (
      <div className="auth-page eduhive-app">
        <p className="auth-card__subtitle">Loading...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return <HomePage />;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PublicHomeRoute />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/dashboard/student" element={<ProtectedDashboard role={USER_ROLES.STUDENT} />} />
            <Route path="/dashboard/faculty" element={<ProtectedDashboard role={USER_ROLES.FACULTY} />} />
            <Route path="/dashboard/admin" element={<ProtectedDashboard role={USER_ROLES.ADMIN} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
