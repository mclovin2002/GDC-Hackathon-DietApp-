import { supabase } from '../supabase';
import type { DietPlan, Meal, Progress } from '../supabase';

export const dietService = {
  // Diet Plans
  async createDietPlan(userId: string, plan: Omit<DietPlan, 'id' | 'user_id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('diet_plans')
      .insert([{ ...plan, user_id: userId }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserDietPlans(userId: string) {
    const { data, error } = await supabase
      .from('diet_plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Meals
  async addMealToPlan(dietPlanId: string, meal: Omit<Meal, 'id' | 'diet_plan_id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('meals')
      .insert([{ ...meal, diet_plan_id: dietPlanId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getPlanMeals(dietPlanId: string) {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('diet_plan_id', dietPlanId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Progress Tracking
  async recordProgress(progress: Omit<Progress, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('progress')
      .insert([progress])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserProgress(userId: string, startDate?: string, endDate?: string) {
    let query = supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Analytics
  async getCaloriesSummary(userId: string, days: number = 7) {
    const { data, error } = await supabase
      .from('progress')
      .select('date, calories_consumed')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(days);

    if (error) throw error;
    return data;
  }
}; 