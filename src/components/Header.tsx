import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/dashboard' },
    { name: 'Recipes', href: '/dashboard/recipes' },
    { name: 'Meal Plan', href: '/dashboard/meal-plan' },
    { name: 'Grocery List', href: '/dashboard/grocery-list' },
    { name: 'Profile', href: '/dashboard/profile' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center text-foreground font-medium text-lg animate-fade-in"
            >
              <span className="text-primary font-semibold mr-1">Recipe</span>Guru
            </Link>
          </div>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  px-1 py-2 text-sm font-medium transition-colors relative
                  ${location.pathname === item.href 
                    ? 'text-primary' 
                    : 'text-foreground/80 hover:text-foreground'}
                `}
              >
                {item.name}
                {location.pathname === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${location.pathname === item.href 
                    ? 'text-primary bg-accent' 
                    : 'text-foreground hover:bg-secondary hover:text-foreground'}
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
