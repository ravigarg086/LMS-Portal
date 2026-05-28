export function normalizeFilterValue(value) {
  return String(value ?? '')
    .toLowerCase()
    .trim();
}

export function getCellValue(item, key) {
  if (typeof key === 'function') {
    return key(item);
  }

  return String(key)
    .split('.')
    .reduce((current, part) => current?.[part], item);
}

export function getColumnValue(item, column) {
  if (typeof column.accessor === 'function') {
    return column.accessor(item);
  }

  return getCellValue(item, column.key);
}

export function matchesGlobalSearch(item, query, searchableFields) {
  const normalizedQuery = normalizeFilterValue(query);
  if (!normalizedQuery) {
    return true;
  }

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const haystack = searchableFields
    .map((field) => normalizeFilterValue(getCellValue(item, field)))
    .join(' ');

  return tokens.every((token) => haystack.includes(token));
}

export function matchesColumnFilter(item, filterValue, column) {
  const normalizedFilter = normalizeFilterValue(filterValue);
  if (!normalizedFilter) {
    return true;
  }

  const cellValue = normalizeFilterValue(getColumnValue(item, column));

  if (column.filterType === 'select') {
    return cellValue === normalizedFilter;
  }

  return cellValue.includes(normalizedFilter);
}

export function filterTableRows(items, globalSearch, columnFilters, columns, searchableFields) {
  return items.filter((item) => {
    if (!matchesGlobalSearch(item, globalSearch, searchableFields)) {
      return false;
    }

    return columns.every((column) =>
      matchesColumnFilter(item, columnFilters[column.key] ?? '', column),
    );
  });
}

export function getUniqueColumnValues(items, column) {
  return [
    ...new Set(
      items
        .map((item) => getColumnValue(item, column))
        .filter((value) => value !== undefined && value !== null && value !== '' && value !== '—')
        .map((value) => String(value)),
    ),
  ].sort((a, b) => a.localeCompare(b));
}

export function createEmptyColumnFilters(columns) {
  return columns.reduce((accumulator, column) => {
    accumulator[column.key] = '';
    return accumulator;
  }, {});
}
