import { Users, Stethoscope, Calendar, TrendingUp, CheckCircle, Clock, AlertTriangle, ArrowRight, Search, Shield, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Juin', rdv: 120 },
  { month: 'Juil', rdv: 145 },
  { month: 'Août', rdv: 98 },
  { month: 'Sep', rdv: 167 },
  { month: 'Oct', rdv: 189 },
  { month: 'Nov', rdv: 210 },
];

const specialtyData = [
  { name: 'Médecine Générale', value: 35, color: '#2563eb' },
  { name: 'Cardiologie', value: 20, color: '#10b981' },
  { name: 'Pédiatrie', value: 18, color: '#f59e0b' },
  { name: 'Autres', value: 27, color: '#8b5cf6' },
];

const recentDoctors = [
  { id: '1', name: 'Dr. Amira Bensalem', specialty: 'Cardiologie', city: 'Casablanca', date: '2026-11-01', verified: false },
  { id: '2', name: 'Dr. Yassir Moukrim', specialty: 'Neurologie', city: 'Rabat', date: '2026-10-28', verified: true },
  { id: '3', name: 'Dr. Houda Tahiri', specialty: 'Pédiatrie', city: 'Fès', date: '2026-10-25', verified: false },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="gradient-hero rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <p className="text-primary-100 text-sm mb-1">Espace Administrateur</p>
          <h1 className="text-2xl font-bold">Tableau de bord général</h1>
          <p className="text-primary-100 text-sm mt-1">Supervision complète de la plateforme MediBook</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Patients', value: '3,542', icon: Users, color: 'bg-blue-50 text-blue-600', change: '+12%' },
          { label: 'Médecins vérifiés', value: '148', icon: Stethoscope, color: 'bg-accent-50 text-accent-600', change: '+5%' },
          { label: 'RDV ce mois', value: '210', icon: Calendar, color: 'bg-purple-50 text-purple-600', change: '+21%' },
          { label: 'En attente validation', value: '3', icon: AlertTriangle, color: 'bg-orange-50 text-orange-600', change: '' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{s.value}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-text-muted">{s.label}</p>
              {s.change && <span className="text-xs text-accent-600 font-medium">{s.change}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <h2 className="font-semibold text-text-primary mb-5">Rendez-vous par mois</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="rdv" fill="#2563eb" radius={[6, 6, 0, 0]} name="Rendez-vous" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-6">
          <h2 className="font-semibold text-text-primary mb-5">Par spécialité</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={specialtyData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {specialtyData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {specialtyData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-text-secondary">{name}</span>
                </div>
                <span className="font-semibold text-text-primary">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { to: '/admin/patients', label: 'Gérer les patients', icon: Users, color: 'bg-blue-50 text-blue-600' },
          { to: '/admin/medecins', label: 'Gérer les médecins', icon: Stethoscope, color: 'bg-accent-50 text-accent-600' },
          { to: '/admin/rendez-vous', label: 'Tous les RDV', icon: Calendar, color: 'bg-purple-50 text-purple-600' },
          { to: '/admin/specialites', label: 'Spécialités', icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
        ].map(l => (
          <Link key={l.to} to={l.to} className="card p-4 flex items-center gap-3 hover:border-primary-200 border-2 border-transparent group">
            <div className={`w-10 h-10 rounded-xl ${l.color} flex items-center justify-center`}>
              <l.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-text-primary">{l.label}</span>
            <ArrowRight className="w-4 h-4 text-text-muted ml-auto group-hover:text-primary-600" />
          </Link>
        ))}
      </div>

      {/* Pending verifications */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-text-primary text-lg">Médecins en attente de validation</h2>
          <Link to="/admin/medecins" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            Voir tout <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-secondary rounded-xl">
                <th className="text-left px-4 py-3 text-text-muted font-medium text-xs">Médecin</th>
                <th className="text-left px-4 py-3 text-text-muted font-medium text-xs">Spécialité</th>
                <th className="text-left px-4 py-3 text-text-muted font-medium text-xs">Ville</th>
                <th className="text-left px-4 py-3 text-text-muted font-medium text-xs">Inscription</th>
                <th className="text-left px-4 py-3 text-text-muted font-medium text-xs">Statut</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {recentDoctors.map(doc => (
                <tr key={doc.id} className="hover:bg-surface-secondary/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-text-primary">{doc.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{doc.specialty}</td>
                  <td className="px-4 py-3 text-text-secondary">{doc.city}</td>
                  <td className="px-4 py-3 text-text-muted">{doc.date}</td>
                  <td className="px-4 py-3">
                    <span className={`badge text-xs ${doc.verified ? 'badge-success' : 'badge-warning'}`}>
                      {doc.verified ? (
                        <><CheckCircle className="w-3 h-3 inline mr-1" />Vérifié</>
                      ) : (
                        <><Clock className="w-3 h-3 inline mr-1" />En attente</>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {!doc.verified && (
                      <button className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium">
                        <Shield className="w-3 h-3" /> Valider
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
