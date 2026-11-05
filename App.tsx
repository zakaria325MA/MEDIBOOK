import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public pages
import HomePage from './pages/public/HomePage';
import DoctorsPage from './pages/public/DoctorsPage';
import SpecialtiesPage from './pages/public/SpecialtiesPage';
import AboutPage from './pages/public/AboutPage';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Patient pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientSearch from './pages/patient/PatientSearch';
import BookingPage from './pages/patient/BookingPage';
import PatientAppointments from './pages/patient/PatientAppointments';

// Doctor pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAvailability from './pages/doctor/DoctorAvailability';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Scrum pages
import ScrumDashboard from './pages/scrum/ScrumDashboard';
import ScrumTeamPage from './pages/scrum/ScrumTeamPage';
import ProductBacklogPage from './pages/scrum/ProductBacklogPage';
import UserStoriesPage from './pages/scrum/UserStoriesPage';
import SprintBacklogPage from './pages/scrum/SprintBacklogPage';
import SprintsPage from './pages/scrum/SprintsPage';
import ScrumArtifactsPage from './pages/scrum/ScrumArtifactsPage';
import ScrumEventsPage from './pages/scrum/ScrumEventsPage';
import DefinitionOfDonePage from './pages/scrum/DefinitionOfDonePage';

// Icons for sidebars
import {
  LayoutDashboard, Search, Calendar, User, Bell,
  Stethoscope, Clock, Users as UsersIcon, Settings,
  List, BookOpen, Layers, TrendingUp, Package, Zap, CheckSquare
} from 'lucide-react';

// ---- Sidebar configs ----
const patientSidebarLinks = [
  { path: '/patient', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/patient/recherche', label: 'Rechercher', icon: Search },
  { path: '/patient/rendez-vous', label: 'Mes rendez-vous', icon: Calendar },
  { path: '/patient/profil', label: 'Mon profil', icon: User },
  { path: '/patient/notifications', label: 'Notifications', icon: Bell, badge: 3 },
];

const doctorSidebarLinks = [
  { path: '/medecin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/medecin/rendez-vous', label: 'Rendez-vous', icon: Calendar },
  { path: '/medecin/disponibilites', label: 'Disponibilités', icon: Clock },
  { path: '/medecin/patients', label: 'Mes patients', icon: UsersIcon },
  { path: '/medecin/profil', label: 'Profil pro.', icon: Stethoscope },
  { path: '/medecin/notifications', label: 'Notifications', icon: Bell, badge: 2 },
];

const adminSidebarLinks = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/patients', label: 'Patients', icon: UsersIcon },
  { path: '/admin/medecins', label: 'Médecins', icon: Stethoscope },
  { path: '/admin/rendez-vous', label: 'Rendez-vous', icon: Calendar },
  { path: '/admin/specialites', label: 'Spécialités', icon: List },
  { path: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

const scrumSidebarLinks = [
  { path: '/scrum', label: 'Dashboard Scrum', icon: LayoutDashboard },
  { path: '/scrum/equipe', label: 'Équipe', icon: UsersIcon },
  { path: '/scrum/backlog', label: 'Product Backlog', icon: Package },
  { path: '/scrum/user-stories', label: 'User Stories', icon: BookOpen },
  { path: '/scrum/sprint-backlog', label: 'Sprint Backlog', icon: Layers },
  { path: '/scrum/sprints', label: 'Sprints', icon: TrendingUp },
  { path: '/scrum/artefacts', label: 'Artefacts Scrum', icon: Zap },
  { path: '/scrum/evenements', label: 'Événements Scrum', icon: Calendar },
  { path: '/scrum/definition-of-done', label: 'Definition of Done', icon: CheckSquare },
];

// Simple placeholder pages
const SimpleNotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
    <div className="text-center">
      <p className="text-6xl font-bold text-primary-300 mb-4">404</p>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Page introuvable</h2>
      <a href="/" className="text-primary-600 hover:text-primary-700 font-medium">← Retour à l'accueil</a>
    </div>
  </div>
);

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <LayoutDashboard className="w-16 h-16 text-primary-200 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      <p className="text-text-muted text-sm mt-2">Page en cours de développement</p>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/medecins" element={<DoctorsPage />} />
            <Route path="/specialites" element={<SpecialtiesPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
          </Route>

          {/* Auth routes */}
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/inscription" element={<RegisterPage />} />

          {/* Patient routes */}
          <Route path="/patient" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <DashboardLayout sidebarLinks={patientSidebarLinks} sidebarTitle="Espace Patient" />
            </ProtectedRoute>
          }>
            <Route index element={<PatientDashboard />} />
            <Route path="recherche" element={<PatientSearch />} />
            <Route path="reservation/:doctorId" element={<BookingPage />} />
            <Route path="rendez-vous" element={<PatientAppointments />} />
            <Route path="profil" element={<PlaceholderPage title="Mon profil" />} />
            <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
          </Route>

          {/* Doctor routes */}
          <Route path="/medecin" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DashboardLayout sidebarLinks={doctorSidebarLinks} sidebarTitle="Espace Médecin" />
            </ProtectedRoute>
          }>
            <Route index element={<DoctorDashboard />} />
            <Route path="rendez-vous" element={<PlaceholderPage title="Gestion des rendez-vous" />} />
            <Route path="disponibilites" element={<DoctorAvailability />} />
            <Route path="patients" element={<PlaceholderPage title="Mes patients" />} />
            <Route path="profil" element={<PlaceholderPage title="Profil professionnel" />} />
            <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout sidebarLinks={adminSidebarLinks} sidebarTitle="Administration" />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="patients" element={<PlaceholderPage title="Gestion des patients" />} />
            <Route path="medecins" element={<PlaceholderPage title="Gestion des médecins" />} />
            <Route path="rendez-vous" element={<PlaceholderPage title="Gestion des rendez-vous" />} />
            <Route path="specialites" element={<PlaceholderPage title="Gestion des spécialités" />} />
            <Route path="parametres" element={<PlaceholderPage title="Paramètres" />} />
          </Route>

          {/* Scrum routes - accessible to all Scrum roles */}
          <Route path="/scrum" element={
            <ProtectedRoute allowedRoles={['product_owner', 'scrum_master', 'tech_director', 'developer', 'admin']}>
              <DashboardLayout sidebarLinks={scrumSidebarLinks} sidebarTitle="Scrum Project" accentColor="accent" />
            </ProtectedRoute>
          }>
            <Route index element={<ScrumDashboard />} />
            <Route path="equipe" element={<ScrumTeamPage />} />
            <Route path="backlog" element={<ProductBacklogPage />} />
            <Route path="user-stories" element={<UserStoriesPage />} />
            <Route path="sprint-backlog" element={<SprintBacklogPage />} />
            <Route path="sprints" element={<SprintsPage />} />
            <Route path="artefacts" element={<ScrumArtifactsPage />} />
            <Route path="evenements" element={<ScrumEventsPage />} />
            <Route path="definition-of-done" element={<DefinitionOfDonePage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<SimpleNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
