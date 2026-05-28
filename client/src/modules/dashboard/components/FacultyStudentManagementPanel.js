import { useState } from 'react';
import { createManagedUser, updateManagedUser } from '../../../shared/api/usersApi';
import { USER_ROLES } from '../../../shared/constants/roles';
import StudentManageForm from './StudentManageForm';
import ManagedUsersTable from './ManagedUsersTable';
import { FACULTY_STUDENT_COLUMNS, FACULTY_STUDENT_SEARCH_FIELDS } from '../data/tableColumns';
import { getColumnValue } from '../../../shared/utils/tableFilterUtils';

function FacultyStudentManagementPanel({ students, loading, error, reload }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const editingStudent = students.find((student) => student.id === editingId);

  const handleCreate = async (payload) => {
    setSubmitting(true);
    setFormError('');

    try {
      await createManagedUser({ ...payload, role: USER_ROLES.STUDENT });
      setShowCreateForm(false);
      await reload();
    } catch (err) {
      setFormError(err.message || 'Unable to add student.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async (payload) => {
    setSubmitting(true);
    setFormError('');

    try {
      await updateManagedUser(editingId, payload);
      setEditingId(null);
      await reload();
    } catch (err) {
      setFormError(err.message || 'Unable to update student profile.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className="eduhive-card role-panel">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div>
          <h3 className="stat-card__title mb-1">Student Management</h3>
          <p className="role-panel__desc mb-0">
            Add and edit student profiles. Faculty cannot create faculty or admin accounts.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => {
            setFormError('');
            setShowCreateForm((current) => !current);
            setEditingId(null);
          }}
        >
          {showCreateForm ? 'Close form' : 'Add student'}
        </button>
      </div>

      {showCreateForm && (
        <div className="role-panel__editor mb-4">
          <h4 className="h6 mb-3">New student account</h4>
          <StudentManageForm
            mode="create"
            formId="faculty-create-student"
            onSubmit={handleCreate}
            onCancel={() => setShowCreateForm(false)}
            submitting={submitting}
            error={formError}
          />
        </div>
      )}

      {loading && <p className="role-panel__desc mb-0">Loading students...</p>}
      {error && (
        <p className="text-danger small" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && (
        <ManagedUsersTable
          tableId="faculty-students-table"
          users={students}
          columns={FACULTY_STUDENT_COLUMNS}
          searchableFields={FACULTY_STUDENT_SEARCH_FIELDS}
          entityLabel="students"
          searchIdPrefix="faculty-students"
          emptyMessage="No students registered yet."
          renderRow={(student) => (
            <tr key={student.id}>
              <td>{student.fullName}</td>
              <td>{student.email}</td>
              <td>{student.academicTrack || '—'}</td>
              <td>{student.graduationYear || '—'}</td>
              <td>{getColumnValue(student, FACULTY_STUDENT_COLUMNS[4]) || '—'}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-link btn-sm p-0"
                  onClick={() => {
                    setFormError('');
                    setEditingId(student.id);
                    setShowCreateForm(false);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          )}
        />
      )}

      {editingStudent && (
        <div className="role-panel__editor mt-4">
          <h4 className="h6 mb-3">Edit {editingStudent.fullName}</h4>
          <StudentManageForm
            mode="edit"
            user={editingStudent}
            formId={`faculty-edit-${editingStudent.id}`}
            onSubmit={handleSave}
            onCancel={() => setEditingId(null)}
            submitting={submitting}
            error={formError}
          />
        </div>
      )}
    </article>
  );
}

export default FacultyStudentManagementPanel;
