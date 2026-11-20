import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { mockHealthRecords } from '../../data/mockData';
import { HealthRecord } from '../../types';
import { ShieldCheck, CheckCircle2, Clock, Building2, Send, History, FileText, ArrowRight } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { HealthRecordService } from '../../services/api';

export const DocumentVerification: React.FC = () => {
  const [records, setRecords] = useState<HealthRecord[]>(mockHealthRecords);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord>(mockHealthRecords[0]);
  const [requestingId, setRequestingId] = useState<string | null>(null);
  const { showToast } = useNotifications();

  const handleRequestVerification = async (recordId: string) => {
    setRequestingId(recordId);
    await HealthRecordService.requestVerification(recordId);
    setRecords(prev =>
      prev.map(r => r.id === recordId ? { ...r, verificationStatus: 'pending' } : r)
    );
    setRequestingId(null);
    showToast('Verification request dispatched to provider lab queue', 'success');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Verification"
        subtitle="Cryptographic validation of your diagnostic documents directly by accredited hospitals & labs"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Featured Verification Showcase (Matching Panel 5) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-borderLight p-6 shadow-card space-y-6">
          <div className="border-b border-borderLight pb-4 flex items-center justify-between">
            <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">
              Document Details
            </h3>
            <Badge variant={selectedRecord.verificationStatus} size="sm">
              {selectedRecord.verificationStatus === 'provider_verified'
                ? 'Provider Verified'
                : selectedRecord.verificationStatus === 'verified'
                ? 'Verified'
                : 'Pending Verification'}
            </Badge>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-primary border border-borderLight flex-shrink-0">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-navy text-base">{selectedRecord.fileName}</h4>
              <p className="text-xs text-textSecondary mt-0.5">
                Medical Report • {selectedRecord.fileSize} • {selectedRecord.category.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Provider Verification Banner */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-navy text-sm">Provider Verified</h5>
              <p className="text-xs text-textSecondary mt-0.5 leading-relaxed">
                Verified by <strong>{selectedRecord.provider}</strong> on{' '}
                {selectedRecord.verificationDate || '25 Sep 2026, 10:20 AM'}.
              </p>
            </div>
          </div>

          {/* Verification Timeline (Matching Panel 5) */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-textSecondary">
              Verification Audit Timeline
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-navy">Uploaded by Patient</h6>
                  <p className="text-[11px] text-textSecondary">24 Sep 2026, 09:10 AM • Direct Secure Upload</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-navy">Verification Requested</h6>
                  <p className="text-[11px] text-textSecondary">24 Sep 2026, 09:36 AM • Automated Grid Notification</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-emerald-950">Verified by Provider</h6>
                  <p className="text-[11px] text-emerald-800">25 Sep 2026, 10:20 AM • Cryptographic Sign Authenticated</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              leftIcon={<History className="w-4 h-4" />}
              onClick={() => showToast('Full cryptographic blockchain hash: 0x7f9a...3b4c verified', 'info')}
            >
              View Verification History
            </Button>
          </div>
        </div>

        {/* Right: All Records Verification Queue */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-borderLight p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderLight">
            <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">
              All Health Records & Verification Status
            </h3>
            <span className="text-xs text-textSecondary">{records.length} documents</span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {records.map((rec) => (
              <div
                key={rec.id}
                onClick={() => setSelectedRecord(rec)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  selectedRecord.id === rec.id
                    ? 'border-primary bg-primary-50/30 shadow-xs'
                    : 'border-borderLight hover:bg-slate-50'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy text-xs sm:text-sm truncate">{rec.title}</span>
                  </div>
                  <p className="text-[11px] text-textSecondary mt-0.5">
                    {rec.provider} • {rec.uploadDate}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                  <Badge variant={rec.verificationStatus} size="sm">
                    {rec.verificationStatus === 'provider_verified'
                      ? 'Provider Verified'
                      : rec.verificationStatus === 'verified'
                      ? 'Verified'
                      : 'Pending'}
                  </Badge>

                  {rec.verificationStatus === 'pending' && (
                    <Button
                      variant="primary"
                      size="sm"
                      isLoading={requestingId === rec.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestVerification(rec.id);
                      }}
                    >
                      Request Provider Stamp
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

