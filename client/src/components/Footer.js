function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__watermark" aria-hidden="true">
        SUPER
      </div>

      <div className="container-fluid px-3 px-md-4 px-xl-5">
        <div className="site-footer__cta text-center py-4 py-lg-5">
          <h2 className="heading-tight px-2">Ready to transform learning?</h2>
          <a href="#contact" className="btn-cta-footer">
            <span>Start Free Trial</span>
          </a>
        </div>

        <div className="row g-4 site-footer__grid pt-4">
          <div className="col-12 col-md-4">
            <h6>Platform</h6>
            <ul className="site-footer__links list-unstyled mb-0">
              <li><a href="#home">Home</a></li>
              <li><a href="#registration">Registration</a></li>
              <li><a href="#courses">All Courses</a></li>
              <li><a href="#third-party-data">3rd Party Data</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#sign-in">Sign In</a></li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h6>Legal</h6>
            <ul className="site-footer__links list-unstyled mb-3 mb-md-0">
              <li><a href="#contact">Privacy Policy</a></li>
              <li><a href="#contact">Terms of Service</a></li>
              <li><a href="#contact">Cookie Policy</a></li>
            </ul>
            <div className="site-footer__social">
              <a href="#contact" aria-label="LinkedIn">in</a>
              <a href="#contact" aria-label="Twitter">𝕏</a>
              <a href="#contact" aria-label="GitHub">gh</a>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <h6>System</h6>
            <p className="site-footer__copy">
              © {year} LearnHub LMS — All rights reserved
            </p>
            <p className="site-footer__copy mt-2">
              Build v2.4.0 · Node Runtime OK
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
