import { useState } from 'react';
import { STUDENT_TRACKS } from '../../../shared/constants/roles';

const EMPTY_STUDENT = {
  fullName: '',
  email: '',
  password: '',
  academicTrack: STUDENT_TRACKS[0],
  graduationYear: '',
};

function StudentManageForm({
  mode = 'edit',
  user,
  onSubmit,
  onCancel,
  submitting,
  error,
  formId = 'student-manage',
}) {
  const [form, setForm] = useState(
    mode === 'create'
      ? EMPTY_STUDENT
      : {
          fullName: user?.fullName || '',
          email: user?.email || '',
          academicTrack: user?.academicTrack || STUDENT_TRACKS[0],
          graduationYear: user?.graduationYear || '',
        },
  );

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="role-panel__form">
      <div className="mb-3">
        <label className="form-label" htmlFor={`${formId}-name`}>
          Full name
        </label>
        <input
          id={`${formId}-name`}
          className="form-control"
          value={form.fullName}
          onChange={(event) => updateField('fullName', event.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor={`${formId}-email`}>
          Email
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          className="form-control"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          required
        />
      </div>
      {mode === 'create' && (
        <div className="mb-3">
          <label className="form-label" htmlFor={`${formId}-password`}>
            Password
          </label>
          <input
            id={`${formId}-password`}
            type="password"
            className="form-control"
            value={form.password}
            onChange={(event) => updateField('password', event.target.value)}
            minLength={8}
            required
          />
        </div>
      )}
      <div className="mb-3">
        <label className="form-label" htmlFor={`${formId}-track`}>
          Academic track
        </label>
        <select
          id={`${formId}-track`}
          className="form-select"
          value={form.academicTrack}
          onChange={(event) => updateField('academicTrack', event.target.value)}
          required
        >
          <option value="">Select track</option>
          {STUDENT_TRACKS.map((track) => (
            <option key={track} value={track}>
              {track}
            </option>
          ))}
          {form.academicTrack && !STUDENT_TRACKS.includes(form.academicTrack) && (
            <option value={form.academicTrack}>{form.academicTrack}</option>
          )}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor={`${formId}-year`}>
          Graduation year
        </label>
        <input
          id={`${formId}-year`}
          className="form-control"
          value={form.graduationYear}
          onChange={(event) => updateField('graduationYear', event.target.value)}
        />
      </div>
      {error && (
        <p className="text-danger small" role="alert">
          {error}
        </p>
      )}
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
          {submitting ? 'Saving...' : mode === 'create' ? 'Add student' : 'Save changes'}
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default StudentManageForm;
