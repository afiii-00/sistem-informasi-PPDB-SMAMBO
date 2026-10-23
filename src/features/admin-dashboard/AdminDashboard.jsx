import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  FileCheck2,
  MessageSquare
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Link } from 'react-router-dom';
import { mockDb } from '../../mocks/mockDb';

export function AdminDashboard() {
  const [applicants, setApplicants] = useState([]);
  const [settings, setSettings] = useState(null);
  const [whatsAppLogs, setWhatsAppLogs] = useState([]);

  useEffect(() => {
    setApplicants(mockDb.getApplicants());
    setSettings(mockDb.getSettings());
    setWhatsAppLogs(mockDb.getWhatsAppLogs());
  }, []);

  const total = applicants.length;
  const waitingVerification = applicants.filter((a) => a.status === 'under_review' || a.status === 'submitted').length;
  const needsRevision = applicants.filter((a) => a.status === 'needs_revision').length;
  const accepted = applicants.filter((a) => a.status === 'accepted').length;

  const quota = settings?.quota || 200;
  const quotaPercent = Math.min(100, Math.round((total / quota) * 100));

  const stats = [
    { title: 'Total Pendaftar', value: String(total), description: `Target Kuota: ${quota} Siswa`, icon: Users, variant: 'blue' },
    { title: 'Antrean Verifikasi', value: String(waitingVerification), description: 'Memerlukan review panitia', icon: Clock, variant: 'amber' },
    { title: 'Perlu Perbaikan', value: String(needsRevision), description: 'Berkas belum lengkap/valid', icon: AlertTriangle, variant: 'amber' },
    { title: 'Diterima Seleksi', value: String(accepted), description: 'Lolos berkas & seleksi', icon: CheckCircle2, variant: 'green' },
  ];

  const recentApplicants = applicants.slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
          Dashboard Ringkasan PPDB
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Monitoring pendaftar, antrean verifikasi berkas, dan aktivitas gateway secara terpusat.
        </p>
      </div>

      {/* Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Main Content Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Recent Applicants */}
        <Card
          title="Pendaftar Terbaru"
          subtitle="Data pendaftaran yang tercatat di sistem PPDB"
          action={
            <Link to="/admin/applicants">
              <Button variant="ghost" size="sm" icon={ArrowRight}>
                Lihat Semua
              </Button>
            </Link>
          }
        >
          <div style={{ overflowX: 'auto', marginTop: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>No. Registrasi</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>Nama Calon Siswa</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>Asal Sekolah</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplicants.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: '700', color: 'var(--color-brand-700)' }}>
                      {app.id}
                    </td>
                    <td style={{ padding: '12px 8px', fontWeight: '600', color: 'var(--color-text)' }}>
                      {app.name}
                    </td>
                    <td style={{ padding: '12px 8px', color: 'var(--color-text-muted)' }}>
                      {app.schoolOrigin}
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <StatusBadge status={app.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Shortcuts & Quota Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card title="Aksi Cepat Panitia" subtitle="Pintasan alur kerja prioritas hari ini">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <Link to="/admin/verification" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface-hover)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: 'var(--color-warning)', display: 'flex' }}>
                      <FileCheck2 size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-text)' }}>
                        Verifikasi Berkas Calon Siswa
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        {waitingVerification} berkas menunggu pemeriksaan
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="var(--color-text-muted)" />
                </div>
              </Link>

              <Link to="/admin/whatsapp" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface-hover)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: 'var(--color-brand-600)', display: 'flex' }}>
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-text)' }}>
                        WhatsApp Gateway Log
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        {whatsAppLogs.length} notifikasi tercatat di sistem
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="var(--color-text-muted)" />
                </div>
              </Link>
            </div>
          </Card>

          <Card title="Status Daya Tampung Sekolah">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Gelombang Aktif:</span>
                <span style={{ fontWeight: '700', color: 'var(--color-brand-700)' }}>
                  {settings?.waveName || 'Gelombang 1'} ({settings?.academicYear || '2026/2027'})
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Pendaftar Masuk:</span>
                <span style={{ fontWeight: '700' }}>{total} / {quota} Siswa ({quotaPercent}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: `${quotaPercent}%`, height: '100%', backgroundColor: 'var(--color-brand-600)', borderRadius: 'var(--radius-full)' }} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
