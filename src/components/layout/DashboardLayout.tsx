import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileDrawer } from './MobileDrawer';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout: React.FC = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { user } = useAuth();

  // If user profile is not complete, redirect to profile setup
  if (user && user.isProfileComplete === false) {
    return <Navigate to="/profile/setup" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col antialiased">
      {/* Top Navbar */}
      <Navbar onToggleSidebar={() => setIsMobileDrawerOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop / Laptop Persistent Sidebar */}
        <div className="hidden lg:block h-[calc(100vh-4rem)] sticky top-16 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Mobile / Tablet Drawer */}
        <MobileDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav onOpenMore={() => setIsMobileDrawerOpen(true)} />
    </div>
  );
};

