
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pt-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <section className="py-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Your Personalized Meal Planning Solution</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get customized meal plans based on your dietary preferences, fitness goals, and budget.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/profile')}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/recipes')}>
                Browse Recipes
              </Button>
            </div>
          </section>
          
          <section className="py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-primary text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                <p className="text-muted-foreground">Tell us about your dietary preferences, allergens, and fitness goals.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-primary text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Your Meal Plan</h3>
                <p className="text-muted-foreground">Receive a customized meal plan based on your preferences and goals.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-primary text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Order Groceries</h3>
                <p className="text-muted-foreground">Get ingredients delivered to your door from your favorite grocery stores.</p>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <p className="italic mb-4">"This service has completely transformed my meal planning. I save time and money every week, and I'm eating healthier than ever."</p>
                <div className="flex items-center">
                  <div className="bg-muted rounded-full w-12 h-12 mr-3"></div>
                  <div>
                    <p className="font-medium">Sarah J.</p>
                    <p className="text-sm text-muted-foreground">Lost 15lbs in 3 months</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <p className="italic mb-4">"As a busy parent, I never had time to plan healthy meals. Now our whole family eats better, and I spend less time worrying about what to cook."</p>
                <div className="flex items-center">
                  <div className="bg-muted rounded-full w-12 h-12 mr-3"></div>
                  <div>
                    <p className="font-medium">Michael T.</p>
                    <p className="text-sm text-muted-foreground">Saved $200/month on groceries</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
