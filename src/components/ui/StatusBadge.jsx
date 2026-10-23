import React from 'react';
import { 
  FileEdit, 
  Send, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';

const STATUS_CONFIG = {
  draft: {
    label: 'Draft (Belum Dikirim)',
    icon: FileEdit,
    color: '#475569',
    bg: '#F1F5F9',
    border: '#CBD5E1',
  },
  submitted: {
    label: 'Terkirim',
    icon: Send,
    color: '#1D4ED8',
    bg: '#EFF6FF',
    border: '#BFDBFE',
  },
  under_review: {
    label: 'Menunggu Verifikasi',
    icon: Clock,
    color: '#B45309',
    bg: '#FFFBEB',
    border: '#FDE68A',
  },
  needs_revision: {
    label: 'Perlu Perbaikan',
    icon: AlertTriangle,
    color: '#C2410C',
    bg: '#FFF7ED',
    border: '#FED7AA',
  },
  accepted: {
    label: 'Diterima',
    icon: CheckCircle2,
    color: '#15803D',
    bg: '#F0FDF4',
    border: '#BBF7D0',
  },
  rejected: {
    label: 'Belum Lolos',
    icon: XCircle,
    color: '#B91C1C',
    bg: '#FEF2F2',
    border: '#FECACA',
  },
  failed: {
    label: 'Gagal Terkirim',
    icon: AlertCircle,
    color: '#991B1B',
    bg: '#FEF2F2',
    border: '#FCA5A5',
  },
};

export function StatusBadge({ status, customLabel, size = 'md' }) {
  const config = STATUS_CONFIG[status] || {
    label: customLabel || status || 'Unknown',
    icon: Clock,
    color: '#64748B',
    bg: '#F8FAFC',
    border: '#E2E8F0',
  };

  const Icon = config.icon;
  const isSmall = size === 'sm';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '4px' : '6px',
        padding: isSmall ? '3px 8px' : '5px 12px',
        borderRadius: 'var(--radius-full)',
        fontSize: isSmall ? '0.75rem' : '0.825rem',
        fontWeight: '600',
        color: config.color,
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
      }}
    >
      <Icon size={isSmall ? 12 : 14} />
      <span>{customLabel || config.label}</span>
    </span>
  );
}
