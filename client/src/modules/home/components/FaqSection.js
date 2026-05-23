import { useState } from 'react';
import { faqItems } from '../data/faqItems';
import { SECTION_IDS } from '../constants';

function FaqSection() {
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null);

  return (
    <section id={SECTION_IDS.faq} className="faq-eduhive" aria-labelledby="faq-section-title">
      <div className="faq-eduhive__inner">
        <header className="faq-eduhive__header text-center">
          <span className="ui-label">Help Center</span>
          <h2 id="faq-section-title" className="faq-eduhive__title">
            Frequently Asked Questions
          </h2>
        </header>

        <div className="faq-eduhive__list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;

            return (
              <article key={item.id} className={`faq-eduhive__item${isOpen ? ' faq-eduhive__item--open' : ''}`}>
                <button
                  type="button"
                  className="faq-eduhive__trigger"
                  id={`${item.id}-trigger`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <span className={`faq-eduhive__chevron${isOpen ? ' faq-eduhive__chevron--open' : ''}`} aria-hidden="true">
                    ›
                  </span>
                </button>
                <div
                  id={panelId}
                  className="faq-eduhive__panel"
                  role="region"
                  aria-labelledby={`${item.id}-trigger`}
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
