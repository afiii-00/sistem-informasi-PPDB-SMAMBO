import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/FormField';
import { FileSpreadsheet, Download, FileText, CheckCircle2, Printer } from 'lucide-react';
import { mockDb } from '../../mocks/mockDb';

export function AdminReports() {
  const [reportType, setReportType] = useState('all');
  const [exportFormat, setExportFormat] = useState('csv');
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    setApplicants(mockDb.getApplicants());
  }, []);

  const getFilteredData = () => {
    if (reportType === 'accepted') return applicants.filter((a) => a.status === 'accepted');
    if (reportType === 'needs_revision') return applicants.filter((a) => a.status === 'needs_revision');
    if (reportType === 'waiting') return applicants.filter((a) => a.status === 'under_review' || a.status === 'submitted');
    return applicants;
  };

  const handleExport = () => {
    const data = getFilteredData();

    // Prevent CSV formula injection by prepending single quote if value begins with =, +, -, @
    const sanitize = (val) => {
      const str = String(val || '').trim();
      if (/^[=+\-@\t\r]/.test(str)) {
        return `'${str}`;
      }
      return str;
    };

    if (exportFormat === 'csv') {
      const headers = [
        'Nomor Registrasi',
        'Nama Lengkap',
        'Nomor WhatsApp',
        'Asal Sekolah',
        'Peminatan',
        'NIK',
        'NISN',
        'Nama Orang Tua',
        'Status Pendaftaran',
        'Tanggal Daftar',
      ];

      const rows = data.map((a) => [
        sanitize(a.id),
        sanitize(a.name),
        sanitize(a.phone),
        sanitize(a.schoolOrigin || '-'),
        sanitize(a.track || 'MIPA'),
        sanitize(a.nik || '-'),
        sanitize(a.nisn || '-'),
        sanitize(a.fatherName || a.motherName || '-'),
        sanitize(a.status),
        sanitize(a.createdAt ? new Date(a.createdAt).toLocaleDateString('id-ID') : '-'),
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,\uFEFF' +
        [headers.map((h) => `"${h}"`).join(',')]
          .concat(rows.map((r) => r.map((c) => `"${c}"`).join(',')))
          .join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `laporan_ppdb_smambo_${reportType}_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.print();
    }
  };

  const currentRecords = getFilteredData();
  const acceptedCount = applicants.filter((a) => a.status === 'accepted').length;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
          Laporan & Rekapitulasi Data PPDB
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Ekspor data resmi pendaftar dan penetapan hasil seleksi SMA Muhammadiyah Kota Bogor.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <Card title="Konfigurasi Ekspor Laporan">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                Pilihan Jenis Rekapitulasi Data
              </label>
              <Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="all">Semua Pendaftar (Seluruh Calon Siswa)</option>
                <option value="accepted">Hanya Calon Siswa Diterima</option>
                <option value="needs_revision">Daftar Siswa Perlu Perbaikan Berkas</option>
                <option value="waiting">Daftar Antrean Pemeriksaan Berkas</option>
              </Select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                Format File Unduhan
              </label>
              <Select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
                <option value="csv">Comma-Separated Values Spreadsheet (.csv)</option>
                <option value="print">Cetak Dokumen Resmi / Simpan PDF (Print Preview)</option>
              </Select>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={exportFormat === 'print' ? Printer : Download}
              onClick={handleExport}
              style={{ marginTop: '12px' }}
            >
              {exportFormat === 'print' ? 'Cetak Laporan / Simpan PDF' : `Unduh ${currentRecords.length} Record Data (.csv)`}
            </Button>
          </div>
        </Card>

        <Card title="Ringkasan Statistik Rekap Saat Ini">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Total Data Pendaftar:</span>
              <span style={{ fontWeight: '700', color: 'var(--color-brand-950)' }}>{applicants.length} Siswa</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Data Siap Diekspor ({reportType}):</span>
              <span style={{ fontWeight: '700', color: 'var(--color-brand-600)' }}>{currentRecords.length} Baris</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Total Siswa Resmi Diterima:</span>
              <span style={{ fontWeight: '700', color: 'var(--color-success)' }}>{acceptedCount} Siswa</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Preview Table of Filtered Data */}
      <div style={{ marginTop: '24px' }}>
        <Card title="Pratinjau Data Rekapitulasi" subtitle={`Menampilkan ${currentRecords.length} data terpilih`}>
          <div style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>No. Registrasi</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>Nama Lengkap</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>Asal SMP/MTs</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>Peminatan</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '10px 8px', fontWeight: '700', color: 'var(--color-brand-700)' }}>{app.id}</td>
                    <td style={{ padding: '10px 8px', fontWeight: '600' }}>{app.name}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--color-text-muted)' }}>{app.schoolOrigin || '-'}</td>
                    <td style={{ padding: '10px 8px', fontWeight: '600' }}>{app.track}</td>
                    <td style={{ padding: '10px 8px' }}>{app.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
