import { useTableFilters } from '../../../shared/hooks/useTableFilters';
import { TABLE_COLUMNS, SEARCHABLE_FIELDS } from '../data/tableColumns';

export function useExternalUserFilters(users) {
  return useTableFilters(users, {
    columns: TABLE_COLUMNS,
    searchableFields: SEARCHABLE_FIELDS,
  });
}
