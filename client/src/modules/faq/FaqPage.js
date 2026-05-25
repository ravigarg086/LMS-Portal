import FaqSection from '../home/components/FaqSection';
import RevealUp from '../home/components/RevealUp';
import DashboardShell from '../../shared/layout/DashboardShell';

function FaqPage() {
  return (
    <DashboardShell activeId="faq" pageClassName="faq-page" mainClassName="faq-page__main">
      <RevealUp>
        <FaqSection />
      </RevealUp>
    </DashboardShell>
  );
}

export default FaqPage;
