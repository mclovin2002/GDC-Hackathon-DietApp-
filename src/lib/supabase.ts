import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = 'https://bhacgxzpkjhhkbwqvrrq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoYWNneHpwa2poaGtid3F2cnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NjU2MTcsImV4cCI6MjA1NjQ0MTYxN30.o_KRPRyS7jDMbTePB27NXslOtgbAfBbPwbXzUkeRuTY';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Missing Supabase environment variables!");
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