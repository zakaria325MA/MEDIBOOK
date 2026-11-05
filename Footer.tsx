import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Share2, MessageCircle, Briefcase } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-accent-400" />
              </div>
              <span className="text-xl font-bold">MediBook</span>
            </Link>
            <p className="text-primary-200 text-sm leading-relaxed">
              Votre plateforme de confiance pour la recherche de médecins et la réservation de rendez-vous médicaux.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Briefcase className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/medecins', label: 'Médecins' },
                { to: '/specialites', label: 'Spécialités' },
                { to: '/a-propos', label: 'À propos' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-primary-200 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                'Recherche de médecins',
                'Réservation en ligne',
                'Gestion des rendez-vous',
                'Espace médecin',
                'Administration',
              ].map(service => (
                <li key={service}>
                  <span className="text-primary-200 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-200 text-sm">
                <MapPin className="w-4 h-4 text-accent-400 shrink-0" />
                Azilal, Maroc
              </li>
              <li className="flex items-center gap-3 text-primary-200 text-sm">
                <Phone className="w-4 h-4 text-accent-400 shrink-0" />
                +212 6 00 00 00 00
              </li>
              <li className="flex items-center gap-3 text-primary-200 text-sm">
                <Mail className="w-4 h-4 text-accent-400 shrink-0" />
                contact@medibook.ma
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-primary-300 text-sm">
            © 2026 MediBook. Tous droits réservés.
          </p>
          <p className="text-primary-400 text-xs">
            Projet OFPPT – Développement Digital Full Stack
          </p>
        </div>
      </div>
    </footer>
  );
}
