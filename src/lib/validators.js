/**
 * Client-side validation helpers
 */

export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function isValidIndonesianPhone(phone) {
  // Indonesian numbers usually start with 08 or 628, min 9 digits, max 15 digits
  const clean = String(phone).replace(/[\s-]/g, '');
  const re = /^(?:\+62|62|0)8[1-9][0-9]{6,11}$/;
  return re.test(clean);
}

export function isValidNISN(nisn) {
  // NISN is exactly 10 digits
  return /^\d{10}$/.test(String(nisn).trim());
}

export function isValidNIK(nik) {
  // NIK is exactly 16 digits
  return /^\d{16}$/.test(String(nik).trim());
}
