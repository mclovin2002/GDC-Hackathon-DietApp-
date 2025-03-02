import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { motion } from 'framer-motion';
import { ChevronRight, Utensils, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b">
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-primary tracking-tight"
          >
            DietApp
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-x-6"
          >
            {!user ? (
              <>
                <Button variant="ghost" size="lg" onClick={() => navigate('/signin')}>Sign In</Button>
                <Button size="lg" onClick={() => navigate('/signup')} className="bg-primary hover:bg-primary/90">
                  Sign Up <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button size="lg" onClick={() => navigate('/dashboard')} className="bg-primary hover:bg-primary/90">
                Go to Dashboard <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="lg:w-1/2 text-center lg:text-left space-y-8">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text leading-tight">
                Your Personalized Meal Planning Solution
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground">
                Get customized meal plans based on your dietary preferences, fitness goals, and budget.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                {!user ? (
                  <>
                    <Button size="lg" onClick={() => navigate('/signup')} className="bg-primary hover:bg-primary/90 h-14 text-lg">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/signin')} className="h-14 text-lg">
                      Sign In
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" onClick={() => navigate('/dashboard/profile')} className="h-14 text-lg">
                      View Profile
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/dashboard/recipes')} className="h-14 text-lg">
                      Browse Recipes
                    </Button>
                  </>
                )}
              </div>
            </div>
            <motion.div 
              className="lg:w-1/2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Healthy meal preparation"
                className="rounded-2xl shadow-2xl w-full h-[600px] object-cover hover:shadow-primary/20"
              />
            </motion.div>
          </motion.section>
          
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Utensils className="h-8 w-8 text-primary" />,
                  title: "Create Your Profile",
                  description: "Tell us about your dietary preferences, allergens, and fitness goals.",
                  image: "https://images.unsplash.com/photo-1615543162236-011f4b7f5dad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                },
                {
                  icon: <Calendar className="h-8 w-8 text-primary" />,
                  title: "Get Your Meal Plan",
                  description: "Receive a customized meal plan based on your preferences and goals.",
                  image: "https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                },
                {
                  icon: <ShoppingBag className="h-8 w-8 text-primary" />,
                  title: "Order Groceries",
                  description: "Get ingredients delivered to your door from your favorite grocery stores.",
                  image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img 
                      src={step.image}
                      alt={step.title}
                      className="w-full h-56 object-cover rounded-lg mb-8"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-lg text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl -z-10" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center">Success Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {[
                {
                  name: "Sarah J.",
                  achievement: "Lost 15lbs in 3 months",
                  quote: "This service has completely transformed my meal planning. I save time and money every week, and I'm eating healthier than ever.",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                },
                {
                  name: "Michael T.",
                  achievement: "Saved $200/month on groceries",
                  quote: "As a busy parent, I never had time to plan healthy meals. Now our whole family eats better, and I spend less time worrying about what to cook.",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                }
              ].map((story, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-card p-10 rounded-xl shadow-lg backdrop-blur-sm bg-white/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-8">
                    <img 
                      src={story.image}
                      alt={story.name}
                      className="w-20 h-20 rounded-full object-cover mr-6 ring-4 ring-primary/20"
                    />
                    <div>
                      <p className="text-2xl font-semibold">{story.name}</p>
                      <p className="text-lg text-primary/80">{story.achievement}</p>
                    </div>
                  </div>
                  <p className="italic text-xl leading-relaxed">{story.quote}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 text-center"
          >
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-16 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10" />
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start Your Health Journey?</h2>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                Join thousands of others who have transformed their eating habits with our personalized meal planning.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" onClick={() => navigate('/signup')} className="bg-primary hover:bg-primary/90 h-14 text-lg px-8">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
