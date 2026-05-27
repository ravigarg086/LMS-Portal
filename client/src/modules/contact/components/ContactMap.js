import { CONTACT_INFO } from '../data/contactInfo';

function ContactMap() {
  return (
    <section className="contact-map eduhive-card role-panel" aria-labelledby="contact-map-heading">
      <span className="st-label">Location</span>
      <h2 id="contact-map-heading" className="contact-map__title">
        Google Map
      </h2>
      <p className="role-panel__desc mb-3">Visit our Chicago learning center near Willis Tower.</p>
      <div className="ratio ratio-16x9 contact-map__frame-wrap">
        <iframe
          src={CONTACT_INFO.mapEmbedUrl}
          title={CONTACT_INFO.mapTitle}
          className="contact-map__frame"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}

export default ContactMap;
