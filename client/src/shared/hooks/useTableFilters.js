import { useMemo, useState } from 'react';
import {
  createEmptyColumnFilters,
  filterTableRows,
  getUniqueColumnValues,
} from '../utils/tableFilterUtils';

export function useTableFilters(items, { columns, searchableFields = columns.map((column) => column.key) }) {
  const [globalSearch, setGlobalSearch] = useState('');
  const [columnFilters, setColumnFilters] = useState(() => createEmptyColumnFilters(columns));

  const filteredItems = useMemo(
    () => filterTableRows(items, globalSearch, columnFilters, columns, searchableFields),
    [items, globalSearch, columnFilters, columns, searchableFields],
  );

  const uniqueColumnValues = useMemo(() => {
    const values = {};
    columns
      .filter((column) => column.filterType === 'select')
      .forEach((column) => {
        values[column.key] = getUniqueColumnValues(items, column);
      });
    return values;
  }, [items, columns]);

  const setColumnFilter = (key, value) => {
    setColumnFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => {
    setGlobalSearch('');
    setColumnFilters(createEmptyColumnFilters(columns));
  };

  const hasActiveFilters =
    globalSearch.trim().length > 0 ||
    Object.values(columnFilters).some((value) => String(value).trim().length > 0);

  return {
    globalSearch,
    setGlobalSearch,
    columnFilters,
    setColumnFilter,
    filteredItems,
    uniqueColumnValues,
    clearFilters,
    hasActiveFilters,
  };
}
