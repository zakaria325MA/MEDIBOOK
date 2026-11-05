import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Star,
  Clock,
  Phone,
  Filter,
  ChevronDown,
  Stethoscope,
  Baby,
  Brain,
  Eye,
  Bone,
  Pill,
  Activity,
  Heart,
  Ear,
  Smile,
  Syringe,
} from 'lucide-react';

const allSpecialties = [
  'Tous', 'Médecine Générale', 'Pédiatrie', 'Neurologie', 'Ophtalmologie',
  'Orthopédie', 'Dermatologie', 'Cardiologie', 'Psychiatrie', 'ORL', 'Dentaire', 'Gynécologie',
];

const cities = ['Toutes', 'Azilal', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Béni Mellal'];

const specialtyIcons: Record<string, React.ElementType> = {
  'Médecine Générale': Stethoscope,
  'Pédiatrie': Baby,
  'Neurologie': Brain,
  'Ophtalmologie': Eye,
  'Orthopédie': Bone,
  'Dermatologie': Pill,
  'Cardiologie': Activity,
  'Psychiatrie': Heart,
  'ORL': Ear,
  'Dentaire': Smile,
  'Gynécologie': Syringe,
};

// Sample doctors data (will be replaced by Supabase data)
const sampleDoctors = [
  { id: '1', name: 'Dr. Amina Benali', specialty: 'Cardiologie', city: 'Azilal', rating: 4.9, reviews: 128, experience: 15, available: true, fee: 300, avatar: 'A' },
  { id: '2', name: 'Dr. Hassan Tazi', specialty: 'Neurologie', city: 'Rabat', rating: 4.8, reviews: 95, experience: 20, available: true, fee: 350, avatar: 'H' },
  { id: '3', name: 'Dr. Leila Kabbaj', specialty: 'Pédiatrie', city: 'Marrakech', rating: 4.7, reviews: 210, experience: 12, available: false, fee: 250, avatar: 'L' },
  { id: '4', name: 'Dr. Omar Fassi', specialty: 'Dermatologie', city: 'Fès', rating: 4.9, reviews: 87, experience: 8, available: true, fee: 280, avatar: 'O' },
  { id: '5', name: 'Dr. Nadia Chraibi', specialty: 'Ophtalmologie', city: 'Tanger', rating: 4.6, reviews: 156, experience: 18, available: true, fee: 320, avatar: 'N' },
  { id: '6', name: 'Dr. Youssef Alami', specialty: 'Médecine Générale', city: 'Azilal', rating: 4.8, reviews: 320, experience: 10, available: true, fee: 200, avatar: 'Y' },
  { id: '7', name: 'Dr. Salma Berrada', specialty: 'Psychiatrie', city: 'Casablanca', rating: 4.5, reviews: 64, experience: 14, available: true, fee: 400, avatar: 'S' },
  { id: '8', name: 'Dr. Karim Mouline', specialty: 'Orthopédie', city: 'Rabat', rating: 4.7, reviews: 102, experience: 22, available: false, fee: 350, avatar: 'K' },
];

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Tous');
  const [selectedCity, setSelectedCity] = useState('Toutes');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDoctors = sampleDoctors.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSpecialty = selectedSpecialty === 'Tous' || doc.specialty === selectedSpecialty;
    const matchCity = selectedCity === 'Toutes' || doc.city === selectedCity;
    return matchSearch && matchSpecialty && matchCity;
  });

  return (
    <div className="bg-surface-secondary min-h-screen">
      {/* Header */}
      <div className="gradient-primary py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Nos Médecins</h1>
          <p className="text-primary-100 max-w-xl mx-auto mb-8">
            Trouvez le médecin idéal parmi nos professionnels vérifiés et prenez rendez-vous en ligne.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-xl p-1.5 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="w-5 h-5 text-text-muted shrink-0" />
              <input
                type="text"
                placeholder="Rechercher un médecin ou une spécialité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-text-primary text-sm py-2.5 outline-none bg-transparent placeholder:text-text-muted"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-secondary gap-2 text-sm shrink-0"
            >
              <Filter className="w-4 h-4" />
              Filtres
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-surface border-b border-border animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Spécialité</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="input"
                >
                  {allSpecialties.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Ville</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="input"
                >
                  {cities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">{filteredDoctors.length}</span> médecin(s) trouvé(s)
          </p>
          {(selectedSpecialty !== 'Tous' || selectedCity !== 'Toutes') && (
            <button
              onClick={() => { setSelectedSpecialty('Tous'); setSelectedCity('Toutes'); setSearchQuery(''); }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc, i) => {
            const SpecIcon = specialtyIcons[doc.specialty] || Stethoscope;
            return (
              <div
                key={doc.id}
                className="card p-6 animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {doc.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary truncate">{doc.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-primary-600 mt-0.5">
                      <SpecIcon className="w-4 h-4" />
                      {doc.specialty}
                    </div>
                  </div>
                  <span className={`badge ${doc.available ? 'badge-success' : 'badge-danger'} text-xs`}>
                    {doc.available ? 'Disponible' : 'Indisponible'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin className="w-4 h-4 text-text-muted" />
                    {doc.city}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Clock className="w-4 h-4 text-text-muted" />
                    {doc.experience} ans d'expérience
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Phone className="w-4 h-4 text-text-muted" />
                    Consultation: {doc.fee} MAD
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border-light">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-text-primary">{doc.rating}</span>
                    <span className="text-xs text-text-muted">({doc.reviews} avis)</span>
                  </div>
                  <Link
                    to={`/medecins/${doc.id}`}
                    className="btn btn-primary text-xs px-4 py-2"
                  >
                    Voir le profil
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-16">
            <Stethoscope className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Aucun médecin trouvé</h3>
            <p className="text-sm text-text-secondary">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}
