import { useState } from 'react';
import { faqItems } from '../data/faqItems';
import { SECTION_IDS } from '../constants';

function FaqSection() {
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null);

  const toggleItem = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id={SECTION_IDS.faq} className="faq-section page-section">
      <div className="container faq-section__container">
        <header className="text-center mb-5">
          <p className="faq-section__eyebrow font-display">Support</p>
          <h2 className="faq-section__title font-serif">Frequently asked questions</h2>
        </header>

        <div className="faq-list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;

            return (
              <article key={item.id} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                <button
                  type="button"
                  className="faq-item__trigger font-body"
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(item.id)}
                >
                  <span>{item.question}</span>
                  <span className={`faq-item__chevron${isOpen ? ' faq-item__chevron--open' : ''}`} aria-hidden="true">
                    ›
                  </span>
                </button>
                <div className="faq-item__panel" aria-hidden={!isOpen}>
                  <p className="faq-item__answer font-body">{item.answer}</p>
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
