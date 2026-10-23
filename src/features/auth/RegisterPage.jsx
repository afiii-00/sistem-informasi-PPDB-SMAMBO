import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, School } from 'lucide-react';
import { FormField, Input } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Alert } from '../../components/ui/Alert';
import { useAuth } from '../../app/providers/AuthContext';
import { isValidEmail, isValidIndonesianPhone } from '../../lib/validators';

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !phone || !password) {
      setError('Harap lengkapi semua isian yang berbintang wajib.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Format alamat email tidak valid (contoh: nama@domain.com).');
      return;
    }

    if (!isValidIndonesianPhone(phone)) {
      setError('Nomor WhatsApp harus valid Indonesia (contoh: 081234567890).');
      return;
    }

    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter demi keamanan akun.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    try {
      setIsLoading(true);
      await register(fullName, email, phone, password);
      setIsLoading(false);
      navigate('/applicant/registration', { replace: true });
    } catch {
      setIsLoading(false);
      setError('Terjadi kendala saat membuat akun. Silakan coba kembali.');
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
      <div style={{ width: '100%', maxWidth: '480px' }}>
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
            Registrasi Akun Calon Siswa
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            SMA Muhammadiyah Kota Bogor TP. 2026/2027
          </p>
        </div>

        <Card>
          {error && (
            <Alert variant="danger" style={{ marginBottom: '16px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleRegister}>
            <FormField label="Nama Lengkap Calon Siswa" id="fullName" required helperText="Sesuai Akta Kelahiran atau Ijazah SMP">
              <Input
                id="fullName"
                type="text"
                placeholder="Contoh: Muhammad Farhan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormField>

            <FormField label="Alamat Email Aktif" id="email" required helperText="Untuk tanda bukti dan komunikasi pendaftaran">
              <Input
                id="email"
                type="email"
                placeholder="farhan@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>

            <FormField label="Nomor WhatsApp (Aktif)" id="phone" required helperText="Untuk menerima update status dan pengumuman seleksi">
              <Input
                id="phone"
                type="tel"
                placeholder="081234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormField>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <FormField label="Kata Sandi" id="password" required>
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormField>

              <FormField label="Ulangi Kata Sandi" id="confirmPassword" required>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi sandi"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormField>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              isLoading={isLoading}
              icon={UserPlus}
              style={{ marginTop: '12px' }}
            >
              Daftar & Mulai Isi Formulir
            </Button>
          </form>

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
            Sudah pernah mendaftar?{' '}
            <Link to="/login" style={{ fontWeight: '700' }}>
              Masuk di sini
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
