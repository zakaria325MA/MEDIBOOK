import { Users, Shield, Code2, Target, BarChart3 } from 'lucide-react';

const teamMembers = [
  {
    id: '1', name: 'Zakaria Mansour', role: 'Product Owner', avatar: 'Z', avatarColor: 'from-blue-600 to-blue-800',
    description: 'Responsable de la vision produit et de la gestion du backlog MediBook.',
    responsibilities: ['Définir et prioriser le Product Backlog', 'Représenter les besoins des utilisateurs', 'Valider les incréments à chaque Sprint Review'],
    tasks: ['Rédiger les User Stories', 'Prioriser les fonctionnalités', 'Définir les critères d\'acceptation'],
    isOfficial: true,
  },
  {
    id: '2', name: 'Membre Scrum Master', role: 'Scrum Master', avatar: 'SM', avatarColor: 'from-accent-600 to-accent-800',
    description: 'Facilitateur Scrum, garant du respect des pratiques Agile au sein de l\'équipe.',
    responsibilities: ['Faciliter les événements Scrum', 'Lever les obstacles (impediments)', 'Aider l\'équipe à s\'améliorer en continu'],
    tasks: ['Organiser les Daily Scrum', 'Animer les Sprint Retrospectives', 'Supprimer les blocages'],
    isOfficial: true,
  },
  {
    id: '3', name: 'Directeur Technique', role: 'Directeur Technique', avatar: 'TD', avatarColor: 'from-purple-600 to-purple-800',
    description: 'Rôle supplémentaire dans notre projet — supervise les choix architecturaux et techniques.',
    responsibilities: ['Définir l\'architecture technique', 'Superviser la qualité du code', 'Guider les décisions technologiques'],
    tasks: ['Revue de code', 'Architecture Supabase/React', 'Définir les standards'],
    isOfficial: false,
  },
  {
    id: '4', name: 'Développeur 1', role: 'Développeur', avatar: 'D1', avatarColor: 'from-orange-500 to-orange-700',
    description: 'Développeur membre de la Scrum Team, responsable Frontend React/TypeScript.',
    responsibilities: ['Développer les fonctionnalités', 'Maintenir la qualité du code', 'Estimer et planifier les tâches'],
    tasks: ['Développement du frontend', 'Composants React', 'Tests unitaires'],
    isOfficial: true,
  },
  {
    id: '5', name: 'Développeur 2', role: 'Développeur', avatar: 'D2', avatarColor: 'from-pink-500 to-pink-700',
    description: 'Développeur membre de la Scrum Team, responsable Backend Supabase/PostgreSQL.',
    responsibilities: ['Développer les fonctionnalités', 'Gérer la base de données', 'Implémenter la sécurité (RLS)'],
    tasks: ['Base de données Supabase', 'API et sécurité', 'Tests d\'intégration'],
    isOfficial: true,
  },
];

export default function ScrumTeamPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Users className="w-6 h-6 text-primary-600" />
          Équipe Scrum — MediBook
        </h1>
        <p className="text-text-muted text-sm mt-1">5 membres collaborant selon la méthode Agile Scrum</p>
      </div>

      {/* Scrum structure note */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-primary-800 mb-1">Structure officielle Scrum</h3>
            <p className="text-sm text-primary-700 leading-relaxed">
              Scrum définit <strong>3 responsabilités officielles</strong>: Product Owner, Scrum Master et Developers.
              Le <strong>Directeur Technique</strong> est un rôle supplémentaire adopté dans l'organisation de notre projet,
              pas une responsabilité officielle Scrum.
            </p>
          </div>
        </div>
      </div>

      {/* Team grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teamMembers.map((member, i) => (
          <div key={member.id} className={`card p-6 animate-fade-in ${!member.isOfficial ? 'border-dashed border-2 border-primary-200' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}>
            {/* Avatar + info */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.avatarColor} text-white flex items-center justify-center text-xl font-bold shrink-0`}>
                {member.avatar}
              </div>
              <div>
                <h3 className="font-bold text-text-primary">{member.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="badge badge-primary text-xs">{member.role}</span>
                  {!member.isOfficial && (
                    <span className="text-xs text-text-muted italic">(non officiel)</span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mb-4">{member.description}</p>

            {/* Responsibilities */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-text-muted uppercase mb-2 flex items-center gap-1">
                <Target className="w-3 h-3" /> Responsabilités
              </h4>
              <ul className="space-y-1.5">
                {member.responsibilities.map(r => (
                  <li key={r} className="text-xs text-text-secondary flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tasks */}
            <div>
              <h4 className="text-xs font-semibold text-text-muted uppercase mb-2 flex items-center gap-1">
                <BarChart3 className="w-3 h-3" /> Tâches assignées
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {member.tasks.map(t => (
                  <span key={t} className="text-xs bg-surface-secondary text-text-secondary px-2 py-1 rounded-lg">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
