import { Link } from 'react-router-dom';
import {
  Search, Calendar, Shield, Clock, Heart, Star, ArrowRight,
  Stethoscope, Baby, Brain, Eye, Bone, Pill, Activity,
  UserCheck, CalendarCheck, Users, MapPin,
} from 'lucide-react';

const specialties = [
  { name: 'Médecine Générale', icon: Stethoscope, count: 45, color: '#2563eb', bg: '#eff6ff' },
  { name: 'Pédiatrie', icon: Baby, count: 23, color: '#db2777', bg: '#fdf2f8' },
  { name: 'Neurologie', icon: Brain, count: 12, color: '#7c3aed', bg: '#f5f3ff' },
  { name: 'Ophtalmologie', icon: Eye, count: 18, color: '#0891b2', bg: '#ecfeff' },
  { name: 'Orthopédie', icon: Bone, count: 15, color: '#d97706', bg: '#fffbeb' },
  { name: 'Dermatologie', icon: Pill, count: 20, color: '#059669', bg: '#ecfdf5' },
  { name: 'Cardiologie', icon: Activity, count: 16, color: '#dc2626', bg: '#fef2f2' },
  { name: 'Psychiatrie', icon: Heart, count: 10, color: '#4f46e5', bg: '#eef2ff' },
];

const steps = [
  { step: '01', title: 'Recherchez un médecin', desc: "Trouvez le spécialiste qu'il vous faut par ville, spécialité ou nom.", icon: Search },
  { step: '02', title: 'Consultez les disponibilités', desc: 'Visualisez les créneaux disponibles et choisissez celui qui vous convient.', icon: Calendar },
  { step: '03', title: 'Réservez en ligne', desc: "Confirmez votre rendez-vous en quelques clics, c'est rapide et sécurisé.", icon: CalendarCheck },
];

const testimonials = [
  { name: 'Fatima Z.', role: 'Patiente', city: 'Azilal', text: "MediBook m'a permis de trouver un spécialiste rapidement. Le processus de réservation est très simple!", rating: 5, color: '#2563eb' },
  { name: 'Dr. Ahmed K.', role: 'Cardiologue', city: 'Rabat', text: "Excellente plateforme pour gérer mes rendez-vous. Mes patients adorent la facilité de réservation.", rating: 5, color: '#059669' },
  { name: 'Sara M.', role: 'Patiente', city: 'Marrakech', text: "Fini les longues attentes au téléphone. Avec MediBook, je réserve mes rendez-vous en 2 minutes.", rating: 4, color: '#7c3aed' },
];

