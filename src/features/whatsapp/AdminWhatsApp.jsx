import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { MessageSquare, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { maskPhoneNumber } from '../../lib/formatters';
import { mockDb } from '../../mocks/mockDb';

export function AdminWhatsApp() {
  const [messages, setMessages] = useState([]);

  const loadData = () => {
    setMessages(mockDb.getWhatsAppLogs());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRetry = (msgId) => {
    mockDb.retryWhatsAppMessage(msgId);
    loadData();
    alert(`Pengiriman ulang pesan ${msgId} berhasil disimulasikan dan tercatat.`);
  };

  const deliveredCount = messages.filter((m) => m.status === 'delivered').length;
  const failedCount = messages.filter((m) => m.status === 'failed').length;
  const rate = messages.length > 0 ? Math.round((deliveredCount / messages.length) * 100) : 100;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-brand-950)', margin: 0 }}>
          WhatsApp Gateway & Riwayat Notifikasi
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Monitoring pengiriman notifikasi otomatis PPDB ke nomor WhatsApp calon siswa dan orang tua.
        </p>
      </div>

      <Alert variant="info" style={{ marginBottom: '24px' }}>
        <strong>Mode Gateway Simulasi Terisolasi (RAD Baseline):</strong> Seluruh pesan pendaftaran, verifikasi berkas, dan hasil seleksi tercatat secara otomatis. Kredensial provider eksternal dijaga aman di sisi backend.
      </Alert>

      {/* Gateway Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Status Server Provider</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-success)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }} />
            Terhubung (Mock Service)
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Latency Rata-rata: 110ms</div>
        </Card>

        <Card>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Pesan Terkirim Sukses</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-brand-950)', marginTop: '4px' }}>{deliveredCount} Pesan</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', marginTop: '4px' }}>Tingkat Pengiriman: {rate}%</div>
        </Card>

        <Card>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Gagal / Perlu Retry</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: failedCount > 0 ? 'var(--color-danger)' : 'var(--color-text-muted)', marginTop: '4px' }}>
            {failedCount} Pesan
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {failedCount > 0 ? 'Nomor tidak valid / tidak terdaftar' : 'Semua pesan terkirim'}
          </div>
        </Card>
      </div>

      {/* Message History Table */}
      <Card title="Riwayat Notifikasi WhatsApp" subtitle="Daftar pesan terpicu dari peristiwa pendaftaran, verifikasi, dan kelulusan">
        <div style={{ overflowX: 'auto', marginTop: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '10px 8px', fontWeight: '600' }}>ID Pesan</th>
                <th style={{ padding: '10px 8px', fontWeight: '600' }}>Penerima (Masked)</th>
                <th style={{ padding: '10px 8px', fontWeight: '600' }}>Jenis Notifikasi</th>
                <th style={{ padding: '10px 8px', fontWeight: '600' }}>Isi Pesan</th>
                <th style={{ padding: '10px 8px', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '10px 8px', fontWeight: '600' }}>Waktu</th>
                <th style={{ padding: '10px 8px', fontWeight: '600', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: '700', color: 'var(--color-brand-700)' }}>
                    {msg.id}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <div style={{ fontWeight: '600', color: 'var(--color-text)' }}>{msg.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {maskPhoneNumber(msg.recipient)}
                    </div>
                  </td>
                  <td style={{ padding: '12px 8px', fontWeight: '600', color: 'var(--color-brand-800)' }}>
                    {msg.type}
                  </td>
                  <td style={{ padding: '12px 8px', color: 'var(--color-text-secondary)', maxWidth: '320px', lineHeight: 1.4 }}>
                    {msg.content}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    {msg.status === 'delivered' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-success)', fontSize: '0.8rem', fontWeight: '600' }}>
                        <CheckCircle2 size={14} /> Terkirim
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-danger)', fontSize: '0.8rem', fontWeight: '600' }}>
                        <AlertCircle size={14} /> Gagal
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {msg.time}
                  </td>
                  <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                    {msg.status === 'failed' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={RefreshCw}
                        onClick={() => handleRetry(msg.id)}
                      >
                        Kirim Ulang
                      </Button>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
