import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderLock,
  UploadCloud,
  FileCheck2,
  Share2,
  UserCheck,
  GitCommit,
  CalendarDays,
  Pill,
  Clock,
  ShieldAlert,
  Users,
  MapPin,
  Building2,
  Bot,
  Lock,
  Download,
  ShieldCheck,
  Syringe,
  Calendar,
  Receipt,
  LineChart,
  Settings,
  Stethoscope,
  Microscope,
  FileText,
  Activity,
  History,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../common/BrandLogo';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const { role } = useAuth();
  const location = useLocation();

  const patientSections: NavSection[] = [
    {
      title: 'Core Records',
      items: [
        { name: 'Dashboard', path: '/patient/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { name: 'Health Locker', path: '/patient/health-locker', icon: <FolderLock className="w-4 h-4" />, badge: '42' },
        { name: 'Upload & Extract', path: '/patient/upload-record', icon: <UploadCloud className="w-4 h-4" /> },
        { name: 'Document Verification', path: '/patient/document-verification', icon: <FileCheck2 className="w-4 h-4" /> },
        { name: 'Share Records', path: '/patient/share-records', icon: <Share2 className="w-4 h-4" /> },
        { name: 'Doctor Access', path: '/patient/access-requests', icon: <UserCheck className="w-4 h-4" />, badge: '2' },
        { name: 'Unified Timeline', path: '/patient/timeline', icon: <GitCommit className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Medical Management',
      items: [
        { name: 'Appointments', path: '/patient/appointments', icon: <CalendarDays className="w-4 h-4" /> },
        { name: 'Prescriptions', path: '/patient/prescriptions', icon: <FileText className="w-4 h-4" /> },
        { name: 'Medicine Reminder', path: '/patient/medicine-reminders', icon: <Clock className="w-4 h-4" /> },
        { name: 'Emergency Profile & QR', path: '/patient/emergency-profile', icon: <ShieldAlert className="w-4 h-4 text-rose-500" /> },
      ],
    },
    {
      title: 'Patient Services',
      items: [
        { name: 'Family Health Hub', path: '/patient/family', icon: <Users className="w-4 h-4" /> },
        { name: 'Nearby Facilities (GPS)', path: '/patient/nearby-hospitals', icon: <MapPin className="w-4 h-4" /> },
        { name: 'Government Schemes', path: '/patient/government-schemes', icon: <Building2 className="w-4 h-4" /> },
        { name: 'AI Health Assistant', path: '/patient/ai-assistant', icon: <Bot className="w-4 h-4 text-primary-light" /> },
        { name: 'Consent & Privacy', path: '/patient/consent', icon: <Lock className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Tracking & Analytics',
      items: [
        { name: 'Health Calendar', path: '/patient/calendar', icon: <Calendar className="w-4 h-4" /> },
        { name: 'Health Analytics', path: '/patient/analytics', icon: <LineChart className="w-4 h-4" /> },
        { name: 'Vaccination Tracker', path: '/patient/vaccinations', icon: <Syringe className="w-4 h-4" /> },
        { name: 'Insurance & Policies', path: '/patient/insurance', icon: <ShieldCheck className="w-4 h-4" /> },
        { name: 'Medical Expenses', path: '/patient/expenses', icon: <Receipt className="w-4 h-4" /> },
        { name: 'Export Health Data', path: '/patient/export', icon: <Download className="w-4 h-4" /> },
        { name: 'Settings & Security', path: '/patient/settings', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  const doctorSections: NavSection[] = [
    {
      title: 'Doctor Portal',
      items: [
        { name: 'Dashboard', path: '/doctor/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { name: 'My Appointments', path: '/doctor/appointments', icon: <CalendarDays className="w-4 h-4" />, badge: '5' },
        { name: 'Patient Records', path: '/doctor/patient-records', icon: <FolderLock className="w-4 h-4" /> },
        { name: 'Prescription Console', path: '/doctor/prescriptions', icon: <FileText className="w-4 h-4" /> },
        { name: 'Access Requests', path: '/doctor/access-requests', icon: <UserCheck className="w-4 h-4" /> },
      ],
    },
  ];

  const labSections: NavSection[] = [
    {
      title: 'Laboratory Portal',
      items: [
        { name: 'Lab Dashboard', path: '/laboratory/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { name: 'Test Requests', path: '/laboratory/test-requests', icon: <Microscope className="w-4 h-4" />, badge: '4' },
        { name: 'Upload & Verify Report', path: '/laboratory/upload-report', icon: <UploadCloud className="w-4 h-4" /> },
        { name: 'Report Archive', path: '/laboratory/report-history', icon: <History className="w-4 h-4" /> },
      ],
    },
  ];

  const adminSections: NavSection[] = [
    {
      title: 'Administration',
      items: [
        { name: 'Admin Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { name: 'User Verifications', path: '/admin/verifications', icon: <ShieldCheck className="w-4 h-4" />, badge: '32' },
        { name: 'System Audit Logs', path: '/admin/audit-logs', icon: <Activity className="w-4 h-4" /> },
        { name: 'System Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  const currentSections =
    role === 'doctor'
      ? doctorSections
      : role === 'laboratory'
      ? labSections
      : role === 'admin'
      ? adminSections
      : patientSections;

  return (
    <aside className="w-64 bg-navy text-slate-300 flex flex-col h-full border-r border-navy-light select-none">
      {/* Brand Top Header */}
      <div className="p-5 border-b border-navy-light flex items-center justify-between">
        <BrandLogo textColor="text-white" showSubtitle={true} />
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {currentSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              {section.title}
            </h4>
            <div className="space-y-0.5 mt-1.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-navy-light/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        location.pathname === item.path
                          ? 'bg-white/20 text-white'
                          : 'bg-primary-dark/80 text-primary-100'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-3.5 border-t border-navy-light bg-navy-dark/40 text-[11px] text-slate-400 flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-200">AAROVYA Health Locker</p>
          <p className="text-[10px] text-slate-400">v1.0 (HIPAA/ABDM Ready)</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
      </div>
    </aside>
  );
};

