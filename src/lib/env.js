/**
 * Safe client environment reader
 * Never expose secrets or server keys here.
 */

export const env = {
  APP_NAME: 'PPDB SMA Muhammadiyah Kota Bogor',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  USE_MOCK: import.meta.env.VITE_USE_MOCK !== 'false', // Keep the fictional local demo as the default.
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  SUPABASE_CONFIGURED: Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY),
  ACADEMIC_YEAR: '2026/2027',
  SCHOOL_NAME: 'SMA Muhammadiyah Kota Bogor',
};
