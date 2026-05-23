import { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import FeaturedCourseCard from './FeaturedCourseCard';
import StatisticsCard from './StatisticsCard';
import ProgressRing from './ProgressRing';
import MentorList from './MentorList';
import PopularCoursesGrid from './PopularCoursesGrid';
import FaqSection from './FaqSection';
import { SECTION_IDS } from '../constants';

function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="eduhive-shell">
      <Sidebar activeId="dashboard" mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="eduhive-main">
        <div className="eduhive-main__glow" aria-hidden="true" />

        <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} />

        <div id={SECTION_IDS.home} className="dashboard-grid">
          <section className="dashboard-grid__featured">
            <FeaturedCourseCard />
          </section>

          <section className="dashboard-grid__stats">
            <StatisticsCard />
          </section>

          <section className="dashboard-grid__progress">
            <ProgressRing />
          </section>

          <section className="dashboard-grid__mentors">
            <MentorList />
          </section>

          <section id={SECTION_IDS.popularCourses} className="dashboard-grid__courses">
            <PopularCoursesGrid />
          </section>
        </div>

        <FaqSection />
      </div>
    </div>
  );
}

export default DashboardContent;
