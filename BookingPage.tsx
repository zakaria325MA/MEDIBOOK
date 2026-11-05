import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, ChevronLeft, ChevronRight, 
  MapPin, Star, Shield, Check, X, ArrowLeft
} from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';

const doctor = {
  id: '1',
  name: 'Dr. Amina Benali',
  specialty: 'Cardiologie',
  city: 'Azilal',
  rating: 4.9,
  reviews: 128,
  experience: 15,
  fee: 300,
  avatar: 'A',
  bio: 'Cardiologue spécialisée avec 15 ans d\'expérience dans le diagnostic et le traitement des maladies cardiovasculaires. Diplomée de la Faculté de Médecine d\'Azilal.',
  is_verified: true,
};

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

export default function BookingPage() {
  const { doctorId } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [reason, setReason] = useState('');
  const [weekOffset, setWeekOffset] = useState(0);

  const weekStart = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), weekOffset * 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Simulate some booked slots
  const bookedSlots = ['09:00', '10:00', '14:30'];

  const handleConfirm = () => {
    if (!selectedSlot) return;
    setStep('confirm');
  };

  const handleBook = () => {
    // In production: call Supabase to create appointment
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="max-w-lg mx-auto text-center py-16 animate-scale-in">
        <div className="w-24 h-24 mx-auto mb-6 bg-accent-100 rounded-full flex items-center justify-center">
          <Check className="w-12 h-12 text-accent-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Rendez-vous réservé!</h2>
        <p className="text-text-secondary mb-1">
          Votre demande a été envoyée au médecin.
        </p>
        <p className="text-text-secondary mb-6">
          <strong>{doctor.name}</strong> • {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })} à {selectedSlot}
        </p>
        <div className="badge badge-warning mb-6 text-sm px-4 py-2">En attente de confirmation du médecin</div>
        <div className="flex gap-3 justify-center">
          <Link to="/patient" className="btn btn-secondary">Retour au dashboard</Link>
          <Link to="/patient/rendez-vous" className="btn btn-primary">Voir mes rendez-vous</Link>
        </div>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="max-w-lg mx-auto animate-fade-in">
        <button onClick={() => setStep('select')} className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <div className="card p-6 space-y-5">
          <h2 className="text-xl font-bold text-text-primary">Confirmer le rendez-vous</h2>
          <div className="bg-surface-secondary rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-primary text-white flex items-center justify-center font-bold text-lg">{doctor.avatar}</div>
              <div>
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-sm text-primary-600">{doctor.specialty}</p>
              </div>
            </div>
            <hr className="border-border-light" />
            <div className="space-y-2 text-sm text-text-secondary">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary-500" />{format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-500" />Créneau: {selectedSlot}</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-500" />{doctor.city}</div>
            </div>
            <div className="flex justify-between items-center pt-2 font-semibold text-text-primary">
              <span>Frais de consultation</span>
              <span className="text-primary-600">{doctor.fee} MAD</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Motif de consultation (optionnel)</label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Décrivez brièvement le motif de votre visite..."
              className="input min-h-[80px] resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep('select')} className="btn btn-secondary flex-1">
              <X className="w-4 h-4" /> Annuler
            </button>
            <button onClick={handleBook} className="btn btn-primary flex-1">
              <Check className="w-4 h-4" /> Confirmer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/patient/recherche" className="p-2 rounded-lg hover:bg-primary-50 text-text-muted hover:text-primary-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Réserver un rendez-vous</h1>
          <p className="text-text-muted text-sm">Sélectionnez une date et un créneau disponible</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Doctor info */}
        <div className="lg:col-span-1">
          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl gradient-primary text-white flex items-center justify-center font-bold text-2xl">{doctor.avatar}</div>
              <div>
                <h2 className="font-bold text-text-primary">{doctor.name}</h2>
                <p className="text-sm text-primary-600">{doctor.specialty}</p>
                {doctor.is_verified && (
                  <div className="flex items-center gap-1 text-xs text-accent-600 mt-0.5">
                    <Shield className="w-3 h-3" /> Vérifié
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className={`w-4 h-4 ${i <= Math.floor(doctor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
              ))}
              <span className="text-sm text-text-muted ml-1">{doctor.rating} ({doctor.reviews})</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{doctor.bio}</p>
            <div className="bg-primary-50 rounded-xl p-4 text-center">
              <p className="text-xs text-text-muted">Frais de consultation</p>
              <p className="text-2xl font-bold text-primary-700">{doctor.fee} MAD</p>
            </div>
          </div>
        </div>

        {/* Calendar & Slots */}
        <div className="lg:col-span-2 space-y-4">
          {/* Week navigation */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setWeekOffset(w => w - 1)} disabled={weekOffset <= 0} className="p-2 rounded-lg hover:bg-primary-50 disabled:opacity-30 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <p className="font-semibold text-text-primary text-sm">
                Semaine du {format(weekStart, 'd MMMM yyyy', { locale: fr })}
              </p>
              <button onClick={() => setWeekOffset(w => w + 1)} className="p-2 rounded-lg hover:bg-primary-50 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map(day => {
                const isSelected = isSameDay(day, selectedDate);
                const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => !isPast && setSelectedDate(day)}
                    disabled={isPast}
                    className={`p-2 rounded-xl text-center transition-all ${
                      isSelected ? 'gradient-primary text-white' :
                      isPast ? 'opacity-30 cursor-not-allowed' :
                      'hover:bg-primary-50 text-text-secondary'
                    }`}
                  >
                    <p className="text-xs font-medium">{format(day, 'EEE', { locale: fr }).slice(0, 3)}</p>
                    <p className="text-lg font-bold">{format(day, 'd')}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div className="card p-5">
            <h3 className="font-semibold text-text-primary mb-4">
              Créneaux disponibles — {format(selectedDate, 'EEEE d MMMM', { locale: fr })}
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map(slot => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => !isBooked && setSelectedSlot(slot)}
                    disabled={isBooked}
                    className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                      isSelected ? 'gradient-primary text-white shadow-md' :
                      isBooked ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through' :
                      'bg-surface-secondary hover:bg-primary-50 hover:text-primary-600 text-text-secondary'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary-500 inline-block" />Sélectionné</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-200 inline-block" />Réservé</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-surface-secondary border border-border inline-block" />Disponible</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedSlot}
            className="btn btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calendar className="w-5 h-5" />
            Confirmer la sélection
          </button>
        </div>
      </div>
    </div>
  );
}
