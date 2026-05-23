import { SITE_NAME } from '../constants';

function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="container text-center">
        <p className="home-footer__brand font-display">{SITE_NAME}</p>
        <small className="home-footer__copy font-body">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Crafted with Superdesign.
        </small>
      </div>
    </footer>
  );
}

export default HomeFooter;
