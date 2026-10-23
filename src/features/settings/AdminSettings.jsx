import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FormField, Input } from '../../components/ui/FormField';
import { Alert } from '../../components/ui/Alert';
import { Save } from 'lucide-react';
import { mockDb } from '../../mocks/mockDb';

export function AdminSettings() {
  const [settings, setSettings] = useState({
    academicYear: '2026/2027',
    waveName: 'Gelombang 1',
    quota: 200,
    schoolName: 'SMA Muhammadiyah Kota Bogor',
    schoolAddress: 'Jl. Mayor Oking Jaya Atmaja No. 27, Kota Bogor, Jawa Barat',
    schoolPhone: '(0251) 832-1234',
    schoolEmail: 'ppdb@smamuhammadiyahbogor.sch.id',
  });
  const [auditLogs, setAuditLogs] = useState([]);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    const s = mockDb.getSettings();
    if (s) setSettings(s);
    setAuditLogs(mockDb.getAuditLogs());
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    mockDb.updateSettings({
      ...settings,
      quota: Number(settings.quota),
    });
    setAuditLogs(mockDb.getAuditLogs());
    setNotice(true);
    setTimeout(() => setNotice(false), 3000);
  };

  const handleChange = (key, val) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
          Pengaturan PPDB & Rekam Jejak Audit
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Kelola kuota pendaftar, periode gelombang, dan inspeksi riwayat aktivitas panitia.
        </p>
      </div>

      {notice && (
        <Alert variant="success" style={{ marginBottom: '20px' }}>
          Pengaturan PPDB berhasil disimpan dan peristiwa tercatat di audit log sistem.
        </Alert>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Settings Form */}
        <Card title="Konfigurasi Utama PPDB">
          <form onSubmit={handleSave}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
              <FormField label="Tahun Ajaran PPDB" id="academicYear" required>
                <Input
                  id="academicYear"
                  value={settings.academicYear}
                  onChange={(e) => handleChange('academicYear', e.target.value)}
                />
              </FormField>

              <FormField label="Nama Gelombang Pendaftaran" id="waveName" required>
                <Input
                  id="waveName"
                  value={settings.waveName}
                  onChange={(e) => handleChange('waveName', e.target.value)}
                />
              </FormField>

              <FormField label="Target Kuota / Daya Tampung Siswa" id="quota" required helperText="Jumlah siswa baru yang dapat diterima">
                <Input
                  id="quota"
                  type="number"
                  value={settings.quota}
                  onChange={(e) => handleChange('quota', e.target.value)}
                />
              </FormField>

              <FormField label="Nama Sekolah" id="schoolName" required>
                <Input
                  id="schoolName"
                  value={settings.schoolName}
                  onChange={(e) => handleChange('schoolName', e.target.value)}
                />
              </FormField>

              <FormField label="Alamat Sekretariat PPDB" id="schoolAddress" required>
                <Input
                  id="schoolAddress"
                  value={settings.schoolAddress}
                  onChange={(e) => handleChange('schoolAddress', e.target.value)}
                />
              </FormField>

              <Button type="submit" variant="primary" icon={Save} style={{ marginTop: '8px' }}>
                Simpan Perubahan Pengaturan
              </Button>
            </div>
          </form>
        </Card>

        {/* Audit Log Trail */}
        <Card title="Rekam Jejak Aktivitas Panitia (Audit Trail)" subtitle="Catatan aksi penting untuk akuntabilitas sistem">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px', maxHeight: '500px', overflowY: 'auto' }}>
            {auditLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface-hover)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '0.85rem',
                }}
              >
                <div style={{ fontWeight: '700', color: 'var(--color-brand-950)' }}>
                  {log.action}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  <span style={{ fontWeight: '600', color: 'var(--color-brand-700)' }}>{log.actor}</span>
                  <span>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
