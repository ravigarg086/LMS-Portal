import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonaTabs from '../../signin/components/PersonaTabs';
import RoleFields from './RoleFields';
import { useRegistrationDraft } from '../hooks/useRegistrationDraft';
import { useAuth } from '../../../shared/auth/AuthContext';
import { USER_ROLES } from '../../../shared/constants/roles';
import { validateRegistrationForm } from '../../../shared/utils/validation';

const ROLE_MESSAGES = {
  [USER_ROLES.STUDENT]: 'Create a student account to enroll in courses and track your progress.',
  [USER_ROLES.FACULTY]: 'Register as faculty to manage students and monitor class analytics.',
  [USER_ROLES.ADMIN]: 'Admin registration requires invite key: lms-admin-invite-2026',
};

function RegistrationForm() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { form, updateField, setRole, clearDraft } = useRegistrationDraft();
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const nextErrors = validateRegistrationForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(form);
      clearDraft();
      navigate('/signin', {
        replace: true,
        state: {
          registrationSuccess: true,
          role: form.role,
          email: form.email,
        },
      });
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      }
      setSubmitError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PersonaTabs role={form.role} onChange={setRole} />

      <div className={`auth-role-banner auth-role-banner--${form.role}`} role="status">
        {ROLE_MESSAGES[form.role]}
      </div>

      {submitError && (
        <div className="alert alert-danger auth-alert" role="alert">
          {submitError}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="reg-full-name" className="form-label">
            Full Name
          </label>
          <input
            id="reg-full-name"
            type="text"
            className={`form-control${errors.fullName ? ' is-invalid' : ''}`}
            value={form.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="reg-email" className="form-label">
            Email Address
          </label>
          <input
            id="reg-email"
            type="email"
            className={`form-control${errors.email ? ' is-invalid' : ''}`}
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            autoComplete="email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="reg-password" className="form-label">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            className={`form-control${errors.password ? ' is-invalid' : ''}`}
            value={form.password}
            onChange={(event) => updateField('password', event.target.value)}
            autoComplete="new-password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <RoleFields role={form.role} form={form} errors={errors} onChange={updateField} />

        <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : `Sign Up as ${form.role.charAt(0).toUpperCase()}${form.role.slice(1)}`}
        </button>
      </form>

      <Link to="/signin" className="auth-crosslink">
        Already have an account? Sign In
      </Link>
    </>
  );
}

export default RegistrationForm;
