function TableToolbar({
  searchId,
  searchLabel,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  hasActiveFilters,
  onClearFilters,
}) {
  return (
    <div className="portal-table-toolbar">
      <label htmlFor={searchId} className="form-label portal-table-toolbar__label">
        {searchLabel}
      </label>
      <div className="portal-table-toolbar__search-row">
        <input
          id={searchId}
          type="search"
          className="form-control form-control-sm portal-table-toolbar__input"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
        />
        {hasActiveFilters && (
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onClearFilters}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

export default TableToolbar;
