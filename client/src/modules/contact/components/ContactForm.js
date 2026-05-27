import { CONTACT_DESIGNATIONS } from '../data/contactInfo';
import { useContactForm } from '../hooks/useContactForm';

function ContactForm() {
  const { form, errors, submitError, successMessage, isSubmitting, updateField, handleSubmit } = useContactForm();

  return (
    <section className="contact-form-panel eduhive-card role-panel" aria-labelledby="contact-form-heading">
      <span className="st-label">Write To Us</span>
      <h2 id="contact-form-heading" className="contact-form-panel__title">
        Contact Form
      </h2>
      <p className="role-panel__desc">Send a message to the LMS Portal team. All fields are required.</p>

      {successMessage && (
        <div className="alert alert-success contact-form-panel__alert" role="status">
          {successMessage}
        </div>
      )}

      {submitError && (
        <div className="alert alert-danger contact-form-panel__alert" role="alert">
          {submitError}
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="contact-full-name" className="form-label">
              Full Name
            </label>
            <input
              id="contact-full-name"
              type="text"
              className={`form-control${errors.fullName ? ' is-invalid' : ''}`}
              value={form.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              autoComplete="name"
            />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="contact-email" className="form-label">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              className={`form-control${errors.email ? ' is-invalid' : ''}`}
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              autoComplete="email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="col-md-4">
            <label htmlFor="contact-designation" className="form-label">
              Designation
            </label>
            <select
              id="contact-designation"
              className={`form-select${errors.designation ? ' is-invalid' : ''}`}
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
            {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
          </div>

          <div className="col-md-4">
            <label htmlFor="contact-location" className="form-label">
              Location
            </label>
            <input
              id="contact-location"
              type="text"
              className={`form-control${errors.location ? ' is-invalid' : ''}`}
              value={form.location}
              onChange={(event) => updateField('location', event.target.value)}
              placeholder="City, State or Campus"
              autoComplete="address-level2"
            />
            {errors.location && <div className="invalid-feedback">{errors.location}</div>}
          </div>

          <div className="col-md-4">
            <label htmlFor="contact-phone" className="form-label">
              Phone Number
            </label>
            <input
              id="contact-phone"
              type="tel"
              className={`form-control${errors.phone ? ' is-invalid' : ''}`}
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              autoComplete="tel"
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="col-12">
            <label htmlFor="contact-subject" className="form-label">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              className={`form-control${errors.subject ? ' is-invalid' : ''}`}
              value={form.subject}
              onChange={(event) => updateField('subject', event.target.value)}
            />
            {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
          </div>

          <div className="col-12">
            <label htmlFor="contact-message" className="form-label">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              className={`form-control${errors.message ? ' is-invalid' : ''}`}
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
            />
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
