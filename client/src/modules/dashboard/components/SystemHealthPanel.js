function SystemHealthPanel({ students, faculty, analytics, loading }) {
  const activeCourses = analytics?.summary?.activeCourses ?? 3;
  const totalStudents = students.length || analytics?.summary?.totalStudents || 0;

  return (
    <article className="eduhive-card role-panel mb-4">
      <h3 className="stat-card__title">System Health Audit</h3>
      <p className="role-panel__desc">Platform metrics and global configuration overview.</p>
      <div className="row g-3">
        <div className="col-6 col-md-3">
          <div className="role-stat-tile">
            <span className="role-stat-tile__label">Students</span>
            <strong className="role-stat-tile__value">{loading ? '—' : totalStudents}</strong>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="role-stat-tile">
            <span className="role-stat-tile__label">Faculty</span>
            <strong className="role-stat-tile__value">{loading ? '—' : faculty.length}</strong>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="role-stat-tile">
            <span className="role-stat-tile__label">Active Courses</span>
            <strong className="role-stat-tile__value">{loading ? '—' : activeCourses}</strong>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="role-stat-tile">
            <span className="role-stat-tile__label">Platform Uptime</span>
            <strong className="role-stat-tile__value">99.9%</strong>
          </div>
        </div>
      </div>
    </article>
  );
}

export default SystemHealthPanel;
