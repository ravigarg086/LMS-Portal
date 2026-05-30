import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './shared/auth/AuthContext';
import { ThemeProvider } from './shared/theme/ThemeProvider';
import { UserSettingsProvider } from './shared/settings/UserSettingsContext';
import AuthLoadingScreen from './shared/components/AuthLoadingScreen';
import ScrollToTop from './shared/components/ScrollToTop';
import HomePage from './modules/home';
import SignInPage from './modules/signin';
import ResetPasswordPage from './modules/signin/ResetPasswordPage';
import RegistrationPage from './modules/registration';
import FaqPage from './modules/faq/FaqPage';
import ExternalDataPage from './modules/external-data';
import PhotoGalleryPage from './modules/photo-gallery';
import ContactPage from './modules/contact';
import SettingsPage from './modules/settings';
import ProtectedDashboard from './modules/dashboard/ProtectedDashboard';
import { USER_ROLES } from './shared/constants/roles';

const ProtectedStudentSubscription = lazy(() => import('./modules/subscription/ProtectedStudentSubscription'));

function PublicHomeRoute() {
  const { user, initializing, getDashboardRoute } = useAuth();

  if (initializing) {
    return <AuthLoadingScreen />;
  }

  if (user) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return <HomePage />;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider>
        <AuthProvider>
          <UserSettingsProvider>
            <Routes>
              <Route path="/" element={<PublicHomeRoute />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/photo-gallery" element={<PhotoGalleryPage />} />
              <Route path="/external-data" element={<ExternalDataPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="/subscription"
                element={
                  <Suspense fallback={<AuthLoadingScreen message="Loading subscription..." />}>
                    <ProtectedStudentSubscription />
                  </Suspense>
                }
              />
              <Route path="/dashboard/student" element={<ProtectedDashboard role={USER_ROLES.STUDENT} />} />
              <Route path="/dashboard/faculty" element={<ProtectedDashboard role={USER_ROLES.FACULTY} />} />
              <Route path="/dashboard/admin" element={<ProtectedDashboard role={USER_ROLES.ADMIN} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </UserSettingsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
