import { useState, useCallback, useMemo } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import FeaturedCourseCard from './FeaturedCourseCard';
import StatisticsCard from './StatisticsCard';
import ProgressRing from './ProgressRing';
import MentorList from './MentorList';
import PopularCoursesGrid from './PopularCoursesGrid';
import FaqSection from './FaqSection';
import { SECTION_IDS } from '../constants';
import { NAV_SECTION_MAP, TRACKED_SECTION_IDS } from '../data/navSections';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useActiveSection } from '../hooks/useActiveSection';

function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeSectionId = useActiveSection(TRACKED_SECTION_IDS);

  const activeNavId = useMemo(() => {
    const match = Object.entries(NAV_SECTION_MAP).find(([, sectionId]) => sectionId === activeSectionId);
    return match?.[0] ?? 'dashboard';
  }, [activeSectionId]);

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
      />

      <div className="eduhive-main">
        <span id={SECTION_IDS.home} className="dashboard-top-anchor" aria-hidden="true" />
        <div className="eduhive-main__glow" aria-hidden="true" />

        <DashboardHeader
          sidebarOpen={sidebarOpen}
          onMenuToggle={() => (sidebarOpen ? closeSidebar() : openSidebar())}
        />

        <main id="main-content" tabIndex={-1}>
          <div className="dashboard-grid">
            <section
              id={SECTION_IDS.assignment}
              className="dashboard-grid__featured"
              aria-labelledby="featured-course-title"
            >
              <FeaturedCourseCard />
            </section>

            <section
              id={SECTION_IDS.calendar}
              className="dashboard-grid__stats"
              aria-labelledby="learning-activity-title"
            >
              <StatisticsCard />
            </section>

            <section
              id={SECTION_IDS.progress}
              className="dashboard-grid__progress"
              aria-labelledby="overall-progress-title"
            >
              <ProgressRing />
            </section>

            <section className="dashboard-grid__mentors" aria-labelledby="mentors-title">
              <MentorList />
            </section>

            <section
              id={SECTION_IDS.popularCourses}
              className="dashboard-grid__courses"
              aria-labelledby="popular-courses-heading"
            >
              <PopularCoursesGrid />
            </section>
          </div>

          <FaqSection />

          <div className="portal-anchors" aria-hidden="true">
            <span id={SECTION_IDS.registration} className="portal-anchor" />
            <span id={SECTION_IDS.externalData} className="portal-anchor" />
            <span id={SECTION_IDS.subscription} className="portal-anchor" />
            <span id={SECTION_IDS.signIn} className="portal-anchor" />
            <span id="settings" className="portal-anchor" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardContent;
