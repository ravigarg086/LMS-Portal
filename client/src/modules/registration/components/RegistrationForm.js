import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonaTabs from '../../signin/components/PersonaTabs';
import RoleFields from './RoleFields';
import { useRegistrationDraft } from '../hooks/useRegistrationDraft';
import { useAuth } from '../../../shared/auth/AuthContext';
import { validateRegistrationForm } from '../../../shared/utils/validation';

function RegistrationForm() {
  const navigate = useNavigate();
  const { register, getDashboardRoute } = useAuth();
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
      const registeredUser = await register(form);
      clearDraft();
      navigate(getDashboardRoute(registeredUser.role), { replace: true });
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
          {isSubmitting ? 'Registering...' : 'Sign Up'}
        </button>
      </form>

      <Link to="/signin" className="auth-crosslink">
        Already have an account? Sign In
      </Link>
    </>
  );
}

export default RegistrationForm;
