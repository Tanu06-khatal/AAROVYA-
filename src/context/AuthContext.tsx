import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockCurrentUser, mockDoctors } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  updateUserProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('aarovya_role') as UserRole) || 'patient';
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aarovya_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return mockCurrentUser;
  });

  useEffect(() => {
    localStorage.setItem('aarovya_role', role);
    if (user) {
      localStorage.setItem('aarovya_user', JSON.stringify(user));
    }
  }, [role, user]);

  const login = async (emailOrPhone: string, targetRole: UserRole): Promise<boolean> => {
    setRole(targetRole);
    if (targetRole === 'doctor') {
      setUser(mockDoctors[0]);
    } else if (targetRole === 'laboratory') {
      setUser({
        id: 'lab-001',
        name: 'ABC Diagnostics Lab',
        email: emailOrPhone,
        phone: '+91 20 6789 0123',
        role: 'laboratory',
        facilityName: 'ABC Diagnostics Central Lab',
        licenseNumber: 'NABL-LAB-9041'
      });
    } else if (targetRole === 'admin') {
      setUser({
        id: 'adm-001',
        name: 'System Administrator',
        email: emailOrPhone,
        phone: '+91 99999 88888',
        role: 'admin',
        facilityName: 'AAROVYA Health Grid HQ'
      });
    } else {
      setUser({
        ...mockCurrentUser,
        email: emailOrPhone.includes('@') ? emailOrPhone : mockCurrentUser.email,
        phone: !emailOrPhone.includes('@') ? emailOrPhone : mockCurrentUser.phone,
        role: 'patient'
      });
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aarovya_user');
    localStorage.removeItem('aarovya_role');
  };

  const switchRole = (newRole: UserRole) => {
    login('switch-role@aarovya.health', newRole);
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

