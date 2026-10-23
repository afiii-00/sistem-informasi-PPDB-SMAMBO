/**
 * Helper formatters untuk Sistem PPDB SMA Muhammadiyah Kota Bogor
 */

export function formatDate(dateString) {
  if (!dateString) return '-';
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString) {
  if (!dateString) return '-';
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d) + ' WIB';
  } catch {
    return dateString;
  }
}

export function maskPhoneNumber(phone) {
  if (!phone) return '-';
  const clean = String(phone).trim();
  if (clean.length < 8) return clean;
  // Mask middle digits, e.g. 0812****5678
  const start = clean.slice(0, 4);
  const end = clean.slice(-4);
  return `${start}••••${end}`;
}

export function formatCurrency(amount) {
  if (typeof amount !== 'number') return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}
