import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, User, Scale, Ruler, Activity, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile as UserProfileType } from '@/utils/types';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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
    navigate('/onboarding');
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
          <Button onClick={() => navigate('/onboarding')}>Go to Onboarding</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-6">
      {/* Profile Overview Card */}
      <Card className="w-full shadow-md">
        <CardHeader className="pb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                <AvatarImage src={profile.avatarUrl} />
                <AvatarFallback className="text-2xl font-semibold">{profile.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl mb-2">{profile.name}</CardTitle>
                <CardDescription className="text-base">{profile.email}</CardDescription>
              </div>
            </div>
            <Button onClick={handleEditProfile} variant="outline" size="lg" className="gap-2">
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
              <Scale className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Weight</p>
                <p className="text-lg font-semibold">{profile.weight} kg</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
              <Ruler className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Height</p>
                <p className="text-lg font-semibold">{profile.height} cm</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
              <Activity className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Activity Level</p>
                <p className="text-lg font-semibold capitalize">{profile.exercise}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals and Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Diet Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">Weight Goal</p>
              <Badge variant="secondary" className="text-base py-1.5 px-4 capitalize">
                {profile.weightGoal.replace('_', ' ')}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">Dietary Restrictions</p>
              <div className="flex flex-wrap gap-2">
                {profile.dietaryRestrictions.map((restriction, index) => (
                  <Badge key={index} variant="outline" className="py-1 px-3">
                    {restriction}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">Allergens</p>
              <div className="flex flex-wrap gap-2">
                {profile.allergens.map((allergen, index) => (
                  <Badge key={index} variant="destructive" className="py-1 px-3">
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Plan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Plan Duration</p>
                <Badge variant="secondary" className="py-1 px-3">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 inline-block" />
                  {profile.timeframe} weeks
                </Badge>
              </div>
              <Progress value={(1 / profile.timeframe) * 100} className="h-2.5" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Budget</p>
                <Badge variant="secondary" className="py-1 px-3">
                  <DollarSign className="h-3.5 w-3.5 mr-1.5 inline-block" />
                  ${profile.budget}/week
                </Badge>
              </div>
              <Progress value={50} className="h-2.5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
