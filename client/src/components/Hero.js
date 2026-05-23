function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container-fluid px-3 px-md-4 px-xl-5">
        <div className="row align-items-center g-4 g-xl-5 min-vh-75 py-4 py-lg-0">
          <div className="col-12 col-lg-7 order-2 order-lg-1">
            <span className="mono-label">AI-Powered Learning Engine</span>
            <h1 className="hero__title heading-tight">
              Learn
              <br />
              <span className="hero__title-accent">beyond</span>
              <br />
              limits.
            </h1>
            <p className="hero__desc">
              LearnHub LMS delivers adaptive paths, real-time analytics, and
              glass-clear progress tracking — built for institutions that move at
              the speed of innovation.
            </p>
            <div className="d-flex flex-column flex-sm-row flex-wrap gap-3">
              <a href="#courses" className="btn-neon">
                Explore Courses
              </a>
              <a href="#features" className="site-nav__link d-inline-flex align-items-center justify-content-center px-4 py-3">
                View Platform →
              </a>
            </div>
          </div>

          <div className="col-12 col-lg-5 order-1 order-lg-2">
            <div className="hero__mockup">
              <div className="hero__mockup-shell glass">
                <span className="hero__ai-cursor">AI Cursor</span>

                <div className="hero__float-card hero__float-card--top glass float-anim">
                  <h6 className="mb-1">Module Progress</h6>
                  <p className="mb-0">62% Complete</p>
                </div>

                <div className="hero__float-card hero__float-card--mid glass float-anim float-anim--delay">
                  <h6 className="mb-1">Live Analytics</h6>
                  <p className="mb-0">12K Active Learners</p>
                </div>

                <div className="hero__float-card hero__float-card--bottom glass float-anim">
                  <h6 className="mb-1">Next Lesson</h6>
                  <p className="mb-0">Async &amp; Promises</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
