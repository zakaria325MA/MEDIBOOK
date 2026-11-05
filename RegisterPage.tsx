import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heart, Mail, Lock, Eye, EyeOff, User, UserPlus, AlertCircle, Stethoscope, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../types';

const schema = z.object({
  full_name: z.string().min(3, 'Nom trop court (min. 3 caractères)'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court (min. 6 caractères)'),
  confirm_password: z.string(),
  role: z.enum(['patient', 'doctor'] as const),
}).refine(d => d.password === d.confirm_password, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirm_password'],
});

type FormData = z.infer<typeof schema>;

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '0.875rem 1rem 0.875rem 2.75rem',
  background: 'rgba(255,255,255,0.07)',
  border: `1px solid ${hasError ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)'}`,
  borderRadius: '0.875rem',
  color: 'white',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
});

const iconStyle: React.CSSProperties = {
  position: 'absolute', left: '1rem', top: '50%',
  transform: 'translateY(-50%)',
  width: '1rem', height: '1rem', color: '#64748b', pointerEvents: 'none',
};

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>('patient');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'patient' },
  });

  const onSubmit = async (data: FormData) => {
    setServerError('');
    const { error } = await signUp(data.email, data.password, data.full_name, data.role as UserRole);
    if (error) {
      setServerError(error.message || 'Une erreur est survenue.');
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/connexion'), 2000);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)' }}>
        <div className="animate-scale-in" style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ width: '6rem', height: '6rem', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 40px rgba(16,185,129,0.4)' }}>
            <CheckCircle style={{ width: '3rem', height: '3rem' }} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Compte créé !</h2>
          <p style={{ color: '#94a3b8' }}>Redirection vers la connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '500px', position: 'relative', zIndex: 10 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '2.75rem', height: '2.75rem', background: 'linear-gradient(135deg, #2563eb, #10b981)', borderRadius: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart style={{ width: '1.375rem', height: '1.375rem', color: 'white' }} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>MediBook</span>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '1.5rem',
          padding: '2.25rem',
        }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.625rem', fontWeight: 800, marginBottom: '0.25rem' }}>Créer un compte</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Rejoignez MediBook gratuitement</p>
          </div>

          {serverError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.875rem', color: '#fca5a5', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              <AlertCircle style={{ width: '1.125rem', height: '1.125rem', flexShrink: 0 }} />
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>

            {/* Role selection */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.625rem' }}>Je suis</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { value: 'patient', label: 'Patient', desc: 'Je cherche un médecin', icon: User },
                  { value: 'doctor', label: 'Médecin', desc: 'Je propose des soins', icon: Stethoscope },
                ].map(opt => {
                  const Icon = opt.icon;
                  const isSelected = selectedRole === opt.value;
                  return (
                    <label key={opt.value} style={{ cursor: 'pointer' }}>
                      <input {...register('role')} type="radio" value={opt.value} style={{ display: 'none' }}
                        onChange={() => { setSelectedRole(opt.value as 'patient' | 'doctor'); setValue('role', opt.value as 'patient' | 'doctor'); }}
                      />
                      <div style={{
                        padding: '1rem',
                        borderRadius: '1rem',
                        border: `2px solid ${isSelected ? 'rgba(37,99,235,0.7)' : 'rgba(255,255,255,0.1)'}`,
                        background: isSelected ? 'rgba(37,99,235,0.15)' : 'rgba(255,255,255,0.04)',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? '0 0 20px rgba(37,99,235,0.2)' : 'none',
                      }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: isSelected ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.625rem' }}>
                          <Icon style={{ width: '1.25rem', height: '1.25rem', color: isSelected ? '#60a5fa' : '#64748b' }} />
                        </div>
                        <p style={{ fontWeight: 600, color: isSelected ? 'white' : '#94a3b8', fontSize: '0.9rem', marginBottom: '0.125rem' }}>{opt.label}</p>
                        <p style={{ fontSize: '0.75rem', color: '#475569' }}>{opt.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Full name */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Nom complet</label>
              <div style={{ position: 'relative' }}>
                <User style={iconStyle} />
                <input {...register('full_name')} placeholder="Prénom Nom" style={inputStyle(!!errors.full_name)}
                  onFocus={e => (e.target.style.borderColor = 'rgba(37,99,235,0.7)')}
                  onBlur={e => (e.target.style.borderColor = errors.full_name ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)')} />
              </div>
              {errors.full_name && <p style={{ color: '#fca5a5', fontSize: '0.75rem', marginTop: '0.375rem' }}>{errors.full_name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Adresse email</label>
              <div style={{ position: 'relative' }}>
                <Mail style={iconStyle} />
                <input {...register('email')} type="email" placeholder="exemple@email.com" style={inputStyle(!!errors.email)}
                  onFocus={e => (e.target.style.borderColor = 'rgba(37,99,235,0.7)')}
                  onBlur={e => (e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)')} />
              </div>
              {errors.email && <p style={{ color: '#fca5a5', fontSize: '0.75rem', marginTop: '0.375rem' }}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <Lock style={iconStyle} />
                <input {...register('password')} type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  style={{ ...inputStyle(!!errors.password), paddingRight: '3rem' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(37,99,235,0.7)')}
                  onBlur={e => (e.target.style.borderColor = errors.password ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)')} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {showPass ? <EyeOff style={{ width: '1rem', height: '1rem' }} /> : <Eye style={{ width: '1rem', height: '1rem' }} />}
                </button>
              </div>
              {errors.password && <p style={{ color: '#fca5a5', fontSize: '0.75rem', marginTop: '0.375rem' }}>{errors.password.message}</p>}
            </div>

            {/* Confirm password */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Confirmer le mot de passe</label>
              <div style={{ position: 'relative' }}>
                <Lock style={iconStyle} />
                <input {...register('confirm_password')} type="password" placeholder="••••••••" style={inputStyle(!!errors.confirm_password)}
                  onFocus={e => (e.target.style.borderColor = 'rgba(37,99,235,0.7)')}
                  onBlur={e => (e.target.style.borderColor = errors.confirm_password ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)')} />
              </div>
              {errors.confirm_password && <p style={{ color: '#fca5a5', fontSize: '0.75rem', marginTop: '0.375rem' }}>{errors.confirm_password.message}</p>}
            </div>

            {/* Submit */}
            <button type="submit" disabled={isSubmitting} style={{
              width: '100%', padding: '0.9rem',
              background: isSubmitting ? 'rgba(37,99,235,0.5)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              border: 'none', borderRadius: '0.875rem', color: 'white',
              fontSize: '1rem', fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
              boxShadow: '0 4px 15px rgba(37,99,235,0.35)',
              marginTop: '0.25rem',
              fontFamily: 'inherit',
            }}>
              {isSubmitting ? (
                <><span style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />Création...</>
              ) : (
                <><UserPlus style={{ width: '1.125rem', height: '1.125rem' }} />Créer mon compte</>
              )}
            </button>

            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
              Déjà un compte ?{' '}
              <Link to="/connexion" style={{ color: '#60a5fa', fontWeight: 600, textDecoration: 'none' }}>Se connecter</Link>
            </p>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" style={{ color: '#475569', fontSize: '0.8rem', textDecoration: 'none' }}>← Retour à l'accueil</Link>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #475569 !important; }
      `}</style>
    </div>
  );
}
