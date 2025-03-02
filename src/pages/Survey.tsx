import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

const Survey = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goal: '',
    dietaryRestrictions: '',
    activityLevel: '',
    dailyCalories: 2000,
    mealsPerDay: 3,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in to create a meal plan",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Save survey data to profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          preferences: {
            ...formData,
            lastUpdated: new Date().toISOString(),
          },
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your preferences have been saved. Creating your meal plan...",
      });

      // Navigate to meal plan page
      navigate('/dashboard/meal-plan');
      
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Meal Plan Preferences</CardTitle>
            <CardDescription>
              Let's create a personalized meal plan that fits your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goal">What's your primary goal?</Label>
                <Select
                  value={formData.goal}
                  onValueChange={(value) => setFormData({ ...formData, goal: value })}
                >
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="health_improvement">Health Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions">Any dietary restrictions?</Label>
                <Select
                  value={formData.dietaryRestrictions}
                  onValueChange={(value) => setFormData({ ...formData, dietaryRestrictions: value })}
                >
                  <SelectTrigger id="dietaryRestrictions">
                    <SelectValue placeholder="Select dietary restrictions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten_free">Gluten Free</SelectItem>
                    <SelectItem value="dairy_free">Dairy Free</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activityLevel">Activity Level</Label>
                <Select
                  value={formData.activityLevel}
                  onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}
                >
                  <SelectTrigger id="activityLevel">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Lightly Active</SelectItem>
                    <SelectItem value="moderate">Moderately Active</SelectItem>
                    <SelectItem value="very">Very Active</SelectItem>
                    <SelectItem value="extra">Extra Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Daily Calorie Target: {formData.dailyCalories}</Label>
                <Slider
                  value={[formData.dailyCalories]}
                  onValueChange={(value) => setFormData({ ...formData, dailyCalories: value[0] })}
                  min={1200}
                  max={4000}
                  step={50}
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <Label>Meals per Day: {formData.mealsPerDay}</Label>
                <Slider
                  value={[formData.mealsPerDay]}
                  onValueChange={(value) => setFormData({ ...formData, mealsPerDay: value[0] })}
                  min={2}
                  max={6}
                  step={1}
                  className="py-4"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Create Meal Plan"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Survey; 