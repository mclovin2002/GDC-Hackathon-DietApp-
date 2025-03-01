
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserProfile as UserProfileType } from '@/utils/types';

export default function UserProfile() {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user profile from localStorage
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    setLoading(false);
  }, []);

  const handleEditProfile = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse h-6 w-32 bg-muted rounded"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <Card className="w-full max-w-lg mx-auto glass-card">
        <CardHeader>
          <CardTitle>Profile Not Found</CardTitle>
          <CardDescription>
            You need to complete the onboarding process first
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => navigate('/')}>Go to Onboarding</Button>
        </CardFooter>
      </Card>
    );
  }

  const renderValueWithLabel = (label: string, value: string | number) => (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );

  return (
    <Card className="w-full max-w-lg mx-auto glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{profile.name}</CardTitle>
            <CardDescription>Your Profile Details</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={handleEditProfile}>
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {renderValueWithLabel('Age', profile.age)}
          {renderValueWithLabel('Gender', profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1))}
          {renderValueWithLabel('Weight', `${profile.weight} kg`)}
          {renderValueWithLabel('Height', `${profile.height} cm`)}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Dietary Restrictions</p>
          <div className="flex flex-wrap gap-2">
            {profile.dietaryRestrictions.length > 0 ? (
              profile.dietaryRestrictions.map((restriction) => (
                <span
                  key={restriction}
                  className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium capitalize"
                >
                  {restriction.replace('-', ' ')}
                </span>
              ))
            ) : (
              <span className="text-sm">None specified</span>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Allergens</p>
          <div className="flex flex-wrap gap-2">
            {profile.allergens.length > 0 ? (
              profile.allergens.map((allergen) => (
                <span
                  key={allergen}
                  className="inline-flex items-center rounded-full bg-destructive/10 text-destructive px-2.5 py-0.5 text-xs font-medium"
                >
                  {allergen}
                </span>
              ))
            ) : (
              <span className="text-sm">None specified</span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {renderValueWithLabel('Weight Goal', profile.weightGoal.replace('_', ' '))}
          {renderValueWithLabel('Activity Level', profile.exercise.replace('_', ' '))}
          {renderValueWithLabel('Timeframe', `${profile.timeframe} weeks`)}
          {renderValueWithLabel('Weekly Budget', `$${profile.budget}`)}
        </div>
      </CardContent>
    </Card>
  );
}
