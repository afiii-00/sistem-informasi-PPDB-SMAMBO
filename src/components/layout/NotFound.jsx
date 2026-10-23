import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';
import { Button } from '../ui/Button';

export function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '32px 20px',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-brand-50)',
          color: 'var(--color-brand-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <FileQuestion size={36} />
      </div>

      <span
        style={{
          fontSize: '0.85rem',
          fontWeight: '700',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-brand-600)',
          marginBottom: '8px',
        }}
      >
        Error 404
      </span>

      <h1
        style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: 'var(--color-brand-950)',
          marginBottom: '12px',
        }}
      >
        Halaman Tidak Ditemukan
      </h1>

      <p
        style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          maxWidth: '460px',
          marginBottom: '28px',
          lineHeight: 1.6,
        }}
      >
        Tautan yang Anda tuju mungkin sudah dipindahkan, dihapus, atau alamat URL yang Anda masukkan salah.
      </p>

      <Link to="/">
        <Button variant="primary" icon={Home}>
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}
