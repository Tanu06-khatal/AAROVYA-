import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockAdminStats, mockAuditLogs } from '../../data/mockData';
import { Users, Stethoscope, Building2, Microscope, ShieldCheck, Activity, CheckCircle2, Clock, XCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = mockAdminStats;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-elevated">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              National Health Grid Administration
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              AAROVYA System Administrator Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Platform governance, clinician identity vetting, institutional onboarding, and HIPAA/ABDM compliance logs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Activity className="w-4 h-4" />}
              onClick={() => navigate('/admin/audit-logs')}
            >
              System Audit Logs
            </Button>
          </div>
        </div>
      </div>

      {/* System Overview Stats matching Panel 29: Users (1,250), Doctors (120), Hospitals (40), Labs (35) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          subtitle="Registered citizens"
          icon={<Users className="w-5 h-5 text-primary" />}
        />
        <StatCard
          title="Doctors"
          value={stats.doctors}
          subtitle="Licensed practitioners"
          icon={<Stethoscope className="w-5 h-5 text-sky-600" />}
        />
        <StatCard
          title="Hospitals"
          value={stats.hospitals}
          subtitle="Accredited centers"
          icon={<Building2 className="w-5 h-5 text-indigo-600" />}
        />
        <StatCard
          title="Laboratories"
          value={stats.labs}
          subtitle="NABL testing labs"
          icon={<Microscope className="w-5 h-5 text-purple-600" />}
        />
      </div>

      {/* User Verifications Ring / Breakdown matching Panel 29 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-borderLight">
            <div>
              <h3 className="font-extrabold text-navy text-base">User & Facility Verifications</h3>
              <p className="text-xs text-textSecondary mt-0.5">Medical council licensing and KYC validation</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-navy">
              {stats.userVerifications.total} Total Submissions
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-2xl font-black text-emerald-800 block">
                {stats.userVerifications.verified}
              </span>
              <span className="text-xs font-bold text-emerald-700">Verified</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <span className="text-2xl font-black text-amber-800 block">
                {stats.userVerifications.pending}
              </span>
              <span className="text-xs font-bold text-amber-700">Pending</span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <XCircle className="w-5 h-5 text-rose-600 mx-auto mb-1" />
              <span className="text-2xl font-black text-rose-800 block">
                {stats.userVerifications.rejected}
              </span>
              <span className="text-xs font-bold text-rose-700">Rejected</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => navigate('/admin/verifications')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Review Pending Verifications ({stats.userVerifications.pending})
          </Button>
        </div>

        {/* Live System Activity Mini Table */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderLight">
            <h3 className="font-extrabold text-navy text-base">Recent Platform Activity</h3>
            <button
              onClick={() => navigate('/admin/audit-logs')}
              className="text-xs font-bold text-primary hover:underline"
            >
              View Full Logs
            </button>
          </div>

          <div className="space-y-2.5">
            {mockAuditLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy">{log.user}</span>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-200 text-slate-800">
                      {log.role}
                    </span>
                  </div>
                  <p className="text-textSecondary mt-0.5 truncate max-w-xs">{log.details}</p>
                </div>
                <span className="text-[10px] font-bold text-textSecondary">{log.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

