import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { UserProfile } from '@/utils/types';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already completed onboarding
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const profile: UserProfile = JSON.parse(storedProfile);
        if (profile.id) {
          setHasProfile(true);
          navigate('/dashboard');
          toast({
            title: "Welcome back!",
            description: `Good to see you again, ${profile.name}!`,
          });
        }
      } catch (e) {
        // If there's an error parsing, we'll keep hasProfile as false
        console.error("Error loading profile:", e);
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <OnboardingFlow />
    </div>
  );
};

export default Index;
