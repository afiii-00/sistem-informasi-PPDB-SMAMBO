import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  icon: Icon,
  type = 'button',
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
    fontFamily: 'inherit',
    borderRadius: 'var(--radius-md)',
    border: '1px solid transparent',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all var(--transition-fast)',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    lineHeight: 1.25,
  };

  const sizeStyles = {
    sm: { padding: '8px 14px', fontSize: '0.85rem' },
    md: { padding: '10px 18px', fontSize: '0.925rem' },
    lg: { padding: '14px 24px', fontSize: '1rem' },
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-brand-600)',
      color: '#FFFFFF',
      borderColor: 'var(--color-brand-600)',
      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
    },
    secondary: {
      backgroundColor: 'var(--color-brand-50)',
      color: 'var(--color-brand-700)',
      borderColor: 'var(--color-brand-200)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-text)',
      borderColor: 'var(--color-border)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-secondary)',
      borderColor: 'transparent',
    },
    destructive: {
      backgroundColor: 'var(--color-danger)',
      color: '#FFFFFF',
      borderColor: 'var(--color-danger)',
    },
  };

  const hoverEffects = {
    primary: { backgroundColor: 'var(--color-brand-700)' },
    secondary: { backgroundColor: 'var(--color-brand-100)' },
    outline: { backgroundColor: 'var(--color-surface-hover)', borderColor: 'var(--color-brand-400)' },
    ghost: { backgroundColor: 'var(--color-surface-active)' },
    destructive: { opacity: 0.9 },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const currentStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(isHovered && !disabled && !isLoading ? hoverEffects[variant] : {}),
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      style={currentStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      {...props}
    >
      {isLoading ? (
        <Loader2 size={size === 'sm' ? 14 : 18} style={{ animation: 'spin 1s linear infinite' }} />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 15 : 18} />
      ) : null}
      {children}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
