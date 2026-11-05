import { Package, Layers, Zap, ArrowRight, Users, Target } from 'lucide-react';

const artifacts = [
  {
    id: 'product-backlog',
    icon: Package,
    name: 'Product Backlog',
    color: 'from-blue-500 to-blue-700',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
    border: 'border-blue-200',
    definition: 'Liste organisée et priorisée de tous les éléments nécessaires à la réalisation et à l\'amélioration du produit.',
    explanation: 'Le Product Backlog est la seule source d\'exigences. Il est vivant — constamment mis à jour par le Product Owner.',
    medibook: 'Dans MediBook: liste priorisée de PB01 à PB10 incluant l\'inscription patient, la recherche de médecins, la réservation, les dashboards, etc.',
    objective: 'Fournir une vision claire et ordonnée de tout ce qui doit être développé pour atteindre l\'objectif produit.',
    owner: 'Product Owner (crée, ordonne et met à jour)',
    items: ['PB01 – Inscription patient', 'PB02 – Connexion', 'PB03 – Recherche médecins', 'PB10 – Notifications'],
  },
  {
    id: 'sprint-backlog',
    icon: Layers,
    name: 'Sprint Backlog',
    color: 'from-amber-500 to-amber-700',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-700',
    border: 'border-amber-200',
    definition: 'Ensemble des éléments sélectionnés du Product Backlog pour le Sprint ainsi que le plan permettant de les réaliser.',
    explanation: 'Le Sprint Backlog est la propriété des Developers. Il évolue tout au long du Sprint selon les découvertes de l\'équipe.',
    medibook: 'Dans MediBook Sprint 4: tâches liées à l\'espace médecin — dashboard, gestion disponibilités, acceptation/refus des RDV.',
    objective: 'Rendre visible le plan de travail pour atteindre l\'objectif du Sprint et livrer un Increment.',
    owner: 'Developers (créent et mettent à jour)',
    items: ['Créer le dashboard médecin', 'Implémenter la gestion des créneaux', 'Interface d\'acceptation/refus RDV'],
  },
  {
    id: 'increment',
    icon: Zap,
    name: 'Increment',
    color: 'from-accent-500 to-accent-700',
    bgLight: 'bg-accent-50',
    textColor: 'text-accent-700',
    border: 'border-accent-200',
    definition: 'Résultat concret et utilisable du travail réalisé pendant un Sprint, respectant la Definition of Done.',
    explanation: 'L\'Increment est la somme de tous les éléments du Product Backlog complétés. Il doit être potentiellement livrable à tout moment.',
    medibook: 'Sprint 1 de MediBook: système d\'authentification complet (inscription, connexion, déconnexion, gestion des rôles) — fonctionnel et déployable.',
    objective: 'Produire une valeur concrète et utilisable à la fin de chaque Sprint, indépendamment de sa mise en production.',
    owner: 'Scrum Team (tous contribuent, tous responsables)',
    items: ['Sprint 1 → Authentification', 'Sprint 2 → Espace Patient', 'Sprint 3 → Réservation'],
  },
];

export default function ScrumArtifactsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Les Artefacts Scrum</h1>
        <p className="text-text-muted text-sm mt-1">Les 3 artefacts officiels Scrum et leur application dans MediBook</p>
      </div>

      {/* Relationship visual */}
      <div className="card p-6">
        <h2 className="font-semibold text-text-primary mb-6 text-center">Relation entre les 3 Artefacts</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {artifacts.map((art, i) => (
            <div key={art.id} className="flex items-center gap-4">
              <div className={`${art.bgLight} border ${art.border} rounded-2xl p-5 text-center w-48`}>
                <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${art.color} flex items-center justify-center`}>
                  <art.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-bold text-text-primary text-sm">{art.name}</p>
                <p className={`text-xs mt-1 ${art.textColor}`}>{art.owner.split('(')[0].trim()}</p>
              </div>
              {i < artifacts.length - 1 && (
                <div className="flex flex-col items-center text-text-muted">
                  <ArrowRight className="w-6 h-6 hidden md:block" />
                  <span className="text-xs text-center hidden md:block mt-1">sélection</span>
                
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-text-muted mt-4">
          Le Product Owner sélectionne des éléments du <strong>Product Backlog</strong> → vers le <strong>Sprint Backlog</strong> → pour créer un <strong>Increment</strong>
        </p>
      </div>

      {/* Artifact details */}
      <div className="space-y-6">
        {artifacts.map(art => (
          <div key={art.id} className={`card overflow-hidden border-l-4 ${art.border}`}>
            <div className={`bg-gradient-to-r ${art.color} p-5 text-white`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <art.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{art.name}</h2>
                  <div className="flex items-center gap-1 text-sm opacity-80 mt-0.5">
                    <Users className="w-3 h-3" />
                    {art.owner}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Définition officielle</h3>
                  <p className="text-sm text-text-secondary leading-relaxed italic border-l-2 border-primary-300 pl-3">{art.definition}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Explication simple</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{art.explanation}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase mb-2 flex items-center gap-1">
                    <Target className="w-3 h-3" /> Objectif
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{art.objective}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Dans MediBook</h3>
                  <div className={`${art.bgLight} rounded-xl p-4`}>
                    <p className={`text-sm ${art.textColor} leading-relaxed mb-3`}>{art.medibook}</p>
                    <div className="space-y-1.5">
                      {art.items.map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-text-secondary">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${art.color} shrink-0`} />
                          {item}
                        </div>
                      ))}
                    </div>
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
