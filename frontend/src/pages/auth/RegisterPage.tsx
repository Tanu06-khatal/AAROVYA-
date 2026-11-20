import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { RegularUserRole } from '../../types';
import { useNotifications } from '../../context/NotificationContext';
import { Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, User, Stethoscope, Building2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<RegularUserRole>('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation checks
    if (!name.trim()) {
      setErrorMsg('Please enter your full legal name');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please provide a valid email address');
      return;
    }

    if (!phone.trim()) {
      setErrorMsg('Please enter your mobile phone number');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify both entries.');
      return;
    }

    if (!agreed) {
      setErrorMsg('You must accept the Clinical Service Terms and Consent to continue.');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role,
        password,
      });

      setIsLoading(false);
      showToast('Account created successfully! Please complete your profile to continue.', 'success');
      navigate('/profile/setup');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    }
  };

  const roleOptions: { id: RegularUserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'patient',
      label: 'Patient',
      icon: <User className="w-4 h-4" />,
      desc: 'Digital Health Locker & Records',
    },
    {
      id: 'doctor',
      label: 'Doctor',
      icon: <Stethoscope className="w-4 h-4" />,
      desc: 'Physician Practice & Consultations',
    },
    {
      id: 'laboratory',
      label: 'Laboratory Staff',
      icon: <Building2 className="w-4 h-4" />,
      desc: 'Diagnostic Requisitions & Reports',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center px-4">
        <BrandLogo size="lg" className="justify-center mb-4" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          Create Your AAROVYA Account
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-textSecondary">
          Start managing your digital health records securely.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <div className="bg-white py-8 px-5 sm:px-8 shadow-elevated rounded-3xl border border-borderLight">
          {/* Account Role Selector (Admin Strictly Excluded) */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2.5 text-center">
              Select Your Account Role
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {roleOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setRole(opt.id);
                    setErrorMsg('');
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    role === opt.id
                      ? 'border-primary bg-blue-50/60 shadow-xs ring-1 ring-primary'
                      : 'border-borderLight hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={role === opt.id ? 'text-primary' : 'text-textSecondary'}>
                      {opt.icon}
                    </span>
                    <span className="font-bold text-xs text-navy">{opt.label}</span>
                  </div>
                  <span className="text-[10px] text-textSecondary line-clamp-1">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Inline Error Message */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-danger text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">Full Legal Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Patient1 or Dr. Priya Sharma"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@aarovya.health"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98230 45678"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Create Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full pl-3.5 pr-9 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-textSecondary hover:text-navy"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-3.5 pr-9 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-textSecondary hover:text-navy"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Consent Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span className="text-xs text-textSecondary leading-snug">
                  I accept the AAROVYA Terms of Clinical Service and consent to encrypted health records storage under ABDM & HIPAA standards.
                </span>
              </label>
            </div>

            {/* Create Account Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
                className="flex items-center justify-center gap-2"
              >
                <span>Create {role === 'laboratory' ? 'Laboratory Staff' : role.charAt(0).toUpperCase() + role.slice(1)} Account</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Link to Login */}
          <div className="mt-6 text-center text-xs text-textSecondary">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
