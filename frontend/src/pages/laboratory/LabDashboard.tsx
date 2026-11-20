import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockLabTestRequests } from '../../data/mockData';
import { LabTestRequest } from '../../types';
import { Microscope, UploadCloud, Clock, CheckCircle2, FileText, ArrowRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import { LabService } from '../../services/api';

export const LabDashboard: React.FC = () => {
  const [requests, setRequests] = useState<LabTestRequest[]>(mockLabTestRequests);
  const navigate = useNavigate();
  const { showToast } = useNotifications();

  const handleUpdateStatus = async (id: string, newStatus: 'Pending' | 'In-Progress' | 'Completed') => {
    await LabService.updateRequestStatus(id, newStatus);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    showToast(`Test request marked as ${newStatus}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 to-navy rounded-3xl p-6 sm:p-8 text-white shadow-elevated">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
              Laboratory & Pathology Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              ABC Diagnostics & Molecular Pathology
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 mt-1">
              NABL & ICMR Accredited Central Lab • ID: NABL-LAB-9041 • FC Road Center
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<UploadCloud className="w-4 h-4" />}
              onClick={() => navigate('/laboratory/upload-report')}
            >
              Upload Verified Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Row matching Panel 20: Test Requests (12), Reports Uploaded (8), Pending (4) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Test Requests"
          value={12}
          subtitle="Total assigned tests"
          icon={<Microscope className="w-5 h-5 text-purple-600" />}
        />
        <StatCard
          title="Reports Uploaded"
          value={8}
          subtitle="Digitally signed & delivered"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          variant="success"
        />
        <StatCard
          title="Pending"
          value={4}
          subtitle="Sample processing / review"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          variant="warning"
        />
      </div>

      {/* Recent Test Requests Table matching Panel 20 */}
      <div className="bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-borderLight">
          <div>
            <h3 className="font-extrabold text-navy text-base">Recent Test Requests</h3>
            <p className="text-xs text-textSecondary mt-0.5">Diagnostic sample requisition intake queue</p>
          </div>
          <span className="text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
            {requests.length} Requests
          </span>
        </div>

        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-2xl border border-borderLight hover:border-purple-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/40"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-navy text-sm sm:text-base">{req.patientName}</h4>
                  <span className="text-xs text-textSecondary font-mono">{req.patientPhone}</span>
                </div>
                <p className="text-xs font-semibold text-primary">{req.testName}</p>
                <p className="text-[11px] text-textSecondary">
                  Referred by: <strong>{req.referringDoctor}</strong> • Requested: {req.requestedDate}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <Badge
                  variant={
                    req.status === 'Completed'
                      ? 'verified'
                      : req.status === 'In-Progress'
                      ? 'info'
                      : 'pending'
                  }
                  size="sm"
                >
                  {req.status}
                </Badge>

                {req.status !== 'Completed' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(req.id, req.status === 'Pending' ? 'In-Progress' : 'Completed')}
                  >
                    {req.status === 'Pending' ? 'Start Processing' : 'Mark Completed'}
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<FileText className="w-4 h-4 text-emerald-600" />}
                    onClick={() => showToast('Opening completed digital report', 'info')}
                  >
                    View Report
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

