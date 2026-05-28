import { useState } from 'react';
import { validateContactForm } from '../../contact/utils/validateContactForm';
import ContactFormFields from '../../contact/components/ContactFormFields';

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

      <ContactFormFields
        form={form}
        errors={fieldErrors}
        updateField={updateField}
        idPrefix={formId}
        messageRows={4}
        showLocationPlaceholder={false}
      />

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
