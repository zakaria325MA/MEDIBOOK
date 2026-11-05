import { Link } from 'react-router-dom';
import {
  Stethoscope, Baby, Brain, Eye, Bone, Pill, Activity, Heart,
  ArrowRight, Search
} from 'lucide-react';

const specialties = [
  { name: 'Médecine Générale', icon: Stethoscope, count: 45, desc: 'Suivi médical général, maladies courantes, prévention et orientation vers des spécialistes.', color: 'bg-blue-50', iconColor: 'text-blue-600', borderColor: 'hover:border-blue-300' },
  { name: 'Pédiatrie', icon: Baby, count: 23, desc: 'Soins médicaux dédiés aux enfants, de la naissance à l\'adolescence.', color: 'bg-pink-50', iconColor: 'text-pink-600', borderColor: 'hover:border-pink-300' },
  { name: 'Neurologie', icon: Brain, count: 12, desc: 'Diagnostic et traitement des maladies du système nerveux central et périphérique.', color: 'bg-purple-50', iconColor: 'text-purple-600', borderColor: 'hover:border-purple-300' },
  { name: 'Ophtalmologie', icon: Eye, count: 18, desc: 'Prise en charge des maladies et troubles de la vision et des yeux.', color: 'bg-cyan-50', iconColor: 'text-cyan-600', borderColor: 'hover:border-cyan-300' },
  { name: 'Orthopédie', icon: Bone, count: 15, desc: 'Traitement des affections de l\'appareil locomoteur: os, muscles, articulations.', color: 'bg-orange-50', iconColor: 'text-orange-600', borderColor: 'hover:border-orange-300' },
  { name: 'Dermatologie', icon: Pill, count: 20, desc: 'Diagnostic et traitement des maladies de la peau, des cheveux et des ongles.', color: 'bg-green-50', iconColor: 'text-green-600', borderColor: 'hover:border-green-300' },
  { name: 'Cardiologie', icon: Activity, count: 16, desc: 'Spécialité médicale dédiée au cœur et au système cardio-vasculaire.', color: 'bg-red-50', iconColor: 'text-red-600', borderColor: 'hover:border-red-300' },
  { name: 'Psychiatrie', icon: Heart, count: 10, desc: 'Prise en charge des troubles mentaux, émotionnels et comportementaux.', color: 'bg-indigo-50', iconColor: 'text-indigo-600', borderColor: 'hover:border-indigo-300' },
];

export default function SpecialtiesPage() {
  return (
    <div className="bg-surface-secondary min-h-screen">
      <div className="gradient-primary py-14 px-4 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Nos Spécialités</h1>
        <p className="text-primary-100 max-w-xl mx-auto">
          Découvrez toutes les spécialités médicales disponibles sur MediBook et trouvez le spécialiste adapté à vos besoins.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input type="text" placeholder="Rechercher une spécialité..." className="input pl-12 py-3 text-base" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {specialties.map(({ name, icon: Icon, count, desc, color, iconColor, borderColor }, i) => (
            <Link
              key={name}
              to={`/medecins?specialite=${encodeURIComponent(name)}`}
              className={`card p-6 group border-2 border-transparent ${borderColor} animate-fade-in`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-8 h-8 ${iconColor}`} />
              </div>
              <h3 className="font-bold text-text-primary text-lg mb-1">{name}</h3>
              <p className="text-xs text-text-muted mb-3">{count} médecins disponibles</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{desc}</p>
              <div className="flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
                Voir les médecins <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
