
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Utensils, 
  ShoppingCart, 
  CreditCard, 
  Package, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SidebarNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: Utensils, label: 'My Meal Plan', path: '/meal-plan' },
    { icon: ShoppingCart, label: 'Grocery Orders', path: '/grocery-list' },
    { icon: CreditCard, label: 'Payment & Subscription', path: '/payment' },
    { icon: Package, label: 'Delivery Status', path: '/delivery' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className={`h-screen bg-background border-r border-border flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center p-4 border-b border-border">
        {!collapsed && (
          <Link to="/" className="flex items-center text-foreground font-medium text-lg">
            <span className="text-primary font-semibold mr-1">Recipe</span>Guru
          </Link>
        )}
        <button 
          className={`p-2 rounded-full hover:bg-accent ml-auto`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`
                  flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${location.pathname === item.path 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground/70 hover:bg-accent hover:text-foreground'}
                `}
              >
                <item.icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNavigation;
