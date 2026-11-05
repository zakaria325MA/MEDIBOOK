import { useState } from 'react';
import { Shield, Code2, Target, CheckSquare, ChevronDown, ChevronUp, Plus, Edit2, Trash2, Search } from 'lucide-react';

const initialBacklog = [
  { id: '1', code: 'PB01', title: 'Inscription patient', priority: 'high', difficulty: 5, status: 'done', assigned: 'Dev 1', usCode: 'US01' },
  { id: '2', code: 'PB02', title: 'Connexion utilisateur', priority: 'high', difficulty: 3, status: 'done', assigned: 'Dev 1', usCode: 'US01' },
  { id: '3', code: 'PB03', title: 'Recherche de médecins', priority: 'high', difficulty: 5, status: 'done', assigned: 'Dev 2', usCode: 'US02' },
  { id: '4', code: 'PB04', title: 'Consultation profil médecin', priority: 'high', difficulty: 3, status: 'done', assigned: 'Dev 2', usCode: 'US02' },
  { id: '5', code: 'PB05', title: 'Réservation rendez-vous', priority: 'high', difficulty: 8, status: 'in_progress', assigned: 'Dev 1', usCode: 'US03' },
  { id: '6', code: 'PB06', title: 'Annulation rendez-vous', priority: 'medium', difficulty: 5, status: 'in_progress', assigned: 'Dev 2', usCode: 'US03' },
  { id: '7', code: 'PB07', title: 'Gestion des disponibilités', priority: 'high', difficulty: 8, status: 'in_progress', assigned: 'Dev 1', usCode: 'US04' },
  { id: '8', code: 'PB08', title: 'Dashboard médecin', priority: 'high', difficulty: 5, status: 'ready', assigned: 'Dev 2', usCode: 'US04' },
  { id: '9', code: 'PB09', title: 'Dashboard administrateur', priority: 'medium', difficulty: 8, status: 'ready', assigned: 'Dev 1', usCode: 'US05' },
  { id: '10', code: 'PB10', title: 'Système de notifications', priority: 'low', difficulty: 5, status: 'new', assigned: '', usCode: '' },
];

const priorityConfig = { high: { label: 'Haute', cls: 'badge-danger' }, medium: { label: 'Moyenne', cls: 'badge-warning' }, low: { label: 'Basse', cls: 'badge-primary' } };
const statusConfig = {
  new: { label: 'Nouveau', cls: 'bg-gray-100 text-gray-600' },
  ready: { label: 'Prêt', cls: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'En cours', cls: 'bg-yellow-100 text-yellow-700' },
  done: { label: 'Terminé', cls: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Annulé', cls: 'bg-red-100 text-red-700' },
};

export default function ProductBacklogPage() {
  const [items, setItems] = useState(initialBacklog);
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', priority: 'medium', difficulty: 5, status: 'new', assigned: '' });

  const filtered = items.filter(i =>
    (i.title.toLowerCase().includes(search.toLowerCase()) || i.code.toLowerCase().includes(search.toLowerCase())) &&
    (filterPriority === 'all' || i.priority === filterPriority) &&
    (filterStatus === 'all' || i.status === filterStatus)
  );

  const addItem = () => {
    if (!newItem.title.trim()) return;
    const code = `PB${String(items.length + 1).padStart(2, '0')}`;
    setItems(prev => [...prev, { id: Date.now().toString(), code, ...newItem, usCode: '' }]);
    setNewItem({ title: '', priority: 'medium', difficulty: 5, status: 'new', assigned: '' });
    setShowForm(false);
  };

  const deleteItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const doneCount = items.filter(i => i.status === 'done').length;
  const progress = Math.round((doneCount / items.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Target className="w-6 h-6 text-primary-600" />
            Product Backlog
          </h1>
          <p className="text-text-muted text-sm mt-1">Liste organisée et priorisée de tous les éléments du produit MediBook</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          <Plus className="w-4 h-4" /> Ajouter un élément
        </button>
      </div>

      {/* Progress */}
      <div className="card p-5">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-text-secondary">Progression globale</span>
          <span className="font-bold text-primary-600">{doneCount}/{items.length} éléments terminés ({progress}%)</span>
        </div>
        <div className="h-3 bg-surface-secondary rounded-full overflow-hidden">
          <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card p-5 border-2 border-primary-200 animate-scale-in">
          <h3 className="font-semibold text-text-primary mb-4">Nouvel élément du backlog</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <input value={newItem.title} onChange={e => setNewItem(p => ({ ...p, title: e.target.value }))}
                placeholder="Titre de l'élément..." className="input" />
            </div>
            <select value={newItem.priority} onChange={e => setNewItem(p => ({ ...p, priority: e.target.value }))} className="input">
              <option value="high">Haute priorité</option>
              <option value="medium">Moyenne priorité</option>
              <option value="low">Basse priorité</option>
            </select>
            <select value={newItem.difficulty} onChange={e => setNewItem(p => ({ ...p, difficulty: Number(e.target.value) }))} className="input">
              {[1, 2, 3, 5, 8, 13].map(n => <option key={n} value={n}>{n} points</option>)}
            </select>
            <input value={newItem.assigned} onChange={e => setNewItem(p => ({ ...p, assigned: e.target.value }))}
              placeholder="Responsable..." className="input" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => setShowForm(false)} className="btn btn-secondary flex-1">Annuler</button>
            <button onClick={addItem} className="btn btn-primary flex-1">Ajouter</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." className="input pl-10" />
        </div>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="input w-auto">
          <option value="all">Toutes priorités</option>
          <option value="high">Haute</option>
          <option value="medium">Moyenne</option>
          <option value="low">Basse</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input w-auto">
          <option value="all">Tous statuts</option>
          <option value="new">Nouveau</option>
          <option value="ready">Prêt</option>
          <option value="in_progress">En cours</option>
          <option value="done">Terminé</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Code</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Titre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Priorité</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Points</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Statut</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted">Responsable</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filtered.map(item => {
                const p = priorityConfig[item.priority as keyof typeof priorityConfig];
                const s = statusConfig[item.status as keyof typeof statusConfig];
                return (
                  <tr key={item.id} className="hover:bg-surface-secondary/50">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-primary-600">{item.code}</td>
                    <td className="px-4 py-3 font-medium text-text-primary">{item.title}</td>
                    <td className="px-4 py-3"><span className={`badge text-xs ${p.cls}`}>{p.label}</span></td>
                    <td className="px-4 py-3"><span className="font-semibold text-text-primary">{item.difficulty}</span> <span className="text-text-muted text-xs">pts</span></td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${s.cls}`}>{s.label}</span></td>
                    <td className="px-4 py-3 text-text-secondary text-xs">{item.assigned || '—'}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => deleteItem(item.id)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
