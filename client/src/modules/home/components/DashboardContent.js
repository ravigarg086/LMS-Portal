import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import GuestDashboard from './GuestDashboard';
import SiteFooter from './SiteFooter';
import RevealUp from './RevealUp';
import FacultyDashboard from '../../dashboard/components/FacultyDashboard';
import StudentDashboard from '../../dashboard/components/StudentDashboard';
import AdminDashboard from '../../dashboard/components/AdminDashboard';
import { SECTION_IDS } from '../constants';
import { USER_ROLES } from '../../../shared/constants/roles';
import { GUEST_NAV_SECTION_MAP, NAV_SECTION_MAP, TRACKED_SECTION_IDS } from '../data/navSections';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../utils/scrollToSection';
import { isHomeDashboardRoute } from '../utils/homeRoutes';

function DashboardContent({ user = null }) {
  const location = useLocation();
  const role = user?.role;
  const isGuest = !role;
  const isStudent = role === USER_ROLES.STUDENT;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeSectionId = useActiveSection(TRACKED_SECTION_IDS);
  const navSectionMap = isGuest ? GUEST_NAV_SECTION_MAP : NAV_SECTION_MAP;

  const activeNavId = useMemo(() => {
    const match = Object.entries(navSectionMap).find(([, sectionId]) => sectionId === activeSectionId);
    return match?.[0] ?? 'dashboard';
  }, [activeSectionId, navSectionMap]);

  useEffect(() => {
    if (!location.hash || !isHomeDashboardRoute(location.pathname)) {
      return;
    }

    scrollToSection(location.hash);
  }, [location.pathname, location.hash]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);

  useBodyScrollLock(sidebarOpen);
  useEscapeKey(sidebarOpen, closeSidebar);

  return (
    <div className="eduhive-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Sidebar
        activeId={activeNavId}
        mobileOpen={sidebarOpen}
        onClose={closeSidebar}
        user={user}
      />

      <div className="eduhive-main">
        <span id={SECTION_IDS.home} className="dashboard-top-anchor" aria-hidden="true" />
        <div className="eduhive-main__glow" aria-hidden="true" />

        <DashboardHeader
          sidebarOpen={sidebarOpen}
          onMenuToggle={() => (sidebarOpen ? closeSidebar() : openSidebar())}
          user={user}
        />

        <main id="main-content" tabIndex={-1}>
          {role === USER_ROLES.FACULTY && (
            <RevealUp className="dashboard-role-panel mb-4">
              <FacultyDashboard />
            </RevealUp>
          )}

          {role === USER_ROLES.ADMIN && (
            <RevealUp className="dashboard-role-panel mb-4">
              <AdminDashboard />
            </RevealUp>
          )}

          {isStudent && (
            <RevealUp className="dashboard-role-panel mb-4">
              <StudentDashboard />
            </RevealUp>
          )}

          {isGuest && <GuestDashboard />}

          {!isGuest && (
          <div className="portal-anchors" aria-hidden="true">
            <span id={SECTION_IDS.registration} className="portal-anchor" />
            <span id={SECTION_IDS.externalData} className="portal-anchor" />
            <span id={SECTION_IDS.subscription} className="portal-anchor" />
            <span id={SECTION_IDS.signIn} className="portal-anchor" />
            <span id="settings" className="portal-anchor" />
          </div>
          )}
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

export default DashboardContent;
