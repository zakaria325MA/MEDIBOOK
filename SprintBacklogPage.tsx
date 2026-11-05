import { useState } from 'react';
import { Layers, Plus, GripVertical } from 'lucide-react';

type TaskStatus = 'todo' | 'doing' | 'done';

interface KanbanTask {
  id: string;
  title: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  story: string;
  status: TaskStatus;
}

const initialTasks: KanbanTask[] = [
  { id: '1', title: 'Créer le formulaire d\'inscription', assignee: 'Dev 1', priority: 'high', story: 'US01', status: 'done' },
  { id: '2', title: 'Configurer Supabase Auth', assignee: 'Dev 1', priority: 'high', story: 'US01', status: 'done' },
  { id: '3', title: 'Créer la page de recherche', assignee: 'Dev 2', priority: 'high', story: 'US02', status: 'done' },
  { id: '4', title: 'Implémenter le filtre par spécialité', assignee: 'Dev 2', priority: 'medium', story: 'US02', status: 'done' },
  { id: '5', title: 'Créer le calendrier de réservation', assignee: 'Dev 1', priority: 'high', story: 'US03', status: 'doing' },
  { id: '6', title: 'API vérification double réservation', assignee: 'Dev 2', priority: 'high', story: 'US03', status: 'doing' },
  { id: '7', title: 'Notification lors de réservation', assignee: 'Dev 1', priority: 'medium', story: 'US03', status: 'doing' },
  { id: '8', title: 'Dashboard médecin', assignee: 'Dev 2', priority: 'high', story: 'US04', status: 'todo' },
  { id: '9', title: 'Gestion des disponibilités médecin', assignee: 'Dev 1', priority: 'high', story: 'US04', status: 'todo' },
  { id: '10', title: 'Interface admin - gestion users', assignee: 'Dev 2', priority: 'medium', story: 'US05', status: 'todo' },
];

const priorityColor = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-blue-100 text-blue-700' };
const priorityLabel = { high: 'Haute', medium: 'Moyenne', low: 'Basse' };

const columns: { id: TaskStatus; label: string; color: string; headerBg: string }[] = [
  { id: 'todo', label: 'TO DO', color: 'border-gray-300', headerBg: 'bg-gray-50' },
  { id: 'doing', label: 'DOING', color: 'border-yellow-300', headerBg: 'bg-yellow-50' },
  { id: 'done', label: 'DONE', color: 'border-green-300', headerBg: 'bg-green-50' },
];

export default function SprintBacklogPage() {
  const [tasks, setTasks] = useState<KanbanTask[]>(initialTasks);
  const [dragId, setDragId] = useState<string | null>(null);

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    if (dragId) moveTask(dragId, status);
    setDragId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary-600" />
            Sprint Backlog — Sprint 4
          </h1>
          <p className="text-text-muted text-sm mt-1">Tableau Kanban — Glissez les tâches pour changer leur statut</p>
        </div>
        <div className="flex gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">{tasks.filter(t => t.status === 'done').length}</p>
            <p className="text-xs text-text-muted">Terminé</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{tasks.filter(t => t.status === 'doing').length}</p>
            <p className="text-xs text-text-muted">En cours</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-muted">{tasks.filter(t => t.status === 'todo').length}</p>
            <p className="text-xs text-text-muted">À faire</p>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div
              key={col.id}
              className={`rounded-2xl border-2 ${col.color} min-h-[500px]`}
              onDragOver={e => e.preventDefault()}
              onDrop={e => handleDrop(e, col.id)}
            >
              {/* Column header */}
              <div className={`${col.headerBg} rounded-t-2xl px-4 py-3 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-text-primary">{col.label}</span>
                  <span className="w-6 h-6 rounded-full bg-white text-xs font-bold flex items-center justify-center text-text-primary shadow-sm">
                    {colTasks.length}
                  </span>
                </div>
                <button className="p-1 hover:bg-white rounded-lg transition-colors">
                  <Plus className="w-4 h-4 text-text-muted" />
                </button>
              </div>

              {/* Tasks */}
              <div className="p-3 space-y-2">
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDragId(task.id)}
                    className="bg-white rounded-xl p-4 shadow-sm border border-border-light cursor-grab active:cursor-grabbing hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-medium text-text-primary leading-snug">{task.title}</h4>
                      <GripVertical className="w-4 h-4 text-text-muted shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColor[task.priority]}`}>
                          {priorityLabel[task.priority]}
                        </span>
                        <span className="text-xs text-primary-600 font-mono">{task.story}</span>
                      </div>
                      <div className="w-6 h-6 rounded-full gradient-primary text-white text-xs flex items-center justify-center font-bold" title={task.assignee}>
                        {task.assignee.charAt(task.assignee.length - 1)}
                      </div>
                    </div>

                    {/* Quick move buttons */}
                    <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {columns.filter(c => c.id !== col.id).map(c => (
                        <button key={c.id} onClick={() => moveTask(task.id, c.id)}
                          className="text-xs px-2 py-1 bg-surface-secondary rounded hover:bg-primary-50 hover:text-primary-600 transition-colors">
                          → {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="py-8 text-center text-text-muted text-sm">
                    <p>Déposez ici</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
