function FacultyProgressAnalytics({ students }) {
  const totalStudents = students.length;
  const progressValues = students
    .map((student) => student.dashboard?.overallProgress)
    .filter((value) => typeof value === 'number');
  const averageProgress = progressValues.length
    ? Math.round(progressValues.reduce((sum, value) => sum + value, 0) / progressValues.length)
    : 0;
  const onTrackCount = progressValues.filter((value) => value >= 50).length;

  return (
    <article className="eduhive-card role-panel mb-4">
      <h3 className="stat-card__title">Student Progress Analytics</h3>
      <p className="role-panel__desc">Class performance overview across enrolled students.</p>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="role-stat-tile">
            <span className="role-stat-tile__label">Total Students</span>
            <strong className="role-stat-tile__value">{totalStudents}</strong>
          </div>
        </div>
        <div className="col-md-4">
          <div className="role-stat-tile">
            <span className="role-stat-tile__label">Average Progress</span>
            <strong className="role-stat-tile__value">{averageProgress}%</strong>
          </div>
        </div>
        <div className="col-md-4">
          <div className="role-stat-tile">
            <span className="role-stat-tile__label">On Track (50%+)</span>
            <strong className="role-stat-tile__value">{onTrackCount}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}

export default FacultyProgressAnalytics;
