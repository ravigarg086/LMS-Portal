import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import FeaturedCourseCard from './FeaturedCourseCard';
import StatisticsCard from './StatisticsCard';
import ProgressRing from './ProgressRing';
import MentorList from './MentorList';
import PopularCoursesGrid from './PopularCoursesGrid';
import GuestDashboard from './GuestDashboard';
import SiteFooter from './SiteFooter';
import RevealUp from './RevealUp';
import RoleDashboardBanner from '../../dashboard/components/RoleDashboardBanner';
import FacultyControls from '../../dashboard/components/FacultyControls';
import AdminUserPanel from '../../dashboard/components/AdminUserPanel';
import AdminContactMessagesPanel from '../../dashboard/components/AdminContactMessagesPanel';
import AdminAnalyticsSection from '../../dashboard/components/AdminAnalyticsSection';
import { useStudentDashboard } from '../../dashboard/hooks/useStudentDashboard';
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
  const showPersonalWidgets = isStudent;
  const { dashboard, loading: dashboardLoading, error: dashboardError } = useStudentDashboard(isStudent);
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
          {role && (
            <RevealUp>
              <RoleDashboardBanner role={role} fullName={user.fullName} />
            </RevealUp>
          )}

          {role === USER_ROLES.FACULTY && (
            <RevealUp className="dashboard-role-panel mb-4">
              <FacultyControls />
            </RevealUp>
          )}

          {role === USER_ROLES.ADMIN && (
            <RevealUp className="dashboard-role-panel mb-4">
              <AdminAnalyticsSection />
              <AdminContactMessagesPanel />
              <AdminUserPanel />
            </RevealUp>
          )}

          {isGuest && <GuestDashboard />}

          {showPersonalWidgets && (
            <>
              {isStudent && dashboardLoading && (
                <p className="auth-card__subtitle mb-4">Loading your learning data...</p>
              )}
              {isStudent && dashboardError && (
                <p className="text-danger small mb-4" role="alert">
                  {dashboardError}
                </p>
              )}

              <section className="services-section">
                <header className="services-section__header">
                  <span className="st-label">Your Dashboard</span>
                  <h2 className="services-section__title">Learning Services</h2>
                </header>
                <div className="services-grid">
                  <RevealUp className="services-grid__item">
                    <section
                      id={SECTION_IDS.assignment}
                      aria-labelledby="featured-course-title"
                    >
                      <FeaturedCourseCard course={dashboard?.featuredCourse} />
                    </section>
                  </RevealUp>

                  <RevealUp className="services-grid__item">
                    <section
                      id={SECTION_IDS.calendar}
                      aria-labelledby="learning-activity-title"
                    >
                      <StatisticsCard weeklyStats={dashboard?.weeklyStats} />
                    </section>
                  </RevealUp>

                  <RevealUp className="services-grid__item">
                    <section
                      id={SECTION_IDS.progress}
                      aria-labelledby="overall-progress-title"
                    >
                      <ProgressRing progress={dashboard?.overallProgress} />
                    </section>
                  </RevealUp>
                </div>
              </section>

              <RevealUp className="dashboard-grid__mentors mb-4" aria-labelledby="mentors-title">
                <MentorList />
              </RevealUp>

              <section
                id={SECTION_IDS.popularCourses}
                aria-labelledby="popular-courses-heading"
              >
                <PopularCoursesGrid />
              </section>
            </>
          )}

          <SiteFooter />

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
      </div>
    </div>
  );
}

export default DashboardContent;
