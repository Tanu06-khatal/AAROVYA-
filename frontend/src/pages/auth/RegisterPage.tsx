import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { useNotifications } from '../../context/NotificationContext';
import { ShieldCheck, Check } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      showToast('Please accept the HIPAA & ABDM consent terms to register', 'warning');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      await login(email, role);
      setIsLoading(false);
      showToast('Account registered successfully! Welcome to AAROVYA.', 'success');
      navigate(role === 'patient' ? '/patient/dashboard' : `/${role}/dashboard`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center px-4">
        <BrandLogo size="lg" className="justify-center mb-4" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          Create Your AAROVYA Account
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-textSecondary">
          Universal Digital Health Locker & Healthcare Management Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <div className="bg-white py-8 px-5 sm:px-8 shadow-elevated rounded-3xl border border-borderLight">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2 text-center">
              Account Type
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl">
              {(['patient', 'doctor', 'laboratory', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all capitalize ${
                    role === r
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-textSecondary hover:text-navy'
                  }`}
                >
                  {r === 'laboratory' ? 'Lab' : r}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">Full Legal Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Patient1 or Dr. Priya Sharma"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@aarovya.health"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Mobile Number (with OTP)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98230 45678"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {role === 'patient' && (
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy"
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Create Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 chars"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

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
                  I agree to the AAROVYA Terms of Clinical Service and consent to encrypted health records storage under ABDM & HIPAA frameworks.
                </span>
              </label>
            </div>

            <div className="pt-3">
              <Button type="submit" variant="primary" size="md" fullWidth isLoading={isLoading}>
                Create {role.toUpperCase()} Account
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-textSecondary">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

