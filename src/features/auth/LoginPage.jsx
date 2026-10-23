import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, School, ShieldCheck, User } from 'lucide-react';
import { FormField, Input } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Alert } from '../../components/ui/Alert';
import { useAuth } from '../../app/providers/AuthContext';

export function LoginPage() {
  const [role, setRole] = useState('applicant'); // 'applicant' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Harap masukkan email/nomor WhatsApp dan kata sandi.');
      return;
    }

    try {
      setIsLoading(true);
      await login(role, email, password);
      setIsLoading(false);

      const target = role === 'admin' ? '/admin/dashboard' : '/applicant/dashboard';
      navigate(target, { replace: true });
    } catch {
      setIsLoading(false);
      setError('Kredensial tidak valid. Silakan periksa kembali email dan kata sandi.');
    }
  };

  const handleDemoFill = (selectedRole) => {
    setRole(selectedRole);
    setError('');
    if (selectedRole === 'admin') {
      setEmail('panitia@smambo.sch.id');
      setPassword('admin123');
    } else {
      setEmail('calon.siswa@demo.id');
      setPassword('siswa123');
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-brand-600)',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
            }}
          >
            <School size={28} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
            Masuk Portal PPDB
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            SMA Muhammadiyah Kota Bogor TP. 2026/2027
          </p>
        </div>

        <Card>
          {/* Role selector tabs */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--color-surface-hover)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              marginBottom: '20px',
              gap: '4px',
            }}
          >
            <button
              type="button"
              onClick={() => handleDemoFill('applicant')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 12px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: role === 'applicant' ? '700' : '500',
                backgroundColor: role === 'applicant' ? '#FFFFFF' : 'transparent',
                color: role === 'applicant' ? 'var(--color-brand-700)' : 'var(--color-text-muted)',
                boxShadow: role === 'applicant' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                cursor: 'pointer',
              }}
            >
              <User size={16} />
              <span>Calon Siswa</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 12px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: role === 'admin' ? '700' : '500',
                backgroundColor: role === 'admin' ? '#FFFFFF' : 'transparent',
                color: role === 'admin' ? 'var(--color-brand-700)' : 'var(--color-text-muted)',
                boxShadow: role === 'admin' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                cursor: 'pointer',
              }}
            >
              <ShieldCheck size={16} />
              <span>Panitia Admin</span>
            </button>
          </div>

          {error && (
            <Alert variant="danger" style={{ marginBottom: '16px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <FormField
              label={role === 'admin' ? 'Email Panitia' : 'Email / No. WhatsApp / No. Pendaftaran'}
              id="email"
              required
            >
              <Input
                id="email"
                type="text"
                placeholder={role === 'admin' ? 'panitia@smambo.sch.id' : 'calon.siswa@demo.id atau 0812xxxx'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>

            <FormField label="Kata Sandi" id="password" required>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              isLoading={isLoading}
              icon={LogIn}
              style={{ marginTop: '8px' }}
            >
              Masuk sebagai {role === 'admin' ? 'Panitia' : 'Calon Siswa'}
            </Button>
          </form>

          {role === 'applicant' && (
            <div
              style={{
                textAlign: 'center',
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--color-border-subtle)',
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
              }}
            >
              Belum memiliki akun pendaftaran?{' '}
              <Link to="/register" style={{ fontWeight: '700' }}>
                Daftar sekarang
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
