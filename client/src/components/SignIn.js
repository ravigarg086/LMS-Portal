function SignIn() {
  return (
    <section id="sign-in" className="page-section py-5">
      <div className="container-fluid px-3 px-md-4 px-xl-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <span className="mono-label">Account</span>
            <h2 className="heading-tight mb-3">Sign In</h2>
            <div className="glass-card p-4 p-md-5">
              <form>
                <div className="mb-3">
                  <label className="contact__label form-label" htmlFor="signin-email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control contact__input"
                    id="signin-email"
                    placeholder="you@company.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="contact__label form-label" htmlFor="signin-password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control contact__input"
                    id="signin-password"
                    placeholder="••••••••"
                  />
                </div>
                <button type="button" className="btn-neon w-100">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
