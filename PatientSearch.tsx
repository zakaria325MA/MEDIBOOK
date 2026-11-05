import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, MapPin, Star, Clock, Stethoscope,
  Calendar
} from 'lucide-react';

const specialties = ['Tous', 'Médecine Générale', 'Cardiologie', 'Neurologie', 'Pédiatrie', 'Ophtalmologie', 'Orthopédie', 'Dermatologie', 'Psychiatrie'];
const cities = ['Toutes', 'Azilal', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Béni Mellal'];

const doctors = [
  { id: '1', name: 'Dr. Amina Benali', specialty: 'Cardiologie', city: 'Azilal', rating: 4.9, reviews: 128, experience: 15, available: true, fee: 300, avatar: 'A' },
  { id: '2', name: 'Dr. Hassan Tazi', specialty: 'Neurologie', city: 'Rabat', rating: 4.8, reviews: 95, experience: 20, available: true, fee: 350, avatar: 'H' },
  { id: '3', name: 'Dr. Leila Kabbaj', specialty: 'Pédiatrie', city: 'Marrakech', rating: 4.7, reviews: 210, experience: 12, available: false, fee: 250, avatar: 'L' },
  { id: '4', name: 'Dr. Omar Fassi', specialty: 'Dermatologie', city: 'Fès', rating: 4.9, reviews: 87, experience: 8, available: true, fee: 280, avatar: 'O' },
  { id: '5', name: 'Dr. Nadia Chraibi', specialty: 'Ophtalmologie', city: 'Tanger', rating: 4.6, reviews: 156, experience: 18, available: true, fee: 320, avatar: 'N' },
  { id: '6', name: 'Dr. Youssef Alami', specialty: 'Médecine Générale', city: 'Azilal', rating: 4.8, reviews: 320, experience: 10, available: true, fee: 200, avatar: 'Y' },
];

export default function PatientSearch() {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('Tous');
  const [city, setCity] = useState('Toutes');

  const filtered = doctors.filter(d => {
    const q = search.toLowerCase();
    return (
      (d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)) &&
      (specialty === 'Tous' || d.specialty === specialty) &&
      (city === 'Toutes' || d.city === city)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Rechercher un médecin</h1>
        <p className="text-text-muted text-sm mt-1">Trouvez le spécialiste idéal et réservez votre rendez-vous</p>
      </div>

      {/* Search & Filters */}
      <div className="card p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Médecin, spécialité..."
            className="input pl-10"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select value={specialty} onChange={e => setSpecialty(e.target.value)} className="input">
            {specialties.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={city} onChange={e => setCity(e.target.value)} className="input">
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <p className="text-sm text-text-muted">{filtered.length} médecin(s) trouvé(s)</p>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((doc, i) => (
          <div key={doc.id} className="card p-5 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold shrink-0">
                {doc.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-text-primary">{doc.name}</h3>
                    <p className="text-sm text-primary-600">{doc.specialty}</p>
                  </div>
                  <span className={`badge text-xs shrink-0 ${doc.available ? 'badge-success' : 'badge-danger'}`}>
                    {doc.available ? 'Disponible' : 'Indisponible'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-text-muted">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{doc.city}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{doc.experience} ans</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{doc.rating} ({doc.reviews})</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
              <span className="text-sm font-semibold text-text-primary">{doc.fee} MAD / consultation</span>
              <Link to={`/patient/reservation/${doc.id}`} className={`btn text-xs px-4 py-2 ${doc.available ? 'btn-primary' : 'btn-secondary opacity-50 pointer-events-none'}`}>
                <Calendar className="w-3 h-3" />
                Réserver
              </Link>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-12 text-text-muted">
            <Stethoscope className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Aucun médecin trouvé avec ces critères.</p>
          </div>
        )}
      </div>
    </div>
  );
}
