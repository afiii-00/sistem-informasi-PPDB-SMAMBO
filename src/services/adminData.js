import { env } from '../lib/env';
import { requireSupabase } from '../lib/supabase';
import { mockDb } from '../mocks/mockDb';
import { mapApplication } from './applicantData';

function mapSettings(row) {
  if (!row) return null;
  return {
    academicYear: row.academic_year,
    waveName: row.wave_name,
    quota: row.quota,
    registrationOpen: row.registration_open,
    startDate: row.start_date,
    endDate: row.end_date,
    schoolName: row.school_name,
    schoolAddress: row.school_address,
    schoolPhone: row.school_phone,
    schoolEmail: row.school_email,
  };
}

function mapWhatsAppLog(row) {
  return {
    id: row.id,
    applicantId: row.applications?.registration_number || '',
    recipient: row.recipient,
    name: row.applications?.name || 'Calon Siswa',
    type: row.message_type,
    content: row.message_type,
    status: row.delivery_status,
    time: new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(row.created_at)),
  };
}

function throwIfError({ error }) {
  if (error) throw error;
}

export const adminData = {
  async getApplicants() {
    if (env.USE_MOCK) return mockDb.getApplicants();
    const client = requireSupabase();
    const [{ data: applications, error: appError }, { data: profiles, error: profileError }] = await Promise.all([
      client.from('applications').select('*, application_documents(*)').order('created_at', { ascending: false }),
      client.from('profiles').select('id, email'),
    ]);
    if (appError) throw appError;
    if (profileError) throw profileError;
    const emailsByUser = new Map(profiles.map((profile) => [profile.id, profile.email]));
    return applications.map((row) => ({ ...mapApplication(row), email: emailsByUser.get(row.user_id) || '' }));
  },

  async getSettings() {
    if (env.USE_MOCK) return mockDb.getSettings();
    const { data, error } = await requireSupabase().from('ppdb_settings').select('*').eq('id', true).maybeSingle();
    if (error) throw error;
    return mapSettings(data);
  },

  async updateSettings(settings) {
    if (env.USE_MOCK) return mockDb.updateSettings(settings);
    const { error } = await requireSupabase().from('ppdb_settings').upsert({
      id: true,
      academic_year: settings.academicYear,
      wave_name: settings.waveName,
      quota: Number(settings.quota),
      registration_open: settings.registrationOpen ?? true,
      start_date: settings.startDate || null,
      end_date: settings.endDate || null,
      school_name: settings.schoolName,
      school_address: settings.schoolAddress,
      school_phone: settings.schoolPhone,
      school_email: settings.schoolEmail,
    }, { onConflict: 'id' });
    if (error) throw error;
  },

  async getAuditLogs() {
    if (env.USE_MOCK) return mockDb.getAuditLogs();
    const { data, error } = await requireSupabase().from('audit_logs').select('*').order('created_at', { ascending: false }).limit(100);
    if (error) throw error;
    return data.map((row) => ({
      id: row.id,
      actor: row.actor_id ? `Panitia (${row.actor_id.slice(0, 8)})` : 'Sistem',
      action: row.action,
      time: new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(row.created_at)),
    }));
  },

  async getWhatsAppLogs() {
    if (env.USE_MOCK) return mockDb.getWhatsAppLogs();
    const { data, error } = await requireSupabase()
      .from('whatsapp_logs')
      .select('*, applications(registration_number, name)')
      .order('created_at', { ascending: false })
      .limit(200);
    if (error) throw error;
    return data.map(mapWhatsAppLog);
  },

  async approveAllDocuments(registrationNumber) {
    if (env.USE_MOCK) return mockDb.approveAllDocuments(registrationNumber);
    const { error } = await requireSupabase().rpc('admin_review_application', {
      p_registration_number: registrationNumber,
      p_decision: 'approve',
      p_notes: '',
    });
    throwIfError({ error });
  },

  async requestRevision(registrationNumber, notes) {
    if (env.USE_MOCK) return mockDb.requestRevision(registrationNumber, notes);
    const { error } = await requireSupabase().rpc('admin_review_application', {
      p_registration_number: registrationNumber,
      p_decision: 'revision',
      p_notes: notes,
    });
    throwIfError({ error });
  },

  async setResult(registrationNumber, result) {
    if (env.USE_MOCK) return mockDb.setResult(registrationNumber, result);
    const { error } = await requireSupabase().rpc('admin_set_application_result', {
      p_registration_number: registrationNumber,
      p_result: result,
    });
    throwIfError({ error });
  },

  async retryWhatsAppMessage(messageId) {
    if (env.USE_MOCK) return mockDb.retryWhatsAppMessage(messageId);
    throw new Error('WhatsApp Gateway belum terhubung. Pengiriman ulang belum tersedia di mode Supabase.');
  },
};
