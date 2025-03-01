
export type DietaryRestriction = 
  | 'none'
  | 'vegetarian'
  | 'vegan'
  | 'halal'
  | 'kosher'
  | 'carnivore'
  | 'gluten-free'
  | 'dairy-free'
  | 'nut-free';

export type WeightGoal = 
  | 'lose_fat'
  | 'gain_muscle'
  | 'maintain';

export type Exercise = 
  | 'none'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  dietaryRestrictions: DietaryRestriction[];
  allergens: string[];
  weightGoal: WeightGoal;
  exercise: Exercise;
  timeframe: number; // in weeks
  budget: number; // weekly budget
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  dietaryTags: DietaryRestriction[];
  ingredients: Ingredient[];
  instructions: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  price?: number; // estimated price
}

export interface GroceryStore {
  id: string;
  name: string;
  logo: string;
  deliveryFee: number;
  minOrder: number;
  hasAPI: boolean;
}

export interface MealPlan {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  recipes: Recipe[];
  groceryList: Ingredient[];
  totalCost: number;
  store?: GroceryStore;
}

export type OnboardingStep = 
  | 'welcome'
  | 'personal'
  | 'dietary'
  | 'goals'
  | 'timeframe'
  | 'budget'
  | 'complete';
