import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for your database tables
export type Profile = {
  id: string;
  username: string;
  email: string;
  created_at: string;
};

export type DietPlan = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  target_calories: number;
  created_at: string;
};

export type Meal = {
  id: string;
  diet_plan_id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  created_at: string;
};

export type Progress = {
  id: string;
  user_id: string;
  date: string;
  weight: number;
  calories_consumed: number;
  notes: string;
  created_at: string;
}; 