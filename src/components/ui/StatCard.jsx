import React from 'react';

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  variant = 'blue',
  badge,
}) {
  const variantMap = {
    blue: {
      bg: 'var(--color-brand-50)',
      color: 'var(--color-brand-600)',
      border: 'var(--color-brand-100)',
    },
    green: {
      bg: 'var(--color-success-bg)',
      color: 'var(--color-success)',
      border: 'var(--color-success-border)',
    },
    amber: {
      bg: 'var(--color-warning-bg)',
      color: 'var(--color-warning)',
      border: 'var(--color-warning-border)',
    },
    red: {
      bg: 'var(--color-danger-bg)',
      color: 'var(--color-danger)',
      border: 'var(--color-danger-border)',
    },
  };

  const currentVariant = variantMap[variant] || variantMap.blue;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}
    >
      <div>
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {title}
        </span>
        <div
          style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: 'var(--color-text)',
            lineHeight: 1.2,
            marginTop: '4px',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </div>
        {description && (
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              marginTop: '4px',
              marginBottom: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>

      {Icon && (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: currentVariant.bg,
            border: `1px solid ${currentVariant.border}`,
            color: currentVariant.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={24} />
        </div>
      )}
    </div>
  );
}
