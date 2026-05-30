export function formatDate(value) {
  if (!value) {
    return '—';
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatPrice(price, currency = 'USD') {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(price);
}

export function statusLabel(status) {
  const labels = {
    active: 'Active',
    cancelled: 'Cancelled',
    expired: 'Expired',
    pending: 'Pending',
  };

  return labels[status] || status;
}
