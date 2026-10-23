import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  title = 'Tidak ada data',
  description = 'Belum ada data atau berkas yang dapat ditampilkan saat ini.',
  icon: Icon = Inbox,
  actionText,
  onAction,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px 24px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--color-border)',
        margin: '16px 0',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-brand-50)',
          color: 'var(--color-brand-500)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <Icon size={28} />
      </div>

      <h4
        style={{
          fontSize: '1.1rem',
          fontWeight: '700',
          color: 'var(--color-text)',
          marginBottom: '6px',
        }}
      >
        {title}
      </h4>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          maxWidth: '400px',
          marginBottom: actionText ? '20px' : 0,
        }}
      >
        {description}
      </p>

      {actionText && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
