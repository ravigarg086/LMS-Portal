import { useMemo, useState } from 'react';
import {
  createManagedUser,
  deleteManagedUser,
  updateManagedUser,
} from '../../../shared/api/usersApi';
import {
  FACULTY_DEPARTMENTS,
  STUDENT_TRACKS,
  USER_ROLES,
} from '../../../shared/constants/roles';
import { useManagedUsers } from '../hooks/useManagedUsers';
import StudentManageForm from './StudentManageForm';
import ManagedUsersTable from './ManagedUsersTable';
import EditFormModal from '../../../shared/components/EditFormModal';
import {
  FACULTY_USER_COLUMNS,
  FACULTY_USER_SEARCH_FIELDS,
  STUDENT_USER_COLUMNS,
  STUDENT_USER_SEARCH_FIELDS,
} from '../data/tableColumns';

const EMPTY_CREATE_FORM = {
  role: USER_ROLES.STUDENT,
  fullName: '',
  email: '',
  password: '',
  academicTrack: STUDENT_TRACKS[0],
  graduationYear: '',
  department: FACULTY_DEPARTMENTS[0],
  employeeId: '',
};

function AdminUserPanel() {
  const { students, faculty, loading, error, reload } = useManagedUsers('admin');
  const [activeTab, setActiveTab] = useState(USER_ROLES.STUDENT);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState(EMPTY_CREATE_FORM);
  const [editingUser, setEditingUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const visibleUsers = useMemo(
    () => (activeTab === USER_ROLES.STUDENT ? students : faculty),
    [activeTab, students, faculty],
  );

  const tableConfig = useMemo(() => {
    if (activeTab === USER_ROLES.STUDENT) {
      return {
        columns: STUDENT_USER_COLUMNS,
        searchableFields: STUDENT_USER_SEARCH_FIELDS,
        entityLabel: 'students',
        emptyMessage: 'No students yet.',
      };
    }

    return {
      columns: FACULTY_USER_COLUMNS,
      searchableFields: FACULTY_USER_SEARCH_FIELDS,
      entityLabel: 'faculty',
      emptyMessage: 'No faculty yet.',
    };
  }, [activeTab]);

  const updateCreateField = (field, value) => {
    setCreateForm((current) => ({ ...current, [field]: value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError('');

    try {
      await createManagedUser(createForm);
      setCreateForm(EMPTY_CREATE_FORM);
      setShowCreateForm(false);
      await reload();
    } catch (err) {
      setFormError(err.message || 'Unable to create user.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStudentUpdate = async (payload) => {
    setSubmitting(true);
    setFormError('');

    try {
      await updateManagedUser(editingUser.id, payload);
      setEditingUser(null);
      await reload();
    } catch (err) {
      setFormError(err.message || 'Unable to update user.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFacultyUpdate = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError('');

    const formData = new FormData(event.currentTarget);

    try {
      await updateManagedUser(editingUser.id, {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        department: formData.get('department'),
        employeeId: formData.get('employeeId'),
      });
      setEditingUser(null);
      await reload();
    } catch (err) {
      setFormError(err.message || 'Unable to update user.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (user) => {
    const confirmed = window.confirm(`Delete ${user.fullName}? This cannot be undone.`);
    if (!confirmed) {
      return;
    }

    setSubmitting(true);
    setFormError('');

    try {
      await deleteManagedUser(user.id);
      if (editingUser?.id === user.id) {
        setEditingUser(null);
      }
      await reload();
    } catch (err) {
      setFormError(err.message || 'Unable to delete user.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className="eduhive-card role-panel role-panel--admin">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <h3 className="stat-card__title mb-0">User Management</h3>
        <p className="role-panel__desc mb-0 w-100">
          Add and edit students and faculty. Admin accounts cannot be created from this panel.
        </p>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => {
            setFormError('');
            setShowCreateForm((current) => !current);
            setEditingUser(null);
          }}
        >
          {showCreateForm ? 'Close form' : 'Add user'}
        </button>
      </div>

      <div className="auth-persona-tabs mb-3" role="tablist" aria-label="User type">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === USER_ROLES.STUDENT}
          className={`auth-persona-tabs__btn auth-persona-tabs__btn--student${
            activeTab === USER_ROLES.STUDENT ? ' auth-persona-tabs__btn--active' : ''
          }`}
          onClick={() => {
            setActiveTab(USER_ROLES.STUDENT);
            setEditingUser(null);
          }}
        >
          Students
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === USER_ROLES.FACULTY}
          className={`auth-persona-tabs__btn auth-persona-tabs__btn--faculty${
            activeTab === USER_ROLES.FACULTY ? ' auth-persona-tabs__btn--active' : ''
          }`}
          onClick={() => {
            setActiveTab(USER_ROLES.FACULTY);
            setEditingUser(null);
          }}
        >
          Faculty
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreate} className="role-panel__form mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label" htmlFor="create-role">
                Role
              </label>
              <select
                id="create-role"
                className="form-select"
                value={createForm.role}
                onChange={(event) => updateCreateField('role', event.target.value)}
              >
                <option value={USER_ROLES.STUDENT}>Student</option>
                <option value={USER_ROLES.FACULTY}>Faculty</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="create-name">
                Full name
              </label>
              <input
                id="create-name"
                className="form-control"
                value={createForm.fullName}
                onChange={(event) => updateCreateField('fullName', event.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="create-email">
                Email
              </label>
              <input
                id="create-email"
                type="email"
                className="form-control"
                value={createForm.email}
                onChange={(event) => updateCreateField('email', event.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="create-password">
                Password
              </label>
              <input
                id="create-password"
                type="password"
                className="form-control"
                value={createForm.password}
                onChange={(event) => updateCreateField('password', event.target.value)}
                minLength={8}
                required
              />
            </div>
            {createForm.role === USER_ROLES.STUDENT ? (
              <>
                <div className="col-md-4">
                  <label className="form-label" htmlFor="create-track">
                    Academic track
                  </label>
                  <select
                    id="create-track"
                    className="form-select"
                    value={createForm.academicTrack}
                    onChange={(event) => updateCreateField('academicTrack', event.target.value)}
                  >
                    {STUDENT_TRACKS.map((track) => (
                      <option key={track} value={track}>
                        {track}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label" htmlFor="create-year">
                    Graduation year
                  </label>
                  <input
                    id="create-year"
                    className="form-control"
                    value={createForm.graduationYear}
                    onChange={(event) => updateCreateField('graduationYear', event.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="col-md-4">
                  <label className="form-label" htmlFor="create-department">
                    Department
                  </label>
                  <select
                    id="create-department"
                    className="form-select"
                    value={createForm.department}
                    onChange={(event) => updateCreateField('department', event.target.value)}
                  >
                    {FACULTY_DEPARTMENTS.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label" htmlFor="create-employee-id">
                    Employee ID
                  </label>
                  <input
                    id="create-employee-id"
                    className="form-control"
                    value={createForm.employeeId}
                    onChange={(event) => updateCreateField('employeeId', event.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          {formError && showCreateForm && (
            <p className="text-danger small mt-3 mb-0" role="alert">
              {formError}
            </p>
          )}
          <button type="submit" className="btn btn-primary btn-sm mt-3" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create user'}
          </button>
        </form>
      )}

      {loading && <p className="role-panel__desc mb-0">Loading users...</p>}
      {error && (
        <p className="text-danger small" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && (
        <ManagedUsersTable
          key={activeTab}
          tableId={`admin-users-${activeTab}`}
          users={visibleUsers}
          columns={tableConfig.columns}
          searchableFields={tableConfig.searchableFields}
          entityLabel={tableConfig.entityLabel}
          searchIdPrefix={`admin-${activeTab}`}
          emptyMessage={tableConfig.emptyMessage}
          renderRow={(managedUser) => (
            <tr key={managedUser.id}>
              <td>{managedUser.fullName}</td>
              <td>{managedUser.email}</td>
              <td>
                {activeTab === USER_ROLES.STUDENT
                  ? managedUser.academicTrack || '—'
                  : managedUser.department || '—'}
              </td>
              <td>
                {activeTab === USER_ROLES.STUDENT
                  ? managedUser.graduationYear || '—'
                  : managedUser.employeeId || '—'}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-link btn-sm p-0 me-2"
                  onClick={() => {
                    setFormError('');
                    setEditingUser(managedUser);
                    setShowCreateForm(false);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-link btn-sm p-0 text-danger"
                  onClick={() => handleDelete(managedUser)}
                  disabled={submitting}
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        />
      )}

      {editingUser && activeTab === USER_ROLES.STUDENT && (
        <EditFormModal
          open
          title={editingUser.fullName}
          subtitle="Edit student"
          onClose={() => setEditingUser(null)}
        >
          <StudentManageForm
            mode="edit"
            user={editingUser}
            formId={`admin-edit-${editingUser.id}`}
            onSubmit={handleStudentUpdate}
            onCancel={() => setEditingUser(null)}
            submitting={submitting}
            error={formError}
          />
        </EditFormModal>
      )}

      {editingUser && activeTab === USER_ROLES.FACULTY && (
        <EditFormModal
          open
          title={editingUser.fullName}
          subtitle="Edit faculty"
          onClose={() => setEditingUser(null)}
        >
          <form onSubmit={handleFacultyUpdate} className="role-panel__form">
            <div className="mb-3">
              <label className="form-label" htmlFor="edit-faculty-name">
                Full name
              </label>
              <input
                id="edit-faculty-name"
                name="fullName"
                className="form-control"
                defaultValue={editingUser.fullName}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="edit-faculty-email">
                Email
              </label>
              <input
                id="edit-faculty-email"
                name="email"
                type="email"
                className="form-control"
                defaultValue={editingUser.email}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="edit-faculty-department">
                Department
              </label>
              <select
                id="edit-faculty-department"
                name="department"
                className="form-select"
                defaultValue={editingUser.department || FACULTY_DEPARTMENTS[0]}
              >
                {FACULTY_DEPARTMENTS.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="edit-faculty-employee-id">
                Employee ID
              </label>
              <input
                id="edit-faculty-employee-id"
                name="employeeId"
                className="form-control"
                defaultValue={editingUser.employeeId || ''}
              />
            </div>
            {formError && (
              <p className="text-danger small" role="alert">
                {formError}
              </p>
            )}
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save changes'}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setEditingUser(null)}
                disabled={submitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </EditFormModal>
      )}
      </article>
  );
}

export default AdminUserPanel;
