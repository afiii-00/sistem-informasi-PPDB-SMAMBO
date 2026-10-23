/**
 * Safe client environment reader
 * Never expose secrets or server keys here.
 */

export const env = {
  APP_NAME: 'PPDB SMA Muhammadiyah Kota Bogor',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  USE_MOCK: import.meta.env.VITE_USE_MOCK !== 'false', // Default to mock during RAD until backend is connected
  ACADEMIC_YEAR: '2026/2027',
  SCHOOL_NAME: 'SMA Muhammadiyah Kota Bogor',
};
