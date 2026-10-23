import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Alert } from '../../components/ui/Alert';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, Clock, Send, FileEdit, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../app/providers/AuthContext';
import { mockDb } from '../../mocks/mockDb';
import { Link } from 'react-router-dom';

export function ApplicantStatus() {
  const { user } = useAuth();
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    if (user?.registrationNumber) {
      const data = mockDb.getApplicantById(user.registrationNumber);
      if (data) setApplicant(data);
    }
  }, [user]);

  const status = applicant?.status || user?.status || 'draft';
  const regNo = applicant?.id || user?.registrationNumber || 'REG-2026-0001';

  const isDraft = status === 'draft';
  const isSubmitted = status === 'submitted';
  const isUnderReview = status === 'under_review';
  const isRevision = status === 'needs_revision';
  const isAccepted = status === 'accepted';
  const isRejected = status === 'rejected';

  const timeline = [
    {
      title: 'Pembuatan Akun PPDB',
      date: '23 Oktober 2026',
      done: true,
      desc: 'Akun pendaftar berhasil dibuat dan diverifikasi.',
    },
    {
      title: 'Pengisian Formulir Biodata',
      date: isDraft ? 'Belum Selesai' : 'Selesai Diajukan',
      done: !isDraft,
      desc: isDraft ? 'Silakan lengkapi formulir pendaftaran.' : 'Data calon siswa dan asal sekolah telah tercatat.',
    },
    {
      title: 'Unggah Berkas Persyaratan',
      date: isDraft ? 'Menunggu' : 'Lengkap',
      done: !isDraft,
      desc: 'Berkas Kartu Keluarga, Akta Kelahiran, dan dokumen wajib.',
    },
    {
      title: 'Verifikasi Berkas oleh Panitia',
      date: isUnderReview || isAccepted || isRejected ? 'Selesai Diverifikasi' : isRevision ? 'Perlu Perbaikan' : 'Dalam Antrean',
      done: isUnderReview || isAccepted || isRejected,
      warning: isRevision,
      desc: isRevision ? `Catatan Panitia: ${applicant?.revisionNotes || 'Harap periksa berkas'}` : 'Pemeriksaan kesesuaian dokumen resmi.',
    },
    {
      title: 'Penetapan Hasil Seleksi',
      date: isAccepted ? 'Diterima' : isRejected ? 'Belum Lolos' : 'Menunggu Jadwal Pengumuman',
      done: isAccepted || isRejected,
      desc: isAccepted
        ? 'Selamat! Anda dinyatakan DITERIMA di SMA Muhammadiyah Kota Bogor.'
        : isRejected
        ? 'Terima kasih atas partisipasi Anda.'
        : 'Pengumuman resmi sesuai jadwal kalender PPDB.',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
          Pelacakan Status Resmi Pendaftaran
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Pantau proses verifikasi dokumen dan pengumuman hasil seleksi peserta didik baru.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Status Card Summary */}
        <Card title="Status Pendaftaran Terkini">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Nomor Registrasi:</span>
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--color-brand-700)' }}>{regNo}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Tahapan Saat Ini:</span>
              <StatusBadge status={status} />
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            {isDraft && (
              <Alert variant="warning" title="Pendaftaran Belum Diajukan">
                Formulir Anda masih berstatus draf. Silakan selesaikan pengisian dan ajukan formulir agar masuk antrean verifikasi.
                <div style={{ marginTop: '12px' }}>
                  <Link to="/applicant/registration">
                    <Button variant="primary" size="sm" icon={ArrowRight}>
                      Lanjutkan Formulir
                    </Button>
                  </Link>
                </div>
              </Alert>
            )}

            {isSubmitted && (
              <Alert variant="info" title="Menunggu Pemeriksaan Panitia">
                Formulir Anda telah terkirim. Panitia PPDB sedang menjadwalkan pemeriksaan keabsahan dokumen persyaratan.
              </Alert>
            )}

            {isUnderReview && (
              <Alert variant="info" title="Sedang Diverifikasi">
                Seluruh dokumen persyaratan Anda telah diverifikasi valid. Anda tinggal menunggu penetapan hasil seleksi.
              </Alert>
            )}

            {isRevision && (
              <Alert variant="danger" title="Tindakan Diperlukan: Perbaikan Berkas">
                Panitia meminta Anda memperbaiki dokumen dengan catatan:{' '}
                <strong>"{applicant?.revisionNotes}"</strong>
                <div style={{ marginTop: '12px' }}>
                  <Link to="/applicant/documents">
                    <Button variant="destructive" size="sm" icon={ArrowRight}>
                      Perbaiki Berkas Sekarang
                    </Button>
                  </Link>
                </div>
              </Alert>
            )}

            {isAccepted && (
              <Alert variant="success" title="Selamat! Anda Dinyatakan Diterima">
                Calon peserta didik dinyatakan <strong>DITERIMA</strong> pada Program Peminatan {applicant?.track || 'MIPA'} SMA Muhammadiyah Kota Bogor TP. 2026/2027. Silakan hubungi sekretariat PPDB atau datang ke sekolah untuk daftar ulang.
              </Alert>
            )}

            {isRejected && (
              <Alert variant="danger" title="Hasil Seleksi">
                Mohon maaf, berdasarkan kuota daya tampung dan hasil seleksi, Anda belum dapat kami terima di gelombang ini.
              </Alert>
            )}
          </div>
        </Card>

        {/* Timeline Progression */}
        <Card title="Riwayat Aktivitas & Alur Pendaftaran">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
            {timeline.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: item.done
                      ? 'var(--color-success)'
                      : item.warning
                      ? 'var(--color-warning)'
                      : 'var(--color-border)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {item.done ? (
                    <CheckCircle2 size={16} />
                  ) : item.warning ? (
                    <AlertTriangle size={16} />
                  ) : (
                    <Clock size={16} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h4 style={{ fontSize: '0.925rem', fontWeight: '700', color: item.done || item.warning ? 'var(--color-text)' : 'var(--color-text-muted)', margin: 0 }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {item.date}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', marginTop: '3px', marginBottom: 0, lineHeight: 1.4 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
