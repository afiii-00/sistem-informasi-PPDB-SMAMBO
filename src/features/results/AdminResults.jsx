import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { Alert } from '../../components/ui/Alert';
import { CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';
import { mockDb } from '../../mocks/mockDb';

export function AdminResults() {
  const [candidates, setCandidates] = useState([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [targetCandidate, setTargetCandidate] = useState(null);
  const [targetAction, setTargetAction] = useState('accepted');
  const [notice, setNotice] = useState('');

  const loadData = () => {
    setCandidates(mockDb.getApplicants());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenDecision = (cand, action) => {
    setTargetCandidate(cand);
    setTargetAction(action);
    setConfirmModalOpen(true);
  };

  const handleConfirmDecision = () => {
    if (!targetCandidate) return;
    mockDb.setResult(targetCandidate.id, targetAction);
    loadData();
    setConfirmModalOpen(false);
    setNotice(`Keputusan resmi seleksi untuk ${targetCandidate.name} (${targetCandidate.id}) telah ditetapkan sebagai ${targetAction === 'accepted' ? 'DITERIMA' : 'TIDAK DITERIMA'}. Notifikasi WhatsApp pengumuman telah dipicu.`);
    setTimeout(() => setNotice(''), 5000);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
          Penetapan Hasil Seleksi Siswa Baru
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Tetapkan status penerimaan resmi calon siswa sesuai kuota dan keputusan panitia.
        </p>
      </div>

      {notice && (
        <Alert variant="success" style={{ marginBottom: '20px' }}>
          {notice}
        </Alert>
      )}

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '12px 10px', fontWeight: '600' }}>No. Registrasi</th>
                <th style={{ padding: '12px 10px', fontWeight: '600' }}>Nama Calon Siswa</th>
                <th style={{ padding: '12px 10px', fontWeight: '600' }}>Asal SMP / MTs</th>
                <th style={{ padding: '12px 10px', fontWeight: '600' }}>Peminatan</th>
                <th style={{ padding: '12px 10px', fontWeight: '600' }}>Status Saat Ini</th>
                <th style={{ padding: '12px 10px', fontWeight: '600', textAlign: 'center' }}>Aksi Keputusan</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((cand) => (
                <tr key={cand.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '14px 10px', fontWeight: '700', color: 'var(--color-brand-700)' }}>
                    {cand.id}
                  </td>
                  <td style={{ padding: '14px 10px', fontWeight: '600', color: 'var(--color-text)' }}>
                    {cand.name}
                  </td>
                  <td style={{ padding: '14px 10px', color: 'var(--color-text-muted)' }}>
                    {cand.schoolOrigin || '-'}
                  </td>
                  <td style={{ padding: '14px 10px', fontWeight: '600', color: 'var(--color-brand-800)' }}>
                    {cand.track}
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    <StatusBadge status={cand.status} size="sm" />
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <Button
                        variant={cand.status === 'accepted' ? 'primary' : 'outline'}
                        size="sm"
                        icon={CheckCircle2}
                        onClick={() => handleOpenDecision(cand, 'accepted')}
                        disabled={cand.status === 'accepted'}
                      >
                        {cand.status === 'accepted' ? 'Sudah Diterima' : 'Terima'}
                      </Button>

                      <Button
                        variant={cand.status === 'rejected' ? 'destructive' : 'outline'}
                        size="sm"
                        icon={XCircle}
                        onClick={() => handleOpenDecision(cand, 'rejected')}
                        disabled={cand.status === 'rejected'}
                        style={cand.status !== 'rejected' ? { color: 'var(--color-danger)', borderColor: 'var(--color-danger-border)' } : {}}
                      >
                        {cand.status === 'rejected' ? 'Sudah Ditolak' : 'Tolak'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Konfirmasi Keputusan Resmi Seleksi"
        confirmText={`Ya, Tetapkan ${targetAction === 'accepted' ? 'Diterima' : 'Ditolak'}`}
        confirmVariant={targetAction === 'accepted' ? 'primary' : 'destructive'}
        onConfirm={handleConfirmDecision}
      >
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <div style={{ color: targetAction === 'accepted' ? 'var(--color-success)' : 'var(--color-danger)', marginTop: '2px' }}>
            <ShieldAlert size={28} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.5 }}>
              Apakah Anda yakin ingin menetapkan status <strong>{targetAction === 'accepted' ? 'DITERIMA' : 'TIDAK DITERIMA'}</strong> untuk calon siswa:
            </p>
            <div style={{ margin: '12px 0', padding: '12px', backgroundColor: 'var(--color-surface-hover)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: '700', color: 'var(--color-brand-950)' }}>{targetCandidate?.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {targetCandidate?.id} · Asal: {targetCandidate?.schoolOrigin} · Peminatan: {targetCandidate?.track}
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Aksi ini akan mencatat log audit panitia dan secara otomatis memicu notifikasi hasil pengumuman melalui WhatsApp Gateway.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
