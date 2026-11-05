-- =====================================================
-- MEDIBOOK - Script SQL complet pour Supabase
-- Plateforme médicale + Gestion de projet Scrum
-- =====================================================

-- Extensions nécessaires
create extension if not exists "uuid-ossp";

-- =====================================================
-- PARTIE 1: PLATEFORME MÉDICALE
-- =====================================================

-- Table: PROFILES (liée à auth.users de Supabase)
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  full_name text not null,
  avatar_url text,
  phone text,
  role text not null default 'patient' 
    check (role in ('admin','patient','doctor','product_owner','scrum_master','tech_director','developer')),
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: SPECIALTIES
create table if not exists specialties (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  description text,
  icon text,
  created_at timestamptz default now()
);

-- Table: PATIENTS
create table if not exists patients (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references profiles(id) on delete cascade unique not null,
  date_of_birth date,
  gender text check (gender in ('male','female')),
  address text,
  city text,
  blood_type text,
  allergies text,
  emergency_contact text,
  created_at timestamptz default now()
);

-- Table: DOCTORS
create table if not exists doctors (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references profiles(id) on delete cascade unique not null,
  specialty_id uuid references specialties(id),
  license_number text,
  bio text,
  experience_years integer default 0,
  consultation_fee numeric(10,2),
  city text,
  address text,
  is_verified boolean default false,
  is_available boolean default false,
  created_at timestamptz default now()
);

-- Table: DOCTOR_AVAILABILITIES
create table if not exists doctor_availabilities (
  id uuid default uuid_generate_v4() primary key,
  doctor_id uuid references doctors(id) on delete cascade not null,
  day_of_week integer not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  slot_duration integer default 30,
  is_active boolean default true,
  constraint valid_time_range check (end_time > start_time),
  unique (doctor_id, day_of_week, start_time)
);

-- Table: APPOINTMENTS
create table if not exists appointments (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references patients(id) on delete cascade not null,
  doctor_id uuid references doctors(id) on delete cascade not null,
  appointment_date date not null,
  start_time time not null,
  end_time time not null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','cancelled_by_patient','cancelled_by_doctor','completed','no_show')),
  reason text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  -- Prevent double bookings
  constraint no_overlap unique (doctor_id, appointment_date, start_time)
);

-- Table: NOTIFICATIONS
create table if not exists notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  type text not null default 'general'
    check (type in ('appointment_created','appointment_confirmed','appointment_cancelled','appointment_reminder','account_verified','general')),
  is_read boolean default false,
  link text,
  created_at timestamptz default now()
);

-- =====================================================
-- PARTIE 2: GESTION DE PROJET SCRUM
-- =====================================================

-- Table: PROJECTS
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  objectives text,
  status text default 'active' check (status in ('active','completed','on_hold')),
  start_date date,
  end_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: PROJECT_MEMBERS
create table if not exists project_members (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  profile_id uuid references profiles(id) on delete cascade not null,
  role text not null check (role in ('product_owner','scrum_master','tech_director','developer')),
  description text,
  responsibilities text,
  avatar_url text,
  joined_at timestamptz default now(),
  unique (project_id, profile_id)
);

-- Table: USER_STORIES
create table if not exists user_stories (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  code text not null,
  title text not null,
  as_a text not null,
  i_want text not null,
  so_that text not null,
  priority text default 'medium' check (priority in ('high','medium','low')),
  estimation integer,
  acceptance_criteria text,
  status text default 'draft' check (status in ('draft','ready','in_sprint','done','cancelled')),
  sprint_id uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (project_id, code)
);

