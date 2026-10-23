import React from 'react';
import { Calendar, FileCheck, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export function InfoPage() {
  return (
    <div style={{ padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: '700',
              color: 'var(--color-brand-600)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Informasi Resmi
          </span>
          <h1
            style={{
              fontSize: '2.4rem',
              fontWeight: '800',
              color: 'var(--color-brand-950)',
              marginTop: '8px',
              letterSpacing: '-0.02em',
            }}
          >
            Jadwal & Ketentuan PPDB 2026/2027
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '10px' }}>
            Simak tahapan pendaftaran, berkas persyaratan wajib, dan ketentuan seleksi calon peserta didik baru SMA Muhammadiyah Kota Bogor.
          </p>
        </div>

        {/* Schedule & Requirements Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {/* Schedule */}
          <Card
            title="Jadwal Pelaksanaan Gelombang 1"
            subtitle="Agenda penting seleksi penerimaan peserta didik baru"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
              {[
                { date: '15 Jan – 30 Mar 2026', title: 'Pendaftaran Akun & Pengisian Formulir', desc: 'Pengisian biodata diri dan upload berkas kelengkapan online.' },
                { date: '01 Apr – 05 Apr 2026', title: 'Verifikasi Berkas Panitia', desc: 'Pemeriksaan keabsahan dokumen oleh panitia PPDB.' },
                { date: '10 Apr 2026', title: 'Pengumuman Hasil Seleksi', desc: 'Pengumuman kelulusan di portal dan notifikasi WhatsApp.' },
                { date: '12 Apr – 20 Apr 2026', title: 'Daftar Ulang Siswa Baru', desc: 'Konfirmasi kehadiran dan administrasi peserta didik yang diterima.' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-brand-50)',
                      color: 'var(--color-brand-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: 'var(--color-brand-700)',
                        backgroundColor: 'var(--color-brand-100)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '4px',
                      }}
                    >
                      {item.date}
                    </span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-text)', margin: '2px 0' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Requirements */}
          <Card
            title="Persyaratan Berkas Dokumen"
            subtitle="Dokumen wajib diunggah dalam format PDF atau JPG/PNG (Maks 2MB)"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              {[
                { title: 'Kartu Keluarga (KK)', desc: 'Scan asli atau fotokopi legalisir Kartu Keluarga terbaru.' },
                { title: 'Akta Kelahiran', desc: 'Scan asli akta kelahiran calon siswa yang sah.' },
                { title: 'Ijazah / SKL SMP/MTs', desc: 'Surat Keterangan Lulus dari sekolah asal atau ijazah jika sudah terbit.' },
                { title: 'Pas Foto Terbaru (3x4)', desc: 'Pas foto berwarna dengan latar belakang merah/biru berseragam rapi.' },
                { title: 'Surat Keterangan Berkelakuan Baik', desc: 'Dari sekolah asal atau catatan kedisiplinan (opsional/pendukung).' },
              ].map((req, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-success)', marginTop: '2px', flexShrink: 0 }}>
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.925rem', fontWeight: '700', color: 'var(--color-text)' }}>
                      {req.title}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>
                      {req.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-brand-950)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px',
            color: '#FFFFFF',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <h3 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0 }}>
            Siap Bergabung dengan SMA Muhammadiyah Kota Bogor?
          </h3>
          <p style={{ color: '#DBEAFE', maxWidth: '560px', margin: 0, fontSize: '0.95rem' }}>
            Daftarkan diri Anda sekarang juga sebelum kuota terpenuhi. Dapatkan pendampingan langsung dari panitia.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg" icon={ArrowRight} style={{ backgroundColor: 'var(--color-brand-600)' }}>
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
