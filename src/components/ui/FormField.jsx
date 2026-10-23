import React from 'react';
import { AlertCircle } from 'lucide-react';

export function FormField({
  label,
  id,
  required = false,
  helperText,
  error,
  children,
  className = '',
}) {
  return (
    <div style={{ marginBottom: '16px' }} className={className}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'var(--color-text)',
            marginBottom: '6px',
          }}
        >
          {label}
          {required && (
            <span style={{ color: 'var(--color-danger)', marginLeft: '4px' }}>*</span>
          )}
        </label>
      )}

      {children}

      {error ? (
        <div
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--color-danger)',
            fontSize: '0.8rem',
            marginTop: '5px',
          }}
        >
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            marginTop: '5px',
            marginBottom: 0,
          }}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export function Input({
  error,
  className = '',
  style = {},
  type = 'text',
  ...props
}) {
  return (
    <input
      type={type}
      style={{
        width: '100%',
        padding: '10px 14px',
        fontSize: '0.925rem',
        color: 'var(--color-text)',
        backgroundColor: '#FFFFFF',
        border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-md)',
        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        outline: 'none',
        ...style,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = error ? 'var(--color-danger)' : 'var(--color-brand-500)';
        e.target.style.boxShadow = error
          ? '0 0 0 3px rgba(185, 28, 28, 0.15)'
          : '0 0 0 3px rgba(59, 130, 246, 0.15)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = error ? 'var(--color-danger)' : 'var(--color-border)';
        e.target.style.boxShadow = 'none';
      }}
      className={className}
      {...props}
    />
  );
}

export function Select({
  error,
  children,
  className = '',
  style = {},
  ...props
}) {
  return (
    <select
      style={{
        width: '100%',
        padding: '10px 14px',
        fontSize: '0.925rem',
        color: 'var(--color-text)',
        backgroundColor: '#FFFFFF',
        border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-md)',
        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        outline: 'none',
        ...style,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = error ? 'var(--color-danger)' : 'var(--color-brand-500)';
        e.target.style.boxShadow = error
          ? '0 0 0 3px rgba(185, 28, 28, 0.15)'
          : '0 0 0 3px rgba(59, 130, 246, 0.15)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = error ? 'var(--color-danger)' : 'var(--color-border)';
        e.target.style.boxShadow = 'none';
      }}
      className={className}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({
  error,
  rows = 3,
  className = '',
  style = {},
  ...props
}) {
  return (
    <textarea
      rows={rows}
      style={{
        width: '100%',
        padding: '10px 14px',
        fontSize: '0.925rem',
        color: 'var(--color-text)',
        backgroundColor: '#FFFFFF',
        border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-md)',
        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        outline: 'none',
        resize: 'vertical',
        ...style,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = error ? 'var(--color-danger)' : 'var(--color-brand-500)';
        e.target.style.boxShadow = error
          ? '0 0 0 3px rgba(185, 28, 28, 0.15)'
          : '0 0 0 3px rgba(59, 130, 246, 0.15)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = error ? 'var(--color-danger)' : 'var(--color-border)';
        e.target.style.boxShadow = 'none';
      }}
      className={className}
      {...props}
    />
  );
}
