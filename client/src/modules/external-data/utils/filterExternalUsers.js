import { SEARCHABLE_FIELDS } from '../data/tableColumns';

function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .trim();
}

export function matchesGlobalSearch(user, query) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return true;
  }

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const haystack = SEARCHABLE_FIELDS.map((field) => normalize(user[field])).join(' ');

  return tokens.every((token) => haystack.includes(token));
}

export function matchesColumnFilter(user, filterValue, columnKey, filterType) {
  const normalizedFilter = normalize(filterValue);
  if (!normalizedFilter) {
    return true;
  }

  const cellValue = normalize(user[columnKey]);

  if (filterType === 'select') {
    return cellValue === normalizedFilter;
  }

  return cellValue.includes(normalizedFilter);
}

export function filterExternalUsers(users, globalSearch, columnFilters, columns) {
  return users.filter((user) => {
    if (!matchesGlobalSearch(user, globalSearch)) {
      return false;
    }

    return columns.every((column) =>
      matchesColumnFilter(user, columnFilters[column.key] ?? '', column.key, column.filterType),
    );
  });
}

export function getUniqueColumnValues(users, columnKey) {
  return [...new Set(users.map((user) => user[columnKey]).filter((value) => value && value !== '—'))].sort(
    (a, b) => String(a).localeCompare(String(b)),
  );
}
