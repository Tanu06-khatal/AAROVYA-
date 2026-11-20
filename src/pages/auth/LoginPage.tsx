import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, ArrowRight, UserCheck } from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('patient1@aarovya.health');
  const [password, setPassword] = useState('SecurePass@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      showToast('Please enter your registered email address or mobile number', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      // Authenticate: The backend / account information strictly determines the user role
      const authenticatedUser = await login(identifier, password);
      setIsLoading(false);

      // Check profile completion status
      if (!authenticatedUser.isProfileComplete) {
        showToast('Please complete your profile information to continue', 'info');
        navigate('/profile/setup');
      } else {
        showToast(`Welcome back, ${authenticatedUser.name}!`, 'success');
        if (authenticatedUser.role === 'doctor') {
          navigate('/doctor/dashboard');
        } else if (authenticatedUser.role === 'laboratory') {
          navigate('/laboratory/dashboard');
        } else {
          navigate('/patient/dashboard');
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      showToast(err.message || 'Authentication failed. Please verify your credentials.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <BrandLogo size="lg" className="justify-center mb-4" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          Sign In to AAROVYA
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-textSecondary">
          Your Digital Health Locker & Healthcare Management Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-5 sm:px-8 shadow-elevated rounded-3xl border border-borderLight">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email or Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Email Address or Mobile Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. patient@aarovya.health or +91 98230 45678"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-navy">Password</label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Password reset instructions sent to registered contact', 'info');
                  }}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-navy"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span className="text-textSecondary font-medium">Remember my session</span>
              </label>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
                className="flex items-center justify-center gap-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Quick Demo Credentials Helpers */}
          <div className="mt-6 pt-4 border-t border-borderLight">
            <p className="text-[11px] font-bold text-textSecondary uppercase tracking-wider text-center mb-2.5">
              Demonstration Accounts
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIdentifier('patient1@aarovya.health');
                  setPassword('SecurePass@2026');
                }}
                className="p-2 text-center rounded-xl border border-borderLight hover:border-primary hover:bg-blue-50/50 text-[11px] font-bold text-navy transition-all"
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => {
                  setIdentifier('priya.sharma@abchospital.com');
                  setPassword('SecurePass@2026');
                }}
                className="p-2 text-center rounded-xl border border-borderLight hover:border-primary hover:bg-blue-50/50 text-[11px] font-bold text-navy transition-all"
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => {
                  setIdentifier('diagnostics@abclabs.in');
                  setPassword('SecurePass@2026');
                }}
                className="p-2 text-center rounded-xl border border-borderLight hover:border-primary hover:bg-blue-50/50 text-[11px] font-bold text-navy transition-all"
              >
                Laboratory
              </button>
            </div>
          </div>

          {/* Link to Registration */}
          <div className="mt-6 text-center text-xs text-textSecondary">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-primary hover:underline">
              Create an AAROVYA Account
            </Link>
          </div>

          {/* Link to Dedicated Admin Login */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-textSecondary hover:text-navy transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-primary" />
              <span>Authorized Administrator Access &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
