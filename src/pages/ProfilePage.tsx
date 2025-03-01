
import React from 'react';
import Header from '@/components/Header';
import UserProfile from '@/components/UserProfile';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal preferences and diet goals
            </p>
          </div>
          
          <UserProfile />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
