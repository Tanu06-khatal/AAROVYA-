import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderLock,
  UploadCloud,
  CalendarDays,
  Share2,
  Bot,
  FileCheck2,
  Clock,
  ArrowRight,
  Shield,
  Activity,
  Heart,
  Droplet,
  Scale,
  Calendar,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockHealthRecords, mockAppointments, mockHealthMetrics } from '../../data/mockData';
import { DocumentPreviewModal } from '../../components/records/DocumentPreviewModal';
import { ShareRecordModal } from '../../components/records/ShareRecordModal';
import { HealthRecord } from '../../types';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const upcomingApt = mockAppointments.find(a => a.status === 'upcoming');
  const recentRecords = mockHealthRecords.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 1. Welcome Header Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-3xl p-6 sm:p-8 text-white shadow-elevated relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span>Universal Health ID: AAR-8291-0428</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Good Morning, {user?.name.split(' ')[0] || 'Patient1'}! 👋
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-blue-100 font-normal leading-relaxed">
            Here is your real-time health overview. Your vital metrics are stable, and your recent clinical records are verified and synchronized.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Link to="/patient/emergency-profile">
              <button className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors">
                <Shield className="w-3.5 h-3.5" />
                <span>Emergency QR & SOS</span>
              </button>
            </Link>
            <Link to="/patient/timeline">
              <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-semibold backdrop-blur transition-colors">
                <Activity className="w-3.5 h-3.5" />
                <span>View Full Timeline</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Subtle Decorative Pattern */}
        <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none hidden sm:block">
          <svg className="w-72 h-72 text-white" viewBox="0 0 200 200" fill="currentColor">
            <path d="M45,-60C58,-52,68,-39,73,-24C78,-9,78,8,73,23C67,39,56,53,42,62C28,71,14,76,-1,77C-16,79,-32,77,-46,69C-60,60,-71,46,-76,30C-82,14,-81,-4,-74,-20C-67,-36,-53,-50,-38,-58C-23,-66,-11,-67,3,-71C17,-75,32,-68,45,-60Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* 2. Key Statistics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Documents"
          value={42}
          subtitle="All encrypted records"
          icon={<FolderLock className="w-5 h-5" />}
          variant="primary"
          onClick={() => navigate('/patient/health-locker')}
        />
        <StatCard
          title="Verified"
          value={28}
          subtitle="Provider authenticated"
          icon={<FileCheck2 className="w-5 h-5 text-emerald-600" />}
          variant="success"
          onClick={() => navigate('/patient/document-verification')}
        />
        <StatCard
          title="Pending"
          value={3}
          subtitle="Awaiting lab review"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          variant="warning"
          onClick={() => navigate('/patient/document-verification')}
        />
        <StatCard
          title="Appointments"
          value={2}
          subtitle="Upcoming scheduled"
          icon={<CalendarDays className="w-5 h-5 text-sky-600" />}
          onClick={() => navigate('/patient/appointments')}
        />
      </div>

      {/* 3. Quick Actions Panel */}
      <div className="bg-white rounded-2xl border border-borderLight p-5 shadow-card">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/patient/upload-record"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-primary-50/50 hover:border-primary-light transition-all text-center group"
          >
            <div className="p-2.5 rounded-xl bg-blue-100 text-primary mb-2 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-navy group-hover:text-primary">Upload Document</span>
            <span className="text-[10px] text-textSecondary mt-0.5">With OCR extraction</span>
          </Link>

          <Link
            to="/patient/appointments"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-primary-50/50 hover:border-primary-light transition-all text-center group"
          >
            <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700 mb-2 group-hover:scale-105 transition-transform">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-navy group-hover:text-primary">Book Appointment</span>
            <span className="text-[10px] text-textSecondary mt-0.5">Consult top doctors</span>
          </Link>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-primary-50/50 hover:border-primary-light transition-all text-center group"
          >
            <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 mb-2 group-hover:scale-105 transition-transform">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-navy group-hover:text-primary">Share Records</span>
            <span className="text-[10px] text-textSecondary mt-0.5">Time-bound access</span>
          </button>

          <Link
            to="/patient/ai-assistant"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-primary-50/50 hover:border-primary-light transition-all text-center group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 mb-2 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-navy group-hover:text-primary">AI Assistant</span>
            <span className="text-[10px] text-textSecondary mt-0.5">Summarize reports</span>
          </Link>
        </div>
      </div>

      {/* 4. Upcoming Appointment & Recent Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upcoming Appointment */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-borderLight p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-borderLight">
              <h3 className="text-sm font-bold text-navy uppercase tracking-wider">Upcoming Appointment</h3>
              <Link to="/patient/appointments" className="text-xs font-semibold text-primary hover:underline">
                View All
              </Link>
            </div>

            {upcomingApt && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={upcomingApt.doctorAvatar}
                    alt={upcomingApt.doctorName}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <h4 className="font-bold text-navy text-sm">{upcomingApt.doctorName}</h4>
                    <p className="text-xs text-textSecondary">{upcomingApt.specialty} • {upcomingApt.hospital}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-primary">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{upcomingApt.date} • {upcomingApt.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => navigate('/patient/appointments')}
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs text-danger hover:bg-rose-50"
                    onClick={() => navigate('/patient/appointments')}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Today's Vitals Mini Bar */}
          <div className="mt-4 pt-3 border-t border-borderLight grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-slate-50">
              <span className="text-[10px] text-textSecondary flex items-center justify-center gap-1">
                <Scale className="w-3 h-3 text-primary" /> Weight
              </span>
              <span className="font-bold text-navy mt-0.5 block">58 kg</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50">
              <span className="text-[10px] text-textSecondary flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 text-rose-500" /> BP
              </span>
              <span className="font-bold text-navy mt-0.5 block">118/76</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50">
              <span className="text-[10px] text-textSecondary flex items-center justify-center gap-1">
                <Droplet className="w-3 h-3 text-sky-500" /> Sugar
              </span>
              <span className="font-bold text-navy mt-0.5 block">92 mg/dL</span>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Documents */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-borderLight p-5 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-borderLight mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-navy uppercase tracking-wider">Recent Documents</h3>
              <span className="text-xs text-textSecondary font-medium">({mockHealthRecords.length} records)</span>
            </div>
            <Link to="/patient/health-locker" className="text-xs font-semibold text-primary hover:underline">
              Open Locker
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentRecords.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-xl border border-borderLight hover:border-primary-light hover:bg-slate-50/50 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-blue-50 text-primary border border-borderLight flex-shrink-0">
                    <FolderLock className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <h5
                      onClick={() => setSelectedRecord(rec)}
                      className="font-bold text-navy text-xs sm:text-sm hover:text-primary cursor-pointer truncate"
                    >
                      {rec.fileName}
                    </h5>
                    <p className="text-[11px] text-textSecondary truncate">
                      {rec.provider} • {rec.uploadDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant={rec.verificationStatus} size="sm">
                    {rec.verificationStatus === 'provider_verified'
                      ? 'Provider Verified'
                      : rec.verificationStatus === 'verified'
                      ? 'Verified'
                      : 'Pending'}
                  </Badge>
                  <button
                    onClick={() => setSelectedRecord(rec)}
                    className="p-1.5 rounded-lg text-textSecondary hover:text-primary hover:bg-slate-100"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        record={selectedRecord}
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onShare={(rec) => {
          setSelectedRecord(null);
          setIsShareModalOpen(true);
        }}
      />

      {/* Share Modal */}
      <ShareRecordModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        availableRecords={mockHealthRecords}
      />
    </div>
  );
};

