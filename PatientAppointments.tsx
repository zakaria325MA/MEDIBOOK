import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Search } from 'lucide-react';
import { useState } from 'react';

type Status = 'pending' | 'confirmed' | 'completed' | 'cancelled_by_patient' | 'cancelled_by_doctor';

const appointments = [
  { id: '1', doctor: 'Dr. Amina Benali', specialty: 'Cardiologie', date: '2026-11-10', time: '10:00', status: 'confirmed' as Status, reason: 'Douleurs thoraciques' },
  { id: '2', doctor: 'Dr. Hassan Tazi', specialty: 'Neurologie', date: '2026-11-15', time: '14:30', status: 'pending' as Status, reason: 'Maux de tête fréquents' },
  { id: '3', doctor: 'Dr. Leila Kabbaj', specialty: 'Pédiatrie', date: '2026-10-05', time: '09:00', status: 'completed' as Status, reason: 'Consultation enfant' },
  { id: '4', doctor: 'Dr. Omar Fassi', specialty: 'Dermatologie', date: '2026-09-20', time: '11:00', status: 'cancelled_by_patient' as Status, reason: 'Problème peau' },
];

const statusConfig = {
  pending: { label: 'En attente', icon: AlertCircle, cls: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Confirmé', icon: CheckCircle, cls: 'bg-green-100 text-green-700' },
  completed: { label: 'Terminé', icon: CheckCircle, cls: 'bg-blue-100 text-blue-700' },
  cancelled_by_patient: { label: 'Annulé (vous)', icon: XCircle, cls: 'bg-red-100 text-red-700' },
  cancelled_by_doctor: { label: 'Annulé (médecin)', icon: XCircle, cls: 'bg-red-100 text-red-700' },
};

export default function PatientAppointments() {
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [search, setSearch] = useState('');

  const filtered = appointments.filter(a =>
    (filter === 'all' || a.status === filter) &&
    (a.doctor.toLowerCase().includes(search.toLowerCase()) || a.specialty.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Mes rendez-vous</h1>
        <p className="text-text-muted text-sm mt-1">Historique et suivi de vos rendez-vous médicaux</p>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." className="input pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[['all', 'Tous'], ['pending', 'En attente'], ['confirmed', 'Confirmés'], ['completed', 'Terminés']].map(([val, lbl]) => (
            <button key={val} onClick={() => setFilter(val as 'all' | Status)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${filter === val ? 'gradient-primary text-white' : 'bg-surface-secondary text-text-secondary hover:bg-primary-50'}`}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(apt => {
          const { label, icon: Icon, cls } = statusConfig[apt.status];
          const canCancel = apt.status === 'pending' || apt.status === 'confirmed';
          return (
            <div key={apt.id} className="card p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary text-white flex items-center justify-center font-bold text-lg shrink-0">
                  {apt.doctor.charAt(4)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-text-primary">{apt.doctor}</h3>
                      <p className="text-sm text-primary-600">{apt.specialty}</p>
                    </div>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
                      <Icon className="w-3 h-3" />{label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{apt.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</span>
                  </div>
                  {apt.reason && <p className="text-xs text-text-secondary mt-1">Motif: {apt.reason}</p>}
                </div>
              </div>
              {canCancel && (
                <div className="mt-4 pt-4 border-t border-border-light text-right">
                  <button className="btn btn-danger text-xs px-4 py-2">
                    <XCircle className="w-3 h-3" /> Annuler le RDV
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Aucun rendez-vous trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
}
