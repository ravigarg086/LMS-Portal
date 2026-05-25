import { useMemo, useState } from 'react';
import { TABLE_COLUMNS } from '../data/tableColumns';
import { filterExternalUsers, getUniqueColumnValues } from '../utils/filterExternalUsers';

function createEmptyColumnFilters() {
  return Object.fromEntries(TABLE_COLUMNS.map((column) => [column.key, '']));
}

export function useExternalUserFilters(users) {
  const [globalSearch, setGlobalSearch] = useState('');
  const [columnFilters, setColumnFilters] = useState(createEmptyColumnFilters);

  const filteredUsers = useMemo(
    () => filterExternalUsers(users, globalSearch, columnFilters, TABLE_COLUMNS),
    [users, globalSearch, columnFilters],
  );

  const uniqueColumnValues = useMemo(() => {
    const values = {};
    TABLE_COLUMNS.filter((column) => column.filterType === 'select').forEach((column) => {
      values[column.key] = getUniqueColumnValues(users, column.key);
    });
    return values;
  }, [users]);

  const setColumnFilter = (key, value) => {
    setColumnFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => {
    setGlobalSearch('');
    setColumnFilters(createEmptyColumnFilters());
  };

  const hasActiveFilters =
    globalSearch.trim().length > 0 || Object.values(columnFilters).some((value) => value.trim().length > 0);

  return {
    globalSearch,
    setGlobalSearch,
    columnFilters,
    setColumnFilter,
    filteredUsers,
    uniqueColumnValues,
    clearFilters,
    hasActiveFilters,
  };
}
