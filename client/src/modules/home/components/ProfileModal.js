import { useEffect, useRef, useState } from 'react';
import { USER_ROLES, ROLE_LABELS } from '../../../shared/constants/roles';
import { STUDENT_TRACKS, FACULTY_DEPARTMENTS } from '../../../shared/constants/roles';
import { useAuth } from '../../../shared/auth/AuthContext';
import { validateProfileForm } from '../../../shared/utils/validation';
import { getUserAvatarUrl } from '../../../shared/utils/userAvatar';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

const MAX_IMAGE_BYTES = 500000;

function buildFormState(user) {
  return {
    fullName: user?.fullName || '',
    email: user?.email || '',
    academicTrack: user?.academicTrack || '',
    graduationYear: user?.graduationYear || '',
    department: user?.department || '',
    employeeId: user?.employeeId || '',
    profilePictureUrl: user?.profilePictureUrl || '',
  };
}

function ProfileModal({ open, onClose, user }) {
  const { updateProfile } = useAuth();
  const dialogRef = useRef(null);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(buildFormState(user));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    setForm(buildFormState(user));
    setErrors({});
    setStatus('');
    setSuccess(false);
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, user]);

  if (!open || !user) {
    return null;
  }

  const previewUrl = form.profilePictureUrl || getUserAvatarUrl(user);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setStatus('');
    setSuccess(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrors((current) => ({ ...current, profilePictureUrl: 'Please choose an image file.' }));
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setErrors((current) => ({
        ...current,
        profilePictureUrl: 'Profile picture must be under 500 KB.',
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateField('profilePictureUrl', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUseDefaultAvatar = () => {
    updateField('profilePictureUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateProfileForm(form, user.role);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setStatus('');
    setSuccess(false);

    try {
      await updateProfile(form);
      onClose();
    } catch (err) {
      setStatus(err.message || 'Unable to update profile.');
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="account-modal" role="presentation">
      <button
        type="button"
        className="account-modal__backdrop"
        aria-label="Close profile dialog"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="account-modal__panel eduhive-card account-modal__panel--wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        tabIndex={-1}
      >
        <div className="account-modal__header">
          <div>
            <span className="st-label">My Account</span>
            <h2 id="profile-modal-title" className="account-modal__title">
              Profile
            </h2>
          </div>
          <button type="button" className="account-modal__close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="account-modal__form" onSubmit={handleSubmit} noValidate>
          <div className="profile-modal__avatar-row">
            <img src={previewUrl} alt="" className="profile-modal__avatar" />
            <div className="profile-modal__avatar-actions">
              <input
                ref={fileInputRef}
                id="profile-picture-input"
                type="file"
                accept="image/*"
                className="visually-hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="profile-picture-input" className="btn btn-outline-secondary btn-sm mb-2">
                Upload photo
              </label>
              <button
                type="button"
                className="btn btn-link btn-sm p-0"
                onClick={handleUseDefaultAvatar}
              >
                Use default avatar
              </button>
              {errors.profilePictureUrl && (
                <p className="text-danger small mb-0 mt-2">{errors.profilePictureUrl}</p>
              )}
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="profile-full-name">
                Full name
              </label>
              <input
                id="profile-full-name"
                type="text"
                className={`form-control${errors.fullName ? ' is-invalid' : ''}`}
                value={form.fullName}
                onChange={(event) => updateField('fullName', event.target.value)}
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="profile-email">
                Email
              </label>
              <input
                id="profile-email"
                type="email"
                className={`form-control${errors.email ? ' is-invalid' : ''}`}
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="profile-role">
                Role
              </label>
              <input
                id="profile-role"
                type="text"
                className="form-control"
                value={ROLE_LABELS[user.role] || user.role}
                disabled
                readOnly
              />
            </div>

            {user.role === USER_ROLES.STUDENT && (
              <>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="profile-track">
                    Academic track
                  </label>
                  <select
                    id="profile-track"
                    className={`form-select${errors.academicTrack ? ' is-invalid' : ''}`}
                    value={form.academicTrack}
                    onChange={(event) => updateField('academicTrack', event.target.value)}
                  >
                    <option value="">Select track</option>
                    {STUDENT_TRACKS.map((track) => (
                      <option key={track} value={track}>
                        {track}
                      </option>
                    ))}
                  </select>
                  {errors.academicTrack && (
                    <div className="invalid-feedback">{errors.academicTrack}</div>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="profile-graduation">
                    Graduation year
                  </label>
                  <input
                    id="profile-graduation"
                    type="text"
                    className={`form-control${errors.graduationYear ? ' is-invalid' : ''}`}
                    value={form.graduationYear}
                    onChange={(event) => updateField('graduationYear', event.target.value)}
                  />
                  {errors.graduationYear && (
                    <div className="invalid-feedback">{errors.graduationYear}</div>
                  )}
                </div>
              </>
            )}

            {user.role === USER_ROLES.FACULTY && (
              <>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="profile-department">
                    Department
                  </label>
                  <select
                    id="profile-department"
                    className={`form-select${errors.department ? ' is-invalid' : ''}`}
                    value={form.department}
                    onChange={(event) => updateField('department', event.target.value)}
                  >
                    <option value="">Select department</option>
                    {FACULTY_DEPARTMENTS.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <div className="invalid-feedback">{errors.department}</div>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="profile-employee-id">
                    Employee ID
                  </label>
                  <input
                    id="profile-employee-id"
                    type="text"
                    className={`form-control${errors.employeeId ? ' is-invalid' : ''}`}
                    value={form.employeeId}
                    onChange={(event) => updateField('employeeId', event.target.value)}
                  />
                  {errors.employeeId && (
                    <div className="invalid-feedback">{errors.employeeId}</div>
                  )}
                </div>
              </>
            )}

            {user.role === USER_ROLES.ADMIN && user.accessLevel && (
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="profile-access">
                  Access level
                </label>
                <input
                  id="profile-access"
                  type="text"
                  className="form-control"
                  value={user.accessLevel}
                  disabled
                  readOnly
                />
              </div>
            )}
          </div>

          {status && (
            <p
              className={`account-modal__status${success ? ' account-modal__status--success' : ''}`}
              role="status"
            >
              {status}
            </p>
          )}

          <div className="account-modal__actions">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;
