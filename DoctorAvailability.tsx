import { useState } from 'react';
import { CheckSquare, Square, Plus, Trash2 } from 'lucide-react';

const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

interface Slot {
  start: string;
  end: string;
  active: boolean;
}

type Schedule = Record<number, Slot[]>;

const defaultSchedule: Schedule = {
  0: [{ start: '09:00', end: '12:00', active: true }, { start: '14:00', end: '17:00', active: true }],
  1: [{ start: '09:00', end: '12:00', active: true }],
  2: [{ start: '09:00', end: '12:00', active: true }, { start: '14:00', end: '17:00', active: false }],
  3: [{ start: '09:00', end: '12:00', active: true }],
  4: [{ start: '09:00', end: '12:00', active: true }, { start: '14:00', end: '17:00', active: true }],
  5: [],
  6: [],
};

export default function DoctorAvailability() {
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule);
  const [slotDuration, setSlotDuration] = useState(30);
  const [saved, setSaved] = useState(false);

  const toggleSlot = (dayIdx: number, slotIdx: number) => {
    setSchedule(prev => ({
      ...prev,
      [dayIdx]: prev[dayIdx].map((s, i) => i === slotIdx ? { ...s, active: !s.active } : s),
    }));
  };

  const addSlot = (dayIdx: number) => {
    setSchedule(prev => ({
      ...prev,
      [dayIdx]: [...(prev[dayIdx] || []), { start: '09:00', end: '12:00', active: true }],
    }));
  };

  const removeSlot = (dayIdx: number, slotIdx: number) => {
    setSchedule(prev => ({
      ...prev,
      [dayIdx]: prev[dayIdx].filter((_, i) => i !== slotIdx),
    }));
  };

  const saveChanges = () => {
    // In production: save to Supabase
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Gestion des disponibilités</h1>
          <p className="text-text-muted text-sm mt-1">Définissez vos créneaux de consultation</p>
        </div>
        <button onClick={saveChanges} className={`btn ${saved ? 'btn-accent' : 'btn-primary'}`}>
          {saved ? '✓ Sauvegardé' : 'Enregistrer'}
        </button>
      </div>

      <div className="card p-5 flex items-center gap-4">
        <label className="text-sm font-medium text-text-secondary">Durée par créneau:</label>
        <div className="flex gap-2">
          {[15, 20, 30, 45, 60].map(d => (
            <button key={d} onClick={() => setSlotDuration(d)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${slotDuration === d ? 'gradient-primary text-white' : 'bg-surface-secondary text-text-secondary hover:bg-primary-50'}`}>
              {d}min
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {daysOfWeek.map((day, dayIdx) => {
          const slots = schedule[dayIdx] || [];
          const hasActiveSlots = slots.some(s => s.active);
          return (
            <div key={day} className={`card p-5 ${!hasActiveSlots && slots.length > 0 ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary">{day}</h3>
                <div className="flex items-center gap-2">
                  {slots.length > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${hasActiveSlots ? 'bg-accent-100 text-accent-700' : 'bg-gray-100 text-gray-500'}`}>
                      {hasActiveSlots ? 'Actif' : 'Inactif'}
                    </span>
                  )}
                  <button onClick={() => addSlot(dayIdx)} className="p-1 hover:bg-primary-50 rounded-lg text-primary-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {slots.length === 0 ? (
                <div className="text-center py-4 text-text-muted text-sm">
                  <p>Jour non travaillé</p>
                  <button onClick={() => addSlot(dayIdx)} className="text-primary-600 text-xs mt-1 hover:underline">+ Ajouter un créneau</button>
                </div>
              ) : (
                <div className="space-y-2">
                  {slots.map((slot, slotIdx) => (
                    <div key={slotIdx} className={`flex items-center gap-2 p-2.5 rounded-xl ${slot.active ? 'bg-primary-50' : 'bg-gray-50'}`}>
                      <button onClick={() => toggleSlot(dayIdx, slotIdx)}>
                        {slot.active
                          ? <CheckSquare className="w-4 h-4 text-primary-600" />
                          : <Square className="w-4 h-4 text-text-muted" />}
                      </button>
                      <div className="flex items-center gap-1 flex-1 text-sm">
                        <input type="time" value={slot.start}
                          onChange={e => setSchedule(prev => ({ ...prev, [dayIdx]: prev[dayIdx].map((s, i) => i === slotIdx ? { ...s, start: e.target.value } : s) }))}
                          className="border border-border rounded px-1 py-0.5 text-xs w-20" />
                        <span className="text-text-muted text-xs">→</span>
                        <input type="time" value={slot.end}
                          onChange={e => setSchedule(prev => ({ ...prev, [dayIdx]: prev[dayIdx].map((s, i) => i === slotIdx ? { ...s, end: e.target.value } : s) }))}
                          className="border border-border rounded px-1 py-0.5 text-xs w-20" />
                      </div>
                      <button onClick={() => removeSlot(dayIdx, slotIdx)} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
