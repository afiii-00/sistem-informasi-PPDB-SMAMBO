import React from 'react';
import { Check } from 'lucide-react';

export function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '28px',
        overflowX: 'auto',
        paddingBottom: '8px',
      }}
    >
      {steps.map((step, idx) => {
        const stepNum = idx + 1;
        const isCompleted = currentStep > stepNum;
        const isActive = currentStep === stepNum;
        const isClickable = onStepClick && isCompleted;

        return (
          <React.Fragment key={step.id || stepNum}>
            <div
              onClick={() => isClickable && onStepClick(stepNum)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: isClickable ? 'pointer' : 'default',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  backgroundColor: isCompleted
                    ? 'var(--color-success)'
                    : isActive
                    ? 'var(--color-brand-600)'
                    : 'var(--color-surface-hover)',
                  color: isCompleted || isActive ? '#FFFFFF' : 'var(--color-text-muted)',
                  border: isCompleted
                    ? '2px solid var(--color-success)'
                    : isActive
                    ? '2px solid var(--color-brand-600)'
                    : '2px solid var(--color-border)',
                  boxShadow: isActive ? '0 0 12px rgba(37, 99, 235, 0.3)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {isCompleted ? <Check size={18} /> : stepNum}
              </div>

              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontWeight: '700',
                    color: isActive ? 'var(--color-brand-600)' : 'var(--color-text-muted)',
                  }}
                >
                  Langkah {stepNum}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                  }}
                >
                  {step.title}
                </span>
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: currentStep > stepNum ? 'var(--color-success)' : 'var(--color-border)',
                  margin: '0 16px',
                  minWidth: '24px',
                  transition: 'background-color var(--transition-normal)',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
