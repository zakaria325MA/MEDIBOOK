import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heart, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, Shield, Stethoscope, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { isDemoMode } from '../../lib/supabase';

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court (min. 6 caractères)'),
});
type FormData = z.infer<typeof schema>;

const DEMO_ACCOUNTS = [
  { email: 'patient@demo.ma', label: 'Patient', icon: Users, color: '#2563eb' },
  { email: 'medecin@demo.ma', label: 'Médecin', icon: Stethoscope, color: '#059669' },
  { email: 'admin@demo.ma', label: 'Admin', icon: Shield, color: '#7c3aed' },
  { email: 'scrum@demo.ma', label: 'Scrum PO', icon: Heart, color: '#dc2626' },
];

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState('');
  const { signIn, profile } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const getDashboardPath = (role: string) => {
    switch (role) {
      case 'admin': return '/admin';
      case 'patient': return '/patient';
      case 'doctor': return '/medecin';
      default: return '/scrum';
    }
  };

  const onSubmit = async (data: FormData) => {
    setServerError('');
    const { error } = await signIn(data.email, data.password);
    if (error) {
      setServerError('Email ou mot de passe incorrect.');
    } else {
      setTimeout(() => {
        const role = profile?.role || 'patient';
        navigate(getDashboardPath(role));
      }, 300);
    }
  };

  const fillDemo = (email: string) => {
    setValue('email', email);
    setValue('password', 'demo123');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated BG blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '50%', left: '30%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      {/* Left side — branding */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem',
        color: 'white',
        position: 'relative',
      }} className="login-left-panel">
        <div style={{ maxWidth: '440px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <div style={{ width: '3rem', height: '3rem', background: 'linear-gradient(135deg, #2563eb, #10b981)', borderRadius: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px' }}>MediBook</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Votre santé,<br />
            <span style={{ background: 'linear-gradient(90deg, #34d399, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              en bonnes mains
            </span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            La plateforme médicale numérique de référence au Maroc. Trouvez, réservez et consultez en toute simplicité.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '🏥', text: 'Plus de 150 médecins vérifiés' },
              { icon: '📅', text: 'Réservation disponible 24h/7j' },
              { icon: '🔒', text: 'Données médicales sécurisées' },
              { icon: '⚡', text: 'Confirmation instantanée' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side — form */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        zIndex: 10,
      }} className="login-right-panel">
        <div className="animate-scale-in" style={{ width: '100%', maxWidth: '440px' }}>

          {/* Demo mode banner */}
          {isDemoMode && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: '1rem',
              padding: '1rem 1.25rem',
              marginBottom: '1.25rem',
              backdropFilter: 'blur(12px)',
            }}>
              <p style={{ color: '#fbbf24', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🎯 Mode Démo — Connexion rapide
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {DEMO_ACCOUNTS.map(acc => {
                  const Icon = acc.icon;
                  return (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => fillDemo(acc.email)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.625rem 0.875rem',
                        background: 'rgba(255,255,255,0.08)',
                        border: `1px solid ${acc.color}40`,
                        borderRadius: '0.625rem',
                        color: 'white',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontWeight: 500,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = `${acc.color}20`)}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                    >
                      <Icon style={{ width: '1rem', height: '1rem', color: acc.color, flexShrink: 0 }} />
                      {acc.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Card */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.375rem' }}>
                Connexion
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Bienvenue ! Entrez vos identifiants.
              </p>
            </div>

            {serverError && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.875rem 1rem',
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '0.875rem',
                color: '#fca5a5',
                fontSize: '0.875rem',
                marginBottom: '1.25rem',
              }}>
                <AlertCircle style={{ width: '1.125rem', height: '1.125rem', flexShrink: 0 }} />
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Email */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                  Adresse email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#64748b', pointerEvents: 'none' }} />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="exemple@email.com"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem 0.875rem 2.75rem',
                      background: 'rgba(255,255,255,0.07)',
                      border: `1px solid ${errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)'}`,
                      borderRadius: '0.875rem',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(37,99,235,0.7)')}
                    onBlur={e => (e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)')}
                  />
                </div>
                {errors.email && <p style={{ color: '#fca5a5', fontSize: '0.75rem', marginTop: '0.375rem' }}>{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                  Mot de passe
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#64748b', pointerEvents: 'none' }} />
                  <input
                    {...register('password')}
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '0.875rem 3rem 0.875rem 2.75rem',
                      background: 'rgba(255,255,255,0.07)',
                      border: `1px solid ${errors.password ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)'}`,
                      borderRadius: '0.875rem',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(37,99,235,0.7)')}
                    onBlur={e => (e.target.style.borderColor = errors.password ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    {showPass ? <EyeOff style={{ width: '1rem', height: '1rem' }} /> : <Eye style={{ width: '1rem', height: '1rem' }} />}
                  </button>
                </div>
                {errors.password && <p style={{ color: '#fca5a5', fontSize: '0.75rem', marginTop: '0.375rem' }}>{errors.password.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  background: isSubmitting ? 'rgba(37,99,235,0.6)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  border: 'none',
                  borderRadius: '0.875rem',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.625rem',
                  boxShadow: '0 4px 15px rgba(37,99,235,0.35)',
                  transition: 'all 0.2s',
                  marginTop: '0.25rem',
                }}
                onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                    Connexion...
                  </>
                ) : (
                  <>
                    <LogIn style={{ width: '1.125rem', height: '1.125rem' }} />
                    Se connecter
                  </>
                )}
              </button>

              <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                Pas encore de compte ?{' '}
                <Link to="/inscription" style={{ color: '#60a5fa', fontWeight: 600, textDecoration: 'none' }}>
                  Créer un compte
                </Link>
              </p>
            </form>
          </div>

          <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.75rem', marginTop: '1.5rem' }}>
            <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>← Retour à l'accueil</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #475569 !important; }
        .login-left-panel { display: flex; }
        .login-right-panel { min-width: 480px; }
        @media (max-width: 900px) {
          .login-left-panel { display: none !important; }
          .login-right-panel { min-width: unset; width: 100%; }
        }
      `}</style>
    </div>
  );
}
