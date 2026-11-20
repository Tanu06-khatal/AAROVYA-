import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { ShieldCheck, Lock, Smartphone, Bell, User, Key, LogOut, Check, Laptop } from 'lucide-react';

export const SettingsSecurity: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const { showToast } = useNotifications();

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'privacy'>('security');

  // Form states
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [name, setName] = useState(user?.name || 'Patient1');
  const [phone, setPhone] = useState(user?.phone || '+91 98230 45678');
  const [email, setEmail] = useState(user?.email || 'patient1@aarovya.health');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || 'B+');
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || '+91 98221 12345');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, email, bloodGroup, emergencyContact });
    showToast('Profile information successfully updated', 'success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setOldPassword('');
    setNewPassword('');
    showToast('Password changed successfully. New session token generated.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Settings & Account Security"
        subtitle="Manage credentials, two-factor authentication, biometric access, and account privacy"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Settings Navigation matching Panel 28 */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-borderLight p-3 shadow-card space-y-1 h-fit">
          {[
            { id: 'security', label: 'Security & Login', icon: <Lock className="w-4 h-4" /> },
            { id: 'profile', label: 'Profile Settings', icon: <User className="w-4 h-4" /> },
            { id: 'notifications', label: 'Notification Preferences', icon: <Bell className="w-4 h-4" /> },
            { id: 'privacy', label: 'Privacy & Data Protection', icon: <ShieldCheck className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-navy hover:bg-slate-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Settings Body matching Panel 28 */}
        <div className="md:col-span-8 bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-6">
          {/* Security & Login Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="border-b border-borderLight pb-3">
                <h3 className="font-extrabold text-navy text-base">Security & Login</h3>
                <p className="text-xs text-textSecondary mt-0.5">Protect your account with multi-factor authentication</p>
              </div>

              {/* Two-Factor Authentication Toggle matching Panel 28 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary" />
                    <span className="font-bold text-navy text-xs sm:text-sm">Two-Factor Authentication (2FA)</span>
                  </div>
                  <p className="text-xs text-textSecondary">
                    Require SMS / Authenticator app confirmation code on every login
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => {
                      setTwoFactorEnabled(e.target.checked);
                      showToast(e.target.checked ? '2FA enabled' : '2FA disabled', 'info');
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>

              {/* Change Password Form matching Panel 28 */}
              <form onSubmit={handlePasswordChange} className="space-y-3 pt-2">
                <h4 className="font-bold text-navy text-xs uppercase tracking-wider">Change Password</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-textSecondary block mb-1">Current Password</label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
                    />
                  </div>
                  <div>
                    <label className="text-textSecondary block mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 8 chars"
                      className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" size="sm">
                  Update Password
                </Button>
              </form>

              {/* Active Sessions matching Panel 28 */}
              <div className="pt-4 border-t border-borderLight space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-navy text-xs uppercase tracking-wider">Active Sessions (2)</h4>
                  <button
                    onClick={() => showToast('All other sessions terminated successfully', 'success')}
                    className="text-xs font-bold text-danger hover:underline"
                  >
                    Log Out Other Devices
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Laptop className="w-4 h-4 text-primary" />
                      <div>
                        <span className="font-bold text-navy block">Chrome on Windows (Current Session)</span>
                        <span className="text-[11px] text-textSecondary">Pune, India • IP: 103.21.124.9</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active Now
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-textSecondary" />
                      <div>
                        <span className="font-bold text-navy block">AAROVYA Mobile App on iPhone 15</span>
                        <span className="text-[11px] text-textSecondary">Pune, India • Last active 2 hours ago</span>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('Mobile session logged out', 'info')}
                      className="text-xs text-danger font-semibold hover:underline"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
              <div className="border-b border-borderLight pb-3">
                <h3 className="font-extrabold text-navy text-base">Profile Settings</h3>
                <p className="text-textSecondary mt-0.5">Manage personal demographics and emergency contacts</p>
              </div>

              <div>
                <label className="font-bold text-navy block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-navy block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
                  />
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-navy block mb-1">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Emergency SOS Contact</label>
                  <input
                    type="tel"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="+91 98221 12345"
                    className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Button type="submit" variant="primary" size="md">
                  Save Changes
                </Button>
                <Link
                  to="/profile/edit"
                  className="text-primary text-xs font-bold hover:underline"
                >
                  Edit Advanced Role Profile →
                </Link>
              </div>
            </form>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-borderLight pb-3">
                <h3 className="font-extrabold text-navy text-base">Notification Preferences</h3>
                <p className="text-textSecondary mt-0.5">Choose channels for clinical reminders and doctor access requests</p>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'SMS & WhatsApp Appointment Alerts', desc: 'Receive real-time 24h & 2h appointment reminders' },
                  { title: 'Doctor Access Request Notifications', desc: 'Instant push notification when an authorized clinic requests records' },
                  { title: 'Medicine Dosage Alarms', desc: 'Mobile alarms when scheduled pharmaceutical time arrives' },
                ].map((pref, idx) => (
                  <label key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <div>
                      <span className="font-bold text-navy text-xs sm:text-sm block">{pref.title}</span>
                      <span className="text-[11px] text-textSecondary">{pref.desc}</span>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary h-4 w-4" />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 text-xs text-textSecondary">
              <div className="border-b border-borderLight pb-3">
                <h3 className="font-extrabold text-navy text-base">Data Protection & Privacy</h3>
                <p className="text-textSecondary mt-0.5">ABDM & HIPAA Compliance Configuration</p>
              </div>
              <p>
                Your health data is protected under cryptographic AES-GCM-256 vault standards. AAROVYA operates on zero-knowledge encryption principles.
              </p>
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Full clinical compliance data audit exported', 'info')}
                >
                  Download Data Protection Audit Log
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

