import {
  ADMIN_ACCESS_LEVELS,
  FACULTY_DEPARTMENTS,
  STUDENT_TRACKS,
  USER_ROLES,
} from '../../../shared/constants/roles';

function RoleFields({ role, form, errors, onChange }) {
  if (role === USER_ROLES.STUDENT) {
    return (
      <>
        <div className="mb-3">
          <label htmlFor="reg-academic-track" className="form-label">
            Academic Track
          </label>
          <select
            id="reg-academic-track"
            className={`form-select${errors.academicTrack ? ' is-invalid' : ''}`}
            value={form.academicTrack}
            onChange={(event) => onChange('academicTrack', event.target.value)}
          >
            <option value="">Select degree program</option>
            {STUDENT_TRACKS.map((track) => (
              <option key={track} value={track}>
                {track}
              </option>
            ))}
          </select>
          {errors.academicTrack && <div className="invalid-feedback">{errors.academicTrack}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="reg-graduation-year" className="form-label">
            Expected Graduation Year
          </label>
          <input
            id="reg-graduation-year"
            type="text"
            className={`form-control${errors.graduationYear ? ' is-invalid' : ''}`}
            value={form.graduationYear}
            onChange={(event) => onChange('graduationYear', event.target.value)}
            placeholder="e.g. 2027"
          />
          {errors.graduationYear && <div className="invalid-feedback">{errors.graduationYear}</div>}
        </div>
      </>
    );
  }

  if (role === USER_ROLES.FACULTY) {
    return (
      <>
        <div className="mb-3">
          <label htmlFor="reg-department" className="form-label">
            Department / Faculty Affiliation
          </label>
          <select
            id="reg-department"
            className={`form-select${errors.department ? ' is-invalid' : ''}`}
            value={form.department}
            onChange={(event) => onChange('department', event.target.value)}
          >
            <option value="">Select department</option>
            {FACULTY_DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <div className="invalid-feedback">{errors.department}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="reg-employee-id" className="form-label">
            Employee ID / Verification Number
          </label>
          <input
            id="reg-employee-id"
            type="text"
            className={`form-control${errors.employeeId ? ' is-invalid' : ''}`}
            value={form.employeeId}
            onChange={(event) => onChange('employeeId', event.target.value)}
          />
          {errors.employeeId && <div className="invalid-feedback">{errors.employeeId}</div>}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-3">
        <label htmlFor="reg-access-level" className="form-label">
          Access Level Request
        </label>
        <select
          id="reg-access-level"
          className={`form-select${errors.accessLevel ? ' is-invalid' : ''}`}
          value={form.accessLevel}
          onChange={(event) => onChange('accessLevel', event.target.value)}
        >
          <option value="">Select access level</option>
          {ADMIN_ACCESS_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {errors.accessLevel && <div className="invalid-feedback">{errors.accessLevel}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="reg-invite-key" className="form-label">
          Master Access Token / System Invite Key
        </label>
        <input
          id="reg-invite-key"
          type="password"
          className={`form-control${errors.inviteKey ? ' is-invalid' : ''}`}
          value={form.inviteKey}
          onChange={(event) => onChange('inviteKey', event.target.value)}
          autoComplete="off"
        />
        {errors.inviteKey && <div className="invalid-feedback">{errors.inviteKey}</div>}
      </div>
    </>
  );
}

export default RoleFields;
