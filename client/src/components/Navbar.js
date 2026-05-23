import { useState, useCallback } from 'react';
import { mainNavItems, techStacks } from '../data/navMenu';

const STACK_KEYS = Object.keys(techStacks);

function Navbar() {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [activeStack, setActiveStack] = useState(null);

  const closeCoursesMenu = useCallback(() => {
    setCoursesOpen(false);
    setActiveStack(null);
  }, []);

  const handleCoursesEnter = () => setCoursesOpen(true);
  const handleCoursesLeave = () => closeCoursesMenu();

  const handleStackEnter = (stack) => setActiveStack(stack);
  const handleStackLeave = () => setActiveStack(null);

  return (
    <nav className="navbar navbar-expand-lg site-nav" aria-label="Main navigation">
      <div className="container-fluid px-3 px-md-4 px-xl-5">
        <a className="navbar-brand site-nav__logo p-0" href="#home">
          <span className="site-nav__logo-mark">L</span>
          <span className="ms-2 d-none d-sm-inline">LearnHub</span>
        </a>

        <button
          className="navbar-toggler site-nav__toggler ms-auto ms-lg-0 order-lg-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse order-lg-1" id="navbarMain">
          <ul className="navbar-nav mx-lg-auto site-nav__pill-list py-3 py-lg-0 align-items-lg-center">
            {mainNavItems.map((item) => {
              if (item.type === 'courses') {
                return (
                  <li
                    key={item.label}
                    className={`nav-item dropdown nav-hover-dropdown ${coursesOpen ? 'show' : ''}`}
                    onMouseEnter={handleCoursesEnter}
                    onMouseLeave={handleCoursesLeave}
                  >
                    <a
                      className="nav-link site-nav__link dropdown-toggle px-3"
                      href="#courses"
                      role="button"
                      aria-expanded={coursesOpen}
                      onClick={(e) => e.preventDefault()}
                    >
                      {item.label}
                    </a>
                    <ul
                      className={`dropdown-menu nav-dropdown-menu ${coursesOpen ? 'show' : ''}`}
                    >
                      {STACK_KEYS.map((stack) => (
                        <li
                          key={stack}
                          className={`dropdown-submenu nav-hover-dropdown ${
                            activeStack === stack ? 'show' : ''
                          }`}
                          onMouseEnter={() => handleStackEnter(stack)}
                          onMouseLeave={handleStackLeave}
                        >
                          <a
                            className="dropdown-item nav-dropdown-item"
                            href={`#courses-${stack.toLowerCase()}`}
                            onClick={(e) => e.preventDefault()}
                          >
                            {stack}
                            <span className="nav-submenu-caret" aria-hidden="true">
                              ›
                            </span>
                          </a>
                          <ul
                            className={`dropdown-menu nav-dropdown-menu nav-dropdown-submenu ${
                              activeStack === stack ? 'show' : ''
                            }`}
                          >
                            {techStacks[stack].map((course) => (
                              <li key={course.label}>
                                <a className="dropdown-item nav-dropdown-item" href={course.href}>
                                  {course.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li className="nav-item" key={item.label}>
                  <a className="nav-link site-nav__link px-3" href={item.href}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="d-flex align-items-center gap-3 pb-3 pb-lg-0 ps-lg-2">
            <div className="system-status d-none d-md-flex">
              <span className="system-status__dot" aria-hidden="true" />
              <span>System Online</span>
            </div>
            <a href="#registration" className="btn-ghost-round flex-shrink-0 d-none d-md-inline-flex" aria-label="Quick register">
              →
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
