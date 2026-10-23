import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  confirmText,
  cancelText = 'Batal',
  onConfirm,
  isConfirming = false,
  confirmVariant = 'primary',
  maxWidth = '500px',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(11, 31, 70, 0.45)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth,
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          animation: 'modalIn 0.2s ease-out forwards',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: '700',
              color: 'var(--color-brand-950)',
            }}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: '4px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>{children}</div>

        {(confirmText || cancelText) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-surface-hover)',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            {cancelText && (
              <Button variant="outline" onClick={onClose} disabled={isConfirming}>
                {cancelText}
              </Button>
            )}
            {confirmText && (
              <Button
                variant={confirmVariant}
                onClick={onConfirm}
                isLoading={isConfirming}
              >
                {confirmText}
              </Button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
