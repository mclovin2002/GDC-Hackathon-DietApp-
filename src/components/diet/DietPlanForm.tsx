import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { dietService } from '../../lib/services/dietService';
import type { DietPlan } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface DietPlanFormProps {
  onSuccess?: (plan: DietPlan) => void;
  initialData?: Partial<DietPlan>;
}

export function DietPlanForm({ onSuccess, initialData }: DietPlanFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    target_calories: initialData?.target_calories || 2000,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      const plan = await dietService.createDietPlan(user.id, formData);
      toast.success('Diet plan created successfully!');
      onSuccess?.(plan);
      setFormData({ name: '', description: '', target_calories: 2000 });
    } catch (error) {
      toast.error('Failed to create diet plan');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Plan Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="e.g., My Weight Loss Plan"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your diet plan..."
        />
      </div>

      <div>
        <Label htmlFor="calories">Daily Calorie Target</Label>
        <Input
          id="calories"
          type="number"
          value={formData.target_calories}
          onChange={(e) => setFormData({ ...formData, target_calories: parseInt(e.target.value) })}
          required
          min={500}
          max={10000}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Diet Plan'}
      </Button>
    </form>
  );
} 