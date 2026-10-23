import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Award, 
  Users, 
  MessageSquare,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0B1F46 0%, #17458F 60%, #1D5BC4 100%)',
          color: '#FFFFFF',
          padding: '80px 0 100px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Futuristic Background Accents */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(11, 31, 70, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#DBEAFE',
                marginBottom: '24px',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Sparkles size={16} color="#60A5FA" />
              <span>Portal Resmi PPDB TP. 2026/2027</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: '800',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
                color: '#FFFFFF',
              }}
            >
              Raih Masa Depan Gemilang di <span style={{ color: '#93C5FD' }}>SMA Muhammadiyah</span> Kota Bogor
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: 1.6,
                color: '#DBEAFE',
                maxWidth: '680px',
                margin: '0 auto 36px auto',
              }}
            >
              Pendaftaran online mudah, transparan, dan terintegrasi notifikasi status pendaftaran langsung melalui WhatsApp Gateway.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              <Link to="/register">
                <Button variant="primary" size="lg" icon={ArrowRight} style={{ backgroundColor: '#2563EB' }}>
                  Daftar Sekarang
                </Button>
              </Link>
              <Link to="/informasi">
                <Button variant="outline" size="lg" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}>
                  Alur & Persyaratan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Stats strip */}
      <section style={{ transform: 'translateY(-30px)', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--color-border)',
              padding: '28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={26} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-brand-950)' }}>Akreditasi A</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>BAN-S/M Jawa Barat</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={26} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-brand-950)' }}>Kurikulum Merdeka</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Fokus Minat & Bakat</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare size={26} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-brand-950)' }}>WhatsApp Alert</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Notifikasi Status Otomatis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Steps Registration Workflow */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-brand-600)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Alur Pendaftaran
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-brand-950)', marginTop: '8px' }}>
              4 Langkah Mudah Menjadi Siswa
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '8px' }}>
              Proses registrasi serba digital tanpa perlu antre fisik di sekolah.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                step: '01',
                title: 'Buat Akun PPDB',
                desc: 'Daftarkan diri dengan nama lengkap, nomor WhatsApp, dan kata sandi.',
                icon: Users,
              },
              {
                step: '02',
                title: 'Isi Formulir',
                desc: 'Lengkapi biodata diri, alamat, asal SMP/MTs, dan data orang tua/wali.',
                icon: FileText,
              },
              {
                step: '03',
                title: 'Unggah Berkas',
                desc: 'Upload foto/scan Kartu Keluarga, Akta Kelahiran, dan Surat Keterangan Lulus.',
                icon: ShieldCheck,
              },
              {
                step: '04',
                title: 'Pantau Status',
                desc: 'Dapatkan verifikasi panitia dan hasil pengumuman melalui portal & WhatsApp.',
                icon: Clock,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} hoverable style={{ position: 'relative' }}>
                  <div
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: '800',
                      color: 'var(--color-brand-100)',
                      position: 'absolute',
                      top: '16px',
                      right: '20px',
                      lineHeight: 1,
                    }}
                  >
                    {item.step}
                  </div>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-brand-50)',
                      color: 'var(--color-brand-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-brand-950)', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </Card>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/register">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Mulai Pendaftaran Online
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
