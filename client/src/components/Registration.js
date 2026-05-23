function Registration() {
  return (
    <section id="registration" className="page-section py-5">
      <div className="container-fluid px-3 px-md-4 px-xl-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <span className="mono-label">Enroll</span>
            <h2 className="heading-tight mb-3">Registration</h2>
            <p className="text-secondary-custom mb-4">
              Create your LearnHub account to access courses, track progress, and
              earn certificates. Registration integrates with our MERN backend (coming soon).
            </p>
            <div className="glass-card p-4 p-md-5">
              <form>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="contact__label form-label" htmlFor="reg-name">
                      Full Name
                    </label>
                    <input type="text" className="form-control contact__input" id="reg-name" placeholder="Your name" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="contact__label form-label" htmlFor="reg-email">
                      Email
                    </label>
                    <input type="email" className="form-control contact__input" id="reg-email" placeholder="you@email.com" />
                  </div>
                  <div className="col-12">
                    <button type="button" className="btn-neon w-100 w-md-auto">
                      Register Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;
