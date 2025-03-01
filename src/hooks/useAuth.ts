import { useState, useEffect } from 'react';
import { authService } from '../lib/services/authService';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current auth status
    authService.getCurrentUser()
      .then(async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          const userProfile = await authService.getProfile(currentUser.id);
          setProfile(userProfile);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    // Subscribe to auth changes
    const { data: authListener } = authService.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const userProfile = await authService.getProfile(session.user.id);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user: signedInUser } = await authService.signIn(email, password);
    if (signedInUser) {
      const userProfile = await authService.getProfile(signedInUser.id);
      setProfile(userProfile);
    }
    return signedInUser;
  };

  const signUp = async (email: string, password: string, username: string) => {
    const { user: newUser } = await authService.signUp(email, password, username);
    if (newUser) {
      const userProfile = await authService.getProfile(newUser.id);
      setProfile(userProfile);
    }
    return newUser;
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');
    const updatedProfile = await authService.updateProfile(user.id, updates);
    setProfile(updatedProfile);
    return updatedProfile;
  };

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
} 