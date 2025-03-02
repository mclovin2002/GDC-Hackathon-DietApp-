import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, BookOpen, Search } from 'lucide-react';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
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
    setSearchQuery(e.target.value);
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
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
    const matchesTime = !selectedTime || getTimeRange(recipe.time) === selectedTime;
    return matchesSearch && matchesDifficulty && matchesTime;
  });

  function getTimeRange(time: string): string {
    const minutes = parseInt(time);
    if (minutes <= 20) return 'quick';
    if (minutes <= 40) return 'medium';
    return 'long';
  }

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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search recipes..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            
            <div className="w-full sm:w-1/3">
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-1/3">
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (&lt;20 mins)</SelectItem>
                  <SelectItem value="medium">Medium (20-40 mins)</SelectItem>
                  <SelectItem value="long">Long (&gt;40 mins)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{recipe.title}</CardTitle>
                    <CardDescription>{recipe.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>⏱ {recipe.time}</span>
                      <span>📊 {recipe.difficulty}</span>
                      <span>🔥 {recipe.calories} cal</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleRecipeSelect(recipe)}>
                      {selectedRecipes.some(r => r.id === recipe.id) ? 'Remove' : 'Select'}
                    </Button>
                  </CardFooter>
                </Card>
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
