import MentorList from '../../home/components/MentorList';
import PopularCoursesGrid from '../../home/components/PopularCoursesGrid';
import RevealUp from '../../home/components/RevealUp';
import { SECTION_IDS } from '../../home/constants';
import { useStudentDashboard } from '../hooks/useStudentDashboard';
import RoleDashboardShell from './RoleDashboardShell';
import StudentLearningOverview from './StudentLearningOverview';
import {
  DEFAULT_STUDENT_SECTION,
  STUDENT_DASHBOARD_SECTIONS,
} from '../data/studentDashboardSections';

function StudentDashboard() {
  const { dashboard, loading, error } = useStudentDashboard(true);

  return (
    <RoleDashboardShell
      sections={STUDENT_DASHBOARD_SECTIONS}
      defaultSection={DEFAULT_STUDENT_SECTION}
      ariaLabel="Student dashboard sections"
      idPrefix="student"
    >
      {(activeSection) => {
        if (activeSection === 'mentors') {
          return (
            <RevealUp className="dashboard-grid__mentors" aria-labelledby="mentors-title">
              <MentorList />
            </RevealUp>
          );
        }

        if (activeSection === 'courses') {
          return (
            <section
              id={SECTION_IDS.popularCourses}
              aria-labelledby="popular-courses-heading"
            >
              <PopularCoursesGrid />
            </section>
          );
        }

        return (
          <StudentLearningOverview dashboard={dashboard} loading={loading} error={error} />
        );
      }}
    </RoleDashboardShell>
  );
}

export default StudentDashboard;
