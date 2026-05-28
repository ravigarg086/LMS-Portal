import { CONTACT_DESIGNATIONS } from '../data/contactInfo';

function ContactFormFields({
  form,
  errors,
  updateField,
  idPrefix = 'contact',
  messageRows = 5,
  showLocationPlaceholder = true,
}) {
  return (
    <div className="row g-3">
      <div className="col-12 col-md-6">
        <label htmlFor={`${idPrefix}-full-name`} className="form-label">
          Full Name
        </label>
        <input
          id={`${idPrefix}-full-name`}
          type="text"
          className={`form-control${errors.fullName ? ' is-invalid' : ''}`}
          value={form.fullName}
          onChange={(event) => updateField('fullName', event.target.value)}
          autoComplete="name"
        />
        {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
      </div>

      <div className="col-12 col-md-6">
        <label htmlFor={`${idPrefix}-email`} className="form-label">
          Email
        </label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          className={`form-control${errors.email ? ' is-invalid' : ''}`}
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          autoComplete="email"
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="col-12 col-sm-6 col-lg-4">
        <label htmlFor={`${idPrefix}-designation`} className="form-label">
          Designation
        </label>
        <select
          id={`${idPrefix}-designation`}
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

      <div className="col-12 col-sm-6 col-lg-4">
        <label htmlFor={`${idPrefix}-location`} className="form-label">
          Location
        </label>
        <input
          id={`${idPrefix}-location`}
          type="text"
          className={`form-control${errors.location ? ' is-invalid' : ''}`}
          value={form.location}
          onChange={(event) => updateField('location', event.target.value)}
          placeholder={showLocationPlaceholder ? 'City, State or Campus' : undefined}
          autoComplete="address-level2"
        />
        {errors.location && <div className="invalid-feedback">{errors.location}</div>}
      </div>

      <div className="col-12 col-lg-4">
        <label htmlFor={`${idPrefix}-phone`} className="form-label">
          Phone Number
        </label>
        <input
          id={`${idPrefix}-phone`}
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
        <label htmlFor={`${idPrefix}-subject`} className="form-label">
          Subject
        </label>
        <input
          id={`${idPrefix}-subject`}
          type="text"
          className={`form-control${errors.subject ? ' is-invalid' : ''}`}
          value={form.subject}
          onChange={(event) => updateField('subject', event.target.value)}
        />
        {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
      </div>

      <div className="col-12">
        <label htmlFor={`${idPrefix}-message`} className="form-label">
          Message
        </label>
        <textarea
          id={`${idPrefix}-message`}
          rows={messageRows}
          className={`form-control${errors.message ? ' is-invalid' : ''}`}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
        />
        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
      </div>
    </div>
  );
}

export default ContactFormFields;
