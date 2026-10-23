import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/FormField';
import { Alert } from '../../components/ui/Alert';
import { FileCheck2, AlertTriangle, Eye, CheckCircle } from 'lucide-react';
import { mockDb } from '../../mocks/mockDb';

export function AdminVerification() {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [revisionModalOpen, setRevisionModalOpen] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  const loadData = () => {
    const all = mockDb.getApplicants();
    // Show applicants that are submitted, under_review, or needs_revision
    setApplicants(all.filter((a) => ['submitted', 'under_review', 'needs_revision'].includes(a.status)));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = (app) => {
    mockDb.approveAllDocuments(app.id);
    loadData();
    setActionNotice(`Berkas ${app.name} (${app.id}) berhasil diverifikasi lengkap! Status berubah menjadi Dalam Verifikasi.`);
    setTimeout(() => setActionNotice(''), 4000);
  };

  const handleOpenRevision = (app) => {
    setSelectedApplicant(app);
    setRevisionNotes(app.revisionNotes || '');
    setRevisionModalOpen(true);
  };

  const handleConfirmRevision = () => {
    if (!revisionNotes) {
      alert('Harap tuliskan catatan dokumen yang perlu diperbaiki.');
      return;
    }
    mockDb.requestRevision(selectedApplicant.id, revisionNotes);
    loadData();
    setRevisionModalOpen(false);
    setActionNotice(`Permintaan perbaikan berkas untuk ${selectedApplicant.name} telah dikirim ke portal dan WhatsApp siswa.`);
    setTimeout(() => setActionNotice(''), 4000);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
          Verifikasi Dokumen Persyaratan
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Terdapat {applicants.length} berkas calon siswa yang siap ditinjau dan diverifikasi panitia.
        </p>
      </div>

      {actionNotice && (
        <Alert variant="success" style={{ marginBottom: '20px' }}>
          {actionNotice}
        </Alert>
      )}

      {applicants.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-text-muted)' }}>
            Belum ada antrean berkas pendaftar baru yang memerlukan verifikasi.
          </div>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {applicants.map((app) => (
            <Card key={app.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-brand-700)', backgroundColor: 'var(--color-brand-50)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                      {app.id}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-brand-950)', margin: 0 }}>
                      {app.name}
                    </h3>
                    <StatusBadge status={app.status} size="sm" />
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    {app.schoolOrigin} · No. WhatsApp: {app.phone} · Peminatan: {app.track}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={AlertTriangle}
                    onClick={() => handleOpenRevision(app)}
                    style={{ color: 'var(--color-warning)', borderColor: 'var(--color-warning-border)' }}
                  >
                    Minta Revisi Berkas
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={CheckCircle}
                    onClick={() => handleApprove(app)}
                  >
                    Verifikasi Lengkap
                  </Button>
                </div>
              </div>

              {/* Document items grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {app.documents?.map((d) => (
                  <div
                    key={d.id}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface-hover)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--color-text)' }}>
                          {d.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          {d.fileName ? d.fileName : 'Belum diunggah'}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: d.fileName ? 'var(--color-success-bg)' : '#FEE2E2',
                          color: d.fileName ? 'var(--color-success)' : '#DC2626',
                        }}
                      >
                        {d.fileName ? 'Ada File' : 'Kosong'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Revision Modal */}
      <Modal
        isOpen={revisionModalOpen}
        onClose={() => setRevisionModalOpen(false)}
        title={`Catatan Perbaikan Berkas — ${selectedApplicant?.name}`}
        confirmText="Kirim Catatan Revisi & Alert WA"
        confirmVariant="primary"
        onConfirm={handleConfirmRevision}
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
          Tuliskan bagian berkas yang belum jelas atau perlu diunggah ulang oleh calon siswa:
        </p>
        <Textarea
          placeholder="Contoh: File scan Akta Kelahiran buram. Harap lakukan upload ulang."
          rows={4}
          value={revisionNotes}
          onChange={(e) => setRevisionNotes(e.target.value)}
        />
      </Modal>
    </div>
  );
}
