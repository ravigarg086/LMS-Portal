import { useState } from 'react';
import { CONTACT_DESIGNATIONS } from '../../contact/data/contactInfo';
import { validateContactForm } from '../../contact/utils/validateContactForm';

function ContactMessageEditForm({ message, formId, onSubmit, onCancel, submitting, error }) {
  const [form, setForm] = useState({
    fullName: message.fullName || '',
    email: message.email || '',
    designation: message.designation || '',
    location: message.location || '',
    phone: message.phone || '',
    subject: message.subject || '',
    message: message.message || '',
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateContactForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length) {
      return;
    }

    await onSubmit(form);
  };

  return (
    <form id={formId} className="role-panel__form admin-contact-edit-form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label htmlFor={`${formId}-full-name`} className="form-label">
            Full Name
          </label>
          <input
            id={`${formId}-full-name`}
            type="text"
            className={`form-control${fieldErrors.fullName ? ' is-invalid' : ''}`}
            value={form.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
          />
          {fieldErrors.fullName && <div className="invalid-feedback">{fieldErrors.fullName}</div>}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor={`${formId}-email`} className="form-label">
            Email
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            className={`form-control${fieldErrors.email ? ' is-invalid' : ''}`}
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
          {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <label htmlFor={`${formId}-designation`} className="form-label">
            Designation
          </label>
          <select
            id={`${formId}-designation`}
            className={`form-select${fieldErrors.designation ? ' is-invalid' : ''}`}
            value={form.designation}
            onChange={(event) => updateField('designation', event.target.value)}
          >
            <option value="">Select designation</option>
            {CONTACT_DESIGNATIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldErrors.designation && <div className="invalid-feedback">{fieldErrors.designation}</div>}
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <label htmlFor={`${formId}-location`} className="form-label">
            Location
          </label>
          <input
            id={`${formId}-location`}
            type="text"
            className={`form-control${fieldErrors.location ? ' is-invalid' : ''}`}
            value={form.location}
            onChange={(event) => updateField('location', event.target.value)}
          />
          {fieldErrors.location && <div className="invalid-feedback">{fieldErrors.location}</div>}
        </div>

        <div className="col-12 col-lg-4">
          <label htmlFor={`${formId}-phone`} className="form-label">
            Phone
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            className={`form-control${fieldErrors.phone ? ' is-invalid' : ''}`}
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
          />
          {fieldErrors.phone && <div className="invalid-feedback">{fieldErrors.phone}</div>}
        </div>

        <div className="col-12">
          <label htmlFor={`${formId}-subject`} className="form-label">
            Subject
          </label>
          <input
            id={`${formId}-subject`}
            type="text"
            className={`form-control${fieldErrors.subject ? ' is-invalid' : ''}`}
            value={form.subject}
            onChange={(event) => updateField('subject', event.target.value)}
          />
          {fieldErrors.subject && <div className="invalid-feedback">{fieldErrors.subject}</div>}
        </div>

        <div className="col-12">
          <label htmlFor={`${formId}-message`} className="form-label">
            Message
          </label>
          <textarea
            id={`${formId}-message`}
            rows={4}
            className={`form-control${fieldErrors.message ? ' is-invalid' : ''}`}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
          />
          {fieldErrors.message && <div className="invalid-feedback">{fieldErrors.message}</div>}
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 mt-3">
        <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ContactMessageEditForm;
