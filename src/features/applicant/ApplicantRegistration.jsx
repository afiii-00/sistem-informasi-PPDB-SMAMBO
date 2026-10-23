import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Stepper } from '../../components/ui/Stepper';
import { FormField, Input, Select, Textarea } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Save, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../app/providers/AuthContext';
import { mockDb } from '../../mocks/mockDb';
import { useNavigate } from 'react-router-dom';

export function ApplicantRegistration() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [savedNotice, setSavedNotice] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    nisn: '',
    gender: 'L',
    pob: 'Bogor',
    dob: '',
    address: '',
    fatherName: '',
    fatherJob: '',
    motherName: '',
    parentPhone: '',
    schoolOrigin: '',
    schoolNpsn: '',
    gradYear: '2026',
    track: 'MIPA',
  });

  useEffect(() => {
    if (user?.registrationNumber) {
      const applicant = mockDb.getApplicantById(user.registrationNumber);
      if (applicant) {
        setFormData({
          name: applicant.name || user.name || '',
          nik: applicant.nik || '',
          nisn: applicant.nisn || '',
          gender: applicant.gender || 'L',
          pob: applicant.pob || 'Bogor',
          dob: applicant.dob || '',
          address: applicant.address || '',
          fatherName: applicant.fatherName || '',
          fatherJob: applicant.fatherJob || '',
          motherName: applicant.motherName || '',
          parentPhone: applicant.parentPhone || user.phone || '',
          schoolOrigin: applicant.schoolOrigin || '',
          schoolNpsn: applicant.schoolNpsn || '',
          gradYear: applicant.gradYear || '2026',
          track: applicant.track || 'MIPA',
        });
      }
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    if (user?.registrationNumber) {
      mockDb.updateApplicant(user.registrationNumber, formData);
      refreshUser();
      setSavedNotice('Draf formulir pendaftaran berhasil disimpan.');
      setTimeout(() => setSavedNotice(''), 3000);
    }
  };

  const handleSubmitFinal = () => {
    if (!formData.name || !formData.nik || !formData.nisn || !formData.schoolOrigin) {
      alert('Harap lengkapi semua field wajib bertanda bintang (*) sebelum mengajukan formulir.');
      return;
    }

    if (user?.registrationNumber) {
      mockDb.updateApplicant(user.registrationNumber, formData);
      mockDb.submitRegistration(user.registrationNumber);
      refreshUser();
      alert('Formulir pendaftaran berhasil diajukan! Anda sekarang dapat memeriksa dokumen pendukung.');
      navigate('/applicant/documents');
    }
  };

  const steps = [
    { id: 1, title: 'Data Calon Siswa' },
    { id: 2, title: 'Data Orang Tua/Wali' },
    { id: 3, title: 'Asal Sekolah & Peminatan' },
    { id: 4, title: 'Review & Ajukan' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
            Formulir Pendaftaran Siswa Baru
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            No. Pendaftaran: <strong>{user?.registrationNumber}</strong> · Status: <StatusBadge status={user?.status || 'draft'} size="sm" />
          </p>
        </div>

        <Button variant="outline" icon={Save} onClick={handleSaveDraft}>
          Simpan Draf Formulir
        </Button>
      </div>

      <Stepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />

      {savedNotice && (
        <Alert variant="success" style={{ marginBottom: '20px' }}>
          {savedNotice}
        </Alert>
      )}

      <Card>
        {currentStep === 1 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>
              Langkah 1: Identitas Pribadi Calon Siswa
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <FormField label="Nama Lengkap" id="studentName" required helperText="Sesuai akta kelahiran">
                <Input
                  id="studentName"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </FormField>
              <FormField label="Nomor Induk Kependudukan (NIK)" id="nik" required helperText="16 digit angka NIK di Kartu Keluarga">
                <Input
                  id="nik"
                  placeholder="327101xxxxxxxxxx"
                  value={formData.nik}
                  onChange={(e) => handleChange('nik', e.target.value)}
                />
              </FormField>
              <FormField label="Nomor Induk Siswa Nasional (NISN)" id="nisn" required helperText="10 digit nomor NISN">
                <Input
                  id="nisn"
                  placeholder="007xxxxxxx"
                  value={formData.nisn}
                  onChange={(e) => handleChange('nisn', e.target.value)}
                />
              </FormField>
              <FormField label="Jenis Kelamin" id="gender" required>
                <Select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </Select>
              </FormField>
              <FormField label="Tempat Lahir" id="pob" required>
                <Input
                  id="pob"
                  value={formData.pob}
                  onChange={(e) => handleChange('pob', e.target.value)}
                />
              </FormField>
              <FormField label="Tanggal Lahir" id="dob" required>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleChange('dob', e.target.value)}
                />
              </FormField>
            </div>
            <FormField label="Alamat Lengkap Domisili" id="address" required>
              <Textarea
                id="address"
                placeholder="Nama jalan, RT/RW, Kelurahan, Kecamatan, Kota Bogor"
                rows={3}
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </FormField>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>
              Langkah 2: Data Orang Tua / Wali
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <FormField label="Nama Lengkap Ayah" id="fatherName" required>
                <Input
                  id="fatherName"
                  placeholder="Nama ayah kandung"
                  value={formData.fatherName}
                  onChange={(e) => handleChange('fatherName', e.target.value)}
                />
              </FormField>
              <FormField label="Pekerjaan Ayah" id="fatherJob">
                <Input
                  id="fatherJob"
                  placeholder="Contoh: PNS / Wiraswasta / Karyawan Swasta"
                  value={formData.fatherJob}
                  onChange={(e) => handleChange('fatherJob', e.target.value)}
                />
              </FormField>
              <FormField label="Nama Lengkap Ibu" id="motherName" required>
                <Input
                  id="motherName"
                  placeholder="Nama ibu kandung"
                  value={formData.motherName}
                  onChange={(e) => handleChange('motherName', e.target.value)}
                />
              </FormField>
              <FormField label="Nomor WhatsApp Orang Tua" id="parentPhone" required helperText="Untuk konfirmasi berkas dan notifikasi PPDB">
                <Input
                  id="parentPhone"
                  placeholder="0812xxxxxxxx"
                  value={formData.parentPhone}
                  onChange={(e) => handleChange('parentPhone', e.target.value)}
                />
              </FormField>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>
              Langkah 3: Asal Sekolah & Pilihan Peminatan
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <FormField label="Nama Asal SMP / MTs" id="schoolOrigin" required>
                <Input
                  id="schoolOrigin"
                  placeholder="Contoh: SMP Negeri 1 Bogor"
                  value={formData.schoolOrigin}
                  onChange={(e) => handleChange('schoolOrigin', e.target.value)}
                />
              </FormField>
              <FormField label="NPSN Sekolah Asal" id="schoolNpsn" helperText="Nomor Pokok Sekolah Nasional (8 digit)">
                <Input
                  id="schoolNpsn"
                  placeholder="20220451"
                  value={formData.schoolNpsn}
                  onChange={(e) => handleChange('schoolNpsn', e.target.value)}
                />
              </FormField>
              <FormField label="Tahun Kelulusan" id="gradYear" required>
                <Select
                  id="gradYear"
                  value={formData.gradYear}
                  onChange={(e) => handleChange('gradYear', e.target.value)}
                >
                  <option value="2026">2026 (Lulusan Tahun Ini)</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </Select>
              </FormField>
              <FormField label="Pilihan Peminatan Akademik" id="track" required>
                <Select
                  id="track"
                  value={formData.track}
                  onChange={(e) => handleChange('track', e.target.value)}
                >
                  <option value="MIPA">MIPA (Matematika & Ilmu Pengetahuan Alam)</option>
                  <option value="IPS">IPS (Ilmu Pengetahuan Sosial & Humaniora)</option>
                </Select>
              </FormField>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>
              Langkah 4: Konfirmasi & Pernyataan Kebenaran Data
            </h3>

            <div style={{ backgroundColor: 'var(--color-surface-hover)', borderRadius: 'var(--radius-md)', padding: '16px', border: '1px solid var(--color-border)', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', fontSize: '0.9rem' }}>
                <div><strong>Nama:</strong> {formData.name || '-'}</div>
                <div><strong>NIK:</strong> {formData.nik || '-'}</div>
                <div><strong>NISN:</strong> {formData.nisN || formData.nisn || '-'}</div>
                <div><strong>Asal SMP:</strong> {formData.schoolOrigin || '-'}</div>
                <div><strong>Peminatan:</strong> {formData.track}</div>
                <div><strong>No. Kontak Orang Tua:</strong> {formData.parentPhone}</div>
              </div>
            </div>

            <Alert variant="info" style={{ marginBottom: '16px' }}>
              Setelah menekan tombol <strong>Ajukan Formulir Pendaftaran</strong>, status pendaftaran akan berubah menjadi <strong>Terkirim</strong> dan panitia akan menjadwalkan pemeriksaan kelengkapan berkas Anda.
            </Alert>
          </div>
        )}

        {/* Navigation & Submission Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <Button variant="outline" icon={Save} onClick={handleSaveDraft}>
            Simpan Draf
          </Button>

          <div style={{ display: 'flex', gap: '10px' }}>
            {currentStep > 1 && (
              <Button
                variant="outline"
                icon={ArrowLeft}
                onClick={() => setCurrentStep((prev) => prev - 1)}
              >
                Sebelumnya
              </Button>
            )}

            {currentStep < 4 ? (
              <Button
                variant="primary"
                icon={ArrowRight}
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                Lanjut ke Langkah {currentStep + 1}
              </Button>
            ) : (
              <Button
                variant="primary"
                icon={CheckCircle2}
                onClick={handleSubmitFinal}
                style={{ backgroundColor: 'var(--color-brand-600)' }}
              >
                Ajukan Formulir Pendaftaran
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
