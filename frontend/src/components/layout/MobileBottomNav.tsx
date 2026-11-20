import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderLock, GitCommit, ShieldAlert, MoreHorizontal, Calendar, Microscope, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MobileBottomNavProps {
  onOpenMore: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenMore }) => {
  const { role } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-borderLight h-16 flex items-center justify-around px-2 lg:hidden shadow-elevated select-none">
      {role === 'patient' && (
        <>
          <NavLink
            to="/patient/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-textSecondary hover:text-navy'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Home</span>
          </NavLink>

          <NavLink
            to="/patient/health-locker"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-textSecondary hover:text-navy'
              }`
            }
          >
            <FolderLock className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Locker</span>
          </NavLink>

          <NavLink
            to="/patient/timeline"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-textSecondary hover:text-navy'
              }`
            }
          >
            <GitCommit className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Timeline</span>
          </NavLink>

          <NavLink
            to="/patient/emergency-profile"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-danger font-bold' : 'text-rose-600/70 hover:text-danger'
              }`
            }
          >
            <ShieldAlert className="w-5 h-5 text-danger" />
            <span className="text-[10px] mt-0.5 text-danger font-semibold">SOS QR</span>
          </NavLink>
        </>
      )}

      {role === 'doctor' && (
        <>
          <NavLink
            to="/doctor/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-textSecondary hover:text-navy'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Dashboard</span>
          </NavLink>

          <NavLink
            to="/doctor/appointments"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-textSecondary hover:text-navy'
              }`
            }
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Visits</span>
          </NavLink>
        </>
      )}

      {role === 'laboratory' && (
        <>
          <NavLink
            to="/laboratory/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-textSecondary hover:text-navy'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Lab Home</span>
          </NavLink>

          <NavLink
            to="/laboratory/test-requests"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-textSecondary hover:text-navy'
              }`
            }
          >
            <Microscope className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Requests</span>
          </NavLink>
        </>
      )}

      {role === 'admin' && (
        <>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-textSecondary hover:text-navy'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Overview</span>
          </NavLink>

          <NavLink
            to="/admin/audit-logs"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-textSecondary hover:text-navy'
              }`
            }
          >
            <Activity className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Logs</span>
          </NavLink>
        </>
      )}

      {/* More / Menu Drawer trigger */}
      <button
        onClick={onOpenMore}
        className="flex flex-col items-center justify-center w-14 py-1 rounded-xl text-textSecondary hover:text-navy transition-colors focus:outline-none"
      >
        <MoreHorizontal className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">More</span>
      </button>
    </nav>
  );
};

