export const TABLE_COLUMNS = [
  { key: 'id', label: 'ID', filterType: 'text' },
  { key: 'name', label: 'Name', filterType: 'text' },
  { key: 'username', label: 'Username', filterType: 'text' },
  { key: 'email', label: 'Email', filterType: 'text' },
  { key: 'city', label: 'City', filterType: 'select' },
  { key: 'phone', label: 'Phone', filterType: 'text' },
  { key: 'company', label: 'Company', filterType: 'select' },
];

export const SEARCHABLE_FIELDS = TABLE_COLUMNS.map((column) => column.key);
