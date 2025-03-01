
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingStep, UserProfile, DietaryRestriction } from '@/utils/types';
import {
  WelcomeStep,
  PersonalInfoStep,
  DietaryStep,
  GoalsStep,
  TimeframeStep,
  BudgetStep,
  CompleteStep,
  ProgressIndicator,
} from './OnboardingSteps';

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
        return <WelcomeStep onNext={handleNext} />;
      case 'personal':
        return (
          <PersonalInfoStep 
            profile={profile}
            updateProfile={updateProfile}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'dietary':
        return (
          <DietaryStep 
            profile={profile}
            toggleDietaryRestriction={toggleDietaryRestriction}
            addAllergen={addAllergen}
            removeAllergen={removeAllergen}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'goals':
        return (
          <GoalsStep 
            profile={profile}
            updateProfile={updateProfile}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'timeframe':
        return (
          <TimeframeStep 
            profile={profile}
            updateProfile={updateProfile}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'budget':
        return (
          <BudgetStep 
            profile={profile}
            updateProfile={updateProfile}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'complete':
        return (
          <CompleteStep 
            profile={profile}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg mb-8">
        <ProgressIndicator currentStep={step} />
        {renderStep()}
      </div>
    </div>
  );
}
