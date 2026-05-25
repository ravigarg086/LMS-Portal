import { useExternalUsers } from '../hooks/useExternalUsers';
import { useExternalUserFilters } from '../hooks/useExternalUserFilters';
import { TABLE_COLUMNS } from '../data/tableColumns';

function ColumnFilterControl({ column, value, onChange, options, idPrefix = 'external-filter' }) {
  const inputId = `${idPrefix}-${column.key}`;

  if (column.filterType === 'select') {
    return (
      <select
        id={inputId}
        className="form-select form-select-sm external-data-filter-control"
        value={value}
        onChange={(event) => onChange(column.key, event.target.value)}
        aria-label={`Filter by ${column.label}`}
      >
        <option value="">All {column.label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={inputId}
      type="search"
      className="form-control form-control-sm external-data-filter-control"
      value={value}
      onChange={(event) => onChange(column.key, event.target.value)}
      placeholder={`Filter ${column.label}`}
      aria-label={`Filter by ${column.label}`}
    />
  );
}

function ExternalUsersTable() {
  const { users, loading, error, source } = useExternalUsers();
  const {
    globalSearch,
    setGlobalSearch,
    columnFilters,
    setColumnFilter,
    filteredUsers,
    uniqueColumnValues,
    clearFilters,
    hasActiveFilters,
  } = useExternalUserFilters(users);

  const showEmptySearchState = !loading && !error && users.length > 0 && filteredUsers.length === 0;

  return (
    <article className="eduhive-card role-panel external-data-panel">
      <header className="external-data-panel__header">
        <span className="st-label">JSONPlaceholder</span>
        <h2 id="external-users-heading" className="external-data-panel__title">
          External User Directory
        </h2>
        <p className="role-panel__desc mb-0">
          Demo user records loaded from{' '}
          <a
            href="https://jsonplaceholder.typicode.com/users"
            target="_blank"
            rel="noopener noreferrer"
          >
            jsonplaceholder.typicode.com/users
          </a>
          .
        </p>
      </header>

      {loading && (
        <p className="role-panel__desc mb-0" aria-live="polite">
          Loading external user data...
        </p>
      )}

      {error && (
        <p className="text-danger small mb-0" role="alert">
          {error}
          {!loading && (
            <span className="d-block mt-1">
              Check your network connection or ensure the LMS API server is running on port 5000, then refresh.
            </span>
          )}
        </p>
      )}

      {!loading && !error && source === 'cached' && (
        <p className="external-data-panel__notice mb-2" role="status">
          Live JSONPlaceholder is unreachable — showing bundled demo data from the LMS API.
        </p>
      )}

      {!loading && !error && users.length > 0 && (
        <>
          <div className="external-data-search">
            <label htmlFor="external-global-search" className="form-label external-data-search__label">
              Search users
            </label>
            <div className="external-data-search__row">
              <input
                id="external-global-search"
                type="search"
                className="form-control external-data-search__input"
                value={globalSearch}
                onChange={(event) => setGlobalSearch(event.target.value)}
                placeholder="Search name, email, city, company, phone..."
                aria-controls="external-users-table"
              />
              {hasActiveFilters && (
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={clearFilters}>
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="external-data-column-filters external-data-column-filters--mobile">
            {TABLE_COLUMNS.map((column) => (
              <div key={column.key} className="external-data-column-filters__item">
                <label htmlFor={`external-filter-mobile-${column.key}`} className="form-label">
                  {column.label}
                </label>
                <ColumnFilterControl
                  column={column}
                  value={columnFilters[column.key]}
                  onChange={setColumnFilter}
                  options={uniqueColumnValues[column.key] || []}
                  idPrefix="external-filter-mobile"
                />
              </div>
            ))}
          </div>

          {showEmptySearchState && (
            <div className="alert alert-light external-data-empty-state mb-3" role="status" aria-live="polite">
              No users found matching your criteria.
            </div>
          )}

          <div className="table-responsive external-data-table-wrap">
            <table
              id="external-users-table"
              className="table table-sm table-striped align-middle mb-0 external-data-table"
              aria-labelledby="external-users-heading"
            >
              <caption className="visually-hidden">
                External users fetched from JSONPlaceholder
              </caption>
              <thead>
                <tr>
                  {TABLE_COLUMNS.map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
                <tr className="external-data-table__filter-row">
                  {TABLE_COLUMNS.map((column) => (
                    <th key={`${column.key}-filter`} scope="col" className="external-data-table__filter-cell">
                      <ColumnFilterControl
                        column={column}
                        value={columnFilters[column.key]}
                        onChange={setColumnFilter}
                        options={uniqueColumnValues[column.key] || []}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="external-data-table__body">
                {users.length === 0 && (
                  <tr>
                    <td colSpan={TABLE_COLUMNS.length}>No external users returned.</td>
                  </tr>
                )}
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    {TABLE_COLUMNS.map((column) => (
                      <td key={column.key} data-label={column.label}>
                        <span className="external-data-table__cell-text">{user[column.key]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!loading && !error && users.length > 0 && (
        <p className="external-data-panel__meta mb-0">
          Showing {filteredUsers.length} of {users.length} users
          {source === 'jsonplaceholder' ? ' from JSONPlaceholder.' : ' from bundled demo data.'}
        </p>
      )}
    </article>
  );
}

export default ExternalUsersTable;
