import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  UploadCloud, 
  Activity, 
  ArrowRight, 
  HelpCircle
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Alert } from '../../components/ui/Alert';
import { useAuth } from '../../app/providers/AuthContext';
import { mockDb } from '../../mocks/mockDb';

export function ApplicantDashboard() {
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
  const docs = applicant?.documents || [];
  const uploadedCount = docs.filter((d) => Boolean(d.fileName)).length;
  const totalRequired = docs.filter((d) => d.required).length;

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0B1F46 0%, #17458F 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          color: '#FFFFFF',
          marginBottom: '28px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#DBEAFE',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              No. Pendaftaran: {regNo}
            </span>
            <StatusBadge status={status} size="sm" />
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '4px 0 8px 0' }}>
            Selamat Datang, {applicant?.name || user?.name || 'Calon Siswa'}!
          </h1>
          <p style={{ color: '#DBEAFE', fontSize: '0.95rem', maxWidth: '640px', lineHeight: 1.5, margin: 0 }}>
            Pantau seluruh progres pendaftaran Anda di SMA Muhammadiyah Kota Bogor. Pastikan data formulir dan berkas telah lengkap.
          </p>

          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/applicant/registration">
              <Button variant="primary" icon={ArrowRight} style={{ backgroundColor: '#2563EB' }}>
                Lengkapi Formulir Biodata
              </Button>
            </Link>
            <Link to="/applicant/documents">
              <Button variant="outline" style={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.4)' }}>
                Kelola Berkas ({uploadedCount}/{totalRequired} Berkas)
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Revision Alert if needed */}
      {status === 'needs_revision' && applicant?.revisionNotes && (
        <Alert variant="danger" title="Perhatian: Berkas Anda Memerlukan Perbaikan" style={{ marginBottom: '24px' }}>
          <div>{applicant.revisionNotes}</div>
          <div style={{ marginTop: '10px' }}>
            <Link to="/applicant/documents">
              <Button variant="destructive" size="sm">
                Buka Menu Berkas & Perbaiki
              </Button>
            </Link>
          </div>
        </Alert>
      )}

      {/* Progress Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <Card hoverable title="1. Formulir Pendaftaran" subtitle="Biodata siswa, orang tua, dan peminatan">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Status Isian:</span>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: status === 'draft' ? '#D97706' : '#16A34A' }}>
              {status === 'draft' ? 'Draft (Belum Diajukan)' : 'Telah Diajukan'}
            </span>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Link to="/applicant/registration">
              <Button variant="secondary" fullWidth size="sm" icon={FileText}>
                Isi / Ubah Formulir
              </Button>
            </Link>
          </div>
        </Card>

        <Card hoverable title="2. Berkas Persyaratan" subtitle="Upload KK, Akta Kelahiran, dan SKL">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Progres Berkas:</span>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: uploadedCount >= totalRequired ? 'var(--color-success)' : 'var(--color-warning)' }}>
              {uploadedCount} dari {totalRequired} Diunggah
            </span>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Link to="/applicant/documents">
              <Button variant="secondary" fullWidth size="sm" icon={UploadCloud}>
                Kelola Berkas
              </Button>
            </Link>
          </div>
        </Card>

        <Card hoverable title="3. Hasil & Seleksi" subtitle="Pelacakan verifikasi berkas dan kelulusan">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Status Terkini:</span>
            <StatusBadge status={status} size="sm" />
          </div>
          <div style={{ marginTop: '16px' }}>
            <Link to="/applicant/status">
              <Button variant="secondary" fullWidth size="sm" icon={Activity}>
                Lihat Detail Status
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Info Notice */}
      <Card title="Pusat Informasi & Bantuan PPDB">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '640px' }}>
            Jika Anda mengalami kendala teknis atau memiliki pertanyaan seputar jadwal seleksi, silakan hubungi tim helpdesk panitia PPDB SMA Muhammadiyah Kota Bogor melalui WhatsApp resmi.
          </p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button variant="outline" size="sm" icon={HelpCircle}>
              Hubungi Panitia (WhatsApp)
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
