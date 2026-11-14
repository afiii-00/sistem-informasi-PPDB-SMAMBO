import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { UploadCloud, CheckCircle2, FileText, AlertTriangle, RefreshCw } from 'lucide-react';
import { useAuth } from '../../app/providers/AuthContext';
import { applicantData } from '../../services/applicantData';
import { env } from '../../lib/env';

export function ApplicantDocuments() {
  const { user, refreshUser } = useAuth();
  const [applicant, setApplicant] = useState(null);
  const [uploadNotice, setUploadNotice] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [activeDocument, setActiveDocument] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let active = true;
    if (user?.registrationNumber) {
      applicantData.getApplicantById(user.registrationNumber).then((data) => {
        if (active) setApplicant(data);
      }).catch((error) => {
        if (active) setUploadError(error.message || 'Data pendaftaran gagal dimuat.');
      });
    }
    return () => { active = false; };
  }, [user]);

  const handleUpload = async (docId, docTitle, file) => {
    if (!applicant) return;
    try {
      setUploadError('');
      const uploadValue = env.USE_MOCK
        ? `scan_${docId}_${applicant.name.toLowerCase().replace(/\s+/g, '_')}.pdf`
        : file;
      const updated = await applicantData.uploadDocument(applicant.id, docId, uploadValue);
      setApplicant(updated);
      await refreshUser();
      setUploadNotice(`Berkas "${docTitle}" (${env.USE_MOCK ? uploadValue : file.name}) berhasil diunggah.`);
      setTimeout(() => setUploadNotice(''), 4000);
    } catch (error) {
      setUploadError(error.message || 'Berkas gagal diunggah.');
    }
  };

  const docs = applicant?.documents || [
    { id: 'kk', name: 'Kartu Keluarga (KK)', required: true, fileName: null, status: 'missing' },
    { id: 'akta', name: 'Akta Kelahiran', required: true, fileName: null, status: 'missing' },
    { id: 'skl', name: 'Ijazah / SKL SMP/MTs', required: true, fileName: null, status: 'missing' },
    { id: 'foto', name: 'Pas Foto 3x4', required: true, fileName: null, status: 'missing' },
  ];

  const missingRequired = docs.filter((d) => d.required && !d.fileName);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
          Kelola & Unggah Berkas Persyaratan
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Format dokumen: PDF, JPG, atau PNG (Maks. 2MB). Pastikan hasil scan jelas dan tidak terpotong.
        </p>
      </div>

      {applicant?.status === 'needs_revision' && applicant?.revisionNotes && (
        <Alert variant="warning" title="Catatan Perbaikan dari Panitia PPDB" style={{ marginBottom: '24px' }}>
          {applicant.revisionNotes}
        </Alert>
      )}

      {uploadNotice && (
        <Alert variant="success" style={{ marginBottom: '24px' }}>
          {uploadNotice}
        </Alert>
      )}

      {uploadError && (
        <Alert variant="danger" style={{ marginBottom: '24px' }}>
          {uploadError}
        </Alert>
      )}

      {missingRequired.length > 0 && applicant?.status !== 'needs_revision' && (
        <Alert variant="info" style={{ marginBottom: '24px' }}>
          Terdapat {missingRequired.length} berkas wajib yang belum diunggah:{' '}
          <strong>{missingRequired.map((m) => m.name).join(', ')}</strong>.
        </Alert>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {!env.USE_MOCK && (
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            style={{ display: 'none' }}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file && activeDocument) handleUpload(activeDocument.id, activeDocument.name, file);
              event.target.value = '';
            }}
          />
        )}
        {docs.map((doc) => {
          const hasFile = Boolean(doc.fileName);
          const isInvalid = doc.status === 'invalid';

          return (
            <Card key={doc.id}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: hasFile
                        ? isInvalid
                          ? 'var(--color-danger-bg)'
                          : 'var(--color-success-bg)'
                        : 'var(--color-brand-50)',
                      color: hasFile
                        ? isInvalid
                          ? 'var(--color-danger)'
                          : 'var(--color-success)'
                        : 'var(--color-brand-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {hasFile ? (
                      isInvalid ? <AlertTriangle size={22} /> : <CheckCircle2 size={22} />
                    ) : (
                      <FileText size={22} />
                    )}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-text)', margin: 0 }}>
                        {doc.name}
                      </h4>
                      {doc.required && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            backgroundColor: '#FEE2E2',
                            color: '#DC2626',
                            padding: '1px 6px',
                            borderRadius: 'var(--radius-xs)',
                          }}
                        >
                          Wajib
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '4px', marginBottom: 0 }}>
                      {hasFile ? (
                        <span style={{ color: isInvalid ? 'var(--color-danger)' : 'var(--color-success)', fontWeight: '600' }}>
                          {isInvalid ? '✗ Berkas ditolak: ' : '✓ Berkas tersimpan: '}{doc.fileName}
                        </span>
                      ) : (
                        'Belum ada file diunggah'
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <Button
                    variant={hasFile ? (isInvalid ? 'destructive' : 'outline') : 'primary'}
                    size="sm"
                    icon={hasFile ? RefreshCw : UploadCloud}
                    onClick={() => {
                      if (env.USE_MOCK) handleUpload(doc.id, doc.name);
                      else {
                        setActiveDocument(doc);
                        fileInputRef.current?.click();
                      }
                    }}
                  >
                    {hasFile ? 'Unggah Ulang File' : 'Pilih & Unggah File'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