-- Table: SPRINTS
create table if not exists sprints (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  name text not null,
  goal text,
  start_date date not null,
  end_date date not null,
  status text default 'planned' check (status in ('planned','active','completed','cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint valid_sprint_dates check (end_date > start_date)
);

-- FK: User stories -> sprints
alter table user_stories
  add constraint fk_user_stories_sprint
  foreign key (sprint_id) references sprints(id) on delete set null;

-- Table: PRODUCT_BACKLOG
create table if not exists product_backlog (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  code text not null,
  title text not null,
  description text,
  priority text default 'medium' check (priority in ('high','medium','low')),
  difficulty integer check (difficulty in (1,2,3,5,8,13,21)),
  status text default 'new' check (status in ('new','ready','in_progress','done','cancelled')),
  assigned_to uuid references profiles(id) on delete set null,
  user_story_id uuid references user_stories(id) on delete set null,
  order_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (project_id, code)
);

-- Table: SPRINT_BACKLOG
create table if not exists sprint_backlog (
  id uuid default uuid_generate_v4() primary key,
  sprint_id uuid references sprints(id) on delete cascade not null,
  user_story_id uuid references user_stories(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique (sprint_id, user_story_id)
);

-- Table: TASKS
create table if not exists tasks (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  sprint_id uuid references sprints(id) on delete set null,
  user_story_id uuid references user_stories(id) on delete set null,
  title text not null,
  description text,
  assigned_to uuid references profiles(id) on delete set null,
  priority text default 'medium' check (priority in ('high','medium','low')),
  status text default 'todo' check (status in ('todo','doing','done')),
  due_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: TASK_COMMENTS
create table if not exists task_comments (
  id uuid default uuid_generate_v4() primary key,
  task_id uuid references tasks(id) on delete cascade not null,
  author_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: PROJECT_ACTIVITIES
create table if not exists project_activities (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  type text not null check (type in ('task_created','task_updated','task_completed','sprint_started','sprint_completed','story_created','backlog_updated','member_added','comment_added')),
  description text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

-- =====================================================
-- INDEXES
-- =====================================================
create index if not exists idx_appointments_doctor on appointments(doctor_id, appointment_date);
create index if not exists idx_appointments_patient on appointments(patient_id);
create index if not exists idx_notifications_user on notifications(user_id, is_read);
create index if not exists idx_tasks_sprint on tasks(sprint_id);
create index if not exists idx_tasks_story on tasks(user_story_id);
create index if not exists idx_activities_project on project_activities(project_id, created_at desc);
create index if not exists idx_backlog_project on product_backlog(project_id, order_index);

-- =====================================================
-- TRIGGERS: updated_at
-- =====================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_profiles_updated before update on profiles for each row execute function update_updated_at();
create trigger trg_appointments_updated before update on appointments for each row execute function update_updated_at();
create trigger trg_tasks_updated before update on tasks for each row execute function update_updated_at();
create trigger trg_stories_updated before update on user_stories for each row execute function update_updated_at();
create trigger trg_sprints_updated before update on sprints for each row execute function update_updated_at();
create trigger trg_backlog_updated before update on product_backlog for each row execute function update_updated_at();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS
alter table profiles enable row level security;
alter table patients enable row level security;
alter table doctors enable row level security;
alter table specialties enable row level security;
alter table appointments enable row level security;
alter table notifications enable row level security;
alter table tasks enable row level security;
alter table user_stories enable row level security;
alter table sprints enable row level security;
alter table product_backlog enable row level security;
alter table project_activities enable row level security;

-- Profiles: user can read/update their own, admin can read all
create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);
create policy "profiles_admin_all" on profiles for all using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Specialties: anyone can read
create policy "specialties_public_read" on specialties for select using (true);
create policy "specialties_admin_write" on specialties for all using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Doctors: public can view verified, doctors can edit own
create policy "doctors_public_read" on doctors for select using (is_verified = true);
create policy "doctors_self_manage" on doctors for all using (profile_id = auth.uid());
create policy "doctors_admin_all" on doctors for all using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Patients: self or admin
create policy "patients_self" on patients for all using (profile_id = auth.uid());
create policy "patients_admin" on patients for all using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Appointments: patient sees own, doctor sees own, admin sees all
create policy "appointments_patient" on appointments for all using (
  patient_id in (select id from patients where profile_id = auth.uid())
);
create policy "appointments_doctor" on appointments for all using (
  doctor_id in (select id from doctors where profile_id = auth.uid())
);
create policy "appointments_admin" on appointments for all using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Notifications: user sees own
create policy "notifications_own" on notifications for all using (user_id = auth.uid());

-- Tasks: all authenticated users can see, scrum members can edit
create policy "tasks_auth_read" on tasks for select using (auth.role() = 'authenticated');
create policy "tasks_auth_write" on tasks for all using (auth.role() = 'authenticated');

-- =====================================================
-- DATA SEEDS
-- =====================================================

-- Specialties
insert into specialties (name, description) values
  ('Médecine Générale', 'Suivi médical général et maladies courantes'),
  ('Cardiologie', 'Maladies du cœur et du système cardiovasculaire'),
  ('Neurologie', 'Système nerveux central et périphérique'),
  ('Pédiatrie', 'Médecine dédiée aux enfants et adolescents'),
  ('Ophtalmologie', 'Maladies et troubles de la vision'),
  ('Orthopédie', 'Appareil locomoteur: os, muscles, articulations'),
  ('Dermatologie', 'Maladies de la peau, cheveux et ongles'),
  ('Psychiatrie', 'Troubles mentaux et comportementaux'),
  ('ORL', 'Oreille, nez et gorge')
on conflict do nothing;

-- Default MediBook project
insert into projects (name, description, objectives, status, start_date, end_date) values
  ('MediBook', 'Plateforme médicale Full Stack avec gestion de projet Scrum', 
   'Faciliter la recherche des médecins et la réservation des rendez-vous médicaux',
   'active', '2026-09-01', '2026-11-30')
on conflict do nothing;
