import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { dietService } from '../../lib/services/dietService';
import type { Progress } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function ProgressTracker() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    weight: '',
    calories_consumed: '',
    notes: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user]);

  const loadProgress = async () => {
    if (!user) return;
    try {
      const data = await dietService.getUserProgress(user.id);
      setProgress(data);
    } catch (error) {
      toast.error('Failed to load progress data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      await dietService.recordProgress({
        user_id: user.id,
        weight: parseFloat(formData.weight),
        calories_consumed: parseInt(formData.calories_consumed),
        notes: formData.notes,
        date: formData.date,
      });
      toast.success('Progress recorded successfully!');
      setFormData({
        weight: '',
        calories_consumed: '',
        notes: '',
        date: format(new Date(), 'yyyy-MM-dd'),
      });
      loadProgress();
    } catch (error) {
      toast.error('Failed to record progress');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = progress.map(p => ({
    date: format(new Date(p.date), 'MMM dd'),
    weight: p.weight,
    calories: p.calories_consumed,
  })).reverse();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weight Progress</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calorie Intake</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calories" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Record Daily Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="calories">Calories Consumed</Label>
              <Input
                id="calories"
                type="number"
                value={formData.calories_consumed}
                onChange={(e) => setFormData({ ...formData, calories_consumed: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="How did you feel today?"
              />
            </div>

            <Button type="submit" disabled={loading}>
              Record Progress
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Progress</h3>
        {progress.slice(0, 5).map((entry) => (
          <Card key={entry.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{format(new Date(entry.date), 'MMMM d, yyyy')}</p>
                  <p className="text-sm text-muted-foreground">
                    Weight: {entry.weight}kg | Calories: {entry.calories_consumed}
                  </p>
                </div>
                {entry.notes && (
                  <p className="text-sm text-muted-foreground max-w-[50%]">{entry.notes}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 