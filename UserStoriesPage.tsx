import { useState } from 'react';
import { BookOpen, Plus, Trash2, Search, ChevronDown } from 'lucide-react';

const userStoriesData = [
  { id: '1', code: 'US01', title: 'Inscription et connexion', asA: 'patient', iWant: 'créer un compte et me connecter', soThat: "d'accéder à la plateforme", priority: 'high', estimation: 5, status: 'done', sprint: 'Sprint 1', criteria: 'Email unique, mot de passe sécurisé, redirection vers dashboard' },
  { id: '2', code: 'US02', title: 'Recherche de médecin', asA: 'patient', iWant: 'rechercher un médecin par spécialité ou ville', soThat: 'de trouver le spécialiste adapté', priority: 'high', estimation: 8, status: 'done', sprint: 'Sprint 2', criteria: 'Filtres fonctionnels, résultats en temps réel, profil visible' },
  { id: '3', code: 'US03', title: 'Réservation de rendez-vous', asA: 'patient', iWant: 'réserver un créneau chez un médecin', soThat: "d'obtenir une consultation", priority: 'high', estimation: 13, status: 'in_sprint', sprint: 'Sprint 3', criteria: 'Sélection date/créneau, confirmation, pas de double réservation' },
  { id: '4', code: 'US04', title: 'Gestion des disponibilités', asA: 'médecin', iWant: 'définir mes horaires de disponibilité', soThat: "d'organiser mon calendrier", priority: 'high', estimation: 8, status: 'in_sprint', sprint: 'Sprint 4', criteria: 'Planning hebdomadaire, créneaux personnalisables, activation/désactivation' },
  { id: '5', code: 'US05', title: 'Administration de la plateforme', asA: 'administrateur', iWant: 'gérer les utilisateurs et les médecins', soThat: "d'administrer la plateforme", priority: 'medium', estimation: 13, status: 'ready', sprint: 'Sprint 5', criteria: 'Validation médecins, gestion comptes, statistiques globales' },
];

const priorityConfig = { high: { label: 'Haute', cls: 'badge-danger' }, medium: { label: 'Moyenne', cls: 'badge-warning' }, low: { label: 'Basse', cls: 'badge-primary' } };
const statusConfig = { draft: 'Brouillon', ready: 'Prêt', in_sprint: 'En sprint', done: 'Terminé', cancelled: 'Annulé' };
const statusColor: Record<string, string> = { draft: 'bg-gray-100 text-gray-600', ready: 'bg-blue-100 text-blue-700', in_sprint: 'bg-yellow-100 text-yellow-700', done: 'bg-green-100 text-green-700' };

export default function UserStoriesPage() {
  const [stories] = useState(userStoriesData);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = stories.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-600" />
            User Stories
          </h1>
          <p className="text-text-muted text-sm mt-1">Format: En tant que [utilisateur], je veux [fonctionnalité] afin de [objectif]</p>
        </div>
        <button className="btn btn-primary"><Plus className="w-4 h-4" /> Nouvelle User Story</button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher une US..." className="input pl-10" />
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map(story => {
          const p = priorityConfig[story.priority as keyof typeof priorityConfig];
          const isExpanded = expanded === story.id;
          return (
            <div key={story.id} className="card overflow-hidden">
              <button
                onClick={() => setExpanded(isExpanded ? null : story.id)}
                className="w-full p-5 text-left flex items-center gap-4 hover:bg-surface-secondary/30 transition-colors"
              >
                <span className="font-mono text-sm font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg">{story.code}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-primary">{story.title}</h3>
                  <p className="text-xs text-text-muted mt-0.5 italic">
                    "En tant que {story.asA}, je veux {story.iWant} afin de {story.soThat}."
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`badge text-xs ${p.cls}`}>{p.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[story.status]}`}>
                    {statusConfig[story.status as keyof typeof statusConfig]}
                  </span>
                  <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-lg font-semibold">{story.estimation} pts</span>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-border-light animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">Description complète</h4>
                      <div className="bg-primary-50 rounded-xl p-4 text-sm text-text-secondary leading-relaxed">
                        <span className="font-semibold text-primary-700">En tant que</span> {story.asA},{' '}
                        <span className="font-semibold text-primary-700">je veux</span> {story.iWant}{' '}
                        <span className="font-semibold text-primary-700">afin de</span> {story.soThat}.
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">Critères d'acceptation</h4>
                      <div className="bg-accent-50 rounded-xl p-4 text-sm text-text-secondary">
                        {story.criteria}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">Sprint associé</h4>
                      <span className="badge badge-primary">{story.sprint}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">Estimation</h4>
                      <span className="text-2xl font-bold text-text-primary">{story.estimation} <span className="text-sm font-normal text-text-muted">story points</span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
