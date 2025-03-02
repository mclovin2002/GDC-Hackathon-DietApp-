import React, { useState, useEffect } from 'react';
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
  X,
  LogOut,
  Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const SidebarNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: User, label: 'My Profile', path: '/dashboard/profile' },
    { icon: Utensils, label: 'My Meal Plan', path: '/dashboard/meal-plan' },
    { icon: ShoppingCart, label: 'Grocery Orders', path: '/dashboard/grocery-list' },
    { icon: CreditCard, label: 'Payment & Subscription', path: '/dashboard/payment' },
    { icon: Package, label: 'Delivery Status', path: '/dashboard/delivery' },
    { icon: Workflow, label: 'Pipeline Management', path: '/dashboard/pipeline' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
          className="bg-background/80 backdrop-blur-md border border-border hover:bg-accent"
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
          "fixed md:relative h-screen bg-background border-r border-border flex flex-col transition-all duration-300 z-40 shadow-lg",
          collapsed ? "md:w-20" : "md:w-64",
          mobileMenuOpen ? "w-64 left-0" : "w-64 -left-64 md:left-0"
        )}
      >
        {/* Profile Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 ring-2 ring-border">
              <AvatarImage src={profile?.avatarUrl} />
              <AvatarFallback className="text-lg font-medium">{profile?.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{profile?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-3">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex items-center w-full px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path 
                      ? "bg-primary/10 text-primary hover:bg-primary/15" 
                      : "text-foreground/70 hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5",
                    collapsed ? "mx-auto" : "mr-4",
                    location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                  )} />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sign Out Button */}
        <div className="p-6 border-t border-border">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start hover:bg-destructive/10 hover:text-destructive",
              collapsed && "justify-center"
            )}
            onClick={handleSignOut}
          >
            <LogOut className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-4")} />
            {!collapsed && <span>Sign Out</span>}
          </Button>
        </div>

        {/* Collapse Button (Desktop Only) */}
        <div className="hidden md:block absolute -right-3 top-6">
          <Button
            variant="outline"
            size="sm"
            className="h-6 w-6 rounded-full bg-background p-0 hover:bg-accent"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SidebarNavigation;
