import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user, role } = useAuth();

  // 1. Unauthenticated users cannot access protected dashboards
  if (!isAuthenticated || !user) {
    if (allowedRoles && allowedRoles.includes('admin') && allowedRoles.length === 1) {
      return <Navigate to="/admin/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  // 2. Incomplete user profile must complete profile setup first
  if (user.isProfileComplete === false) {
    return <Navigate to="/profile/setup" replace />;
  }

  // 3. Role-Based Access Control: Unauthorized roles are denied access
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

