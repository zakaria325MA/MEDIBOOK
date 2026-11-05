import { Calendar, Clock, Bell, User, Search, MapPin, Star, ArrowRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const upcomingAppointments = [
  { id: '1', doctor: 'Dr. Amina Benali', specialty: 'Cardiologie', date: '2026-11-10', time: '10:00', status: 'confirmed' as const },
  { id: '2', doctor: 'Dr. Hassan Tazi', specialty: 'Neurologie', date: '2026-11-15', time: '14:30', status: 'pending' as const },
];

const statusConfig = {
  confirmed: { label: 'Confirmé', icon: CheckCircle, cls: 'badge-success' },
  pending: { label: 'En attente', icon: AlertCircle, cls: 'badge-warning' },
  cancelled_by_doctor: { label: 'Annulé', icon: XCircle, cls: 'badge-danger' },
  cancelled_by_patient: { label: 'Annulé', icon: XCircle, cls: 'badge-danger' },
  completed: { label: 'Terminé', icon: CheckCircle, cls: 'badge-primary' },
  no_show: { label: 'Absent', icon: XCircle, cls: 'badge-danger' },
};

export default function PatientDashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="gradient-hero rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <p className="text-primary-100 text-sm mb-1">Bonjour 👋</p>
          <h1 className="text-2xl font-bold">{profile?.full_name || 'Patient'}</h1>
          <p className="text-primary-100 text-sm mt-1">Gérez vos rendez-vous médicaux facilement</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Rendez-vous totaux', value: '12', icon: Calendar, color: 'bg-blue-50 text-blue-600' },
          { label: 'À venir', value: '2', icon: Clock, color: 'bg-green-50 text-green-600' },
          { label: 'Terminés', value: '10', icon: CheckCircle, color: 'bg-purple-50 text-purple-600' },
          { label: 'Notifications', value: '3', icon: Bell, color: 'bg-orange-50 text-orange-600' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{s.value}</p>
            <p className="text-xs text-text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/patient/recherche" className="card p-5 flex items-center gap-4 hover:border-primary-200 border-2 border-transparent">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
            <Search className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-text-primary">Chercher un médecin</p>
            <p className="text-xs text-text-muted">Trouver par spécialité ou ville</p>
          </div>
          <ArrowRight className="w-4 h-4 text-text-muted ml-auto" />
        </Link>
        <Link to="/patient/rendez-vous" className="card p-5 flex items-center gap-4 hover:border-primary-200 border-2 border-transparent">
          <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-accent-600" />
          </div>
          <div>
            <p className="font-semibold text-text-primary">Mes rendez-vous</p>
            <p className="text-xs text-text-muted">Voir et gérer vos RDV</p>
          </div>
          <ArrowRight className="w-4 h-4 text-text-muted ml-auto" />
        </Link>
        <Link to="/patient/profil" className="card p-5 flex items-center gap-4 hover:border-primary-200 border-2 border-transparent">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
            <User className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-text-primary">Mon profil</p>
            <p className="text-xs text-text-muted">Mettre à jour vos informations</p>
          </div>
          <ArrowRight className="w-4 h-4 text-text-muted ml-auto" />
        </Link>
      </div>

      {/* Upcoming appointments */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-text-primary text-lg">Prochains rendez-vous</h2>
          <Link to="/patient/rendez-vous" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            Voir tout <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-8 text-text-muted">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Aucun rendez-vous à venir</p>
            <Link to="/patient/recherche" className="btn btn-primary mt-4 text-sm">Prendre un rendez-vous</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.map(apt => {
              const { label, icon: Icon, cls } = statusConfig[apt.status];
              return (
                <div key={apt.id} className="flex items-center gap-4 p-4 bg-surface-secondary rounded-xl">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-lg">
                    {apt.doctor.charAt(4)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-text-primary text-sm">{apt.doctor}</p>
                    <p className="text-xs text-text-muted">{apt.specialty}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-text-muted">
                        <Calendar className="w-3 h-3" />{apt.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-muted">
                        <Clock className="w-3 h-3" />{apt.time}
                      </span>
                    </div>
                  </div>
                  <div className={`badge ${cls} flex items-center gap-1 text-xs`}>
                    <Icon className="w-3 h-3" />
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
