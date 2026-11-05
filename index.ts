// =============================================
// MEDIBOOK - TypeScript Type Definitions
// =============================================

// ---- AUTH & USER ROLES ----
export type UserRole = 
  | 'admin' 
  | 'patient' 
  | 'doctor' 
  | 'product_owner' 
  | 'scrum_master' 
  | 'tech_director' 
  | 'developer';

export type MedicalRole = 'admin' | 'patient' | 'doctor';
export type ScrumRole = 'product_owner' | 'scrum_master' | 'tech_director' | 'developer';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ---- MEDICAL PLATFORM ----
export interface Specialty {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  created_at: string;
}

export interface Patient {
  id: string;
  profile_id: string;
  date_of_birth?: string;
  gender?: 'male' | 'female';
  address?: string;
  city?: string;
  blood_type?: string;
  allergies?: string;
  emergency_contact?: string;
  created_at: string;
  profile?: Profile;
}

export interface Doctor {
  id: string;
  profile_id: string;
  specialty_id: string;
  license_number?: string;
  bio?: string;
  experience_years?: number;
  consultation_fee?: number;
  city?: string;
  address?: string;
  is_verified: boolean;
  is_available: boolean;
  created_at: string;
  profile?: Profile;
  specialty?: Specialty;
}

export interface DoctorAvailability {
  id: string;
  doctor_id: string;
  day_of_week: number; // 0=Sunday, 6=Saturday
  start_time: string;  // HH:MM
  end_time: string;    // HH:MM
  slot_duration: number; // minutes
  is_active: boolean;
}

export type AppointmentStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'cancelled_by_patient' 
  | 'cancelled_by_doctor' 
  | 'completed' 
  | 'no_show';

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient & { profile?: Profile };
  doctor?: Doctor & { profile?: Profile; specialty?: Specialty };
}

export type NotificationType = 
  | 'appointment_created' 
  | 'appointment_confirmed' 
  | 'appointment_cancelled' 
  | 'appointment_reminder' 
  | 'account_verified'
  | 'general';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  link?: string;
  created_at: string;
}

// ---- SCRUM PROJECT MANAGEMENT ----
export interface Project {
  id: string;
  name: string;
  description?: string;
  objectives?: string;
  status: 'active' | 'completed' | 'on_hold';
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectMember {
  id: string;
  project_id: string;
  profile_id: string;
  role: ScrumRole;
  description?: string;
  responsibilities?: string;
  avatar_url?: string;
  joined_at: string;
  profile?: Profile;
}

export type BacklogPriority = 'high' | 'medium' | 'low';
export type BacklogStatus = 'new' | 'ready' | 'in_progress' | 'done' | 'cancelled';

export interface ProductBacklogItem {
  id: string;
  project_id: string;
  code: string; // PB01, PB02...
  title: string;
  description?: string;
  priority: BacklogPriority;
  difficulty?: number; // Story points
  status: BacklogStatus;
  assigned_to?: string;
  user_story_id?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  assignee?: Profile;
  user_story?: UserStory;
}

export type StoryStatus = 'draft' | 'ready' | 'in_sprint' | 'done' | 'cancelled';

export interface UserStory {
  id: string;
  project_id: string;
  code: string; // US01, US02...
  title: string;
  as_a: string;
  i_want: string;
  so_that: string;
  priority: BacklogPriority;
  estimation?: number; // Story points
  acceptance_criteria?: string;
  status: StoryStatus;
  sprint_id?: string;
  created_at: string;
  updated_at: string;
  sprint?: Sprint;
}

export type SprintStatus = 'planned' | 'active' | 'completed' | 'cancelled';

export interface Sprint {
  id: string;
  project_id: string;
  name: string;
  goal?: string;
  start_date: string;
  end_date: string;
  status: SprintStatus;
  created_at: string;
  updated_at: string;
  user_stories?: UserStory[];
  tasks?: Task[];
}

export interface SprintBacklogItem {
  id: string;
  sprint_id: string;
  user_story_id: string;
  created_at: string;
  user_story?: UserStory;
}

export type TaskStatus = 'todo' | 'doing' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  project_id: string;
  sprint_id?: string;
  user_story_id?: string;
  title: string;
  description?: string;
  assigned_to?: string;
  priority: TaskPriority;
  status: TaskStatus;
  due_date?: string;
  created_at: string;
  updated_at: string;
  assignee?: Profile;
  sprint?: Sprint;
  user_story?: UserStory;
  comments?: TaskComment[];
}

export interface TaskComment {
  id: string;
  task_id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export type ActivityType = 
  | 'task_created' 
  | 'task_updated' 
  | 'task_completed'
  | 'sprint_started'
  | 'sprint_completed'
  | 'story_created'
  | 'backlog_updated'
  | 'member_added'
  | 'comment_added';

export interface ProjectActivity {
  id: string;
  project_id: string;
  user_id: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  user?: Profile;
}

// ---- UI HELPERS ----
export interface SelectOption {
  value: string;
  label: string;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
