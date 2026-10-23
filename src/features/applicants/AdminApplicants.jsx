import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/FormField';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { Eye, Download } from 'lucide-react';
import { maskPhoneNumber } from '../../lib/formatters';
import { mockDb } from '../../mocks/mockDb';

export function AdminApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    setApplicants(mockDb.getApplicants());
  }, []);

  const filtered = applicants.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.schoolOrigin && app.schoolOrigin.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.phone && app.phone.includes(searchTerm));
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportQuick = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['No Registrasi,Nama Siswa,No WhatsApp,Asal SMP,Peminatan,Status']
        .concat(
          filtered.map(
            (a) => `"${a.id}","${a.name}","${a.phone}","${a.schoolOrigin || '-'}","${a.track}","${a.status}"`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data_pendaftar_ppdb_smambo_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
            Manajemen Data Calon Siswa
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Menampilkan {filtered.length} dari total {applicants.length} calon siswa terdaftar.
          </p>
        </div>

        <Button variant="outline" icon={Download} onClick={handleExportQuick}>
          Unduh CSV Hasil Filter
        </Button>
      </div>

      {/* Filter Toolbar */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px', color: 'var(--color-text-muted)' }}>
              Pencarian Calon Siswa
            </label>
            <Input
              placeholder="Cari berdasarkan nama, No. REG, atau asal sekolah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px', color: 'var(--color-text-muted)' }}>
              Filter Status Pendaftaran
            </label>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Semua Status Pendaftar</option>
              <option value="draft">Draft (Belum Selesai)</option>
              <option value="submitted">Terkirim (Siap Periksa)</option>
              <option value="under_review">Dalam Verifikasi</option>
              <option value="needs_revision">Perlu Perbaikan</option>
              <option value="accepted">Diterima</option>
              <option value="rejected">Belum Lolos</option>
            </Select>
          </div>
        </div>
      </Card>

      {/* Applicants Table */}
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '12px 10px', fontWeight: '600' }}>No. Registrasi</th>
                <th style={{ padding: '12px 10px', fontWeight: '600' }}>Nama Calon Siswa</th>
                <th style={{ padding: '12px 10px', fontWeight: '600' }}>No. WhatsApp</th>
                <th style={{ padding: '12px 10px', fontWeight: '600' }}>Asal SMP / MTs</th>
                <th style={{ padding: '12px 10px', fontWeight: '600' }}>Peminatan</th>
                <th style={{ padding: '12px 10px', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '12px 10px', fontWeight: '600', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '14px 10px', fontWeight: '700', color: 'var(--color-brand-700)' }}>
                    {app.id}
                  </td>
                  <td style={{ padding: '14px 10px', fontWeight: '600', color: 'var(--color-text)' }}>
                    {app.name}
                  </td>
                  <td style={{ padding: '14px 10px', color: 'var(--color-text-muted)' }}>
                    {maskPhoneNumber(app.phone)}
                  </td>
                  <td style={{ padding: '14px 10px', color: 'var(--color-text-secondary)' }}>
                    {app.schoolOrigin || '-'}
                  </td>
                  <td style={{ padding: '14px 10px', fontWeight: '600', color: 'var(--color-brand-800)' }}>
                    {app.track}
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Eye}
                      onClick={() => setSelectedApp(app)}
                    >
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Applicant Detail Modal */}
      <Modal
        isOpen={Boolean(selectedApp)}
        onClose={() => setSelectedApp(null)}
        title={`Detail Calon Siswa — ${selectedApp?.name}`}
        maxWidth="680px"
        cancelText="Tutup"
      >
        {selectedApp && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface-hover)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Nomor Registrasi:</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-brand-700)' }}>{selectedApp.id}</span>
              </div>
              <StatusBadge status={selectedApp.status} />
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--color-brand-950)' }}>
                1. Data Pribadi & Kontak
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                <div><strong>NIK:</strong> {selectedApp.nik || '-'}</div>
                <div><strong>NISN:</strong> {selectedApp.nisn || '-'}</div>
                <div><strong>Jenis Kelamin:</strong> {selectedApp.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                <div><strong>Tempat, Tgl Lahir:</strong> {selectedApp.pob}, {selectedApp.dob || '-'}</div>
                <div><strong>No. WhatsApp:</strong> {selectedApp.phone}</div>
                <div><strong>Email:</strong> {selectedApp.email}</div>
              </div>
              <div style={{ marginTop: '6px' }}>
                <strong>Alamat:</strong> {selectedApp.address || '-'}
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--color-brand-950)' }}>
                2. Data Orang Tua / Wali
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                <div><strong>Ayah:</strong> {selectedApp.fatherName || '-'} ({selectedApp.fatherJob || '-'})</div>
                <div><strong>Ibu:</strong> {selectedApp.motherName || '-'}</div>
                <div><strong>Kontak Wali:</strong> {selectedApp.parentPhone || selectedApp.phone}</div>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--color-brand-950)' }}>
                3. Asal Sekolah & Peminatan
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                <div><strong>Asal SMP/MTs:</strong> {selectedApp.schoolOrigin || '-'}</div>
                <div><strong>NPSN:</strong> {selectedApp.schoolNpsn || '-'}</div>
                <div><strong>Peminatan:</strong> {selectedApp.track}</div>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--color-brand-950)' }}>
                4. Status Kelengkapan Berkas
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedApp.documents?.map((d) => (
                  <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: 'var(--color-surface-hover)', borderRadius: 'var(--radius-sm)' }}>
                    <span>{d.name} {d.fileName && <span style={{ color: 'var(--color-text-muted)' }}>({d.fileName})</span>}</span>
                    <span style={{ fontWeight: '600', color: d.fileName ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      {d.fileName ? '✓ Ada File' : 'Belum Ada'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
