import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

const isConfigured = 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseAnonKey !== 'placeholder' &&
  supabaseUrl.startsWith('https://');

if (!isConfigured) {
  console.warn(
    '⚠️ Supabase non configuré - Mode démo actif. Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre fichier .env'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const isDemoMode = !isConfigured;

export default supabase;
