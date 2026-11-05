import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { BookOpen, List, Layers, Users, CheckCircle, Clock, AlertCircle, Activity, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const sprintProgress = [
  { name: 'Sprint 1', done: 8, total: 8 },
  { name: 'Sprint 2', done: 7, total: 10 },
  { name: 'Sprint 3', done: 6, total: 9 },
  { name: 'Sprint 4', done: 3, total: 8 },
  { name: 'Sprint 5', done: 0, total: 7 },
  { name: 'Sprint 6', done: 0, total: 6 },
];

const activities = [
  { user: 'Z', name: 'Zakaria M.', action: 'a créé la tâche "Authentification Supabase"', time: 'Il y a 2h', color: 'gradient-primary' },
  { user: 'S', name: 'Scrum Master', action: 'a mis à jour le Sprint 4', time: 'Il y a 5h', color: 'bg-accent-500' },
  { user: 'D', name: 'Dev 1', action: 'a terminé "Dashboard Patient"', time: 'Hier', color: 'bg-purple-500' },
  { user: 'D', name: 'Dev 2', action: 'a ajouté un commentaire sur US03', time: 'Hier', color: 'bg-orange-500' },
];

export default function ScrumDashboard() {
  const totalTasks = 48;
  const done = 24;
  const doing = 8;
  const todo = 16;
  const progress = Math.round((done / totalTasks) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-800 to-accent-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10" />
        <div className="absolute bottom-0 left-0 h-1 bg-accent-400 transition-all" style={{ width: `${progress}%` }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-white/15 rounded-full text-xs font-medium">Sprint 4 en cours</span>
            <span className="px-3 py-1 bg-accent-500/30 rounded-full text-xs font-medium">Scrum Project</span>
          </div>
          <h1 className="text-2xl font-bold">MEDIBOOK — Scrum Dashboard</h1>
          <p className="text-primary-100 text-sm mt-1">Gestion de projet Agile Scrum</p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-primary-100">Progression générale</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-accent-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'User Stories', value: '25', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
          { label: 'Tâches DONE', value: done.toString(), icon: CheckCircle, color: 'bg-accent-50 text-accent-600' },
          { label: 'En cours (DOING)', value: doing.toString(), icon: Activity, color: 'bg-yellow-50 text-yellow-600' },
          { label: 'À faire (TODO)', value: todo.toString(), icon: Clock, color: 'bg-purple-50 text-purple-600' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{s.value}</p>
            <p className="text-xs text-text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <h2 className="font-semibold text-text-primary mb-5">Avancement par Sprint</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sprintProgress} barGap={4}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="done" fill="#10b981" radius={[4, 4, 0, 0]} name="Terminé" />
              <Bar dataKey="total" fill="#bfdbfe" radius={[4, 4, 0, 0]} name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold text-text-primary mb-4">Activités récentes</h2>
          <div className="space-y-4">
            {activities.map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full ${act.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                  {act.user}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary">{act.name}</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{act.action}</p>
                  <p className="text-xs text-text-muted mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Nav */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { to: '/scrum/backlog', label: 'Product Backlog', icon: List, color: 'bg-blue-50 text-blue-600' },
          { to: '/scrum/user-stories', label: 'User Stories', icon: BookOpen, color: 'bg-purple-50 text-purple-600' },
          { to: '/scrum/sprint-backlog', label: 'Sprint Backlog', icon: Layers, color: 'bg-accent-50 text-accent-600' },
          { to: '/scrum/equipe', label: 'Équipe Scrum', icon: Users, color: 'bg-orange-50 text-orange-600' },
          { to: '/scrum/sprints', label: 'Sprints', icon: TrendingUp, color: 'bg-pink-50 text-pink-600' },
        ].map(l => (
          <Link key={l.to} to={l.to} className="card p-4 text-center hover:border-primary-200 border-2 border-transparent group">
            <div className={`w-12 h-12 mx-auto rounded-xl ${l.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <l.icon className="w-6 h-6" />
            </div>
            <p className="text-xs font-semibold text-text-primary">{l.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
