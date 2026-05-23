import { SITE_NAME } from '../constants';

function HomeFooter() {
  return (
    <footer className="home-footer mt-auto py-3 bg-dark text-white text-center">
      <div className="container">
        <small>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</small>
      </div>
    </footer>
  );
}

export default HomeFooter;
