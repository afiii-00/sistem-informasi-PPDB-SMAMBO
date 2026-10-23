import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ size = 32, message = 'Memuat data...' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        color: 'var(--color-brand-600)',
        gap: '12px',
      }}
    >
      <Loader2 size={size} style={{ animation: 'spin 1s linear infinite' }} />
      {message && (
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {message}
        </span>
      )}
    </div>
  );
}

export function Skeleton({ height = '20px', width = '100%', radius = 'var(--radius-sm)', style = {} }) {
  return (
    <div
      style={{
        height,
        width,
        borderRadius: radius,
        backgroundColor: '#E2E8F0',
        animation: 'pulse 1.5s ease-in-out infinite',
        ...style,
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}
