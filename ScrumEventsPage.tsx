import { Calendar, Users, Clock, Target, Zap, RefreshCw, Search } from 'lucide-react';

const events = [
  {
    icon: Target,
    name: 'Sprint Planning',
    color: 'from-blue-500 to-blue-700',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
    border: 'border-blue-200',
    definition: 'Événement où l\'équipe Scrum définit l\'objectif du Sprint, sélectionne les éléments du Product Backlog et crée le Sprint Backlog.',
    objective: 'Planifier le travail à réaliser pendant le Sprint et définir le Sprint Goal.',
    participants: 'Scrum Team complète (Product Owner, Scrum Master, Developers)',
    duration: 'Maximum 8 heures pour un Sprint d\'un mois (proportionnel pour des Sprints plus courts)',
    medibook: 'Réunion de 4h au début de chaque Sprint pour sélectionner les User Stories du Product Backlog et définir les tâches à réaliser.',
  },
  {
    icon: RefreshCw,
    name: 'Daily Scrum',
    color: 'from-accent-500 to-accent-700',
    bgLight: 'bg-accent-50',
    textColor: 'text-accent-700',
    border: 'border-accent-200',
    definition: 'Événement quotidien de 15 minutes où les Developers inspectent la progression vers le Sprint Goal et adaptent le Sprint Backlog.',
    objective: 'Synchroniser l\'équipe, identifier les obstacles et planifier la journée.',
    participants: 'Developers (le Scrum Master et le PO participent si nécessaire)',
    duration: '15 minutes maximum, même lieu et même heure chaque jour',
    medibook: 'Chaque matin, l\'équipe répond aux questions: Qu\'ai-je fait hier? Que vais-je faire aujourd\'hui? Y a-t-il des obstacles?',
  },
  {
    icon: Search,
    name: 'Sprint Review',
    color: 'from-purple-500 to-purple-700',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-700',
    border: 'border-purple-200',
    definition: 'Événement de fin de Sprint où la Scrum Team et les parties prenantes inspectent les résultats du Sprint et adaptent le Product Backlog.',
    objective: 'Inspecter l\'Increment, collecter les feedbacks et adapter le Product Backlog.',
    participants: 'Scrum Team + parties prenantes (clients, utilisateurs, management)',
    duration: 'Maximum 4 heures pour un Sprint d\'un mois',
    medibook: 'À la fin de chaque Sprint, démonstration des nouvelles fonctionnalités MediBook développées aux parties prenantes.',
  },
  {
    icon: Zap,
    name: 'Sprint Retrospective',
    color: 'from-orange-500 to-orange-700',
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-700',
    border: 'border-orange-200',
    definition: 'Événement pour inspecter comment s\'est déroulé le dernier Sprint concernant les personnes, les processus et les outils.',
    objective: 'Identifier des améliorations pour augmenter la qualité et l\'efficacité de l\'équipe.',
    participants: 'Scrum Team uniquement (Product Owner, Scrum Master, Developers)',
    duration: 'Maximum 3 heures pour un Sprint d\'un mois',
    medibook: 'L\'équipe MediBook identifie ce qui a bien fonctionné, ce qui peut être amélioré et définit des actions concrètes pour le prochain Sprint.',
  },
  {
    icon: Calendar,
    name: 'Sprint',
    color: 'from-primary-600 to-primary-800',
    bgLight: 'bg-primary-50',
    textColor: 'text-primary-700',
    border: 'border-primary-200',
    definition: 'Conteneur de tous les autres événements Scrum. Période de temps fixe (1 mois maximum) pendant laquelle un Increment est créé.',
    objective: 'Créer un Increment de valeur qui respecte la Definition of Done.',
    participants: 'Scrum Team complète',
    duration: '2 semaines dans MediBook (1 mois maximum selon Scrum Guide)',
    medibook: 'MediBook utilise 6 Sprints de 2 semaines chacun: Auth, Espace Patient, Réservation, Médecin, Admin, Tests.',
  },
];

export default function ScrumEventsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Les Événements Scrum</h1>
        <p className="text-text-muted text-sm mt-1">Les 5 événements officiels Scrum et leur application dans MediBook</p>
      </div>

      {/* Events timeline visual */}
      <div className="card p-6">
        <h2 className="font-semibold text-text-primary mb-4 text-center">Cycle d'un Sprint MediBook (2 semaines)</h2>
        <div className="flex items-center overflow-x-auto gap-0 pb-2">
          {events.map((e, i) => (
            <div key={e.name} className="flex items-center shrink-0">
              <div className={`${e.bgLight} border ${e.border} rounded-xl p-3 text-center w-32`}>
                <div className={`w-8 h-8 mx-auto mb-1 rounded-lg bg-gradient-to-br ${e.color} flex items-center justify-center`}>
                  <e.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs font-semibold text-text-primary">{e.name}</p>
              </div>
              {i < events.length - 1 && (
                <div className="w-8 h-0.5 bg-border-light shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Event detail cards */}
      <div className="space-y-5">
        {events.map((event, i) => (
          <div key={event.name} className={`card overflow-hidden border-l-4 ${event.border} animate-fade-in`} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`bg-gradient-to-r ${event.color} px-5 py-4 text-white flex items-center gap-3`}>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <event.icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold">{event.name}</h2>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase mb-1.5">Définition</h3>
                  <p className="text-sm text-text-secondary leading-relaxed italic border-l-2 border-primary-300 pl-3">{event.definition}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase mb-1.5">Objectif</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{event.objective}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase mb-1.5 flex items-center gap-1"><Users className="w-3 h-3" /> Participants</h3>
                  <p className="text-sm text-text-secondary">{event.participants}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase mb-1.5 flex items-center gap-1"><Clock className="w-3 h-3" /> Durée</h3>
                  <p className="text-sm text-text-secondary">{event.duration}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase mb-1.5">Dans MediBook</h3>
                  <div className={`${event.bgLight} rounded-xl p-3`}>
                    <p className={`text-sm ${event.textColor} leading-relaxed`}>{event.medibook}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
