import { useTableFilters } from '../../../shared/hooks/useTableFilters';
import { useTablePagination } from '../../../shared/hooks/useTablePagination';
import ColumnFilterControl from '../../../shared/components/ColumnFilterControl';
import TableToolbar from '../../../shared/components/TableToolbar';
import TablePagination from '../../../shared/components/TablePagination';

function ManagedUsersTable({
  tableId,
  users,
  columns,
  searchableFields,
  entityLabel,
  searchIdPrefix,
  emptyMessage = 'No records found.',
  filteredEmptyMessage = 'No records match your filters.',
  renderRow,
  actionHeader = 'Actions',
  showActions = true,
}) {
  const {
    globalSearch,
    setGlobalSearch,
    columnFilters,
    setColumnFilter,
    filteredItems,
    uniqueColumnValues,
    clearFilters,
    hasActiveFilters,
  } = useTableFilters(users, { columns, searchableFields });

  const {
    paginatedItems,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageSizes,
    totalPages,
    startIndex,
    endIndex,
  } = useTablePagination(filteredItems);

  if (users.length === 0) {
    return <p className="role-panel__desc mb-0">{emptyMessage}</p>;
  }

  return (
    <>
      <TableToolbar
        searchId={`${searchIdPrefix}-search`}
        searchLabel={`Search ${entityLabel}`}
        searchValue={globalSearch}
        onSearchChange={setGlobalSearch}
        searchPlaceholder={`Search ${entityLabel}...`}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      <div className="portal-table-column-filters portal-table-column-filters--mobile">
        {columns.map((column) => (
          <div key={column.key} className="portal-table-column-filters__item">
            <label htmlFor={`${searchIdPrefix}-mobile-${column.key}`} className="form-label">
              {column.label}
            </label>
            <ColumnFilterControl
              column={column}
              value={columnFilters[column.key]}
              onChange={setColumnFilter}
              options={uniqueColumnValues[column.key] || []}
              idPrefix={`${searchIdPrefix}-mobile`}
            />
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="alert alert-light portal-table-empty" role="status">
          {filteredEmptyMessage}
        </div>
      )}

      {filteredItems.length > 0 && (
        <>
          <div className="table-responsive portal-table-wrap">
            <table id={tableId} className="table table-sm align-middle mb-0 portal-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                  {showActions && <th scope="col">{actionHeader}</th>}
                </tr>
                <tr className="portal-table__filter-row">
                  {columns.map((column) => (
                    <th key={`${column.key}-filter`} scope="col" className="portal-table__filter-cell">
                      <ColumnFilterControl
                        column={column}
                        value={columnFilters[column.key]}
                        onChange={setColumnFilter}
                        options={uniqueColumnValues[column.key] || []}
                        idPrefix={searchIdPrefix}
                      />
                    </th>
                  ))}
                  {showActions && <th scope="col" aria-hidden="true" />}
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((user) => renderRow(user))}
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
            pageSizeId={`${searchIdPrefix}-page-size`}
            filteredCount={filteredItems.length}
            totalCount={users.length}
            startIndex={startIndex}
            endIndex={endIndex}
            entityLabel={entityLabel}
            ariaLabel={`${entityLabel} pagination`}
          />
        </>
      )}
    </>
  );
}

export default ManagedUsersTable;
