import { homeNavItems } from '../data/homeNavItems';

function HomeNavbar() {
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm"
        aria-label="Main navigation"
      >
        <div className="container">
          <a className="navbar-brand fw-semibold" href="#home">
            LMS Portal
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#homeNavbarCollapse"
            aria-controls="homeNavbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="homeNavbarCollapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              {homeNavItems.map((item) => (
                <li className="nav-item" key={item.label}>
                  <a className="nav-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HomeNavbar;
