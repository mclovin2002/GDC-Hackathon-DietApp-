import { useState, useEffect } from 'react';
import { dietService } from '../../lib/services/dietService';
import type { Meal, DietPlan } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { toast } from 'sonner';

interface MealTrackerProps {
  dietPlan: DietPlan;
}

export function MealTracker({ dietPlan }: MealTrackerProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  useEffect(() => {
    loadMeals();
  }, [dietPlan.id]);

  const loadMeals = async () => {
    try {
      const planMeals = await dietService.getPlanMeals(dietPlan.id);
      setMeals(planMeals);
    } catch (error) {
      toast.error('Failed to load meals');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dietService.addMealToPlan(dietPlan.id, formData);
      toast.success('Meal added successfully!');
      setFormData({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 });
      loadMeals();
    } catch (error) {
      toast.error('Failed to add meal');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const remainingCalories = dietPlan.target_calories - totalCalories;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Calories</p>
              <p className="text-2xl font-bold">{totalCalories}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className={`text-2xl font-bold ${remainingCalories < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {remainingCalories}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Meal Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="calories">Calories</Label>
            <Input
              id="calories"
              type="number"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="protein">Protein (g)</Label>
            <Input
              id="protein"
              type="number"
              value={formData.protein}
              onChange={(e) => setFormData({ ...formData, protein: parseFloat(e.target.value) })}
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="carbs">Carbs (g)</Label>
            <Input
              id="carbs"
              type="number"
              value={formData.carbs}
              onChange={(e) => setFormData({ ...formData, carbs: parseFloat(e.target.value) })}
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="fat">Fat (g)</Label>
            <Input
              id="fat"
              type="number"
              value={formData.fat}
              onChange={(e) => setFormData({ ...formData, fat: parseFloat(e.target.value) })}
              step="0.1"
            />
          </div>
        </div>

        <Button type="submit" disabled={loading}>Add Meal</Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Today's Meals</h3>
        {meals.map((meal) => (
          <Card key={meal.id}>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <div>
                <p className="font-medium">{meal.name}</p>
                <p className="text-sm text-muted-foreground">{meal.calories} calories</p>
              </div>
              <div className="text-sm text-right">
                <p>Protein: {meal.protein}g</p>
                <p>Carbs: {meal.carbs}g</p>
                <p>Fat: {meal.fat}g</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 