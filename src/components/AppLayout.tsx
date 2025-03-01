
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNavigation from './SidebarNavigation';

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1 overflow-x-hidden p-4 md:p-6 pt-16 md:pt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
