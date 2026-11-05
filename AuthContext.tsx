import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isDemoMode } from '../lib/supabase';
import type { Profile, UserRole } from '../types';

// Demo users for testing without real Supabase
const DEMO_USERS: Record<string, { password: string; profile: Profile }> = {
  'patient@demo.ma': {
    password: 'demo123',
    profile: { id: 'demo-patient', email: 'patient@demo.ma', full_name: 'Ahmed El Mansouri', role: 'patient', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  },
  'medecin@demo.ma': {
    password: 'demo123',
    profile: { id: 'demo-doctor', email: 'medecin@demo.ma', full_name: 'Dr. Amina Benali', role: 'doctor', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  },
  'admin@demo.ma': {
    password: 'demo123',
    profile: { id: 'demo-admin', email: 'admin@demo.ma', full_name: 'Admin MediBook', role: 'admin', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  },
  'scrum@demo.ma': {
    password: 'demo123',
    profile: { id: 'demo-scrum', email: 'scrum@demo.ma', full_name: 'Zakaria Mansour', role: 'product_owner', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  },
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      // Demo mode: load session from localStorage
      const saved = localStorage.getItem('demo_profile');
      if (saved) {
        try {
          const p = JSON.parse(saved) as Profile;
          setProfile(p);
          setUser({ id: p.id, email: p.email } as User);
        } catch { /* ignore */ }
      }
      setLoading(false);
      return;
    }

    // Real Supabase mode
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false); // Network error — don't hang
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      setProfile(data as Profile);
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      if (isDemoMode) {
        const demo = DEMO_USERS[email.toLowerCase()];
        if (demo && demo.password === password) {
          setProfile(demo.profile);
          setUser({ id: demo.profile.id, email: demo.profile.email } as User);
          localStorage.setItem('demo_profile', JSON.stringify(demo.profile));
          return { error: null };
        }
        return { error: new Error('Email ou mot de passe incorrect') };
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async function signUp(email: string, password: string, fullName: string, role: UserRole) {
    try {
      if (isDemoMode) {
        const newProfile: Profile = {
          id: `demo-${Date.now()}`,
          email,
          full_name: fullName,
          role,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setProfile(newProfile);
        setUser({ id: newProfile.id, email } as User);
        localStorage.setItem('demo_profile', JSON.stringify(newProfile));
        return { error: null };
      }

      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: fullName, role } },
      });
      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id, email, full_name: fullName, role, is_active: true,
        });
        if (profileError) throw profileError;

        if (role === 'patient') {
          await supabase.from('patients').insert({ profile_id: data.user.id });
        } else if (role === 'doctor') {
          await supabase.from('doctors').insert({ profile_id: data.user.id, is_verified: false, is_available: false });
        }
      }
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async function signOut() {
    if (isDemoMode) {
      localStorage.removeItem('demo_profile');
    } else {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  }

  async function updateProfile(data: Partial<Profile>) {
    try {
      if (!user) throw new Error('Not authenticated');
      if (isDemoMode) {
        const updated = { ...profile, ...data } as Profile;
        setProfile(updated);
        localStorage.setItem('demo_profile', JSON.stringify(updated));
        return { error: null };
      }
      const { error } = await supabase.from('profiles').update(data).eq('id', user.id);
      if (error) throw error;
      setProfile(prev => prev ? { ...prev, ...data } : null);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
