import { useAuth } from '../auth/AuthContext';
import AuthLoadingScreen from '../components/AuthLoadingScreen';
import DashboardHeader from '../../modules/home/components/DashboardHeader';
import Sidebar from '../../modules/home/components/Sidebar';
import SiteFooter from '../../modules/home/components/SiteFooter';
import { useSidebarLayout } from '../hooks/useSidebarLayout';
import { useUserSettings } from '../settings/UserSettingsContext';

function DashboardShell({
  activeId,
  pageClassName = '',
  mainClassName: mainContentClassName = '',
  children,
  showFooter = true,
}) {
  const { user, initializing } = useAuth();
  const { userSettings } = useUserSettings();
  const { sidebarOpen, closeSidebar, toggleSidebar } = useSidebarLayout();

  if (initializing) {
    return <AuthLoadingScreen />;
  }

  const pageClasses = ['home-page', 'eduhive-app', pageClassName].filter(Boolean).join(' ');
  const isCompactLayout = Boolean(userSettings?.dashboard?.compactLayout);
  const shellMainClassName = [
    'eduhive-main',
    isCompactLayout ? 'eduhive-main--compact' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={pageClasses}>
      <div className="eduhive-shell">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Sidebar
          activeId={activeId}
          mobileOpen={sidebarOpen}
          onClose={closeSidebar}
          user={user}
        />

        <div className={shellMainClassName}>
          <DashboardHeader
            sidebarOpen={sidebarOpen}
            onMenuToggle={toggleSidebar}
            user={user}
          />

          <main id="main-content" className={mainContentClassName} tabIndex={-1}>
            {children}
          </main>

          {showFooter && <SiteFooter />}
        </div>
      </div>
    </div>
  );
}

export default DashboardShell;
