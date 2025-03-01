import React, { useEffect, useState } from 'react';
import OnboardingFlow from '@/components/OnboardingFlow';
import { UserProfile } from '@/utils/types';

const Index = () => {
  const [hasProfile, setHasProfile] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already completed onboarding
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const profile: UserProfile = JSON.parse(storedProfile);
        if (profile.id) {
          setHasProfile(true);
        }
      } catch (e) {
        // If there's an error parsing, we'll keep hasProfile as false
        console.error("Error loading profile:", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <OnboardingFlow />
    </div>
  );
};

export default Index;
