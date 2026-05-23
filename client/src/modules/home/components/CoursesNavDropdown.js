import { useState, useCallback } from 'react';
import { courseStackKeys, courseStacks } from '../data/courseStacks';
import { SECTION_IDS } from '../constants';

function CoursesNavDropdown({ onNavigate }) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [activeStack, setActiveStack] = useState(null);

  const closeMenus = useCallback(() => {
    setCoursesOpen(false);
    setActiveStack(null);
  }, []);

  const handleLinkClick = () => {
    closeMenus();
    onNavigate?.();
  };

  return (
    <li
      className={`nav-item dropdown courses-nav-dropdown ${coursesOpen ? 'show' : ''}`}
      onMouseEnter={() => setCoursesOpen(true)}
      onMouseLeave={closeMenus}
    >
      <a
        className="nav-link dropdown-toggle"
        href={`#${SECTION_IDS.course}`}
        role="button"
        aria-expanded={coursesOpen}
        aria-haspopup="true"
        id="coursesNavDropdown"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        onClick={(event) => event.preventDefault()}
      >
        Course
      </a>

      <ul
        className={`dropdown-menu courses-nav-dropdown__menu ${coursesOpen ? 'show' : ''}`}
        aria-labelledby="coursesNavDropdown"
      >
        {courseStackKeys.map((stack) => (
          <li
            key={stack}
            className={`dropdown-submenu ${activeStack === stack ? 'show' : ''}`}
            onMouseEnter={() => setActiveStack(stack)}
            onMouseLeave={() => setActiveStack(null)}
          >
            <a
              className="dropdown-item dropdown-toggle courses-nav-dropdown__stack"
              href={`#${SECTION_IDS.course}?stack=${stack.toLowerCase()}`}
              role="button"
              aria-expanded={activeStack === stack}
              onClick={(event) => event.preventDefault()}
            >
              {stack}
            </a>

            <ul
              className={`dropdown-menu courses-nav-dropdown__submenu ${
                activeStack === stack ? 'show' : ''
              }`}
            >
              {courseStacks[stack].map((course) => (
                <li key={course.label}>
                  <a className="dropdown-item" href={course.href} onClick={handleLinkClick}>
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

export default CoursesNavDropdown;
