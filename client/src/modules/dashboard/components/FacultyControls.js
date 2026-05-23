function FacultyControls() {
  return (
    <article className="eduhive-card role-panel">
      <h3 className="stat-card__title">Faculty Management Controls</h3>
      <p className="role-panel__desc">Publish assignments, update due dates, and review student submissions.</p>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-outline-primary btn-sm">
          Create Assignment
        </button>
        <button type="button" className="btn btn-outline-primary btn-sm">
          Review Submissions
        </button>
        <button type="button" className="btn btn-outline-primary btn-sm">
          Update Progress
        </button>
      </div>
    </article>
  );
}

export default FacultyControls;
