import React from 'react';

export function Card({
  children,
  className = '',
  title,
  subtitle,
  action,
  hoverable = false,
  style = {},
  ...props
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: hoverable && isHovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        padding: '24px',
        transition: 'all var(--transition-normal)',
        transform: hoverable && isHovered ? 'translateY(-2px)' : 'none',
        ...style,
      }}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
      className={className}
      {...props}
    >
      {(title || subtitle || action) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '18px',
            gap: '12px',
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: 'var(--color-text)',
                  margin: 0,
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  marginTop: '4px',
                  marginBottom: 0,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
