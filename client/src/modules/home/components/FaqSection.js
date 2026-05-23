import { useState } from 'react';
import { faqItems } from '../data/faqItems';
import { SECTION_IDS } from '../constants';

function FaqSection() {
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null);

  return (
    <section id={SECTION_IDS.faq} className="faq-eduhive">
      <div className="faq-eduhive__inner">
        <header className="faq-eduhive__header text-center">
          <span className="ui-label">Help Center</span>
          <h2 className="faq-eduhive__title">Frequently Asked Questions</h2>
        </header>

        <div className="faq-eduhive__list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;

            return (
              <article key={item.id} className={`faq-eduhive__item${isOpen ? ' faq-eduhive__item--open' : ''}`}>
                <button
                  type="button"
                  className="faq-eduhive__trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <span className={`faq-eduhive__chevron${isOpen ? ' faq-eduhive__chevron--open' : ''}`}>›</span>
                </button>
                <div className="faq-eduhive__panel" aria-hidden={!isOpen}>
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
