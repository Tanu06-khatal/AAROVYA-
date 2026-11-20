import React, { useState } from 'react';
import { Bell, Menu, Shield, User, LogOut, ChevronDown, Check, Sparkles, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { UserRole } from '../../types';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, role, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const roleLabels: Record<UserRole, { label: string; badge: string }> = {
    patient: { label: 'Patient Portal', badge: 'bg-blue-50 text-primary border-blue-200' },
    doctor: { label: 'Doctor Portal', badge: 'bg-sky-50 text-sky-700 border-sky-200' },
    laboratory: { label: 'Laboratory View', badge: 'bg-purple-50 text-purple-700 border-purple-200' },
    admin: { label: 'Admin Console', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-borderLight h-16 flex items-center px-4 sm:px-6 justify-between select-none shadow-xs">
      {/* Left: Mobile hamburger & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 rounded-xl text-textSecondary hover:text-navy hover:bg-slate-100 lg:hidden focus:outline-none"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <BrandLogo size="sm" showSubtitle={false} linkTo={role === 'patient' ? '/patient/dashboard' : `/${role}/dashboard`} />

        {/* Current Active Role Badge (Static - Authenticated role determined by backend) */}
        <div className="hidden sm:block">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${roleLabels[role].badge}`}>
            <span>{roleLabels[role].label}</span>
          </span>
        </div>
      </div>

      {/* Right Actions: Notifications, Emergency Quick Button, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Emergency Profile QR quick link on patient view */}
        {role === 'patient' && (
          <Link
            to="/patient/emergency-profile"
            className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-danger hover:bg-rose-100 rounded-xl text-xs font-bold border border-rose-200 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-danger" />
            <span>Emergency QR</span>
          </Link>
        )}

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-textSecondary hover:text-navy hover:bg-slate-100 transition-colors focus:outline-none"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-borderLight rounded-2xl shadow-elevated p-3 z-50 animate-in fade-in-0 zoom-in-95"
              onMouseLeave={() => setShowNotifications(false)}
            >
              <div className="flex items-center justify-between pb-2 border-b border-borderLight mb-2 px-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-navy">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-primary text-white font-bold px-1.5 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <Link
                  to={role === 'patient' ? '/patient/notifications' : `/${role}/dashboard`}
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-1.5 max-h-72 overflow-y-auto">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-colors text-left text-xs ${
                      !notif.read ? 'bg-primary-50/50 hover:bg-primary-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy">{notif.title}</span>
                      <span className="text-[10px] text-textSecondary">{notif.timestamp}</span>
                    </div>
                    <p className="text-textSecondary mt-1 line-clamp-2">{notif.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-navy leading-tight truncate max-w-[120px]">{user?.name}</span>
              <span className="text-[10px] text-textSecondary capitalize">{user?.role}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-textSecondary hidden md:block" />
          </button>

          {showProfileMenu && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white border border-borderLight rounded-2xl shadow-elevated p-2 z-50 animate-in fade-in-0 zoom-in-95"
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              <div className="p-2 border-b border-borderLight mb-1">
                <p className="text-xs font-bold text-navy">{user?.name}</p>
                <p className="text-[11px] text-textSecondary truncate">{user?.email}</p>
                {user?.bloodGroup && (
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-danger border border-rose-100">
                    Blood Group: {user.bloodGroup}
                  </span>
                )}
              </div>

              <Link
                to="/profile/edit"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-navy hover:bg-slate-50 rounded-xl"
              >
                <User className="w-4 h-4 text-textSecondary" />
                <span>My Profile</span>
              </Link>

              <Link
                to={role === 'patient' ? '/patient/settings' : `/${role}/dashboard`}
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-navy hover:bg-slate-50 rounded-xl"
              >
                <Settings className="w-4 h-4 text-textSecondary" />
                <span>Account & Settings</span>
              </Link>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-danger hover:bg-rose-50 rounded-xl transition-colors mt-1"
              >
                <LogOut className="w-4 h-4 text-danger" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

