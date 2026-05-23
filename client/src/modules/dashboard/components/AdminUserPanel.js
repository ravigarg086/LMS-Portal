const MOCK_USERS = [
  { id: '1', name: 'Alex Morgan', role: 'Student', email: 'alex@campus.edu' },
  { id: '2', name: 'Dr. Priya Shah', role: 'Faculty', email: 'pshah@campus.edu' },
  { id: '3', name: 'Jordan Lee', role: 'Admin', email: 'jlee@campus.edu' },
];

function AdminUserPanel() {
  return (
    <article className="eduhive-card role-panel role-panel--admin">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="stat-card__title mb-0">User Management</h3>
        <button type="button" className="btn btn-sm btn-primary">
          Add User
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-sm align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>
                  <button type="button" className="btn btn-link btn-sm p-0 me-2">
                    Edit
                  </button>
                  <button type="button" className="btn btn-link btn-sm p-0 text-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export default AdminUserPanel;
