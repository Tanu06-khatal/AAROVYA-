import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { useNotifications } from '../../context/NotificationContext';

export const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [identifier, setIdentifier] = useState('patient1@aarovya.health');
  const [password, setPassword] = useState('SecurePass@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'patient') {
      setIdentifier('patient1@aarovya.health');
    } else if (role === 'doctor') {
      setIdentifier('priya.sharma@abchospital.com');
    } else if (role === 'laboratory') {
      setIdentifier('diagnostics@abclabs.in');
    } else if (role === 'admin') {
      setIdentifier('admin@aarovya.health');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      showToast('Please enter your registered mobile number or email', 'warning');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      await login(identifier, selectedRole);
      setIsLoading(false);
      showToast(`Welcome back! Signed in as ${selectedRole.toUpperCase()}`, 'success');

      if (selectedRole === 'doctor') navigate('/doctor/dashboard');
      else if (selectedRole === 'laboratory') navigate('/laboratory/dashboard');
      else if (selectedRole === 'admin') navigate('/admin/dashboard');
      else navigate('/patient/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <BrandLogo size="lg" className="justify-center mb-4" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          Sign In to AAROVYA
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-textSecondary">
          Universal Digital Health Locker & Healthcare Management Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-5 sm:px-8 shadow-elevated rounded-3xl border border-borderLight">
          {/* Multi-Role Switcher Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2 text-center">
              Select Your Role
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl">
              {(['patient', 'doctor', 'laboratory', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleSelect(r)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all capitalize ${
                    selectedRole === r
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-textSecondary hover:text-navy'
                  }`}
                >
                  {r === 'laboratory' ? 'Lab' : r}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mobile / Email Input */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Mobile Number or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 9823045678 or patient@aarovya.health"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Password or OTP Mode */}
            {!isOtpMode ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-navy">Password</label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to registered email', 'info'); }} className="text-xs font-semibold text-primary hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-navy"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">6-Digit OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  placeholder="Enter 6-digit OTP (e.g. 123456)"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy tracking-widest text-center font-mono font-bold"
                />
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span className="text-textSecondary">Remember my session</span>
              </label>

              <button
                type="button"
                onClick={() => setIsOtpMode(!isOtpMode)}
                className="text-primary font-semibold hover:underline"
              >
                {isOtpMode ? 'Use Password' : 'Use OTP Login'}
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
              >
                Sign In to {selectedRole.toUpperCase()}
              </Button>
            </div>
          </form>

          {/* Social or Alternate Logins */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-borderLight" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-textSecondary font-medium">or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  showToast('Google OAuth simulated successfully', 'success');
                  login('google.user@aarovya.health', selectedRole);
                  navigate('/patient/dashboard');
                }}
                className="flex items-center justify-center gap-2 px-3 py-2 border border-borderLight rounded-xl text-xs font-semibold text-navy hover:bg-slate-50 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOtpMode(true)}
                className="flex items-center justify-center gap-2 px-3 py-2 border border-borderLight rounded-xl text-xs font-semibold text-navy hover:bg-slate-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Mobile OTP</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-textSecondary">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-primary hover:underline">
              Create an AAROVYA Locker
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

