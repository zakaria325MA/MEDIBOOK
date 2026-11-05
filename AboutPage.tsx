import { Heart, Users, Target, Code2, GraduationCap, Mail, Phone } from 'lucide-react';

const team = [
  { name: 'Zakaria Mansour', role: 'Product Owner', resp: 'Gestion du Product Backlog et des priorités', avatar: 'Z' },
  { name: 'Membre 2', role: 'Scrum Master', resp: 'Facilitation Scrum et levée des obstacles', avatar: 'S' },
  { name: 'Membre 3', role: 'Directeur Technique', resp: 'Architecture technique et supervision', avatar: 'T' },
  { name: 'Membre 4', role: 'Développeur', resp: 'Développement Frontend React/TypeScript', avatar: 'D' },
  { name: 'Membre 5', role: 'Développeur', resp: 'Développement Backend Supabase/PostgreSQL', avatar: 'B' },
];

const values = [
  { icon: Heart, title: 'Santé accessible', desc: 'Nous croyons que chaque patient mérite un accès facile aux soins médicaux de qualité.' },
  { icon: Users, title: 'Collaboration', desc: 'Notre projet est construit en équipe Scrum avec une vraie organisation Agile.' },
  { icon: Target, title: 'Excellence', desc: 'Chaque fonctionnalité est développée avec soin pour offrir la meilleure expérience.' },
  { icon: Code2, title: 'Technologie', desc: 'Stack moderne React, TypeScript, Supabase pour une plateforme robuste et sécurisée.' },
];

export default function AboutPage() {
  return (
    <div className="bg-surface-secondary min-h-screen">
      {/* Hero */}
      <div className="gradient-hero py-20 px-4 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center">
            <Heart className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">À propos de MediBook</h1>
          <p className="text-primary-100 text-lg leading-relaxed">
            MediBook est une plateforme médicale Full Stack développée dans le cadre du projet professionnel OFPPT — Développement Digital Full Stack, par une équipe de 5 membres organisée selon la méthode Agile Scrum.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="badge badge-primary">Notre Mission</span>
              <h2 className="text-3xl font-bold text-text-primary">Simplifier l'accès aux soins médicaux</h2>
              <p className="text-text-secondary leading-relaxed">
                MediBook a pour objectif de faciliter la mise en relation entre patients et médecins. Notre plateforme permet de rechercher des spécialistes, consulter leurs disponibilités et réserver des rendez-vous en quelques clics.
              </p>
              <p className="text-text-secondary leading-relaxed">
                En parallèle, MediBook intègre un espace de gestion de projet Agile Scrum qui documente et démontre le processus de développement de l'application elle-même.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card p-5">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-text-primary text-sm mb-1">{title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge badge-success mb-3">Notre Équipe</span>
            <h2 className="text-3xl font-bold text-text-primary mb-3">L'équipe Scrum MediBook</h2>
            <p className="text-text-secondary max-w-xl mx-auto">5 membres organisés selon la méthode Agile Scrum pour développer une plateforme professionnelle.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {team.map(({ name, role, resp, avatar }, i) => (
              <div key={name} className="card p-6 text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                  {avatar}
                </div>
                <h3 className="font-semibold text-text-primary">{name}</h3>
                <span className="badge badge-primary text-xs mt-2 mb-2">{role}</span>
                <p className="text-xs text-text-secondary leading-relaxed">{resp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project info */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Cadre OFPPT</h3>
              <p className="text-sm text-text-secondary">Projet réalisé dans le cadre de la formation Développement Digital Full Stack à l'OFPPT.</p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Contact</h3>
              <p className="text-sm text-text-secondary">contact@medibook.ma</p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Localisation</h3>
              <p className="text-sm text-text-secondary">Azilal, Maroc, 2026</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
