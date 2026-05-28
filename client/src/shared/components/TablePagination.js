function buildRecordSummary({ filteredCount, totalCount, startIndex, endIndex, entityLabel }) {
  if (filteredCount === 0) {
    return `No ${entityLabel} to display`;
  }

  const range = `${startIndex}–${endIndex}`;

  if (filteredCount === totalCount) {
    return `Showing ${range} of ${totalCount} ${entityLabel}`;
  }

  return `Showing ${range} of ${filteredCount} matched (${totalCount} total ${entityLabel})`;
}

function TablePagination({
  page,
  totalPages,
  onPageChange,
  pageSize,
  pageSizes,
  onPageSizeChange,
  pageSizeId = 'table-page-size',
  filteredCount,
  totalCount,
  startIndex,
  endIndex,
  entityLabel = 'records',
  ariaLabel = 'Table pagination',
}) {
  const showSummary =
    filteredCount != null &&
    totalCount != null &&
    startIndex != null &&
    endIndex != null;
  const showPageSize = pageSize != null && pageSizes?.length && onPageSizeChange;
  const showPages = totalPages > 1;

  if (!showSummary && !showPageSize && !showPages) {
    return null;
  }

  const summary = showSummary
    ? buildRecordSummary({ filteredCount, totalCount, startIndex, endIndex, entityLabel })
    : '';

  const pages = [];
  const addPage = (pageNumber) => {
    if (!pages.includes(pageNumber)) {
      pages.push(pageNumber);
    }
  };

  if (showPages) {
    addPage(1);
    for (let index = page - 1; index <= page + 1; index += 1) {
      if (index > 1 && index < totalPages) {
        addPage(index);
      }
    }
    if (totalPages > 1) {
      addPage(totalPages);
    }
    pages.sort((a, b) => a - b);
  }

  const items = [];
  if (showPages) {
    pages.forEach((pageNumber, index) => {
      if (index > 0 && pageNumber - pages[index - 1] > 1) {
        items.push({ type: 'ellipsis', key: `ellipsis-${pageNumber}` });
      }
      items.push({ type: 'page', pageNumber, key: `page-${pageNumber}` });
    });
  }

  return (
    <div className="portal-table-pagination-bar">
      {showSummary && (
        <p className="portal-table-pagination-bar__summary mb-0" aria-live="polite">
          {summary}
        </p>
      )}

      {(showPageSize || showPages) && (
        <div className="portal-table-pagination-bar__controls">
          {showPageSize && (
            <div className="portal-table-pagination-bar__page-size">
              <label htmlFor={pageSizeId} className="portal-table-pagination-bar__label">
                Rows per page
              </label>
              <select
                id={pageSizeId}
                className="form-select form-select-sm portal-table-pagination-bar__select"
                value={pageSize}
                onChange={(event) => onPageSizeChange(event.target.value)}
                aria-label="Rows per page"
              >
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showPages && (
            <nav className="portal-table-pagination" aria-label={ariaLabel}>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item${page === 1 ? ' disabled' : ''}`}>
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                </li>
                {items.map((item) =>
                  item.type === 'ellipsis' ? (
                    <li key={item.key} className="page-item disabled">
                      <span className="page-link">…</span>
                    </li>
                  ) : (
                    <li key={item.key} className={`page-item${item.pageNumber === page ? ' active' : ''}`}>
                      <button
                        type="button"
                        className="page-link"
                        onClick={() => onPageChange(item.pageNumber)}
                        aria-current={item.pageNumber === page ? 'page' : undefined}
                      >
                        {item.pageNumber}
                      </button>
                    </li>
                  ),
                )}
                <li className={`page-item${page === totalPages ? ' disabled' : ''}`}>
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}

export default TablePagination;
