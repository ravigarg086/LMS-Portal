export function formatDateTime(value, options = { dateStyle: 'medium', timeStyle: 'short' }) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat(undefined, options).format(new Date(value));
}
