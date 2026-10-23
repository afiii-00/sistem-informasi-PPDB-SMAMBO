/**
 * Mock Database & Stateful Storage for PPDB SMA Muhammadiyah Kota Bogor
 * Stores applicants, documents, WhatsApp logs, settings, and audit trails in localStorage.
 */

const DB_KEY = 'ppdb_smambo_db_v1';

const INITIAL_DATA = {
  settings: {
    academicYear: '2026/2027',
    waveName: 'Gelombang 1',
    quota: 200,
    registrationOpen: true,
    startDate: '2026-01-15',
    endDate: '2026-03-30',
    schoolName: 'SMA Muhammadiyah Kota Bogor',
    schoolAddress: 'Jl. Mayor Oking Jaya Atmaja No. 27, Kota Bogor, Jawa Barat',
    schoolPhone: '(0251) 832-1234',
    schoolEmail: 'ppdb@smamuhammadiyahbogor.sch.id',
  },
  applicants: [
    {
      id: 'REG-2026-0042',
      name: 'Nabila Nurul Aini',
      email: 'nabila.nurul@gmail.com',
      phone: '081299887766',
      gender: 'P',
      pob: 'Bogor',
      dob: '2010-05-14',
      nik: '3271015405100001',
      nisn: '0105423891',
      address: 'Jl. Pahlawan No. 45, RT 02/RW 04, Empang, Bogor Selatan',
      fatherName: 'Bambang Irawan',
      fatherJob: 'Karyawan Swasta',
      motherName: 'Nurul Hidayati',
      parentPhone: '081299887766',
      schoolOrigin: 'SMPN 1 Kota Bogor',
      schoolNpsn: '20220451',
      gradYear: '2026',
      track: 'MIPA',
      avgScore: 91.2,
      status: 'under_review',
      createdAt: '2026-10-23T11:20:00Z',
      documents: [
        { id: 'kk', name: 'Kartu Keluarga', required: true, fileName: 'scan_kk_nabila.pdf', status: 'valid', uploadedAt: '2026-10-23T11:25:00Z' },
        { id: 'akta', name: 'Akta Kelahiran', required: true, fileName: 'akta_nabila.pdf', status: 'valid', uploadedAt: '2026-10-23T11:26:00Z' },
        { id: 'skl', name: 'Ijazah / SKL SMP', required: true, fileName: 'skl_smpn1_nabila.pdf', status: 'pending', uploadedAt: '2026-10-23T11:28:00Z' },
        { id: 'foto', name: 'Pas Foto 3x4', required: true, fileName: 'foto_nabila_formal.jpg', status: 'valid', uploadedAt: '2026-10-23T11:24:00Z' },
      ],
      revisionNotes: '',
    },
    {
      id: 'REG-2026-0041',
      name: 'Muhammad Rizky Ramadhan',
      email: 'rizky.ramadhan@gmail.com',
      phone: '085711223344',
      gender: 'L',
      pob: 'Bogor',
      dob: '2010-09-22',
      nik: '3271022209100002',
      nisn: '0109283741',
      address: 'Kp. Muara RT 03/RW 01, Pasir Jaya, Bogor Barat',
      fatherName: 'Ahmad Ramadhan',
      fatherJob: 'Wiraswasta',
      motherName: 'Siti Maryam',
      parentPhone: '085711223344',
      schoolOrigin: 'MTs Muhammadiyah Bogor',
      schoolNpsn: '20278192',
      gradYear: '2026',
      track: 'MIPA',
      avgScore: 92.5,
      status: 'accepted',
      createdAt: '2026-10-23T10:10:00Z',
      documents: [
        { id: 'kk', name: 'Kartu Keluarga', required: true, fileName: 'kk_rizky.pdf', status: 'valid', uploadedAt: '2026-10-23T10:12:00Z' },
        { id: 'akta', name: 'Akta Kelahiran', required: true, fileName: 'akta_rizky.pdf', status: 'valid', uploadedAt: '2026-10-23T10:13:00Z' },
        { id: 'skl', name: 'Ijazah / SKL SMP', required: true, fileName: 'skl_mts_muhammadiyah.pdf', status: 'valid', uploadedAt: '2026-10-23T10:14:00Z' },
        { id: 'foto', name: 'Pas Foto 3x4', required: true, fileName: 'foto_rizky.jpg', status: 'valid', uploadedAt: '2026-10-23T10:11:00Z' },
      ],
      revisionNotes: '',
    },
    {
      id: 'REG-2026-0040',
      name: 'Zahra Putri Kirana',
      email: 'zahra.kirana@gmail.com',
      phone: '081344556677',
      gender: 'P',
      pob: 'Jakarta',
      dob: '2010-03-18',
      nik: '3271031803100003',
      nisn: '0103182940',
      address: 'Jl. Merdeka No. 12, Ciwaringin, Bogor Tengah',
      fatherName: 'Hendra Kirana',
      fatherJob: 'PNS',
      motherName: 'Ratna Dewi',
      parentPhone: '081344556677',
      schoolOrigin: 'SMPN 4 Bogor',
      schoolNpsn: '20220454',
      gradYear: '2026',
      track: 'IPS',
      avgScore: 84.0,
      status: 'needs_revision',
      createdAt: '2026-10-22T13:40:00Z',
      documents: [
        { id: 'kk', name: 'Kartu Keluarga', required: true, fileName: 'scan_kk_buram.jpg', status: 'invalid', uploadedAt: '2026-10-22T13:45:00Z' },
        { id: 'akta', name: 'Akta Kelahiran', required: true, fileName: 'akta_zahra.pdf', status: 'valid', uploadedAt: '2026-10-22T13:46:00Z' },
        { id: 'skl', name: 'Ijazah / SKL SMP', required: true, fileName: 'skl_zahra.pdf', status: 'valid', uploadedAt: '2026-10-22T13:47:00Z' },
        { id: 'foto', name: 'Pas Foto 3x4', required: true, fileName: 'foto_zahra.jpg', status: 'valid', uploadedAt: '2026-10-22T13:44:00Z' },
      ],
      revisionNotes: 'File scan Kartu Keluarga buram dan tidak terbaca jelas. Harap unggah ulang dokumen yang tajam/asli.',
    },
    {
      id: 'REG-2026-0039',
      name: 'Dimas Bagus Wicaksono',
      email: 'dimas.wicaksono@gmail.com',
      phone: '087812345678',
      gender: 'L',
      pob: 'Bogor',
      dob: '2010-07-09',
      nik: '3271040907100004',
      nisn: '0107094821',
      address: 'Perum Yasmin Sektor 3 No. 18, Curugmekar, Bogor Barat',
      fatherName: 'Bagus Wicaksono',
      fatherJob: 'Karyawan BUMN',
      motherName: 'Endang Lestari',
      parentPhone: '087812345678',
      schoolOrigin: 'SMP IT Al-Madinah',
      schoolNpsn: '20271092',
      gradYear: '2026',
      track: 'IPS',
      avgScore: 88.5,
      status: 'submitted',
      createdAt: '2026-10-22T16:30:00Z',
      documents: [
        { id: 'kk', name: 'Kartu Keluarga', required: true, fileName: 'kk_dimas.pdf', status: 'pending', uploadedAt: '2026-10-22T16:35:00Z' },
        { id: 'akta', name: 'Akta Kelahiran', required: true, fileName: 'akta_dimas.pdf', status: 'pending', uploadedAt: '2026-10-22T16:36:00Z' },
        { id: 'skl', name: 'Ijazah / SKL SMP', required: true, fileName: 'skl_dimas.pdf', status: 'pending', uploadedAt: '2026-10-22T16:37:00Z' },
        { id: 'foto', name: 'Pas Foto 3x4', required: true, fileName: 'pasfoto_dimas.jpg', status: 'pending', uploadedAt: '2026-10-22T16:34:00Z' },
      ],
      revisionNotes: '',
    },
    {
      id: 'REG-2026-0038',
      name: 'Ahmad Faiz Pratama',
      email: 'calon.siswa@demo.id',
      phone: '081234567890',
      gender: 'L',
      pob: 'Bogor',
      dob: '2010-01-15',
      nik: '3271051501100005',
      nisn: '0101158293',
      address: 'Jl. Pemuda No. 22, Tanah Sareal, Kota Bogor',
      fatherName: 'Ir. Pratama Kusuma',
      fatherJob: 'Wiraswasta',
      motherName: 'Dra. Fatimah Zahra',
      parentPhone: '081234567890',
      schoolOrigin: 'SMPN 2 Kota Bogor',
      schoolNpsn: '20220452',
      gradYear: '2026',
      track: 'MIPA',
      avgScore: 89.0,
      status: 'draft',
      createdAt: '2026-10-21T09:15:00Z',
      documents: [
        { id: 'kk', name: 'Kartu Keluarga', required: true, fileName: 'scan_kk_asli.pdf', status: 'valid', uploadedAt: '2026-10-21T09:20:00Z' },
        { id: 'akta', name: 'Akta Kelahiran', required: true, fileName: 'akta_kelahiran.pdf', status: 'valid', uploadedAt: '2026-10-21T09:22:00Z' },
        { id: 'skl', name: 'Ijazah / SKL SMP', required: true, fileName: null, status: 'missing', uploadedAt: null },
        { id: 'foto', name: 'Pas Foto 3x4', required: true, fileName: 'pas_foto_formal.jpg', status: 'valid', uploadedAt: '2026-10-21T09:18:00Z' },
      ],
      revisionNotes: '',
    },
  ],
  whatsAppLogs: [
    {
      id: 'MSG-0092',
      applicantId: 'REG-2026-0042',
      recipient: '081299887766',
      name: 'Nabila Nurul Aini',
      type: 'Konfirmasi Pendaftaran',
      content: 'Terima kasih telah mendaftar di SMA Muhammadiyah Bogor. No. Pendaftaran: REG-2026-0042.',
      status: 'delivered',
      time: '23 Okt 2026, 11:21 WIB',
    },
    {
      id: 'MSG-0091',
      applicantId: 'REG-2026-0041',
      recipient: '085711223344',
      name: 'Muhammad Rizky Ramadhan',
      type: 'Notifikasi Hasil Seleksi',
      content: 'Selamat! Berdasarkan hasil seleksi, Anda dinyatakan DITERIMA di SMA Muhammadiyah Kota Bogor.',
      status: 'delivered',
      time: '23 Okt 2026, 10:15 WIB',
    },
    {
      id: 'MSG-0090',
      applicantId: 'REG-2026-0040',
      recipient: '081344556677',
      name: 'Zahra Putri Kirana',
      type: 'Permintaan Perbaikan Berkas',
      content: 'Pemberitahuan: Scan Kartu Keluarga Anda tidak terbaca. Harap lakukan upload ulang berkas melalui portal.',
      status: 'delivered',
      time: '22 Okt 2026, 14:00 WIB',
    },
    {
      id: 'MSG-0089',
      applicantId: 'REG-2026-0039',
      recipient: '087812345678',
      name: 'Dimas Bagus Wicaksono',
      type: 'Konfirmasi Pengajuan Berkas',
      content: 'Berkas pendaftaran Anda telah berhasil diserahkan ke panitia untuk tahap verifikasi dokumen.',
      status: 'delivered',
      time: '22 Okt 2026, 16:38 WIB',
    },
  ],
  auditLogs: [
    { id: 1, actor: 'Panitia PPDB (adm_01)', action: 'Menetapkan hasil seleksi REG-2026-0041 menjadi DITERIMA', time: '23 Okt 2026, 10:15 WIB' },
    { id: 2, actor: 'Panitia PPDB (adm_01)', action: 'Mengirim catatan revisi berkas ke REG-2026-0040', time: '22 Okt 2026, 14:00 WIB' },
    { id: 3, actor: 'Sistem', action: 'Nomor registrasi REG-2026-0042 diterbitkan untuk Nabila Nurul Aini', time: '23 Okt 2026, 11:20 WIB' },
  ],
};

