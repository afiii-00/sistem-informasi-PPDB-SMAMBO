import { createClient } from '@supabase/supabase-js';
import { env } from './env';

export const supabaseClient = env.SUPABASE_CONFIGURED
  ? createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export function requireSupabase() {
  if (!supabaseClient) {
    throw new Error('Supabase belum dikonfigurasi. Isi URL proyek dan anon key di .env.local.');
  }
  return supabaseClient;
}
