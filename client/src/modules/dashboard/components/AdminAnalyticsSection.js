import { useEnrollmentComparison } from '../hooks/useEnrollmentComparison';
import { useManagedUsers } from '../hooks/useManagedUsers';
import SystemHealthPanel from './SystemHealthPanel';
import CourseEnrollmentCompareChart from './CourseEnrollmentCompareChart';
import StudentProgressDistributionChart from './StudentProgressDistributionChart';
import TrackEnrollmentChart from './TrackEnrollmentChart';

function AdminAnalyticsSection() {
  const { analytics, loading, error, usingDemo } = useEnrollmentComparison(true);
  const { students, faculty } = useManagedUsers('admin');

  return (
    <section className="admin-dashboard" aria-labelledby="admin-analytics-heading">
      <div className="admin-dashboard__intro mb-4">
        <h2 id="admin-analytics-heading" className="admin-dashboard__title">Platform Analytics</h2>
        <p className="role-panel__desc mb-0">
          Course enrollment, student progress, and system health at a glance.
        </p>
      </div>

      <SystemHealthPanel
        students={students}
        faculty={faculty}
        analytics={analytics}
        loading={loading}
      />

      {loading && (
        <div className="admin-dashboard__loading eduhive-card role-panel mb-4" aria-live="polite">
          <p className="role-panel__desc mb-0">Loading analytics charts...</p>
        </div>
      )}

      {error && usingDemo && (
        <p className="admin-dashboard__notice mb-3" role="status">
          {error}
        </p>
      )}

      {!loading && analytics && (
        <>
          <div className="row g-4 mb-4">
            <div className="col-lg-8">
              <CourseEnrollmentCompareChart analytics={analytics} usingDemo={usingDemo} />
            </div>
            <div className="col-lg-4">
              <StudentProgressDistributionChart analytics={analytics} />
            </div>
          </div>

          <TrackEnrollmentChart analytics={analytics} />
        </>
      )}
    </section>
  );
}

export default AdminAnalyticsSection;
