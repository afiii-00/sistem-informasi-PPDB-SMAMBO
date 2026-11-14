import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockDb } from '../../mocks/mockDb';
import { env } from '../../lib/env';
import { requireSupabase, supabaseClient } from '../../lib/supabase';

const AuthContext = createContext(null);
const STORAGE_KEY = 'ppdb_auth_session';

function readMockSession() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (parsed.role === 'applicant' && parsed.registrationNumber) {
      const fresh = mockDb.getApplicantById(parsed.registrationNumber);
      if (fresh) return { ...parsed, name: fresh.name, status: fresh.status, phone: fresh.phone };
    }
    return parsed;
  } catch {
    return null;
  }
}

async function loadSupabaseUser(authUser) {
  if (!authUser) return null;
  const client = requireSupabase();
  const { data: profile, error: profileError } = await client
    .from('profiles')
    .select('role, full_name, phone')
    .eq('id', authUser.id)
    .single();
  if (profileError) throw profileError;

  let application = null;
  if (profile.role === 'applicant') {
    const { data, error } = await client
      .from('applications')
      .select('registration_number, status, name, phone')
      .eq('user_id', authUser.id)
      .single();
    if (error) throw error;
    application = data;
  }

  return {
    id: authUser.id,
    name: application?.name || profile.full_name || authUser.user_metadata?.full_name || authUser.email || 'Pengguna',
    email: authUser.email || '',
    phone: application?.phone || profile.phone || authUser.user_metadata?.phone || '',
    role: profile.role,
    registrationNumber: application?.registration_number,
    status: application?.status,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => (env.USE_MOCK ? readMockSession() : null));
  const [isLoading, setIsLoading] = useState(!env.USE_MOCK);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (env.USE_MOCK) {
      setIsLoading(false);
      return undefined;
    }
    if (!supabaseClient) {
      setAuthError('Mode Supabase aktif, tetapi URL proyek atau anon key belum diatur.');
      setIsLoading(false);
      return undefined;
    }

    let active = true;
    const syncUser = async (authUser) => {
      try {
        const nextUser = await loadSupabaseUser(authUser);
        if (active) {
          setUser(nextUser);
          setAuthError('');
        }
      } catch {
        if (active) {
          setUser(null);
          setAuthError('Sesi ditemukan, tetapi profil Supabase belum siap. Coba masuk kembali.');
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => syncUser(session?.user || null), 0);
    });
    supabaseClient.auth.getSession().then(({ data, error }) => {
      if (error) throw error;
      return syncUser(data.session?.user || null);
    }).catch(() => {
      if (active) {
        setAuthError('Tidak dapat memeriksa sesi Supabase. Coba muat ulang halaman.');
        setIsLoading(false);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (role, identifier, password, extra = {}) => {
    setIsLoading(true);
    setAuthError('');
    try {
      if (!env.USE_MOCK) {
        const client = requireSupabase();
        const { data, error } = await client.auth.signInWithPassword({
          email: identifier.trim(),
          password,
        });
        if (error) throw error;
        const signedInUser = await loadSupabaseUser(data.user);
        if (signedInUser.role !== role) {
          await client.auth.signOut();
          throw new Error('Akun ini tidak memiliki akses untuk portal yang dipilih.');
        }
        setUser(signedInUser);
        return signedInUser;
      }

      if (role === 'admin') {
        const adminUser = {
          id: 'adm_01',
          name: 'Panitia PPDB SMAMBO',
          email: identifier || 'panitia@smambo.sch.id',
          role: 'admin',
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
        setUser(adminUser);
        return adminUser;
      }

      let applicant = mockDb.getApplicantByEmail(identifier);
      if (!applicant) {
        const all = mockDb.getApplicants();
        applicant = all.find((candidate) => candidate.phone === identifier || candidate.id.toLowerCase() === identifier.toLowerCase());
      }
      if (!applicant) {
        applicant = mockDb.createApplicant({
          name: extra.name || 'Calon Siswa Baru',
          email: identifier.includes('@') ? identifier : `${identifier}@demo.id`,
          phone: identifier.includes('@') ? (extra.phone || '081234567890') : identifier,
        });
      }

      const appUser = {
        id: applicant.id,
        name: applicant.name,
        email: applicant.email,
        phone: applicant.phone,
        role: 'applicant',
        registrationNumber: applicant.id,
        status: applicant.status,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appUser));
      setUser(appUser);
      return appUser;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, phone, password) => {
    setIsLoading(true);
    setAuthError('');
    try {
      if (!env.USE_MOCK) {
        const client = requireSupabase();
        const { data, error } = await client.auth.signUp({
          email,
          password,
          options: { data: { full_name: name, phone } },
        });
        if (error) throw error;
        if (!data.session) return { requiresEmailConfirmation: true };
        const appUser = await loadSupabaseUser(data.user);
        setUser(appUser);
        return appUser;
      }

      const newApplicant = mockDb.createApplicant({ name, email, phone });
      const appUser = {
        id: newApplicant.id,
        name: newApplicant.name,
        email: newApplicant.email,
        phone: newApplicant.phone,
        role: 'applicant',
        registrationNumber: newApplicant.id,
        status: newApplicant.status,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appUser));
      setUser(appUser);
      return appUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!env.USE_MOCK && supabaseClient) await supabaseClient.auth.signOut();
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const refreshUser = async () => {
    if (!user) return;
    if (env.USE_MOCK && user.registrationNumber) {
      const fresh = mockDb.getApplicantById(user.registrationNumber);
      if (fresh) {
        const updated = { ...user, name: fresh.name, status: fresh.status, phone: fresh.phone };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setUser(updated);
      }
      return;
    }
    if (!env.USE_MOCK && supabaseClient) {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) throw error;
      setUser(await loadSupabaseUser(data.user));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      role: user?.role,
      login,
      register,
      logout,
      refreshUser,
      isLoading,
      authError,
      useMock: env.USE_MOCK,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