export default function HomePage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 50%, #047857 100%)', color: 'white' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10rem', right: '-10rem', width: '20rem', height: '20rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(48px)' }} />
          <div style={{ position: 'absolute', bottom: '-10rem', left: '-10rem', width: '20rem', height: '20rem', background: 'rgba(16,185,129,0.1)', borderRadius: '50%', filter: 'blur(48px)' }} />
        </div>
        <div style={{ position: 'relative', maxWidth: '80rem', margin: '0 auto', padding: '5rem 1.5rem 6rem' }}>
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Left text */}
            <div style={{ flex: '1 1 320px', minWidth: '280px' }} className="animate-fade-in">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.12)', borderRadius: '9999px', fontSize: '0.875rem', marginBottom: '1.5rem', backdropFilter: 'blur(8px)' }}>
                <Heart style={{ width: '1rem', height: '1rem', color: '#34d399' }} />
                <span>Plateforme médicale #1 au Maroc</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
                Votre santé,{' '}
                <span style={{ color: '#34d399' }}>notre priorité</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#bfdbfe', maxWidth: '30rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Trouvez les meilleurs médecins, consultez leurs disponibilités et réservez vos rendez-vous en toute simplicité.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', borderRadius: '1rem', padding: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'white', borderRadius: '0.75rem', padding: '0.75rem 1rem', minWidth: '180px' }}>
                  <Search style={{ width: '1.25rem', height: '1.25rem', color: '#94a3b8', flexShrink: 0 }} />
                  <input type="text" placeholder="Spécialité, médecin ou ville..." style={{ width: '100%', color: '#0f172a', fontSize: '0.875rem', outline: 'none', background: 'transparent', border: 'none', fontFamily: 'inherit' }} />
                </div>
                <Link to="/medecins" className="btn btn-accent" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 600, borderRadius: '0.75rem', whiteSpace: 'nowrap' }}>
                  Rechercher
                </Link>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                {['Réservation 24/7', '100% gratuit', 'Données sécurisées'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#34d399' }} />
                    <span style={{ fontSize: '0.875rem', color: '#bfdbfe' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right card */}
            <div className="hero-card-wrapper animate-slide-in-right" style={{ flex: '0 0 auto', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '20rem', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.2)', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: 'rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Stethoscope style={{ width: '1.75rem', height: '1.75rem', color: '#34d399' }} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 600, fontSize: '1rem' }}>Dr. Amina Benali</h3>
                      <p style={{ fontSize: '0.875rem', color: '#bfdbfe' }}>Cardiologue</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#bfdbfe' }}>
                      <MapPin style={{ width: '1rem', height: '1rem', color: '#34d399' }} /> Azilal, Maroc
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#bfdbfe' }}>
                      <Clock style={{ width: '1rem', height: '1rem', color: '#34d399' }} /> Disponible aujourd'hui
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} style={{ width: '1rem', height: '1rem', color: '#facc15', fill: '#facc15' }} />)}
                      <span style={{ fontSize: '0.875rem', color: '#bfdbfe', marginLeft: '0.5rem' }}>4.9 (128 avis)</span>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                    {['09:00','10:30','14:00'].map(t => (
                      <button key={t} style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', fontSize: '0.875rem', border: 'none', color: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
                    ))}
                  </div>
                  <button style={{ width: '100%', padding: '0.75rem', background: '#10b981', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.875rem', border: 'none', color: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Réserver maintenant
                  </button>
                </div>
                <div className="animate-float" style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '5rem', height: '5rem', background: 'rgba(52,211,153,0.2)', borderRadius: '1rem', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield style={{ width: '2rem', height: '2rem', color: '#34d399' }} />
                </div>
                <div className="animate-float" style={{ position: 'absolute', bottom: '-1rem', left: '-1rem', width: '4rem', height: '4rem', background: 'rgba(96,165,250,0.2)', borderRadius: '1rem', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animationDelay: '1s' }}>
                  <Calendar style={{ width: '1.75rem', height: '1.75rem', color: '#93c5fd' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0 70L48 65C96 60 192 50 288 46C384 42 480 42 576 46C672 50 768 60 864 60C960 60 1056 50 1152 46C1248 42 1344 42 1392 42L1440 42V70H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section style={{ padding: '3.5rem 1.5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {[
              { label: 'Médecins vérifiés', value: '150+', icon: UserCheck, color: '#2563eb', bg: '#eff6ff' },
              { label: 'Rendez-vous réservés', value: '5,000+', icon: CalendarCheck, color: '#059669', bg: '#ecfdf5' },
              { label: 'Patients satisfaits', value: '3,500+', icon: Users, color: '#7c3aed', bg: '#f5f3ff' },
              { label: 'Villes couvertes', value: '25+', icon: MapPin, color: '#dc2626', bg: '#fef2f2' },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="stat-card animate-fade-in" style={{ textAlign: 'center' }}>
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <Icon style={{ width: '1.5rem', height: '1.5rem', color: s.color }} />
                  </div>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding: '5rem 1.5rem', background: 'white' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ display: 'inline-block', padding: '0.375rem 1rem', background: '#eff6ff', color: '#2563eb', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Comment ça marche
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              Réservez en{' '}
              <span style={{ background: 'linear-gradient(90deg, #2563eb, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                3 étapes simples
              </span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.7 }}>
              Notre plateforme rend la prise de rendez-vous médicaux plus facile que jamais.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="animate-fade-in" style={{ textAlign: 'center', position: 'relative', animationDelay: `${i * 0.15}s` }}>
                  <div style={{ width: '6rem', height: '6rem', borderRadius: '1.5rem', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', position: 'relative', transition: 'transform 0.2s' }}>
                    <Icon style={{ width: '2.5rem', height: '2.5rem', color: '#2563eb' }} />
                    <span style={{ position: 'absolute', top: '-0.625rem', right: '-0.625rem', width: '2rem', height: '2rem', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>
                      {s.step}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.625rem' }}>{s.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>{s.desc}</p>
                  {i < steps.length - 1 && (
                    <div style={{ position: 'absolute', top: '3rem', right: '-1rem', width: '2rem', height: '2px', background: 'linear-gradient(90deg, #bfdbfe, #e0e7ff)', display: 'none' }} className="step-connector" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SPECIALTIES ═══ */}
      <section style={{ padding: '5rem 1.5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ display: 'inline-block', padding: '0.375rem 1rem', background: '#ecfdf5', color: '#059669', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Nos spécialités
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              Trouvez votre{' '}
              <span style={{ background: 'linear-gradient(90deg, #10b981, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                spécialiste
              </span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.7 }}>
              Plus de 150 médecins dans 20+ spécialités sont disponibles sur MediBook.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {specialties.map((sp, i) => {
              const Icon = sp.icon;
              return (
                <Link
                  key={sp.name}
                  to={`/medecins?specialite=${encodeURIComponent(sp.name)}`}
                  className="card animate-fade-in"
                  style={{ padding: '1.5rem', textAlign: 'center', textDecoration: 'none', display: 'block', animationDelay: `${i * 0.05}s` }}
                >
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: sp.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.875rem', transition: 'transform 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Icon style={{ width: '1.75rem', height: '1.75rem', color: sp.color }} />
                  </div>
                  <h3 style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{sp.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{sp.count} médecins</p>
                </Link>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/specialites" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Voir toutes les spécialités <ArrowRight style={{ width: '1rem', height: '1rem' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: '5rem 1.5rem', background: 'white' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ display: 'inline-block', padding: '0.375rem 1rem', background: '#eff6ff', color: '#2563eb', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Témoignages
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Ce que disent nos{' '}
              <span style={{ background: 'linear-gradient(90deg, #2563eb, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                utilisateurs
              </span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <div key={t.name} className="card animate-fade-in" style={{ padding: '1.75rem', animationDelay: `${i * 0.1}s` }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} style={{ width: '1rem', height: '1rem', color: j < t.rating ? '#facc15' : '#e2e8f0', fill: j < t.rating ? '#facc15' : '#e2e8f0' }} />
                  ))}
                </div>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>{t.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{t.role} • {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '5rem 1.5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 60%, #047857 100%)', borderRadius: '2rem', padding: '4rem 2rem', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: '-5rem', right: '-5rem', width: '15rem', height: '15rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(40px)' }} />
              <div style={{ position: 'absolute', bottom: '-5rem', left: '-5rem', width: '15rem', height: '15rem', background: 'rgba(16,185,129,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
            </div>
            <div style={{ position: 'relative', maxWidth: '36rem', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
                Prêt à prendre soin de votre santé ?
              </h2>
              <p style={{ color: '#bfdbfe', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                Rejoignez des milliers de patients qui font confiance à MediBook pour leurs rendez-vous médicaux.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/inscription" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', background: 'white', color: '#1d4ed8', borderRadius: '0.875rem', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  Créer un compte gratuit
                </Link>
                <Link to="/medecins" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', background: 'rgba(255,255,255,0.15)', color: 'white', borderRadius: '0.875rem', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', border: '2px solid rgba(255,255,255,0.3)', transition: 'all 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                >
                  Parcourir les médecins
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
