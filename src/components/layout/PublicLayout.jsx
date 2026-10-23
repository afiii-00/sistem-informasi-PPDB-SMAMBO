import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { School, Menu, X, ArrowRight, ShieldCheck, Phone, MapPin, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../app/providers/AuthContext';

export function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Informasi & Jadwal', path: '/informasi' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Banner Notice */}
      <div
        style={{
          backgroundColor: 'var(--color-brand-950)',
          color: '#DBEAFE',
          fontSize: '0.8rem',
          padding: '8px 16px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <span style={{
          backgroundColor: 'var(--color-brand-700)',
          color: '#FFF',
          padding: '2px 8px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.725rem',
          fontWeight: '700'
        }}>
          PPDB 2026/2027
        </span>
        <span>Pendaftaran Peserta Didik Baru SMA Muhammadiyah Kota Bogor Resmi Dibuka.</span>
      </div>

      {/* Main Navbar */}
      <header
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--color-border)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          className="container"
          style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: 'var(--color-brand-950)',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-brand-600)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              }}
            >
              <School size={24} />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                SMA MUHAMMADIYAH
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '600', letterSpacing: '0.04em' }}>
                KOTA BOGOR · PPDB ONLINE
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '28px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: '0.925rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--color-brand-600)' : 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)',
                    position: 'relative',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-6px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--color-brand-600)',
                        borderRadius: 'var(--radius-full)',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Actions */}
          <div style={{ display: 'none', alignItems: 'center', gap: '12px' }} className="desktop-nav">
            {user ? (
              <Link to={user.role === 'admin' ? '/admin/dashboard' : '/applicant/dashboard'}>
                <Button variant="primary" size="sm">
                  Ke Portal {user.role === 'admin' ? 'Admin' : 'Siswa'}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" icon={ArrowRight}>
                    Daftar Akun
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              padding: '8px',
              color: 'var(--color-text)',
              cursor: 'pointer',
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '8px 0',
                  fontSize: '1rem',
                  fontWeight: location.pathname === link.path ? '700' : '500',
                  color: location.pathname === link.path ? 'var(--color-brand-600)' : 'var(--color-text)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '4px 0' }} />
            {user ? (
              <Link to={user.role === 'admin' ? '/admin/dashboard' : '/applicant/dashboard'} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" fullWidth>
                  Portal {user.role === 'admin' ? 'Admin' : 'Siswa'}
                </Button>
              </Link>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/login" style={{ flex: 1 }} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth>
                    Masuk
                  </Button>
                </Link>
                <Link to="/register" style={{ flex: 1 }} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth>
                    Daftar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Outlet */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'var(--color-brand-950)',
          color: '#94A3B8',
          padding: '60px 0 24px 0',
          marginTop: '60px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '40px',
              paddingBottom: '40px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* School Profile */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFFFFF', marginBottom: '16px' }}>
                <School size={26} color="#60A5FA" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>
                  SMA Muhammadiyah Kota Bogor
                </h4>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '16px' }}>
                Mencetak generasi Islami yang unggul dalam ilmu pengetahuan, berakhlak mulia, cerdas, dan siap menghadapi tantangan masa depan.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60A5FA', fontSize: '0.825rem', fontWeight: '600' }}>
                <ShieldCheck size={18} />
                <span>Terakreditasi A · Sekolah Penggerak</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px' }}>
                Tautan Cepat PPDB
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>
                  <Link to="/" style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Beranda Utama</Link>
                </li>
                <li>
                  <Link to="/informasi" style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Jadwal & Persyaratan Berkas</Link>
                </li>
                <li>
                  <Link to="/register" style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Pendaftaran Calon Siswa Baru</Link>
                </li>
                <li>
                  <Link to="/login" style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Login Akun Pendaftar</Link>
                </li>
              </ul>
            </div>

            {/* School Contact Info */}
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px' }}>
                Sekretariat PPDB
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <MapPin size={18} color="#60A5FA" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Jl. Mayor Oking Jaya Atmaja No. 27, Kota Bogor, Jawa Barat</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Phone size={18} color="#60A5FA" style={{ flexShrink: 0 }} />
                  <span>(0251) 832-XXXX / WhatsApp: 0812-XXXX-XXXX</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Mail size={18} color="#60A5FA" style={{ flexShrink: 0 }} />
                  <span>ppdb@smamuhammadiyahbogor.sch.id</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright & Disclaimer */}
          <div
            style={{
              paddingTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textAlign: 'center',
              fontSize: '0.8rem',
              color: '#64748B',
            }}
          >
            <div>
              &copy; 2026 Panitia PPDB SMA Muhammadiyah Kota Bogor. Seluruh Hak Cipta Dilindungi.
            </div>
            <div style={{ fontSize: '0.75rem', color: '#475569' }}>
              Dokumen ini mengacu pada Source of Truth (SOT) PPDB SMA Muhammadiyah Kota Bogor v1.0.0.
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
