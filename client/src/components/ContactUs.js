import { useState } from 'react';

const initialForm = {
  name: '',
  designation: '',
  email: '',
  location: '',
};

function ContactUs() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.designation.trim()) next.designation = 'Designation is required';
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address';
    }
    if (!form.location.trim()) next.location = 'Location is required';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setSubmitted(true);
    setForm(initialForm);
    setErrors({});
  };

  const inputClass = (field) =>
    `form-control contact__input ${errors[field] ? 'is-invalid contact__input--error' : ''}`;

  return (
    <section id="contact" className="contact py-4 py-lg-5">
      <div className="container-fluid px-3 px-md-4 px-xl-5">
        <div className="row justify-content-center mb-4 mb-lg-5">
          <div className="col-12 col-lg-8 text-center">
            <span className="mono-label">Get In Touch</span>
            <h2 className="heading-tight">Contact Us</h2>
            <p className="mb-0 text-secondary-custom mx-auto" style={{ maxWidth: '36rem' }}>
              Questions about LearnHub LMS? Our team responds within one business day.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="contact__form-wrap glass">
              {submitted && (
                <div className="alert contact__alert d-flex justify-content-between align-items-start" role="alert">
                  <span>
                    Thank you! Your message has been received. We will contact you shortly.
                  </span>
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-3 flex-shrink-0"
                    aria-label="Dismiss"
                    onClick={() => setSubmitted(false)}
                  />
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="name" className="contact__label form-label">
                      Name *
                    </label>
                    <input
                      type="text"
                      className={inputClass('name')}
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback d-block contact__error">{errors.name}</div>
                    )}
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="designation" className="contact__label form-label">
                      Designation *
                    </label>
                    <input
                      type="text"
                      className={inputClass('designation')}
                      id="designation"
                      name="designation"
                      value={form.designation}
                      onChange={handleChange}
                      placeholder="e.g. Training Manager"
                    />
                    {errors.designation && (
                      <div className="invalid-feedback d-block contact__error">
                        {errors.designation}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label htmlFor="email" className="contact__label form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      className={inputClass('email')}
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block contact__error">{errors.email}</div>
                    )}
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="location" className="contact__label form-label">
                      Location *
                    </label>
                    <input
                      type="text"
                      className={inputClass('location')}
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                    {errors.location && (
                      <div className="invalid-feedback d-block contact__error">
                        {errors.location}
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn-neon w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
