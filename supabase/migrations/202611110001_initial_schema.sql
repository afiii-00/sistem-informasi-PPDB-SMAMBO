-- Initial Supabase PostgreSQL schema for PPDB SMAMBO.
-- Tables are private by default and protected by RLS.

create sequence if not exists public.registration_number_seq;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null default '',
  full_name text not null default '',
  phone text not null default '',
  role text not null default 'applicant' check (role in ('applicant', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  registration_number text not null unique default (
    'REG-' || extract(year from now())::text || '-' ||
    lpad(nextval('public.registration_number_seq')::text, 5, '0')
  ),
  academic_year text not null default '2026/2027',
  name text not null default '',
  phone text not null default '',
  nik text not null default '' check (nik = '' or nik ~ '^[0-9]{16}$'),
  nisn text not null default '' check (nisn = '' or nisn ~ '^[0-9]{10}$'),
  gender text check (gender in ('L', 'P')),
  place_of_birth text not null default '',
  date_of_birth date,
  address text not null default '',
  father_name text not null default '',
  father_job text not null default '',
  mother_name text not null default '',
  parent_phone text not null default '',
  school_origin text not null default '',
  school_npsn text not null default '' check (school_npsn = '' or school_npsn ~ '^[0-9]{8}$'),
  graduation_year integer,
  track text check (track in ('MIPA', 'IPS')),
  average_score numeric(5, 2) check (average_score between 0 and 100),
  status text not null default 'draft' check (
    status in ('draft', 'submitted', 'under_review', 'needs_revision', 'accepted', 'rejected')
  ),
  revision_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  document_type text not null check (document_type in ('kk', 'akta', 'skl', 'foto')),
  storage_path text not null unique,
  original_file_name text not null,
  status text not null default 'pending' check (status in ('pending', 'valid', 'invalid', 'missing')),
  review_notes text not null default '',
  uploaded_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles (id) on delete set null
);

create table if not exists public.ppdb_settings (
  id boolean primary key default true check (id),
  academic_year text not null default '2026/2027',
  wave_name text not null default 'Gelombang 1',
  quota integer not null default 200 check (quota >= 0),
  registration_open boolean not null default true,
  start_date date,
  end_date date,
  school_name text not null default 'SMA Muhammadiyah Kota Bogor',
  school_address text not null default '',
  school_phone text not null default '',
  school_email text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.ppdb_settings (id) values (true)
on conflict (id) do nothing;

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.whatsapp_logs (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications (id) on delete set null,
  recipient text not null,
  message_type text not null,
  delivery_status text not null default 'queued' check (
    delivery_status in ('queued', 'sent', 'delivered', 'failed')
  ),
  provider_message_id text,
  error_message text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create index if not exists applications_status_created_idx on public.applications (status, created_at desc);
create unique index if not exists applications_year_nik_unique_idx
  on public.applications (academic_year, nik) where nik <> '';
create unique index if not exists applications_year_nisn_unique_idx
  on public.applications (academic_year, nisn) where nisn <> '';
create index if not exists documents_application_idx on public.application_documents (application_id, document_type);
create index if not exists announcements_published_idx on public.announcements (published, published_at desc);
create index if not exists audit_logs_created_idx on public.audit_logs (created_at desc);
create index if not exists whatsapp_logs_created_idx on public.whatsapp_logs (created_at desc);

create or replace function public.current_user_is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;
revoke all on function public.current_user_is_admin() from public;
grant execute on function public.current_user_is_admin() to authenticated;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.audit_ppdb_change()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  change_type text;
  change_id text;
  change_action text;
  change_details jsonb;
begin
  if tg_table_name = 'applications' and tg_op = 'UPDATE' then
    if old.name is distinct from new.name or old.phone is distinct from new.phone
       or old.nik is distinct from new.nik or old.nisn is distinct from new.nisn
       or old.gender is distinct from new.gender or old.place_of_birth is distinct from new.place_of_birth
       or old.date_of_birth is distinct from new.date_of_birth or old.address is distinct from new.address
       or old.father_name is distinct from new.father_name or old.father_job is distinct from new.father_job
       or old.mother_name is distinct from new.mother_name or old.parent_phone is distinct from new.parent_phone
       or old.school_origin is distinct from new.school_origin or old.school_npsn is distinct from new.school_npsn
       or old.graduation_year is distinct from new.graduation_year or old.track is distinct from new.track then
      change_type := 'application';
      change_id := new.registration_number;
      change_action := 'Memperbarui data formulir';
      change_details := '{}'::jsonb;
    else
      return new;
    end if;
  elsif tg_table_name = 'application_documents' and tg_op = 'INSERT' then
    select registration_number into change_id from public.applications where id = new.application_id;
    change_type := 'application';
    change_action := 'Mengunggah dokumen pendaftaran';
    change_details := jsonb_build_object('document_type', new.document_type);
  elsif tg_table_name = 'ppdb_settings' and tg_op = 'UPDATE' then
    change_type := 'settings';
    change_id := 'ppdb';
    change_action := 'Memperbarui pengaturan PPDB';
    change_details := jsonb_build_object('academic_year', new.academic_year, 'quota', new.quota);
  else
    return new;
  end if;

  insert into public.audit_logs (actor_id, action, entity_type, entity_id, details)
  values ((select auth.uid()), change_action, change_type, change_id, coalesce(change_details, '{}'::jsonb));
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger applications_set_updated_at before update on public.applications
  for each row execute function public.set_updated_at();
create trigger settings_set_updated_at before update on public.ppdb_settings
  for each row execute function public.set_updated_at();
create trigger announcements_set_updated_at before update on public.announcements
  for each row execute function public.set_updated_at();
create trigger applications_audit_update after update on public.applications
  for each row execute function public.audit_ppdb_change();
create trigger documents_audit_insert after insert on public.application_documents
  for each row execute function public.audit_ppdb_change();
create trigger settings_audit_update after update on public.ppdb_settings
  for each row execute function public.audit_ppdb_change();

create or replace function public.create_applicant_records()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, phone, role)
  values (new.id, coalesce(new.email, ''), coalesce(new.raw_user_meta_data ->> 'full_name', ''),
          coalesce(new.raw_user_meta_data ->> 'phone', ''), 'applicant');
  insert into public.applications (user_id, name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', '')
  );
  return new;
end;
$$;
drop trigger if exists on_auth_user_created_ppdb on auth.users;
create trigger on_auth_user_created_ppdb after insert on auth.users
  for each row execute function public.create_applicant_records();

create or replace function public.applicant_submit_registration(p_registration_number text)
returns void language plpgsql security definer set search_path = ''
as $$
declare
  target public.applications%rowtype;
begin
  select * into target from public.applications
  where registration_number = p_registration_number and user_id = (select auth.uid())
  for update;
  if not found then raise exception 'Pendaftaran tidak ditemukan'; end if;
  if target.name = '' or target.nik !~ '^[0-9]{16}$'
     or target.nisn !~ '^[0-9]{10}$' or target.school_origin = '' then
    raise exception 'Lengkapi nama, NIK, NISN, dan asal sekolah dengan benar';
  end if;
  if target.status not in ('draft', 'needs_revision') then
    raise exception 'Pendaftaran tidak dapat diajukan pada status ini';
  end if;

  update public.applications set status = 'submitted', revision_notes = ''
  where id = target.id;
  insert into public.audit_logs (actor_id, action, entity_type, entity_id)
  values ((select auth.uid()), 'Mengajukan formulir pendaftaran', 'application', target.registration_number);
  insert into public.whatsapp_logs (application_id, recipient, message_type)
  values (target.id, target.phone, 'Konfirmasi Pengajuan Pendaftaran');
end;
$$;

create or replace function public.admin_review_application(
  p_registration_number text,
  p_decision text,
  p_notes text default ''
)
returns void language plpgsql security definer set search_path = ''
as $$
declare
  target public.applications%rowtype;
begin
  if not (select public.current_user_is_admin()) then raise exception 'Akses panitia diperlukan'; end if;
  if p_decision not in ('approve', 'revision') then raise exception 'Keputusan verifikasi tidak valid'; end if;
  select * into target from public.applications
  where registration_number = p_registration_number for update;
  if not found then raise exception 'Pendaftaran tidak ditemukan'; end if;
  if target.status not in ('submitted', 'under_review', 'needs_revision') then
    raise exception 'Pendaftaran belum siap diverifikasi';
  end if;

  if p_decision = 'approve' then
    if (select count(distinct document_type) from public.application_documents
        where application_id = target.id) < 4 then
      raise exception 'Empat jenis dokumen wajib belum lengkap';
    end if;
    update public.application_documents d set status = 'valid', review_notes = '',
      reviewed_at = now(), reviewed_by = (select auth.uid())
    where d.id in (
      select distinct on (document_type) id from public.application_documents
      where application_id = target.id
      order by document_type, uploaded_at desc
    );
    update public.applications set status = 'under_review', revision_notes = '' where id = target.id;
    insert into public.audit_logs (actor_id, action, entity_type, entity_id)
    values ((select auth.uid()), 'Memverifikasi berkas lengkap', 'application', target.registration_number);
    insert into public.whatsapp_logs (application_id, recipient, message_type)
    values (target.id, target.phone, 'Status Verifikasi Berkas');
  else
    if btrim(coalesce(p_notes, '')) = '' then raise exception 'Catatan revisi wajib diisi'; end if;
    update public.applications set status = 'needs_revision', revision_notes = p_notes where id = target.id;
    insert into public.audit_logs (actor_id, action, entity_type, entity_id, details)
    values ((select auth.uid()), 'Meminta perbaikan berkas', 'application', target.registration_number,
      jsonb_build_object('notes', p_notes));
    insert into public.whatsapp_logs (application_id, recipient, message_type)
    values (target.id, target.phone, 'Permintaan Perbaikan Berkas');
  end if;
end;
$$;

create or replace function public.admin_set_application_result(
  p_registration_number text,
  p_result text
)
returns void language plpgsql security definer set search_path = ''
as $$
declare
  target public.applications%rowtype;
begin
  if not (select public.current_user_is_admin()) then raise exception 'Akses panitia diperlukan'; end if;
  if p_result not in ('accepted', 'rejected') then raise exception 'Hasil seleksi tidak valid'; end if;
  select * into target from public.applications
  where registration_number = p_registration_number for update;
  if not found then raise exception 'Pendaftaran tidak ditemukan'; end if;
  if target.status <> 'under_review' then
    raise exception 'Hasil hanya dapat ditetapkan setelah verifikasi berkas';
  end if;

  update public.applications set status = p_result where id = target.id;
  insert into public.audit_logs (actor_id, action, entity_type, entity_id, details)
  values ((select auth.uid()), 'Menetapkan hasil seleksi', 'application', target.registration_number,
    jsonb_build_object('result', p_result));
  insert into public.whatsapp_logs (application_id, recipient, message_type)
  values (target.id, target.phone, 'Notifikasi Hasil Seleksi');
end;
$$;

revoke all on function public.applicant_submit_registration(text) from public;
revoke all on function public.admin_review_application(text, text, text) from public;
revoke all on function public.admin_set_application_result(text, text) from public;
grant execute on function public.applicant_submit_registration(text) to authenticated;
grant execute on function public.admin_review_application(text, text, text) to authenticated;
grant execute on function public.admin_set_application_result(text, text) to authenticated;

alter table public.profiles enable row level security;
alter table public.applications enable row level security;
alter table public.application_documents enable row level security;
alter table public.ppdb_settings enable row level security;
alter table public.announcements enable row level security;
alter table public.audit_logs enable row level security;
alter table public.whatsapp_logs enable row level security;

create policy "profiles_read_own_or_admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select public.current_user_is_admin()));
create policy "applications_read_own_or_admin" on public.applications
  for select to authenticated
  using (user_id = (select auth.uid()) or (select public.current_user_is_admin()));
create policy "applicants_update_own_form" on public.applications
  for update to authenticated using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "admins_update_applications" on public.applications
  for update to authenticated using ((select public.current_user_is_admin()))
  with check ((select public.current_user_is_admin()));

create policy "documents_read_own_or_admin" on public.application_documents
  for select to authenticated using (
    exists (select 1 from public.applications a where a.id = application_id
      and (a.user_id = (select auth.uid()) or (select public.current_user_is_admin())))
  );
create policy "applicants_add_own_documents" on public.application_documents
  for insert to authenticated with check (
    status = 'pending' and exists (
      select 1 from public.applications a
      where a.id = application_id and a.user_id = (select auth.uid())
    ) and storage_path like (select auth.uid())::text || '/%'
  );
create policy "admins_review_documents" on public.application_documents
  for update to authenticated using ((select public.current_user_is_admin()))
  with check ((select public.current_user_is_admin()));

create policy "settings_read_authenticated" on public.ppdb_settings
  for select to authenticated using (true);
create policy "admins_manage_settings" on public.ppdb_settings
  for all to authenticated using ((select public.current_user_is_admin()))
  with check ((select public.current_user_is_admin()));
create policy "published_announcements_read_public" on public.announcements
  for select to anon using (published);
create policy "published_announcements_read_authenticated" on public.announcements
  for select to authenticated
  using (published or (select public.current_user_is_admin()));
create policy "admins_manage_announcements" on public.announcements
  for all to authenticated using ((select public.current_user_is_admin()))
  with check ((select public.current_user_is_admin()));
create policy "admins_read_audit_logs" on public.audit_logs
  for select to authenticated using ((select public.current_user_is_admin()));
create policy "admins_read_whatsapp_logs" on public.whatsapp_logs
  for select to authenticated using ((select public.current_user_is_admin()));

revoke all on public.profiles, public.applications, public.application_documents,
  public.ppdb_settings, public.announcements, public.audit_logs, public.whatsapp_logs
  from anon, authenticated;
grant select on public.profiles, public.applications, public.application_documents,
  public.ppdb_settings, public.announcements, public.audit_logs, public.whatsapp_logs
  to authenticated;
grant select on public.announcements to anon;
-- Applicants cannot change ownership, registration number, status or review notes.
grant update (name, nik, nisn, gender, place_of_birth, date_of_birth, address,
  phone, father_name, father_job, mother_name, parent_phone, school_origin, school_npsn,
  graduation_year, track) on public.applications to authenticated;
grant insert (application_id, document_type, storage_path, original_file_name)
  on public.application_documents to authenticated;
grant update on public.application_documents, public.ppdb_settings,
  public.announcements to authenticated;
grant insert on public.ppdb_settings, public.announcements to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('ppdb-documents', 'ppdb-documents', false, 2097152,
        array['application/pdf', 'image/jpeg', 'image/png'])
on conflict (id) do update set public = excluded.public,
  file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "applicants_upload_own_documents" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'ppdb-documents'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
create policy "read_own_documents_or_admin" on storage.objects
  for select to authenticated using (
    bucket_id = 'ppdb-documents' and (
      (storage.foldername(name))[1] = (select auth.uid())::text
      or (select public.current_user_is_admin())
    )
  );
