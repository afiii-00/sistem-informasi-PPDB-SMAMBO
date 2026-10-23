import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  UploadCloud, 
  Activity, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  School,
  User,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../app/providers/AuthContext';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';

export function ApplicantLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard Utama', path: '/applicant/dashboard', icon: LayoutDashboard },
    { label: 'Formulir Pendaftaran', path: '/applicant/registration', icon: FileText },
    { label: 'Unggah Berkas', path: '/applicant/documents', icon: UploadCloud },
    { label: 'Pelacakan Status', path: '/applicant/status', icon: Activity },
    { label: 'Pengumuman Resmi', path: '/applicant/announcements', icon: Bell },
  ];

  const currentRegistrationStatus = user?.status || 'draft';
  const registrationNumber = user?.registrationNumber || 'REG-2026-0001';

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

      {/* Sidebar Navigation */}
      <aside
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid var(--color-border)',
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
        className={`app-sidebar ${mobileSidebarOpen ? 'open' : ''}`}
      >
        {/* Sidebar Brand Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
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
              }}
            >
              <School size={20} />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--color-brand-950)' }}>
                PORTAL SISWA
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)' }}>
                SMA Muhammadiyah
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              display: 'flex',
            }}
            className="mobile-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Applicant Card Summary in Sidebar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-brand-100)',
                  color: 'var(--color-brand-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User size={16} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user?.name || 'Calon Siswa'}
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--color-brand-600)', fontWeight: '600' }}>
                  {registrationNumber}
                </div>
              </div>
            </div>
            <div>
              <StatusBadge status={currentRegistrationStatus} size="sm" />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
                  fontSize: '0.9rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--color-brand-600)' : 'var(--color-text-secondary)',
                  backgroundColor: isActive ? 'var(--color-brand-50)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} color={isActive ? 'var(--color-brand-600)' : 'var(--color-text-muted)'} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight size={16} color="var(--color-brand-600)" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-border-subtle)' }}>
          <Button
            variant="ghost"
            fullWidth
            onClick={handleLogout}
            icon={LogOut}
            style={{ justifyContent: 'flex-start', color: 'var(--color-danger)' }}
          >
            Keluar Akun
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} className="app-main">
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
              aria-label="Buka menu navigasi"
            >
              <Menu size={22} />
            </button>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>
              Tahun Ajaran 2026/2027 · Gelombang 1
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right', display: 'none' }} className="desktop-user-info">
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text)' }}>
                {user?.name || 'Calon Siswa'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                {user?.email || 'pendaftar@smambo.id'}
              </div>
            </div>
            <StatusBadge status={currentRegistrationStatus} size="sm" />
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '28px 24px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .app-sidebar {
            transform: translateX(-100%);
          }
          .app-sidebar.open {
            transform: translateX(0);
          }
          .app-main {
            margin-left: 0 !important;
          }
        }
        @media (min-width: 1024px) {
          .app-main {
            margin-left: var(--sidebar-width);
          }
          .mobile-hamburger, .mobile-close-btn {
            display: none !important;
          }
          .desktop-user-info {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
