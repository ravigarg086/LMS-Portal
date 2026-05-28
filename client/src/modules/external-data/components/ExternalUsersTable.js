import { useExternalUsers } from '../hooks/useExternalUsers';
import { useExternalUserFilters } from '../hooks/useExternalUserFilters';
import { TABLE_COLUMNS } from '../data/tableColumns';
import ColumnFilterControl from '../../../shared/components/ColumnFilterControl';
import TableToolbar from '../../../shared/components/TableToolbar';
import TablePagination from '../../../shared/components/TablePagination';
import { useTablePagination } from '../../../shared/hooks/useTablePagination';

function ExternalUsersTable() {
  const { users, loading, error, source } = useExternalUsers();
  const {
    globalSearch,
    setGlobalSearch,
    columnFilters,
    setColumnFilter,
    filteredItems: filteredUsers,
    uniqueColumnValues,
    clearFilters,
    hasActiveFilters,
  } = useExternalUserFilters(users);

  const {
    paginatedItems,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageSizes,
    totalItems: filteredCount,
    totalPages,
    startIndex,
    endIndex,
  } = useTablePagination(filteredUsers);

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
          <TableToolbar
            searchId="external-global-search"
            searchLabel="Search users"
            searchValue={globalSearch}
            onSearchChange={setGlobalSearch}
            searchPlaceholder="Search name, email, city, company, phone..."
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />

          <div className="portal-table-column-filters portal-table-column-filters--mobile">
            {TABLE_COLUMNS.map((column) => (
              <div key={column.key} className="portal-table-column-filters__item">
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
            <div className="alert alert-light portal-table-empty" role="status" aria-live="polite">
              No users found matching your criteria.
            </div>
          )}

          <div className="table-responsive external-data-table-wrap portal-table-wrap">
            <table
              id="external-users-table"
              className="table table-sm table-striped align-middle mb-0 external-data-table portal-table"
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
                <tr className="portal-table__filter-row external-data-table__filter-row">
                  {TABLE_COLUMNS.map((column) => (
                    <th key={`${column.key}-filter`} scope="col" className="portal-table__filter-cell">
                      <ColumnFilterControl
                        column={column}
                        value={columnFilters[column.key]}
                        onChange={setColumnFilter}
                        options={uniqueColumnValues[column.key] || []}
                        idPrefix="external-filter"
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="external-data-table__body">
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={TABLE_COLUMNS.length}>No external users returned.</td>
                  </tr>
                )}
                {paginatedItems.map((user) => (
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

          <TablePagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            pageSize={pageSize}
            pageSizes={pageSizes}
            onPageSizeChange={setPageSize}
            pageSizeId="external-page-size"
            filteredCount={filteredUsers.length}
            totalCount={users.length}
            startIndex={startIndex}
            endIndex={endIndex}
            entityLabel="users"
            ariaLabel="External users pagination"
          />
        </>
      )}
    </article>
  );
}

export default ExternalUsersTable;
