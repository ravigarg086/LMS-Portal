import { useSearchParams } from 'react-router-dom';
import '../role-dashboard-shell.css';

export function isValidDashboardSection(sectionId, sections) {
  return sections.some((section) => section.id === sectionId);
}

function RoleDashboardShell({
  sections,
  defaultSection,
  ariaLabel,
  idPrefix,
  children,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = searchParams.get('section');
  const activeSection = isValidDashboardSection(sectionParam, sections)
    ? sectionParam
    : defaultSection;

  const handleSectionChange = (sectionId) => {
    if (sectionId === defaultSection) {
      setSearchParams({}, { replace: true });
      return;
    }

    setSearchParams({ section: sectionId }, { replace: true });
  };

  return (
    <div className="role-dashboard-shell">
      <nav
        className={`role-dashboard-tabs role-dashboard-tabs--${sections.length}`}
        role="tablist"
        aria-label={ariaLabel}
      >
        {sections.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${id}`}
            aria-selected={activeSection === id}
            aria-controls={`${idPrefix}-panel-${id}`}
            className={`role-dashboard-tabs__btn${
              activeSection === id ? ' role-dashboard-tabs__btn--active' : ''
            }`}
            onClick={() => handleSectionChange(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div
        className="role-dashboard-shell__panel"
        role="tabpanel"
        id={`${idPrefix}-panel-${activeSection}`}
        aria-labelledby={`${idPrefix}-tab-${activeSection}`}
      >
        {children(activeSection)}
      </div>
    </div>
  );
}

export default RoleDashboardShell;
