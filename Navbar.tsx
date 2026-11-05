import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Heart,
  Menu,
  X,
  LogIn,
  UserPlus,
  Home,
  Stethoscope,
  Users,
  Info,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/medecins', label: 'Médecins', icon: Stethoscope },
    { path: '/specialites', label: 'Spécialités', icon: Users },
    { path: '/a-propos', label: 'À propos', icon: Info },
  ];

  const getDashboardPath = () => {
    if (!profile) return '/connexion';
    switch (profile.role) {
      case 'admin': return '/admin';
      case 'patient': return '/patient';
      case 'doctor': return '/medecin';
      case 'product_owner':
      case 'scrum_master':
      case 'tech_director':
      case 'developer':
        return '/scrum';
      default: return '/';
    }
  };

  const getRoleLabel = () => {
    if (!profile) return '';
    const labels: Record<string, string> = {
      admin: 'Administrateur',
      patient: 'Patient',
      doctor: 'Médecin',
      product_owner: 'Product Owner',
      scrum_master: 'Scrum Master',
      tech_director: 'Directeur Technique',
      developer: 'Développeur',
    };
    return labels[profile.role] || profile.role;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setShowUserMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass" style={{ boxShadow: 'var(--shadow-navbar)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              MediBook
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-text-secondary hover:bg-primary-50/50 hover:text-primary-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {profile ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold">
                    {profile.full_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-text-primary">{profile.full_name}</p>
                    <p className="text-xs text-text-muted">{getRoleLabel()}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface rounded-xl shadow-lg border border-border-light py-2 animate-scale-in">
                    <Link
                      to={getDashboardPath()}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Tableau de bord
                    </Link>
                    <hr className="my-1 border-border-light" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-red-50 w-full transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/connexion" className="btn btn-secondary text-sm">
                  <LogIn className="w-4 h-4" />
                  Connexion
                </Link>
                <Link to="/inscription" className="btn btn-primary text-sm">
                  <UserPlus className="w-4 h-4" />
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border-light bg-surface animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-text-secondary hover:bg-primary-50/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
            <hr className="my-2 border-border-light" />
            {profile ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:bg-primary-50/50"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Tableau de bord
                </Link>
                <button
                  onClick={() => { handleSignOut(); setIsOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-danger hover:bg-red-50 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link to="/connexion" onClick={() => setIsOpen(false)} className="btn btn-secondary flex-1 text-sm">
                  <LogIn className="w-4 h-4" />
                  Connexion
                </Link>
                <Link to="/inscription" onClick={() => setIsOpen(false)} className="btn btn-primary flex-1 text-sm">
                  <UserPlus className="w-4 h-4" />
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
