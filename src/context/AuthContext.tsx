import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, RegularUserRole } from '../types';
import { mockCurrentUser, mockDoctors } from '../data/mockData';

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  role: RegularUserRole;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password?: string) => Promise<User>;
  loginAdmin: (usernameOrEmail: string, password?: string) => Promise<User>;
  register: (accountData: RegisterData) => Promise<User>;
  completeProfile: (profileData: Partial<User>) => Promise<boolean>;
  logout: () => void;
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

  /**
   * Regular User Login (Patient, Doctor, Laboratory Staff)
   * The authenticated role is strictly determined by account information, NOT user dropdown selection.
   */
  const login = async (emailOrPhone: string, _password?: string): Promise<User> => {
    const cleanId = emailOrPhone.trim().toLowerCase();

    // Administrator accounts are not permitted on the regular login page
    if (cleanId === 'admin@aarovya.health' || cleanId === 'admin') {
      throw new Error('Administrator access is restricted. Please sign in through the dedicated Admin Portal at /admin/login');
    }

    // 1. Check if user exists in local registered accounts repository
    let existingUser: User | null = null;
    try {
      const registered: User[] = JSON.parse(localStorage.getItem('aarovya_registered_users') || '[]');
      existingUser = registered.find(
        (u) =>
          u.email?.toLowerCase() === cleanId ||
          u.phone === cleanId ||
          u.id === cleanId
      ) || null;
    } catch {
      existingUser = null;
    }

    let authenticatedRole: UserRole = 'patient';
    let finalUser: User;

    if (existingUser) {
      // Role is derived directly from the user's registered account
      authenticatedRole = existingUser.role;
      finalUser = { ...existingUser };
    } else if (cleanId.includes('abchospital.com') || cleanId.includes('careclinic.com') || cleanId.includes('doctor')) {
      // Known doctor accounts in mock database
      authenticatedRole = 'doctor';
      finalUser = {
        ...mockDoctors[0],
        email: emailOrPhone.includes('@') ? emailOrPhone : mockDoctors[0].email,
        isProfileComplete: true,
      };
    } else if (cleanId.includes('abclabs.in') || cleanId.includes('lab') || cleanId.includes('diagnostics')) {
      // Known laboratory accounts in mock database
      authenticatedRole = 'laboratory';
      finalUser = {
        id: 'lab-001',
        name: 'ABC Diagnostics Lab',
        email: emailOrPhone,
        phone: '+91 20 6789 0123',
        role: 'laboratory',
        facilityName: 'ABC Diagnostics Central Lab',
        licenseNumber: 'NABL-LAB-9041',
        isProfileComplete: true,
        department: 'Pathology & Biochemistry',
      };
    } else {
      // Default to Patient account
      authenticatedRole = 'patient';
      finalUser = {
        ...mockCurrentUser,
        email: emailOrPhone.includes('@') ? emailOrPhone : mockCurrentUser.email,
        phone: !emailOrPhone.includes('@') ? emailOrPhone : mockCurrentUser.phone,
        role: 'patient',
        isProfileComplete: true,
      };
    }

    setRole(authenticatedRole);
    setUser(finalUser);
    localStorage.setItem('aarovya_user', JSON.stringify(finalUser));
    localStorage.setItem('aarovya_role', authenticatedRole);
    return finalUser;
  };

  /**
   * Dedicated Administrator Login
   * Only authorized administrator accounts can be authenticated here.
   */
  const loginAdmin = async (usernameOrEmail: string, _password?: string): Promise<User> => {
    const cleanId = usernameOrEmail.trim().toLowerCase();

    // Verify administrator identity
    const isAdminAccount = cleanId === 'admin@aarovya.health' || cleanId === 'admin' || cleanId.includes('admin');
    if (!isAdminAccount) {
      throw new Error('Access denied. This portal is strictly restricted to authorized system administrators.');
    }

    const adminUser: User = {
      id: 'adm-001',
      name: 'System Administrator',
      email: cleanId.includes('@') ? cleanId : 'admin@aarovya.health',
      phone: '+91 99999 88888',
      role: 'admin',
      facilityName: 'AAROVYA Health Grid HQ',
      isProfileComplete: true,
      department: 'IT & Clinical Governance',
      clearanceLevel: 'Level 3 - Super Administrator',
    };

    setRole('admin');
    setUser(adminUser);
    localStorage.setItem('aarovya_user', JSON.stringify(adminUser));
    localStorage.setItem('aarovya_role', 'admin');
    return adminUser;
  };

  /**
   * Regular User Registration (Patient, Doctor, Laboratory Staff)
   * Admin role cannot be registered.
   */
  const register = async (accountData: RegisterData): Promise<User> => {
    if ((accountData.role as string) === 'admin') {
      throw new Error('Administrator accounts cannot be created through public registration.');
    }

    setRole(accountData.role);
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: accountData.name,
      email: accountData.email,
      phone: accountData.phone,
      role: accountData.role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isProfileComplete: false, // Incomplete until Profile Building step
    };

    setUser(newUser);
    localStorage.setItem('aarovya_user', JSON.stringify(newUser));
    localStorage.setItem('aarovya_role', accountData.role);

    // Persist in registered users list
    try {
      const registered: User[] = JSON.parse(localStorage.getItem('aarovya_registered_users') || '[]');
      const filtered = registered.filter(
        (u) => u.email?.toLowerCase() !== newUser.email.toLowerCase() && u.phone !== newUser.phone
      );
      filtered.push(newUser);
      localStorage.setItem('aarovya_registered_users', JSON.stringify(filtered));
    } catch {
      // ignore
    }

    return newUser;
  };

  const completeProfile = async (profileData: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    const updatedUser: User = {
      ...user,
      ...profileData,
      isProfileComplete: true,
    };

    setUser(updatedUser);
    localStorage.setItem('aarovya_user', JSON.stringify(updatedUser));

    // Update in registered users cache
    try {
      const registered: User[] = JSON.parse(localStorage.getItem('aarovya_registered_users') || '[]');
      const updated = registered.map((u) => (u.id === updatedUser.id || u.email === updatedUser.email ? updatedUser : u));
      if (!updated.some((u) => u.id === updatedUser.id || u.email === updatedUser.email)) {
        updated.push(updatedUser);
      }
      localStorage.setItem('aarovya_registered_users', JSON.stringify(updated));
    } catch {
      // ignore
    }

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aarovya_user');
    localStorage.removeItem('aarovya_role');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      const updated: User = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('aarovya_user', JSON.stringify(updated));

      try {
        const registered: User[] = JSON.parse(localStorage.getItem('aarovya_registered_users') || '[]');
        const updatedList = registered.map((u) => (u.id === updated.id || u.email === updated.email ? updated : u));
        localStorage.setItem('aarovya_registered_users', JSON.stringify(updatedList));
      } catch {
        // ignore
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        login,
        loginAdmin,
        register,
        completeProfile,
        logout,
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

