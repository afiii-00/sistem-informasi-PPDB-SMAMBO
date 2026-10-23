# Sistem Informasi PPDB SMA Muhammadiyah Kota Bogor (SMAMBO)

Aplikasi web modern untuk Penerimaan Peserta Didik Baru (PPDB) SMA Muhammadiyah Kota Bogor Tahun Ajaran 2026/2027. Dibangun berdasarkan spesifikasi *Source of Truth (SOT)* dengan pendekatan Rapid Application Development (RAD), antarmuka biru futuristik SaaS, dan simulasi WhatsApp Gateway terpadu.

---

## 🌟 Fitur Utama

### 1. Portal Calon Siswa
- **Registrasi & Login Akun:** Pendaftaran dengan email dan nomor WhatsApp aktif, pembuatan nomor pendaftaran unik otomatis (`REG-2026-xxxx`).
- **Formulir Multi-Langkah:** Pengisian bertahap (Data Pribadi, Data Orang Tua/Wali, Asal Sekolah & Peminatan MIPA/IPS, serta Review & Konfirmasi) lengkap dengan fitur *Simpan Draf*.
- **Unggah & Kelola Berkas:** Upload Kartu Keluarga (KK), Akta Kelahiran, Ijazah/SKL, dan Pas Foto dengan status kelengkapan terkontrol.
- **Pelacakan Status & Timeline:** Pemantauan status pendaftaran (*Draft*, *Terkirim*, *Menunggu Verifikasi*, *Perlu Perbaikan*, *Diterima*, *Ditolak*).
- **Banner Revisi Berkas:** Menampilkan catatan perbaikan resmi dari panitia secara jelas saat dokumen perlu diperbaiki.

### 2. Portal Panitia Admin
- **Dashboard Statistik:** Ringkasan jumlah pendaftar, antrean verifikasi berkas, pendaftar yang perlu perbaikan, dan kuota daya tampung sekolah.
- **Manajemen Pendaftar:** Tabel data interaktif dengan pencarian multi-kriteria (Nama, No. REG, Asal Sekolah, No. WhatsApp), filter status, dan modal detail lengkap.
- **Verifikasi Berkas:** Pemeriksaan dokumen pendukung dengan aksi *Verifikasi Lengkap* atau *Minta Revisi Berkas* disertai catatan revisi.
- **Penetapan Hasil Seleksi:** Keputusan kelulusan resmi (*Diterima* / *Ditolak*) dengan konfirmasi modal keamanan.
- **Laporan & Ekspor:** Ekspor spreadsheet `.csv` yang disanitasi dari risiko *formula injection* serta dukungan *Print Preview / Simpan PDF*.
- **Pengaturan PPDB:** Konfigurasi periode pendaftaran, nama gelombang, dan target kuota siswa baru.
- **Audit Trail Log:** Rekam jejak seluruh aksi penting panitia untuk transparansi dan akuntabilitas.

### 3. WhatsApp Gateway Integration
- Notifikasi pendaftaran akun otomatis.
- Notifikasi perubahan status verifikasi dan permintaan revisi berkas.
- Notifikasi pengumuman hasil kelulusan seleksi.
- Monitoring log pengiriman pesan dengan nomor penerima yang disamarkan (*masked*), status delivery, dan opsi pengiriman ulang (*retry*).

---

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework:** React 19 + Vite 8
- **Routing:** React Router DOM (v7)
- **Styling:** Vanilla CSS dengan Design Tokens (`tokens.css` & `globals.css`)
- **Icons:** Lucide React
- **Typography:** Inter (Google Fonts)
- **State & Storage:** Stateful Mock Storage via Browser `localStorage` (siap disambungkan ke REST API backend)

---

## 🚀 Panduan Menjalankan Proyek

### Prasyarat
- Node.js (v18+)
- npm

### Instalasi & Menjalankan Server Lokal
```bash
# Clone repository
git clone https://github.com/afiii-00/sistem-informasi-PPDB-SMAMBO.git
cd sistem-informasi-PPDB-SMAMBO

# Install dependencies
npm install

# Jalankan server development
npm run dev
```

Buka browser di: **`http://localhost:5173/`**

### Build Produksi
```bash
npm run build
```

---

## 👥 Akun Demo untuk Pengujian

Pada halaman login (`/login`), Anda dapat menggunakan tombol pintas untuk langsung beralih peran:

### 1. Panitia Admin
- **Email:** `panitia@smambo.sch.id`
- **Kata Sandi:** `admin123`

### 2. Calon Siswa
- **Email / No. Pendaftaran:** `calon.siswa@demo.id`
- **Kata Sandi:** `siswa123`
*(Atau lakukan registrasi akun baru melalui tombol **Daftar Akun Baru**)*

---

## 📄 Lisensi & Hak Cipta
&copy; 2026 Panitia PPDB SMA Muhammadiyah Kota Bogor. Seluruh Hak Cipta Dilindungi.
