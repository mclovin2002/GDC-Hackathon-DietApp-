import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

console.log('Initializing Supabase client...');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'diet-app'
    }
  }
});

// Verify connection
supabase.from('profiles').select('count').single()
  .then(() => console.log('Successfully connected to Supabase'))
  .catch(err => console.error('Failed to connect to Supabase:', err));

// Types for your database tables
export type Diet = {
  id: string;
  created_at: string;
  user_id: string;
  meal_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
};

export type UserProfile = {
  id: string;
  created_at: string;
  email: string;
  name: string;
  daily_calorie_goal?: number;
  daily_protein_goal?: number;
  daily_carbs_goal?: number;
  daily_fat_goal?: number;
}; 