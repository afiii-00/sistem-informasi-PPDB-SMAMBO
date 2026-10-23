import React from 'react';
import { Card } from '../../components/ui/Card';
import { Bell, Calendar, ChevronRight } from 'lucide-react';

export function ApplicantAnnouncements() {
  const announcements = [
    {
      id: 1,
      title: 'Pembukaan Pendaftaran PPDB Gelombang 1 TP. 2026/2027',
      date: '15 Januari 2026',
      content: 'Pendaftaran gelombang 1 dibuka secara online untuk seluruh calon peserta didik baru. Dapatkan keringanan biaya pendaftaran bagi 50 pendaftar pertama.',
      pinned: true,
    },
    {
      id: 2,
      title: 'Ketentuan dan Panduan Scan Berkas Dokumen',
      date: '20 Januari 2026',
      content: 'Pastikan dokumen yang diunggah terbaca dengan jelas dan tidak buram untuk mempercepat proses verifikasi oleh tim panitia.',
      pinned: false,
    },
    {
      id: 3,
      title: 'Layanan Bantuan dan Helpdesk WhatsApp PPDB',
      date: '25 Januari 2026',
      content: 'Jika mengalami kendala pengisian formulir, silakan hubungi tim helpdesk panitia melalui nomor WhatsApp resmi pada hari kerja pukul 08:00 - 15:00 WIB.',
      pinned: false,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
          Pengumuman & Informasi PPDB
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Informasi penting dan update berkala dari Panitia PPDB SMA Muhammadiyah Kota Bogor.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {announcements.map((item) => (
          <Card key={item.id} hoverable>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-brand-50)',
                  color: 'var(--color-brand-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bell size={16} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} />
                  {item.date}
                </span>
                {item.pinned && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      backgroundColor: 'var(--color-brand-100)',
                      color: 'var(--color-brand-800)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    Penting
                  </span>
                )}
              </div>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-brand-950)', marginBottom: '8px' }}>
              {item.title}
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {item.content}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
