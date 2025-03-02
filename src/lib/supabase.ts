import { createClient } from '@supabase/supabase-js/dist/module';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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