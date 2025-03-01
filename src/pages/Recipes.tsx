
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import RecipeCard from '@/components/RecipeCard';
import { Recipe, UserProfile, DietaryRestriction } from '@/utils/types';
import { mockRecipes } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryRestriction | 'all'>('all');
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load user profile
    const storedProfile = localStorage.getItem('userProfile');
    if (!storedProfile) {
      navigate('/');
      return;
    }
    setProfile(JSON.parse(storedProfile));

    // Load existing selected recipes from localStorage if any
    const storedSelectedRecipes = localStorage.getItem('selectedRecipes');
    if (storedSelectedRecipes) {
      setSelectedRecipes(JSON.parse(storedSelectedRecipes));
    }
  }, [navigate]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDietaryFilterChange = (value: string) => {
    setDietaryFilter(value as DietaryRestriction | 'all');
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipes(prev => {
      const isAlreadySelected = prev.some(r => r.id === recipe.id);
      let newSelectedRecipes;
      
      if (isAlreadySelected) {
        newSelectedRecipes = prev.filter(r => r.id !== recipe.id);
      } else {
        newSelectedRecipes = [...prev, recipe];
      }
      
      // Save to localStorage
      localStorage.setItem('selectedRecipes', JSON.stringify(newSelectedRecipes));
      
      return newSelectedRecipes;
    });
  };

  const handleContinueToMealPlan = () => {
    if (selectedRecipes.length === 0) {
      toast({
        title: "No recipes selected",
        description: "Please select at least one recipe to continue.",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/meal-plan');
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDietary = dietaryFilter === 'all' || recipe.dietaryTags.includes(dietaryFilter);
    return matchesSearch && matchesDietary;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Recipe Recommendations</h1>
              <p className="text-muted-foreground">
                Personalized recipes based on your profile and preferences
              </p>
            </div>
            
            <div className="flex items-center mt-4 sm:mt-0">
              <div className="text-sm">
                <span className="text-muted-foreground mr-2">Selected:</span>
                <span className="font-medium">{selectedRecipes.length}</span>
              </div>
              <Button 
                className="ml-4"
                onClick={handleContinueToMealPlan}
                disabled={selectedRecipes.length === 0}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Create Meal Plan
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 mb-8">
            <div className="w-full sm:w-2/3">
              <Input
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full"
              />
            </div>
            
            <div className="w-full sm:w-1/3">
              <Select
                value={dietaryFilter}
                onValueChange={handleDietaryFilterChange}
              >
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by dietary needs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Recipes</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="gluten-free">Gluten-free</SelectItem>
                  <SelectItem value="dairy-free">Dairy-free</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={handleRecipeSelect}
                  isSelected={selectedRecipes.some(r => r.id === recipe.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recipes found matching your search criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Recipes;
