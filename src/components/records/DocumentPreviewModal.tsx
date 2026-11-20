import React, { useState } from 'react';
import { HealthRecord } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { FileText, Download, ShieldCheck, Calendar, User, Building, CheckCircle2, Share2, History } from 'lucide-react';

interface DocumentPreviewModalProps {
  record: HealthRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onShare?: (record: HealthRecord) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  record,
  isOpen,
  onClose,
  onShare,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'timeline' | 'extracted'>('preview');

  if (!record) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={record.title}
      description={`${record.fileName} • ${record.fileSize}`}
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Verification Status Banner */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-borderLight flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-navy text-sm">{record.fileName}</span>
                <Badge variant={record.verificationStatus} size="sm">
                  {record.verificationStatus === 'provider_verified'
                    ? 'Provider Verified'
                    : record.verificationStatus === 'verified'
                    ? 'Verified'
                    : 'Pending Verification'}
                </Badge>
              </div>
              <p className="text-xs text-textSecondary mt-0.5">
                {record.provider} {record.verificationDate && `• Verified on ${record.verificationDate}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onShare && (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Share2 className="w-3.5 h-3.5" />}
                onClick={() => {
                  onClose();
                  onShare(record);
                }}
              >
                Share
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              onClick={() => alert(`Simulating secure download of ${record.fileName}`)}
            >
              Download
            </Button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-borderLight text-xs font-semibold gap-4">
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-2.5 transition-colors relative ${
              activeTab === 'preview' ? 'text-primary border-b-2 border-primary' : 'text-textSecondary hover:text-navy'
            }`}
          >
            Clinical Preview
          </button>
          {record.extractedDetails && (
            <button
              onClick={() => setActiveTab('extracted')}
              className={`pb-2.5 transition-colors relative ${
                activeTab === 'extracted' ? 'text-primary border-b-2 border-primary' : 'text-textSecondary hover:text-navy'
              }`}
            >
              OCR / AI Extracted Data
            </button>
          )}
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-2.5 transition-colors relative ${
              activeTab === 'timeline' ? 'text-primary border-b-2 border-primary' : 'text-textSecondary hover:text-navy'
            }`}
          >
            Verification Audit History
          </button>
        </div>

        {/* Tab 1: Clinical Preview Content */}
        {activeTab === 'preview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-borderLight">
              <div>
                <span className="text-textSecondary">Document Category</span>
                <p className="font-semibold text-navy capitalize">{record.category}</p>
              </div>
              <div>
                <span className="text-textSecondary">Uploaded Date</span>
                <p className="font-semibold text-navy">{record.uploadDate}</p>
              </div>
              <div>
                <span className="text-textSecondary">Healthcare Facility / Provider</span>
                <p className="font-semibold text-navy">{record.provider}</p>
              </div>
              <div>
                <span className="text-textSecondary">Attending Clinician</span>
                <p className="font-semibold text-navy">{record.doctorName || 'Not specified'}</p>
              </div>
            </div>

            {/* Simulated Clinical Report Sheet View */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 font-mono text-xs text-slate-800 space-y-3">
              <div className="border-b border-slate-200 pb-3 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-navy text-sm font-sans block">{record.provider}</span>
                  <span className="text-[11px] text-textSecondary font-sans">NABL & NABH Accredited Digital Medical Record</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-sans">DIGITALLY SIGNED</span>
                  <p className="text-[10px] text-textSecondary mt-0.5">{record.uploadDate}</p>
                </div>
              </div>

              {record.extractedDetails?.testResults ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-4 font-bold text-[11px] border-b border-slate-200 pb-1 font-sans text-navy">
                    <span>Investigation</span>
                    <span className="text-center">Result</span>
                    <span className="text-center">Reference Unit</span>
                    <span className="text-right">Bio Range</span>
                  </div>
                  {record.extractedDetails.testResults.map((t, idx) => (
                    <div key={idx} className="grid grid-cols-4 text-[11px] items-center py-0.5 font-sans">
                      <span className="font-medium text-navy">{t.parameter}</span>
                      <span className="text-center font-bold text-emerald-700">{t.value}</span>
                      <span className="text-center text-slate-500">{t.unit}</span>
                      <span className="text-right text-slate-500">{t.range}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-textSecondary font-sans">
                  <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="font-medium">Document content indexed and encrypted securely in AAROVYA Locker.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: OCR Extracted Fields */}
        {activeTab === 'extracted' && record.extractedDetails && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3 bg-primary-50 p-4 rounded-xl border border-primary-100">
              <div>
                <span className="text-textSecondary">Extracted Type</span>
                <p className="font-bold text-navy text-sm">{record.extractedDetails.documentType}</p>
              </div>
              <div>
                <span className="text-textSecondary">Issuing Hospital</span>
                <p className="font-bold text-navy text-sm">{record.extractedDetails.hospital}</p>
              </div>
              <div>
                <span className="text-textSecondary">Document Date</span>
                <p className="font-bold text-navy text-sm">{record.extractedDetails.date}</p>
              </div>
              <div>
                <span className="text-textSecondary">Doctor</span>
                <p className="font-bold text-navy text-sm">{record.extractedDetails.doctor}</p>
              </div>
            </div>

            {record.extractedDetails.keyFindings && (
              <div className="bg-white p-4 rounded-xl border border-borderLight">
                <span className="font-bold text-navy block mb-2">Key Diagnostic Findings:</span>
                <ul className="list-disc pl-5 space-y-1 text-textSecondary">
                  {record.extractedDetails.keyFindings.map((finding, i) => (
                    <li key={i}>{finding}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Verification Audit History */}
        {activeTab === 'timeline' && (
          <div className="p-4 bg-white rounded-xl border border-borderLight">
            <h4 className="text-xs font-bold uppercase tracking-wider text-textSecondary mb-4">
              Cryptographic Verification Audit Trail
            </h4>
            <div className="space-y-4">
              {(record.verificationTimeline || [
                { title: 'Uploaded by Patient', timestamp: `${record.uploadDate}, 09:10 AM`, actor: 'Patient Portal', completed: true },
                { title: 'Verification Requested', timestamp: `${record.uploadDate}, 09:36 AM`, actor: 'Automated Provider Dispatch', completed: true },
                { title: 'Verified by Provider', timestamp: record.verificationDate || 'Pending Provider Review', actor: record.provider, completed: record.verificationStatus !== 'pending' },
              ]).map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative">
                  <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-navy">{step.title}</h5>
                    <p className="text-[11px] text-textSecondary mt-0.5">{step.actor} • {step.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

