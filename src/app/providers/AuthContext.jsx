import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockDb } from '../../mocks/mockDb';

const AuthContext = createContext(null);
const STORAGE_KEY = 'ppdb_auth_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Refresh applicant data from mockDb if applicant
        if (parsed.role === 'applicant' && parsed.registrationNumber) {
          const fresh = mockDb.getApplicantById(parsed.registrationNumber);
          if (fresh) {
            return {
              ...parsed,
              name: fresh.name,
              status: fresh.status,
              phone: fresh.phone,
            };
          }
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = async (role, identifier, password, extra = {}) => {
    setIsLoading(true);

    if (role === 'admin') {
      const adminUser = {
        id: 'adm_01',
        name: 'Panitia PPDB SMAMBO',
        email: identifier || 'panitia@smambo.sch.id',
        role: 'admin',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
      setUser(adminUser);
      setIsLoading(false);
      return adminUser;
    }

    // Applicant login
    let applicant = mockDb.getApplicantByEmail(identifier);
    if (!applicant) {
      // Find by phone or registration number
      const all = mockDb.getApplicants();
      applicant = all.find(
        (a) => a.phone === identifier || a.id.toLowerCase() === identifier.toLowerCase()
      );
    }

    // If not found, create a demo applicant on the fly
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
    setIsLoading(false);
    return appUser;
  };

  const register = async (name, email, phone, password) => {
    setIsLoading(true);
    const newApplicant = mockDb.createApplicant({
      name,
      email,
      phone,
    });

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
    setIsLoading(false);
    return appUser;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const refreshUser = () => {
    if (user?.registrationNumber) {
      const fresh = mockDb.getApplicantById(user.registrationNumber);
      if (fresh) {
        const updated = {
          ...user,
          name: fresh.name,
          status: fresh.status,
          phone: fresh.phone,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setUser(updated);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        login,
        register,
        logout,
        refreshUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
