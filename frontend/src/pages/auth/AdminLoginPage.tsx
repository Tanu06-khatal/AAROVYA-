import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, ShieldAlert, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export const AdminLoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('admin@aarovya.health');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { loginAdmin } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your authorized administrator username or email.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your administrator security password.');
      return;
    }

    setIsLoading(true);
    try {
      await loginAdmin(identifier, password);
      setIsLoading(false);
      showToast('Administrator clearance verified. Welcome to the Admin Console.', 'success');
      navigate('/admin/dashboard');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Administrator authorization failed. Access denied.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <BrandLogo size="lg" className="justify-center mb-4" />
        
        {/* Security Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-navy text-[11px] font-bold uppercase tracking-wider mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-danger" />
          <span>Restricted Management Node</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          AAROVYA Administration
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-textSecondary">
          Authorized Administrator Access Only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-5 sm:px-8 shadow-elevated rounded-3xl border border-slate-200">
          {/* Security Banner */}
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              This terminal provides administrative oversight of the AAROVYA Health Grid. All access attempts, session durations, and IP telemetry are audited.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-danger text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleAdminSubmit} className="space-y-4">
            {/* Admin Username or Email */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Admin Email or Username
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin@aarovya.health"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
              />
            </div>

            {/* Admin Password */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
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

            {/* Admin Sign In Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
                className="flex items-center justify-center gap-2 bg-navy hover:bg-navy/90"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Quick Demonstration Helper */}
          <div className="mt-6 pt-4 border-t border-borderLight text-center">
            <button
              type="button"
              onClick={() => {
                setIdentifier('admin@aarovya.health');
                setPassword('AdminSecurePass@2026');
              }}
              className="text-[11px] font-semibold text-textSecondary hover:text-navy underline"
            >
              Fill Demo Administrator Credentials
            </button>
          </div>

          {/* Return to Regular User Portal */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Regular User Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

