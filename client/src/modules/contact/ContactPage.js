import RevealUp from '../home/components/RevealUp';
import DashboardShell from '../../shared/layout/DashboardShell';
import ContactDetails from './components/ContactDetails';
import ContactForm from './components/ContactForm';
import ContactMap from './components/ContactMap';
import './contact.css';

function ContactPage() {
  return (
    <DashboardShell activeId="contact" pageClassName="contact-page" mainClassName="contact-page__main">
      <RevealUp>
        <div className="row g-4 contact-page__grid">
          <div className="col-lg-4">
            <ContactDetails />
          </div>
          <div className="col-lg-8">
            <ContactForm />
            <ContactMap />
          </div>
        </div>
      </RevealUp>
    </DashboardShell>
  );
}

export default ContactPage;
