import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { toast } from '@/components/ui/use-toast';
import type { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  preferences?: any;
  settings?: any;
}

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  openSignIn: (email: string, password: string) => Promise<void>;
  openSignUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current auth status
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          setProfile(profile);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(profile);
      } else {
        setProfile(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const openSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        setProfile(profile);
        toast({
          title: "Success",
          description: "Signed in successfully!"
        });
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const openSignUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Starting sign up process...');
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/signin`
        }
      });
      
      if (error) {
        console.error('Supabase auth error:', error);
        throw error;
      }
      
      console.log('Auth signup response:', data);
      
      if (data.user) {
        console.log('Creating user profile...', data.user);
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: data.user.email,
              created_at: new Date().toISOString(),
              name: email.split('@')[0], // Default name from email
            });
            
          if (profileError) {
            console.error('Profile creation error:', profileError);
            // Don't throw the error, just log it
            toast({
              title: "Note",
              description: "Account created but profile setup incomplete. You can update your profile after signing in.",
            });
          }
        } catch (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't throw the error, just log it
        }
        
        toast({
          title: "Success",
          description: "Account created successfully! Please check your email for verification.",
        });
        
        // Navigate to sign in page after successful signup
        setTimeout(() => {
          window.location.href = '/signin';
        }, 2000);
      } else {
        throw new Error('No user data returned from signup');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      let errorMessage = 'Failed to create account';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = (error as { message: string }).message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
      toast({
        title: "Success",
        description: "Signed out successfully!"
      });
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error('No user logged in');
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      setProfile(data);
      toast({
        title: "Success",
        description: "Profile updated successfully!"
      });
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    openSignIn,
    openSignUp,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 