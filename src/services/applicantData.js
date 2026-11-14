import { env } from '../lib/env';
import { requireSupabase } from '../lib/supabase';
import { mockDb } from '../mocks/mockDb';

const FIELD_TO_COLUMN = {
  name: 'name',
  phone: 'phone',
  nik: 'nik',
  nisn: 'nisn',
  gender: 'gender',
  pob: 'place_of_birth',
  dob: 'date_of_birth',
  address: 'address',
  fatherName: 'father_name',
  fatherJob: 'father_job',
  motherName: 'mother_name',
  parentPhone: 'parent_phone',
  schoolOrigin: 'school_origin',
  schoolNpsn: 'school_npsn',
  gradYear: 'graduation_year',
  track: 'track',
};

export function mapApplication(row) {
  if (!row) return null;
  const documents = (row.application_documents || [])
    .slice()
    .sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));
  const latestDocuments = new Map();
  for (const document of documents) {
    if (!latestDocuments.has(document.document_type)) latestDocuments.set(document.document_type, document);
  }

  const documentNames = {
    kk: 'Kartu Keluarga',
    akta: 'Akta Kelahiran',
    skl: 'Ijazah / SKL SMP',
    foto: 'Pas Foto 3x4',
  };

  return {
    id: row.registration_number,
    registrationNumber: row.registration_number,
    databaseId: row.id,
    userId: row.user_id,
    name: row.name,
    phone: row.phone,
    nik: row.nik,
    nisn: row.nisn,
    gender: row.gender,
    pob: row.place_of_birth,
    dob: row.date_of_birth,
    address: row.address,
    fatherName: row.father_name,
    fatherJob: row.father_job,
    motherName: row.mother_name,
    parentPhone: row.parent_phone,
    schoolOrigin: row.school_origin,
    schoolNpsn: row.school_npsn,
    gradYear: row.graduation_year ? String(row.graduation_year) : '',
    track: row.track,
    avgScore: Number(row.average_score || 0),
    status: row.status,
    revisionNotes: row.revision_notes || '',
    createdAt: row.created_at,
    documents: Object.entries(documentNames).map(([id, name]) => {
      const document = latestDocuments.get(id);
      return {
        id,
        name,
        required: true,
        fileName: document?.original_file_name || null,
        storagePath: document?.storage_path || null,
        status: document?.status || 'missing',
        uploadedAt: document?.uploaded_at || null,
        revisionNotes: document?.review_notes || '',
      };
    }),
  };
}

export const applicantData = {
  async getApplicantById(registrationNumber) {
    if (env.USE_MOCK) return mockDb.getApplicantById(registrationNumber);
    const client = requireSupabase();
    const { data, error } = await client
      .from('applications')
      .select('*, application_documents(*)')
      .eq('registration_number', registrationNumber)
      .maybeSingle();
    if (error) throw error;
    return mapApplication(data);
  },

  async updateApplicant(registrationNumber, updates) {
    if (env.USE_MOCK) return mockDb.updateApplicant(registrationNumber, updates);
    const client = requireSupabase();
    const payload = Object.fromEntries(
      Object.entries(updates)
        .filter(([key]) => FIELD_TO_COLUMN[key])
        .map(([key, value]) => [FIELD_TO_COLUMN[key], key === 'gradYear' ? (value ? Number(value) : null) : value])
    );
    const { data, error } = await client
      .from('applications')
      .update(payload)
      .eq('registration_number', registrationNumber)
      .select('*, application_documents(*)')
      .single();
    if (error) throw error;
    return mapApplication(data);
  },

  async submitRegistration(registrationNumber) {
    if (env.USE_MOCK) return mockDb.submitRegistration(registrationNumber);
    const { error } = await requireSupabase().rpc('applicant_submit_registration', {
      p_registration_number: registrationNumber,
    });
    if (error) throw error;
    return this.getApplicantById(registrationNumber);
  },

  async uploadDocument(registrationNumber, documentType, file) {
    if (env.USE_MOCK) {
      mockDb.uploadDocument(registrationNumber, documentType, typeof file === 'string' ? file : file.name);
      return mockDb.getApplicantById(registrationNumber);
    }
    if (!(file instanceof File)) throw new Error('Pilih file yang akan diunggah.');
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      throw new Error('File harus berformat PDF, JPG, atau PNG.');
    }
    if (file.size > 2 * 1024 * 1024) throw new Error('Ukuran file maksimal 2 MB.');

    const client = requireSupabase();
    const applicant = await this.getApplicantById(registrationNumber);
    if (!applicant) throw new Error('Data pendaftaran tidak ditemukan.');
    const { data: authData, error: authError } = await client.auth.getUser();
    if (authError) throw authError;
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `${authData.user.id}/${applicant.databaseId}/${documentType}/${crypto.randomUUID()}-${safeName}`;

    const { error: uploadError } = await client.storage.from('ppdb-documents').upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    });
    if (uploadError) throw uploadError;

    const { error: insertError } = await client.from('application_documents').insert({
      application_id: applicant.databaseId,
      document_type: documentType,
      storage_path: storagePath,
      original_file_name: file.name,
    });
    if (insertError) {
      await client.storage.from('ppdb-documents').remove([storagePath]);
      throw insertError;
    }
    return this.getApplicantById(registrationNumber);
  },
};
