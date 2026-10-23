import React from 'react';
import { 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle 
} from 'lucide-react';

export function Alert({
  variant = 'info',
  title,
  children,
  className = '',
  style = {},
}) {
  const configs = {
    info: {
      icon: Info,
      color: 'var(--color-info)',
      bg: 'var(--color-info-bg)',
      border: 'var(--color-info-border)',
    },
    success: {
      icon: CheckCircle2,
      color: 'var(--color-success)',
      bg: 'var(--color-success-bg)',
      border: 'var(--color-success-border)',
    },
    warning: {
      icon: AlertTriangle,
      color: 'var(--color-warning)',
      bg: 'var(--color-warning-bg)',
      border: 'var(--color-warning-border)',
    },
    danger: {
      icon: AlertCircle,
      color: 'var(--color-danger)',
      bg: 'var(--color-danger-bg)',
      border: 'var(--color-danger-border)',
    },
  };

  const current = configs[variant] || configs.info;
  const Icon = current.icon;

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        gap: '12px',
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: current.bg,
        border: `1px solid ${current.border}`,
        color: 'var(--color-text)',
        ...style,
      }}
      className={className}
    >
      <div style={{ color: current.color, flexShrink: 0, marginTop: '2px' }}>
        <Icon size={20} />
      </div>
      <div style={{ flex: 1, fontSize: '0.9rem' }}>
        {title && (
          <h4
            style={{
              fontWeight: '700',
              color: current.color,
              marginBottom: '4px',
              fontSize: '0.95rem',
            }}
          >
            {title}
          </h4>
        )}
        <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
