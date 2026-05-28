function ColumnFilterControl({ column, value, onChange, options = [], idPrefix = 'table-filter' }) {
  const inputId = `${idPrefix}-${column.key}`;

  if (column.filterType === 'select') {
    return (
      <select
        id={inputId}
        className="form-select form-select-sm portal-table-filter-control"
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
      className="form-control form-control-sm portal-table-filter-control"
      value={value}
      onChange={(event) => onChange(column.key, event.target.value)}
      placeholder={`Filter ${column.label}`}
      aria-label={`Filter by ${column.label}`}
    />
  );
}

export default ColumnFilterControl;
