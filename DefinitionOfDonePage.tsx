import { CheckSquare, Check } from 'lucide-react';

const criteria = [
  { id: 1, text: 'Le code est terminé et toutes les fonctionnalités sont implémentées', checked: true },
  { id: 2, text: 'La fonctionnalité fonctionne correctement selon les critères d\'acceptation', checked: true },
  { id: 3, text: 'Les tests unitaires sont écrits et passent tous avec succès', checked: true },
  { id: 4, text: 'Les erreurs principales sont identifiées et corrigées', checked: true },
  { id: 5, text: 'Le code est revu par un autre membre de l\'équipe (code review)', checked: true },
  { id: 6, text: 'La fonctionnalité respecte les exigences définies dans la User Story', checked: true },
  { id: 7, text: 'L\'interface est responsive (mobile, tablette, ordinateur)', checked: true },
  { id: 8, text: 'Les données sont validées côté Frontend et Backend', checked: false },
  { id: 9, text: 'Les politiques RLS Supabase sont appliquées correctement', checked: false },
  { id: 10, text: 'La documentation technique est mise à jour', checked: false },
];

export default function DefinitionOfDonePage() {
  const checkedCount = criteria.filter(c => c.checked).length;
  const progress = Math.round((checkedCount / criteria.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-primary-600" />
          Definition of Done
        </h1>
        <p className="text-text-muted text-sm mt-1">Les critères qualité requis pour qu'un Increment soit considéré comme terminé</p>
      </div>

      {/* Definition */}
      <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
        <h2 className="font-semibold text-primary-800 mb-2">Définition officielle</h2>
        <p className="text-primary-700 text-sm leading-relaxed">
          La <strong>Definition of Done (DoD)</strong> est une description formelle de l'état attendu d'un Increment lorsqu'il respecte les critères de qualité requis par la Scrum Team.
          Un élément du Product Backlog ne peut être considéré comme "Done" que s'il satisfait l'ensemble des critères définis.
        </p>
      </div>

      {/* Progress */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-text-primary">Critères respectés — Sprint 4</h2>
          <span className="text-primary-600 font-bold">{checkedCount}/{criteria.length}</span>
        </div>
        <div className="h-3 bg-surface-secondary rounded-full overflow-hidden">
          <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-text-muted mt-2">{progress}% des critères DoD respectés pour ce Sprint</p>
      </div>

      {/* Criteria list */}
      <div className="card p-6">
        <h2 className="font-semibold text-text-primary mb-4">Critères de la Definition of Done — MediBook</h2>
        <div className="space-y-3">
          {criteria.map(criterion => (
            <div key={criterion.id} className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${criterion.checked ? 'bg-accent-50' : 'bg-surface-secondary'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${criterion.checked ? 'bg-accent-500' : 'bg-border border-2 border-border'}`}>
                {criterion.checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${criterion.checked ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {criterion.text}
                </p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${criterion.checked ? 'bg-accent-100 text-accent-700' : 'bg-gray-100 text-gray-500'}`}>
                {criterion.checked ? 'Respecté' : 'En cours'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Important note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-800 leading-relaxed">
          <strong>⚠️ Important:</strong> Si un élément du Product Backlog ne satisfait pas la Definition of Done, il ne peut pas être inclus dans l'Increment et doit retourner dans le Product Backlog pour être traité dans un futur Sprint.
        </p>
      </div>
    </div>
  );
}
