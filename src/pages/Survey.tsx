import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/AuthContext';
import { toast } from '@/components/ui/use-toast';

// Lazy load heavier components
const Select = lazy(() => import('@/components/ui/select').then(module => ({ 
  default: ({ children, ...props }) => (
    <module.Select {...props}>
      <module.SelectTrigger>
        <module.SelectValue />
      </module.SelectTrigger>
      <module.SelectContent>
        {children}
      </module.SelectContent>
    </module.Select>
  )
})));

const SelectItem = lazy(() => import('@/components/ui/select').then(module => ({ default: module.SelectItem })));
const Slider = lazy(() => import('@/components/ui/slider').then(module => ({ default: module.Slider })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const GUMLOOP_API_KEY = 'aad84c84fdc94c9c8bf98ab05814dc16';
const SAVED_ITEM_ID = 'pvVsHKrYVjdwJ7sfeWrDUi';

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

    try {
      setLoading(true);
      
      // Store form data in localStorage for later use
      localStorage.setItem('surveyData', JSON.stringify(formData));
      
      if (!user) {
        // If not signed in, redirect to sign up with survey data saved
        navigate('/signup');
        return;
      }

      // Convert form data to pipeline inputs format
      const pipelineInputs = JSON.stringify([
        { name: 'goal', value: formData.goal },
        { name: 'dietaryRestrictions', value: formData.dietaryRestrictions },
        { name: 'activityLevel', value: formData.activityLevel },
        { name: 'dailyCalories', value: formData.dailyCalories },
        { name: 'mealsPerDay', value: formData.mealsPerDay },
      ]);

      // Call the one-liner API
      const response = await fetch(
        `https://api.gumloop.com/api/v1/start_pipeline?user_id=${user.id}&saved_item_id=${SAVED_ITEM_ID}&api_key=${GUMLOOP_API_KEY}&pipeline_inputs=${encodeURIComponent(pipelineInputs)}`
      );

      if (!response.ok) {
        throw new Error('Failed to start pipeline');
      }

      const result = await response.json();

      toast({
        title: "Success",
        description: "Your preferences have been saved. Creating your meal plan...",
      });

      // Navigate to meal plan page with the run ID
      navigate(`/dashboard/meal-plan?run_id=${result.run_id}`);
      
    } catch (error) {
      console.error('Error starting pipeline:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start pipeline",
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
              <Suspense fallback={<LoadingSpinner />}>
                <div className="space-y-2">
                  <Label htmlFor="goal">What's your primary goal?</Label>
                  <Select
                    value={formData.goal}
                    onValueChange={(value) => setFormData({ ...formData, goal: value })}
                  >
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="health_improvement">Health Improvement</SelectItem>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dietaryRestrictions">Any dietary restrictions?</Label>
                  <Select
                    value={formData.dietaryRestrictions}
                    onValueChange={(value) => setFormData({ ...formData, dietaryRestrictions: value })}
                  >
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten_free">Gluten Free</SelectItem>
                    <SelectItem value="dairy_free">Dairy Free</SelectItem>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}
                  >
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Lightly Active</SelectItem>
                    <SelectItem value="moderate">Moderately Active</SelectItem>
                    <SelectItem value="very">Very Active</SelectItem>
                    <SelectItem value="extra">Extra Active</SelectItem>
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
              </Suspense>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : user ? "Create Meal Plan" : "Continue to Sign Up"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Survey; 