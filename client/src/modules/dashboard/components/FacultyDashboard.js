import { useManagedUsers } from '../hooks/useManagedUsers';
import RoleDashboardShell from './RoleDashboardShell';
import FacultyProgressAnalytics from './FacultyProgressAnalytics';
import FacultyStudentManagementPanel from './FacultyStudentManagementPanel';
import {
  DEFAULT_FACULTY_SECTION,
  FACULTY_DASHBOARD_SECTIONS,
} from '../data/facultyDashboardSections';

function FacultyDashboard() {
  const { students, loading, error, reload } = useManagedUsers('faculty');

  return (
    <RoleDashboardShell
      sections={FACULTY_DASHBOARD_SECTIONS}
      defaultSection={DEFAULT_FACULTY_SECTION}
      ariaLabel="Faculty dashboard sections"
      idPrefix="faculty"
    >
      {(activeSection) => {
        if (activeSection === 'students') {
          return (
            <FacultyStudentManagementPanel
              students={students}
              loading={loading}
              error={error}
              reload={reload}
            />
          );
        }

        return <FacultyProgressAnalytics students={students} />;
      }}
    </RoleDashboardShell>
  );
}

export default FacultyDashboard;
