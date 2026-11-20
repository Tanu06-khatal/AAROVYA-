import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockDoctorAccessRequests } from '../../data/mockData';
import { DoctorAccessRequest } from '../../types';
import { UserCheck, Check, X, Clock, Shield, AlertCircle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { AccessRequestService } from '../../services/api';

export const DoctorAccessRequests: React.FC = () => {
  const [requests, setRequests] = useState<DoctorAccessRequest[]>(mockDoctorAccessRequests);
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'history'>('pending');
  const [actionInProgressId, setActionInProgressId] = useState<string | null>(null);

  const { showToast } = useNotifications();

  const handleApprove = async (id: string, doctorName: string) => {
    setActionInProgressId(id);
    await AccessRequestService.updateStatus(id, 'active');
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'active', validUntil: '30 Days from now' } : r)
    );
    setActionInProgressId(null);
    showToast(`Access approved for ${doctorName} for 30 days`, 'success');
  };

  const handleReject = async (id: string, doctorName: string) => {
    setActionInProgressId(id);
    await AccessRequestService.updateStatus(id, 'rejected');
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r)
    );
    setActionInProgressId(null);
    showToast(`Access request rejected for ${doctorName}`, 'info');
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const activeCount = requests.filter(r => r.status === 'active').length;

  const displayedRequests = requests.filter(r => {
    if (activeTab === 'pending') return r.status === 'pending';
    if (activeTab === 'active') return r.status === 'active';
    return r.status === 'history' || r.status === 'rejected';
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Doctor Access Requests"
        subtitle="Manage inbound clinical data access requests from verified hospitals and specialists"
      />

      {/* Tabs matching Panel 7: Pending (2), Active (3), History */}
      <div className="flex border-b border-borderLight gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'pending'
              ? 'border-primary text-primary font-extrabold'
              : 'border-transparent text-textSecondary hover:text-navy'
          }`}
        >
          <span>Pending</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px]">
            {pendingCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('active')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'active'
              ? 'border-primary text-primary font-extrabold'
              : 'border-transparent text-textSecondary hover:text-navy'
          }`}
        >
          <span>Active</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-primary text-[10px]">
            {activeCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'history'
              ? 'border-primary text-primary font-extrabold'
              : 'border-transparent text-textSecondary hover:text-navy'
          }`}
        >
          History
        </button>
      </div>

      {/* Access Requests Cards (Matching Panel 7) */}
      <div className="space-y-4">
        {displayedRequests.length > 0 ? (
          displayedRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-3xl border border-borderLight p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={req.doctorAvatar}
                  alt={req.doctorName}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-primary/20 flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-navy text-sm sm:text-base">{req.doctorName}</h4>
                    <span className="text-xs text-textSecondary font-medium">
                      {req.hospital} • {req.specialty}
                    </span>
                  </div>

                  <p className="text-xs text-textSecondary">
                    Requested on: <strong className="text-navy">{req.requestedDate}</strong>
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-navy mt-1">
                    <span className="font-semibold text-textSecondary">Reason: </span>
                    <span>{req.reason}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Approve / Reject */}
              <div className="flex items-center gap-2.5 self-end sm:self-center flex-shrink-0">
                {req.status === 'pending' ? (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      isLoading={actionInProgressId === req.id}
                      onClick={() => handleApprove(req.id, req.doctorName)}
                      leftIcon={<Check className="w-4 h-4" />}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-danger border-rose-200 hover:bg-rose-50"
                      isLoading={actionInProgressId === req.id}
                      onClick={() => handleReject(req.id, req.doctorName)}
                      leftIcon={<X className="w-4 h-4" />}
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <Badge variant={req.status === 'active' ? 'verified' : 'neutral'} size="md">
                    {req.status === 'active' ? 'Access Active' : 'Access Concluded'}
                  </Badge>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-borderLight text-textSecondary">
            <UserCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-navy">No {activeTab} access requests</p>
            <p className="text-xs text-textSecondary mt-1">
              New clinician requests will appear here when doctors seek medical history permissions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

