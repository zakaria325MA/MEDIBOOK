import { Calendar, Users, Clock, TrendingUp, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const pendingRequests = [
  { id: '1', patient: 'Fatima Zahra', date: '2026-11-12', time: '09:00', reason: 'Douleurs thoraciques' },
  { id: '2', patient: 'Mohammed Alami', date: '2026-11-13', time: '11:30', reason: 'Palpitations' },
];

export default function DoctorDashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="gradient-hero rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <p className="text-primary-100 text-sm mb-1">Tableau de bord médecin</p>
          <h1 className="text-2xl font-bold">{profile?.full_name || 'Docteur'}</h1>
          <p className="text-primary-100 text-sm mt-1">Gérez vos rendez-vous et disponibilités</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'RDV aujourd\'hui', value: '5', icon: Calendar, color: 'bg-blue-50 text-blue-600' },
          { label: 'En attente', value: '2', icon: AlertCircle, color: 'bg-yellow-50 text-yellow-600' },
          { label: 'Patients total', value: '48', icon: Users, color: 'bg-purple-50 text-purple-600' },
          { label: 'Ce mois', value: '32', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
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

      {/* Quick links */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { to: '/medecin/planning', label: 'Mon planning', desc: 'Voir le calendrier', icon: Calendar, bg: 'bg-primary-50', ic: 'text-primary-600' },
          { to: '/medecin/disponibilites', label: 'Disponibilités', desc: 'Gérer mes créneaux', icon: Clock, bg: 'bg-accent-50', ic: 'text-accent-600' },
          { to: '/medecin/patients', label: 'Mes patients', desc: 'Historique complet', icon: Users, bg: 'bg-purple-50', ic: 'text-purple-600' },
        ].map(l => (
          <Link key={l.to} to={l.to} className="card p-5 flex items-center gap-4 hover:border-primary-200 border-2 border-transparent">
            <div className={`w-12 h-12 rounded-xl ${l.bg} flex items-center justify-center shrink-0`}>
              <l.icon className={`w-6 h-6 ${l.ic}`} />
            </div>
            <div>
              <p className="font-semibold text-text-primary">{l.label}</p>
              <p className="text-xs text-text-muted">{l.desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-text-muted ml-auto" />
          </Link>
        ))}
      </div>

      {/* Pending requests */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-text-primary text-lg">Demandes en attente</h2>
          <Link to="/medecin/rendez-vous" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            Voir tout <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {pendingRequests.length === 0 ? (
          <p className="text-center text-text-muted text-sm py-8">Aucune demande en attente</p>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map(req => (
              <div key={req.id} className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                <div className="w-10 h-10 rounded-xl gradient-primary text-white flex items-center justify-center font-bold">
                  {req.patient.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary text-sm">{req.patient}</p>
                  <p className="text-xs text-text-muted">{req.date} à {req.time}</p>
                  {req.reason && <p className="text-xs text-text-secondary mt-0.5">Motif: {req.reason}</p>}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-accent-100 text-accent-700 hover:bg-accent-200 transition-colors" title="Accepter">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors" title="Refuser">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
