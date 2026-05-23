import { useCallback, useState } from 'react';
import { useAuth } from '../../shared/auth/AuthContext';
import DashboardHeader from '../home/components/DashboardHeader';
import Sidebar from '../home/components/Sidebar';
import FaqSection from '../home/components/FaqSection';
import SiteFooter from '../home/components/SiteFooter';
import RevealUp from '../home/components/RevealUp';
import { useBodyScrollLock } from '../home/hooks/useBodyScrollLock';
import { useEscapeKey } from '../home/hooks/useEscapeKey';
import '../home/home.css';
import '../home/super-travel.css';

function FaqPage() {
  const { user, initializing } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);

  useBodyScrollLock(sidebarOpen);
  useEscapeKey(sidebarOpen, closeSidebar);

  if (initializing) {
    return (
      <div className="auth-page eduhive-app">
        <p className="auth-card__subtitle">Loading...</p>
      </div>
    );
  }

  return (
    <div className="home-page eduhive-app faq-page">
      <div className="eduhive-shell">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Sidebar
          activeId="faq"
          mobileOpen={sidebarOpen}
          onClose={closeSidebar}
          user={user}
        />

        <div className="eduhive-main">
          <DashboardHeader
            sidebarOpen={sidebarOpen}
            onMenuToggle={() => (sidebarOpen ? closeSidebar() : openSidebar())}
            user={user}
          />

          <main id="main-content" className="faq-page__main" tabIndex={-1}>
            <RevealUp>
              <FaqSection />
            </RevealUp>
            <SiteFooter />
          </main>
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
