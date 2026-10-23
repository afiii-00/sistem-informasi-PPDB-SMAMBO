import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  FileCheck2, 
  GraduationCap, 
  FileSpreadsheet, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../app/providers/AuthContext';

export function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Statistik & Ringkasan', path: '/admin/dashboard', icon: BarChart3 },
    { label: 'Data Pendaftar', path: '/admin/applicants', icon: Users },
    { label: 'Verifikasi Berkas', path: '/admin/verification', icon: FileCheck2 },
    { label: 'Penetapan Hasil', path: '/admin/results', icon: GraduationCap },
    { label: 'Laporan & Ekspor', path: '/admin/reports', icon: FileSpreadsheet },
    { label: 'WhatsApp Gateway', path: '/admin/whatsapp', icon: MessageSquare },
    { label: 'Pengaturan PPDB', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11, 31, 70, 0.5)',
            zIndex: 150,
          }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: '#0B1F46', // Deep navy per design token
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 160,
          transform: mobileSidebarOpen ? 'translateX(0)' : undefined,
          transition: 'transform var(--transition-normal)',
        }}
        className={`admin-sidebar ${mobileSidebarOpen ? 'open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-brand-600)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '1rem', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                PANITIA PPDB
              </div>
              <div style={{ fontSize: '0.725rem', color: '#93C5FD', fontWeight: '500' }}>
                SMA Muhammadiyah Bogor
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              display: 'flex',
            }}
            className="mobile-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            style={{
              padding: '8px 12px',
              fontSize: '0.725rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#60A5FA',
            }}
          >
            Menu Administrasi
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#FFFFFF' : '#CBD5E1',
                  backgroundColor: isActive ? 'var(--color-brand-600)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} color={isActive ? '#FFFFFF' : '#94A3B8'} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight size={16} color="#FFFFFF" />}
              </Link>
            );
          })}
        </nav>

        {/* Admin Footer Actions */}
        <div style={{ padding: '16px 14px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              color: '#94A3B8',
              textDecoration: 'none',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '8px',
            }}
          >
            <span>Lihat Website Publik</span>
            <ExternalLink size={14} />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#FCA5A5',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.875rem',
              transition: 'background-color var(--transition-fast)',
            }}
          >
            <LogOut size={16} />
            <span>Keluar Sesi Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} className="admin-main">
        {/* Top Header */}
        <header
          style={{
            height: '64px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text)',
              }}
              className="mobile-hamburger"
              aria-label="Buka menu admin"
            >
              <Menu size={22} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  backgroundColor: 'var(--color-brand-100)',
                  color: 'var(--color-brand-800)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                MODUL PANITIA
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                Tahun Ajaran 2026/2027
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text)' }}>
                {user?.name || 'Administrator PPDB'}
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)' }}>
                Hak Akses: Panitia Seleksi
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '28px 24px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .admin-main {
            margin-left: 0 !important;
          }
        }
        @media (min-width: 1024px) {
          .admin-main {
            margin-left: var(--sidebar-width);
          }
          .mobile-hamburger, .mobile-close-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
