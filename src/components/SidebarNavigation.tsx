
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Utensils, 
  ShoppingCart, 
  CreditCard, 
  Package, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SidebarNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: Utensils, label: 'My Meal Plan', path: '/meal-plan' },
    { icon: ShoppingCart, label: 'Grocery Orders', path: '/grocery-list' },
    { icon: CreditCard, label: 'Payment & Subscription', path: '/payment' },
    { icon: Package, label: 'Delivery Status', path: '/delivery' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="bg-background/80 backdrop-blur-md border border-border"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar for both mobile and desktop */}
      <div 
        className={cn(
          "fixed md:relative h-screen bg-background border-r border-border flex flex-col transition-all duration-300 z-40",
          collapsed ? "md:w-20" : "md:w-64",
          mobileMenuOpen ? "w-64 left-0" : "w-64 -left-64 md:left-0"
        )}
      >
        <div className="flex items-center p-4 border-b border-border h-16">
          {!collapsed && (
            <Link to="/home" className="flex items-center text-foreground font-medium text-lg">
              <span className="text-primary font-semibold mr-1">Recipe</span>Guru
            </Link>
          )}
          <button 
            className={`p-2 rounded-full hover:bg-accent ${collapsed ? 'mx-auto' : 'ml-auto'}`}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground/70 hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SidebarNavigation;
