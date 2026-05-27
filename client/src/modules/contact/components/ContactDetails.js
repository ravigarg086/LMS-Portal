import { CONTACT_INFO } from '../data/contactInfo';

function ContactDetails() {
  return (
    <section className="contact-details eduhive-card role-panel" aria-labelledby="contact-details-heading">
      <span className="st-label">Reach Us</span>
      <h2 id="contact-details-heading" className="contact-details__title">
        Contact Details
      </h2>

      <dl className="contact-details__list mb-0">
        <div className="contact-details__item">
          <dt>Campus</dt>
          <dd>{CONTACT_INFO.organization}</dd>
        </div>
        <div className="contact-details__item">
          <dt>Address</dt>
          <dd>
            {CONTACT_INFO.addressLine1}
            <br />
            {CONTACT_INFO.addressLine2}
          </dd>
        </div>
        <div className="contact-details__item">
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${CONTACT_INFO.phone.replace(/[^\d+]/g, '')}`}>{CONTACT_INFO.phone}</a>
          </dd>
        </div>
        <div className="contact-details__item">
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
          </dd>
        </div>
        <div className="contact-details__item">
          <dt>Office Hours</dt>
          <dd>{CONTACT_INFO.hours}</dd>
        </div>
      </dl>
    </section>
  );
}

export default ContactDetails;
