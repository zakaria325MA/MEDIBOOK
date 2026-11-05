import { Calendar, TrendingUp, CheckCircle, Clock, Lock } from 'lucide-react';

const sprints = [
  { id: '1', name: 'Sprint 1', goal: 'Authentification et gestion des comptes utilisateurs', startDate: '2026-09-01', endDate: '2026-09-14', status: 'completed', stories: ['US01'], progress: 100, members: ['Dev 1', 'Dev 2'] },
  { id: '2', name: 'Sprint 2', goal: 'Espace Patient – profil, recherche et navigation', startDate: '2026-09-15', endDate: '2026-09-28', status: 'completed', stories: ['US02'], progress: 100, members: ['Dev 1', 'Dev 2'] },
  { id: '3', name: 'Sprint 3', goal: 'Recherche et réservation de rendez-vous', startDate: '2026-09-29', endDate: '2026-10-12', status: 'completed', stories: ['US02', 'US03'], progress: 100, members: ['Dev 1', 'Dev 2'] },
  { id: '4', name: 'Sprint 4', goal: 'Espace Médecin – dashboard, disponibilités et RDV', startDate: '2026-10-13', endDate: '2026-10-26', status: 'active', stories: ['US04'], progress: 55, members: ['Dev 1', 'Dev 2'] },
  { id: '5', name: 'Sprint 5', goal: 'Espace Administrateur – gestion complète', startDate: '2026-10-27', endDate: '2026-11-09', status: 'planned', stories: ['US05'], progress: 0, members: ['Dev 1', 'Dev 2'] },
  { id: '6', name: 'Sprint 6', goal: 'Tests, sécurité et optimisation finale', startDate: '2026-11-10', endDate: '2026-11-23', status: 'planned', stories: [], progress: 0, members: ['Dev 1', 'Dev 2'] },
];

const statusConfig = {
  completed: { label: 'Terminé', icon: CheckCircle, cls: 'bg-green-100 text-green-700', bar: 'bg-accent-500' },
  active: { label: 'Actif', icon: TrendingUp, cls: 'bg-blue-100 text-blue-700', bar: 'gradient-primary' },
  planned: { label: 'Planifié', icon: Clock, cls: 'bg-gray-100 text-gray-600', bar: 'bg-gray-300' },
  cancelled: { label: 'Annulé', icon: Lock, cls: 'bg-red-100 text-red-700', bar: 'bg-red-300' },
};

export default function SprintsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary-600" />
          Gestion des Sprints
        </h1>
        <p className="text-text-muted text-sm mt-1">MediBook — 6 Sprints de 2 semaines chacun</p>
      </div>

      {/* Timeline overview */}
      <div className="card p-5">
        <h2 className="font-semibold text-text-primary mb-4">Vue d'ensemble — Timeline</h2>
        <div className="space-y-3">
          {sprints.map(sprint => {
            const { bar } = statusConfig[sprint.status as keyof typeof statusConfig];
            return (
              <div key={sprint.id} className="flex items-center gap-4">
                <span className="text-xs font-mono font-semibold text-primary-600 w-16 shrink-0">{sprint.name}</span>
                <div className="flex-1 h-6 bg-surface-secondary rounded-full overflow-hidden relative">
                  <div className={`h-full ${bar} rounded-full transition-all`} style={{ width: `${sprint.progress}%` }} />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-text-primary">
                    {sprint.progress}%
                  </span>
                </div>
                <span className="text-xs text-text-muted w-24 shrink-0">{sprint.startDate}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sprint cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {sprints.map((sprint, i) => {
          const { label, icon: Icon, cls, bar } = statusConfig[sprint.status as keyof typeof statusConfig];
          return (
            <div key={sprint.id} className={`card p-5 animate-fade-in ${sprint.status === 'active' ? 'ring-2 ring-primary-400' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-text-primary">{sprint.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-text-muted" />
                    <span className="text-xs text-text-muted">{sprint.startDate} → {sprint.endDate}</span>
                  </div>
                </div>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${cls}`}>
                  <Icon className="w-3 h-3" />{label}
                </span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-4 min-h-[40px]">{sprint.goal}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Progression</span>
                  <span className="font-semibold text-text-primary">{sprint.progress}%</span>
                </div>
                <div className="h-2 bg-surface-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${bar} rounded-full transition-all`} style={{ width: `${sprint.progress}%` }} />
                </div>
              </div>

              {/* Stories */}
              {sprint.stories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {sprint.stories.map(s => (
                    <span key={s} className="badge badge-primary text-xs">{s}</span>
                  ))}
                </div>
              )}

              {/* Members */}
              <div className="flex items-center gap-2 pt-3 border-t border-border-light">
                <div className="flex -space-x-2">
                  {sprint.members.map((m, mi) => (
                    <div key={mi} className="w-7 h-7 rounded-full gradient-primary text-white text-xs flex items-center justify-center font-bold border-2 border-white">
                      {m.charAt(m.length - 1)}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-text-muted">{sprint.members.join(' & ')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
