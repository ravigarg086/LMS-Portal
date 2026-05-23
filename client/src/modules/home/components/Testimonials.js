import { testimonials } from '../data/testimonials';
import { SECTION_IDS } from '../constants';

function Testimonials() {
  return (
    <section id={SECTION_IDS.testimonials} className="testimonials page-section">
      <div className="testimonials__glow" aria-hidden="true" />
      <div className="container">
        <header className="testimonials__header text-center mb-5">
          <p className="testimonials__eyebrow font-display">Community</p>
          <h2 className="testimonials__title font-serif">Loved by learners worldwide</h2>
        </header>

        <div className="testimonials__masonry">
          {testimonials.map((item) => (
            <article key={item.id} className="testimonial-card glass-strong">
              <p className="testimonial-card__quote font-body">&ldquo;{item.quote}&rdquo;</p>
              <div className="testimonial-card__profile">
                <span className="testimonial-card__avatar" aria-hidden="true">
                  {item.initials}
                </span>
                <div>
                  <p className="testimonial-card__name font-display">{item.name}</p>
                  <p className="testimonial-card__handle font-body">{item.handle}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
