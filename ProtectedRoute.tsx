import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto" />
          <p className="text-text-secondary text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/connexion" replace />;

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // Redirect to appropriate dashboard
    const dashMap: Record<string, string> = {
      admin: '/admin',
      patient: '/patient',
      doctor: '/medecin',
      product_owner: '/scrum',
      scrum_master: '/scrum',
      tech_director: '/scrum',
      developer: '/scrum',
    };
    return <Navigate to={dashMap[profile.role] || '/'} replace />;
  }

  return <>{children}</>;
}
