import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, Utensils, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import RecipeCard from '@/components/RecipeCard';
import { Recipe, Ingredient, UserProfile } from '@/utils/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../hooks/useAuth';
import { dietService } from '../lib/services/dietService';
import type { DietPlan } from '../lib/supabase';
import { DietPlanForm } from '../components/diet/DietPlanForm';
import { MealTracker } from '../components/diet/MealTracker';
import { ProgressTracker } from '../components/diet/ProgressTracker';
import { toast } from 'sonner';

const MealPlan = () => {
  const { user } = useAuth();
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [groceryList, setGroceryList] = useState<Ingredient[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentDay, setCurrentDay] = useState(1);
  const navigate = useNavigate();
  const { toast: useToastToast } = useToast();
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<DietPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDietPlans();
    }
  }, [user]);

  const loadDietPlans = async () => {
    if (!user) return;
    try {
      const plans = await dietService.getUserDietPlans(user.id);
      setDietPlans(plans);
      if (plans.length > 0 && !selectedPlan) {
        setSelectedPlan(plans[0]);
      }
    } catch (error) {
      toast.error('Failed to load diet plans');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanCreated = (plan: DietPlan) => {
    setDietPlans([plan, ...dietPlans]);
    setSelectedPlan(plan);
  };

  useEffect(() => {
    // Load user profile
    const storedProfile = localStorage.getItem('userProfile');
    if (!storedProfile) {
      navigate('/');
      return;
    }
    setProfile(JSON.parse(storedProfile));

    // Load selected recipes
    const storedSelectedRecipes = localStorage.getItem('selectedRecipes');
    if (!storedSelectedRecipes) {
      navigate('/recipes');
      return;
    }
    const recipes = JSON.parse(storedSelectedRecipes) as Recipe[];
    setSelectedRecipes(recipes);

    // Generate grocery list from selected recipes
    const allIngredients: Ingredient[] = [];
    
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const existingIngredient = allIngredients.find(i => i.name.toLowerCase() === ingredient.name.toLowerCase());
        
        if (existingIngredient) {
          // If ingredient already exists, update the amount
          existingIngredient.amount += ingredient.amount;
        } else {
          // Otherwise add the new ingredient
          allIngredients.push({ ...ingredient, id: crypto.randomUUID() });
        }
      });
    });
    
    setGroceryList(allIngredients);
    
    // Save grocery list to localStorage
    localStorage.setItem('groceryList', JSON.stringify(allIngredients));
  }, [navigate]);

  const generateDays = () => {
    if (!profile) return [];
    
    const days = [];
    const weeksInPlan = profile.timeframe;
    const totalDays = weeksInPlan * 7;
    
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    
    return days;
  };

  const days = generateDays();
  
  const handleViewGroceryList = () => {
    navigate('/grocery-list');
  };

  const handleRemoveRecipe = (recipeId: string) => {
    setSelectedRecipes(prevRecipes => {
      const newRecipes = prevRecipes.filter(r => r.id !== recipeId);
      localStorage.setItem('selectedRecipes', JSON.stringify(newRecipes));
      
      // Update grocery list
      const newGroceryList = generateGroceryList(newRecipes);
      setGroceryList(newGroceryList);
      localStorage.setItem('groceryList', JSON.stringify(newGroceryList));
      
      return newRecipes;
    });
  };

  const generateGroceryList = (recipes: Recipe[]): Ingredient[] => {
    const allIngredients: Ingredient[] = [];
    
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const existingIngredient = allIngredients.find(i => i.name.toLowerCase() === ingredient.name.toLowerCase());
        
        if (existingIngredient) {
          existingIngredient.amount += ingredient.amount;
        } else {
          allIngredients.push({ ...ingredient, id: crypto.randomUUID() });
        }
      });
    });
    
    return allIngredients;
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              Please sign in to access your meal plans
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Meal Plan</h1>
              <p className="text-muted-foreground">
                {profile?.timeframe} week plan customized for your {profile?.weightGoal.replace('_', ' ')} goal
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button 
                onClick={handleViewGroceryList}
                disabled={selectedRecipes.length === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Grocery List
              </Button>
            </div>
          </div>
          
          <Card className="mb-8 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Weekly Overview
              </CardTitle>
              <CardDescription>
                Your {profile?.timeframe}-week meal plan at a glance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={currentDay.toString()} onValueChange={(value) => setCurrentDay(parseInt(value))}>
                <TabsList className="grid grid-cols-7 mb-4">
                  {days.slice(0, 7).map(day => (
                    <TabsTrigger key={day} value={day.toString()}>
                      Day {day}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {days.slice(0, 7).map(day => (
                  <TabsContent key={day} value={day.toString()}>
                    <div className="space-y-4">
                      {selectedRecipes.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No recipes selected yet.</p>
                          <Button 
                            variant="link" 
                            onClick={() => navigate('/recipes')}
                            className="mt-2"
                          >
                            Browse recipes
                          </Button>
                        </div>
                      ) : (
                        selectedRecipes.map((recipe, index) => (
                          <div key={recipe.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border">
                            <div className="w-full md:w-1/4">
                              <img 
                                src={recipe.image} 
                                alt={recipe.title}
                                className="w-full h-32 object-cover rounded-md"
                              />
                            </div>
                            
                            <div className="w-full md:w-2/4 flex flex-col justify-between">
                              <div>
                                <h3 className="font-medium text-lg">{recipe.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{recipe.description}</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Utensils className="h-3.5 w-3.5 mr-1" />
                                  <span>{recipe.calories} kcal</span>
                                  <span className="mx-2">•</span>
                                  <span>{recipe.prepTime + recipe.cookTime} min</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="w-full md:w-1/4 flex flex-col justify-between">
                              <div className="grid grid-cols-3 gap-1 text-xs mb-2">
                                <div className="bg-secondary rounded px-2 py-1 text-center">
                                  <div className="font-medium">{recipe.protein}g</div>
                                  <div className="text-muted-foreground">Protein</div>
                                </div>
                                <div className="bg-secondary rounded px-2 py-1 text-center">
                                  <div className="font-medium">{recipe.carbs}g</div>
                                  <div className="text-muted-foreground">Carbs</div>
                                </div>
                                <div className="bg-secondary rounded px-2 py-1 text-center">
                                  <div className="font-medium">{recipe.fat}g</div>
                                  <div className="text-muted-foreground">Fat</div>
                                </div>
                              </div>
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="mt-2"
                                onClick={() => handleRemoveRecipe(recipe.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleViewGroceryList}
              disabled={selectedRecipes.length === 0}
            >
              Continue to Grocery List <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MealPlan;
