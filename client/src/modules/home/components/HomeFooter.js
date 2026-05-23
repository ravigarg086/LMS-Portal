import { SITE_NAME } from '../constants';

function HomeFooter() {
  return (
    <footer className="home-footer bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center gy-3">
          <div className="col-12 col-md-6 text-center text-md-start">
            <p className="mb-0 fw-semibold">{SITE_NAME}</p>
            <small className="text-white-50">
              &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </small>
          </div>
          <div className="col-12 col-md-6 text-center text-md-end">
            <small className="text-white-50">Built with React &amp; Bootstrap SPA</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
