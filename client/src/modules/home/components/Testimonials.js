import { testimonials } from '../data/testimonials';
import { SECTION_IDS } from '../constants';

function Testimonials() {
  return (
    <section id={SECTION_IDS.testimonials} className="testimonials-section py-5 page-section">
      <div className="container">
        <div className="row mb-4 mb-lg-5">
          <div className="col-12 text-center">
            <p className="text-uppercase text-primary fw-semibold small mb-2">Testimonials</p>
            <h2 className="h2 fw-bold mb-0">What our learners say</h2>
          </div>
        </div>

        <div className="row g-4">
          {testimonials.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-3 d-flex">
              <article className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <p className="card-text text-muted flex-grow-1">&ldquo;{item.quote}&rdquo;</p>
                  <div className="d-flex align-items-center gap-3 mt-3">
                    <span
                      className="rounded-circle bg-primary-subtle text-primary fw-bold d-inline-flex align-items-center justify-content-center"
                      style={{ width: 40, height: 40 }}
                      aria-hidden="true"
                    >
                      {item.initials}
                    </span>
                    <div>
                      <p className="mb-0 fw-semibold">{item.name}</p>
                      <p className="mb-0 small text-muted">{item.handle}</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