function getDb() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DATA;
  }
}

function saveDb(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

export const mockDb = {
  // Applicants
  getApplicants: () => getDb().applicants,
  
  getApplicantById: (id) => {
    const db = getDb();
    return db.applicants.find((a) => a.id === id) || null;
  },

  getApplicantByEmail: (email) => {
    const db = getDb();
    return db.applicants.find((a) => a.email.toLowerCase() === email.toLowerCase()) || null;
  },

  createApplicant: (payload) => {
    const db = getDb();
    const count = db.applicants.length + 43;
    const regNo = `REG-2026-00${count}`;
    
    const newApplicant = {
      id: regNo,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      gender: payload.gender || 'L',
      pob: payload.pob || 'Bogor',
      dob: payload.dob || '2010-01-01',
      nik: payload.nik || '',
      nisn: payload.nisn || '',
      address: payload.address || '',
      fatherName: payload.fatherName || '',
      fatherJob: payload.fatherJob || '',
      motherName: payload.motherName || '',
      parentPhone: payload.phone || '',
      schoolOrigin: payload.schoolOrigin || '',
      schoolNpsn: payload.schoolNpsn || '',
      gradYear: payload.gradYear || '2026',
      track: payload.track || 'MIPA',
      avgScore: 0,
      status: 'draft',
      createdAt: new Date().toISOString(),
      documents: [
        { id: 'kk', name: 'Kartu Keluarga', required: true, fileName: null, status: 'missing', uploadedAt: null },
        { id: 'akta', name: 'Akta Kelahiran', required: true, fileName: null, status: 'missing', uploadedAt: null },
        { id: 'skl', name: 'Ijazah / SKL SMP', required: true, fileName: null, status: 'missing', uploadedAt: null },
        { id: 'foto', name: 'Pas Foto 3x4', required: true, fileName: null, status: 'missing', uploadedAt: null },
      ],
      revisionNotes: '',
    };

    db.applicants.unshift(newApplicant);

    // Record audit log
    db.auditLogs.unshift({
      id: Date.now(),
      actor: 'Sistem',
      action: `Registrasi akun baru: ${newApplicant.name} (${regNo})`,
      time: new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
    });

    // Record welcome WhatsApp simulated notification
    db.whatsAppLogs.unshift({
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      applicantId: regNo,
      recipient: payload.phone,
      name: payload.name,
      type: 'Konfirmasi Registrasi Akun',
      content: `Selamat datang di PPDB SMA Muhammadiyah Bogor! Akun pendaftaran Anda telah berhasil dibuat dengan No. Pendaftaran: ${regNo}. Silakan lengkapi biodata dan berkas Anda.`,
      status: 'delivered',
      time: 'Baru saja',
    });

    saveDb(db);
    return newApplicant;
  },

  updateApplicant: (id, updates) => {
    const db = getDb();
    const idx = db.applicants.findIndex((a) => a.id === id);
    if (idx !== -1) {
      db.applicants[idx] = { ...db.applicants[idx], ...updates };
      db.auditLogs.unshift({
        id: Date.now(),
        actor: 'Calon Siswa',
        action: `Pembaruan data formulir: ${db.applicants[idx].name} (${id})`,
        time: new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
      });
      saveDb(db);
      return db.applicants[idx];
    }
    return null;
  },

  submitRegistration: (id) => {
    const db = getDb();
    const idx = db.applicants.findIndex((a) => a.id === id);
    if (idx !== -1) {
      db.applicants[idx].status = 'submitted';
      
      // WhatsApp notification
      db.whatsAppLogs.unshift({
        id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
        applicantId: id,
        recipient: db.applicants[idx].phone,
        name: db.applicants[idx].name,
        type: 'Konfirmasi Pengajuan Pendaftaran',
        content: `Berkas pendaftaran Anda (${id}) telah diserahkan dan saat ini masuk antrean verifikasi panitia PPDB SMA Muhammadiyah Kota Bogor.`,
        status: 'delivered',
        time: 'Baru saja',
      });

      db.auditLogs.unshift({
        id: Date.now(),
        actor: 'Calon Siswa',
        action: `Pengajuan formulir & berkas final oleh ${db.applicants[idx].name} (${id})`,
        time: new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
      });

      saveDb(db);
      return db.applicants[idx];
    }
    return null;
  },

  uploadDocument: (applicantId, docId, fileName) => {
    const db = getDb();
    const app = db.applicants.find((a) => a.id === applicantId);
    if (app) {
      const doc = app.documents.find((d) => d.id === docId);
      if (doc) {
        doc.fileName = fileName;
        doc.uploadedAt = new Date().toISOString();
        doc.status = 'pending';
        saveDb(db);
        return doc;
      }
    }
    return null;
  },

  // Admin Verification
  verifyDocument: (applicantId, docId, status) => {
    const db = getDb();
    const app = db.applicants.find((a) => a.id === applicantId);
    if (app) {
      const doc = app.documents.find((d) => d.id === docId);
      if (doc) {
        doc.status = status;
        saveDb(db);
        return doc;
      }
    }
    return null;
  },

  approveAllDocuments: (applicantId) => {
    const db = getDb();
    const app = db.applicants.find((a) => a.id === applicantId);
    if (app) {
      app.documents.forEach((d) => { d.status = 'valid'; });
      app.status = 'under_review';
      
      db.auditLogs.unshift({
        id: Date.now(),
        actor: 'Panitia PPDB',
        action: `Seluruh dokumen ${app.name} (${applicantId}) ditandai lengkap dan valid.`,
        time: new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
      });

      db.whatsAppLogs.unshift({
        id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
        applicantId,
        recipient: app.phone,
        name: app.name,
        type: 'Status Verifikasi Berkas',
        content: `Kabar baik! Seluruh dokumen persyaratan pendaftaran Anda (${applicantId}) telah diverifikasi lengkap dan valid oleh panitia.`,
        status: 'delivered',
        time: 'Baru saja',
      });

      saveDb(db);
      return app;
    }
    return null;
  },

  requestRevision: (applicantId, notes) => {
    const db = getDb();
    const app = db.applicants.find((a) => a.id === applicantId);
    if (app) {
      app.status = 'needs_revision';
      app.revisionNotes = notes;

      db.auditLogs.unshift({
        id: Date.now(),
        actor: 'Panitia PPDB',
        action: `Permintaan revisi berkas untuk ${app.name} (${applicantId}): "${notes}"`,
        time: new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
      });

      db.whatsAppLogs.unshift({
        id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
        applicantId,
        recipient: app.phone,
        name: app.name,
        type: 'Permintaan Perbaikan Berkas',
        content: `Perhatian: Ada berkas yang perlu diperbaiki pada pendaftaran ${applicantId}. Catatan Panitia: "${notes}". Silakan masuk ke portal untuk unggah ulang.`,
        status: 'delivered',
        time: 'Baru saja',
      });

      saveDb(db);
      return app;
    }
    return null;
  },

  setResult: (applicantId, result) => {
    const db = getDb();
    const app = db.applicants.find((a) => a.id === applicantId);
    if (app) {
      app.status = result; // 'accepted' | 'rejected'

      const isAccepted = result === 'accepted';
      db.auditLogs.unshift({
        id: Date.now(),
        actor: 'Panitia PPDB',
        action: `Penetapan hasil seleksi: ${app.name} (${applicantId}) ditetapkan ${isAccepted ? 'DITERIMA' : 'TIDAK DITERIMA'}`,
        time: new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
      });

      db.whatsAppLogs.unshift({
        id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
        applicantId,
        recipient: app.phone,
        name: app.name,
        type: 'Pengumuman Hasil Seleksi',
        content: isAccepted
          ? `Selamat! Calon siswa ${app.name} (${applicantId}) dinyatakan DITERIMA di SMA Muhammadiyah Kota Bogor. Silakan lakukan proses daftar ulang sesuai jadwal.`
          : `Terima kasih telah berpartisipasi dalam seleksi PPDB SMA Muhammadiyah Kota Bogor. Berdasarkan kuota dan hasil seleksi, calon siswa ${app.name} belum dapat kami terima. Tetap semangat.`,
        status: 'delivered',
        time: 'Baru saja',
      });

      saveDb(db);
      return app;
    }
    return null;
  },

  // WhatsApp & Settings
  getWhatsAppLogs: () => getDb().whatsAppLogs,
  
  retryWhatsAppMessage: (msgId) => {
    const db = getDb();
    const msg = db.whatsAppLogs.find((m) => m.id === msgId);
    if (msg) {
      msg.status = 'delivered';
      msg.time = 'Baru saja (Retry)';
      saveDb(db);
      return msg;
    }
    return null;
  },

  getSettings: () => getDb().settings,
  updateSettings: (newSettings) => {
    const db = getDb();
    db.settings = { ...db.settings, ...newSettings };
    db.auditLogs.unshift({
      id: Date.now(),
      actor: 'Panitia PPDB',
      action: `Konfigurasi PPDB diperbarui: Kuota ${db.settings.quota}, Gelombang: ${db.settings.waveName}`,
      time: new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
    });
    saveDb(db);
    return db.settings;
  },

  getAuditLogs: () => getDb().auditLogs,
};
