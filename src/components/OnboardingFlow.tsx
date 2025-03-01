
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Checkbox } from '@/components/ui/checkbox';
import { OnboardingStep, UserProfile, DietaryRestriction, WeightGoal, Exercise } from '@/utils/types';

const defaultUserProfile: UserProfile = {
  id: '',
  name: '',
  age: 30,
  gender: '',
  weight: 70,
  height: 170,
  dietaryRestrictions: [],
  allergens: [],
  weightGoal: 'maintain',
  exercise: 'moderate',
  timeframe: 8,
  budget: 100,
};

export default function OnboardingFlow() {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [profile, setProfile] = useState<UserProfile>({
    ...defaultUserProfile,
    id: crypto.randomUUID(),
  });
  const navigate = useNavigate();

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    switch (step) {
      case 'welcome':
        setStep('personal');
        break;
      case 'personal':
        setStep('dietary');
        break;
      case 'dietary':
        setStep('goals');
        break;
      case 'goals':
        setStep('timeframe');
        break;
      case 'timeframe':
        setStep('budget');
        break;
      case 'budget':
        setStep('complete');
        break;
      case 'complete':
        // Save profile and redirect
        localStorage.setItem('userProfile', JSON.stringify(profile));
        navigate('/recipes');
        break;
    }
  };

  const handleBack = () => {
    switch (step) {
      case 'personal':
        setStep('welcome');
        break;
      case 'dietary':
        setStep('personal');
        break;
      case 'goals':
        setStep('dietary');
        break;
      case 'timeframe':
        setStep('goals');
        break;
      case 'budget':
        setStep('timeframe');
        break;
      case 'complete':
        setStep('budget');
        break;
    }
  };

  const toggleDietaryRestriction = (restriction: DietaryRestriction) => {
    setProfile((prev) => {
      const restrictions = [...prev.dietaryRestrictions];
      
      if (restrictions.includes(restriction)) {
        return {
          ...prev,
          dietaryRestrictions: restrictions.filter(r => r !== restriction),
        };
      } else {
        return {
          ...prev,
          dietaryRestrictions: [...restrictions, restriction],
        };
      }
    });
  };

  const addAllergen = (allergen: string) => {
    if (allergen && !profile.allergens.includes(allergen)) {
      setProfile((prev) => ({
        ...prev,
        allergens: [...prev.allergens, allergen],
      }));
    }
  };

  const removeAllergen = (allergen: string) => {
    setProfile((prev) => ({
      ...prev,
      allergens: prev.allergens.filter(a => a !== allergen),
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <Card className="w-full max-w-lg mx-auto glass-card animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Welcome to Recipe Guru</CardTitle>
              <CardDescription className="text-lg mt-2">
                Let's personalize your nutrition journey
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" 
                alt="Healthy food"
                className="rounded-lg h-60 object-cover w-full"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNext} className="w-full sm:w-auto">
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );

      case 'personal':
        return (
          <Card className="w-full max-w-lg mx-auto glass-card animate-slide-in-right">
            <CardHeader>
              <CardTitle>Tell us about yourself</CardTitle>
              <CardDescription>
                This information helps us create a personalized meal plan for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  placeholder="Your name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="age" className="text-sm font-medium">Age</label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => updateProfile('age', parseInt(e.target.value, 10))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="gender" className="text-sm font-medium">Gender</label>
                  <Select
                    value={profile.gender}
                    onValueChange={(value) => updateProfile('gender', value)}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="weight" className="text-sm font-medium">Weight (kg)</label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight}
                    onChange={(e) => updateProfile('weight', parseInt(e.target.value, 10))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="height" className="text-sm font-medium">Height (cm)</label>
                  <Input
                    id="height"
                    type="number"
                    value={profile.height}
                    onChange={(e) => updateProfile('height', parseInt(e.target.value, 10))}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );

      case 'dietary':
        return (
          <Card className="w-full max-w-lg mx-auto glass-card animate-slide-in-right">
            <CardHeader>
              <CardTitle>Dietary Preferences</CardTitle>
              <CardDescription>
                Select any dietary restrictions or preferences you have
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Dietary Restrictions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['none', 'vegetarian', 'vegan', 'halal', 'kosher', 'carnivore', 'gluten-free', 'dairy-free', 'nut-free'].map((restriction) => (
                    <div key={restriction} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`restriction-${restriction}`}
                        checked={profile.dietaryRestrictions.includes(restriction as DietaryRestriction)}
                        onCheckedChange={() => toggleDietaryRestriction(restriction as DietaryRestriction)}
                      />
                      <label
                        htmlFor={`restriction-${restriction}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                      >
                        {restriction.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Allergens</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.allergens.map((allergen) => (
                    <div 
                      key={allergen} 
                      className="flex items-center bg-secondary px-3 py-1 rounded-full text-sm"
                    >
                      <span>{allergen}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-2"
                        onClick={() => removeAllergen(allergen)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="allergen"
                    placeholder="Add allergen (e.g., shellfish)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addAllergen((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button variant="outline" onClick={(e) => {
                    const input = document.getElementById('allergen') as HTMLInputElement;
                    addAllergen(input.value);
                    input.value = '';
                  }}>
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );

      case 'goals':
        return (
          <Card className="w-full max-w-lg mx-auto glass-card animate-slide-in-right">
            <CardHeader>
              <CardTitle>Your Goals</CardTitle>
              <CardDescription>
                Tell us what you're aiming to achieve
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight Goal</label>
                <Select
                  value={profile.weightGoal}
                  onValueChange={(value) => updateProfile('weightGoal', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a weight goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose_fat">Lose fat</SelectItem>
                    <SelectItem value="gain_muscle">Gain muscle</SelectItem>
                    <SelectItem value="maintain">Maintain current weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Activity Level</label>
                <Select
                  value={profile.exercise}
                  onValueChange={(value) => updateProfile('exercise', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very active (hard exercise daily)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );

      case 'timeframe':
        return (
          <Card className="w-full max-w-lg mx-auto glass-card animate-slide-in-right">
            <CardHeader>
              <CardTitle>Timeframe</CardTitle>
              <CardDescription>
                How many weeks would you like your meal plan for?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <Slider
                  value={[profile.timeframe]}
                  min={1}
                  max={12}
                  step={1}
                  onValueChange={(value) => updateProfile('timeframe', value[0])}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm">1 week</span>
                  <span className="text-lg font-medium">{profile.timeframe} weeks</span>
                  <span className="text-sm">12 weeks</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );

      case 'budget':
        return (
          <Card className="w-full max-w-lg mx-auto glass-card animate-slide-in-right">
            <CardHeader>
              <CardTitle>Budget</CardTitle>
              <CardDescription>
                What's your weekly grocery budget?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <Slider
                  value={[profile.budget]}
                  min={50}
                  max={250}
                  step={10}
                  onValueChange={(value) => updateProfile('budget', value[0])}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm">$50</span>
                  <span className="text-lg font-medium">${profile.budget}</span>
                  <span className="text-sm">$250</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );

      case 'complete':
        return (
          <Card className="w-full max-w-lg mx-auto glass-card animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-center text-2xl">All Set!</CardTitle>
              <CardDescription className="text-center">
                We've got everything we need to create your personalized meal plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <p className="mb-4">
                Based on your information, we're going to suggest meals that meet your:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• Dietary preferences and restrictions</li>
                <li>• Nutritional needs for your {profile.weightGoal.replace('_', ' ')} goal</li>
                <li>• {profile.timeframe}-week meal plan within ${profile.budget} weekly budget</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext}>
                Go to Recipes <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg mb-8">
        {step !== 'welcome' && step !== 'complete' && (
          <div className="mb-8">
            <div className="relative">
              <div className="flex justify-between">
                {['personal', 'dietary', 'goals', 'timeframe', 'budget'].map((s, i) => (
                  <div 
                    key={s} 
                    className={`
                      z-10 flex items-center justify-center w-8 h-8 rounded-full 
                      ${['personal', 'dietary', 'goals', 'timeframe', 'budget'].indexOf(step) >= i 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-muted-foreground'}
                      transition-all
                    `}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-0.5 bg-border -z-10" />
            </div>
          </div>
        )}
        
        {renderStep()}
      </div>
    </div>
  );
}
