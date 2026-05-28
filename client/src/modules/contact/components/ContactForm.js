import { useContactForm } from '../hooks/useContactForm';
import ContactFormFields from './ContactFormFields';

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
        <ContactFormFields form={form} errors={errors} updateField={updateField} idPrefix="contact" />

        <div className="row g-3">
          <div className="col-12">
            <div className="d-grid d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-primary contact-form__submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
